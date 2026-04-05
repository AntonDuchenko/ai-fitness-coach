---
name: stitch-browser-qa
description: >-
  Stitch QA: Browser MCP for reference PNG; live + pixelmatch plus mandatory zone-by-zone design delta table in reports (not % only). Reports in reports/QA-*.md. Stitch-first coverage.json. Project 7923897073544346409, localhost:3000. Slash: /stitch-qa-one-page.
---

# Stitch + Browser — полноценный QA одной страницы

## Что считается успехом

Пользователь ждёт **файл отчёта** на диске, а не простыню в чате. Правило: **`.cursor/rules/stitch-qa-reports.mdc`**.

- **Главный артефакт:** `.cursor/stitch-browser-qa/reports/QA-{описание-проверки}.md` — весь markdown по шаблону ниже **целиком в этот файл**.
- **В чат:** только **относительный путь** к файлу, **вердикт** одной строкой, при желании до 2 пунктов «суть»; **не** копировать полный отчёт.
- `state.json` / `run.log.md` — служебные.

### Имя файла отчёта

- Каталог: **`.cursor/stitch-browser-qa/reports/`** (создай при отсутствии).
- Имя отражает **Stitch title** + при необходимости **роут/контекст** (напр. `QA-Stitch-AI-Coach-Chat-route-chat.md`, `QA-Stitch-Log-Weight-Modal-dashboard-progress.md`).
- Нормализация: пробелы → `-`, убрать `\/:*?"<>|`, длина разумная (~80 символов). Если файл уже есть — добавь `_YYYY-MM-DD` или хвост из `stitch_screen_id`.

## Defaults (монорепо)

| Setting | Value |
|---------|--------|
| **Stitch `projectId`** | `7923897073544346409` |
| **Base URL** | `http://localhost:3000` |
| **Auth** | `.cursor/rules/qa-local-credentials.mdc` |

## Режимы

### Основной: **один Stitch-экран** за запуск — глубокий прогон

Полный цикл: **`get_screen`** для конкретного макета → найти **где он живёт в приложении** (страница / модалка / sheet / виджет) → браузер → strict pixels + exploratory + отчёт.

### Покрытие **от Stitch** (по умолчанию, если пользователь не указал экран)

**Источник списка — только Stitch**, не «уникальные URL». В одном маршруте могут быть **разные** макеты (модалки, оверлеи) — это **разные строки** покрытия.

**Файлы:** `.cursor/stitch-browser-qa/coverage.json` (**`schema_version`: 2**, `coverage_kind: stitch_screens`), `coverage-status.md`.

**Пример элемента `items[]` после sync + discovery:**

```json
{
  "order": 3,
  "stitch_screen_id": "c0b7613b33014cefb2a61ca54d3e33f5",
  "stitch_title": "Log Weight Modal",
  "status": "pending",
  "app_mapping": {
    "ui_kind": "modal",
    "primary_url": "http://localhost:3000/dashboard/progress",
    "open_steps": ["Open Progress", "Click Log weight"],
    "codebase_hits": ["apps/web/src/features/.../LogWeightDialog.tsx"]
  },
  "last_run_at": null,
  "last_verdict": null,
  "notes": ""
}
```

#### 1) Синхронизация списка из Stitch (`list_screens`)

- Если **`items` пустой** или пользователь просит **resync / обнови список stitch** — вызови **`list_screens`** для дефолтного `project_id`.
- Для каждого экрана: **`stitch_screen_id`** из поля `name` (`projects/…/screens/{id}`), **`stitch_title`** из `title`.
- Отсортируй по **`stitch_title`** (A→Z, стабильно) и проставь **`order`** 0…N.
- **Мерж:** если в JSON уже есть запись с тем же **`stitch_screen_id`**, сохрани **`status`**, **`last_run_at`**, **`last_verdict`**, **`app_mapping`** (если есть). Новые экраны Stitch → новые строки **`pending`**.
- Запиши **`last_sync_from_stitch_at`** (ISO).

#### 2) Выбор работы на этот запуск

- Минимальный **`order`** среди **`status": "pending"`** — **одна** строка за запуск команды (если не попросили batch).
- **`get_screen`** по этой строке (нужны `name` + `projectId` + `screenId` по схеме MCP).

#### 3) Поиск UI в проекте (**discovery** — до браузера или уточни после первого скрина)

Цель: заполнить **`app_mapping`** у строки:

```json
"app_mapping": {
  "ui_kind": "full_page | modal | sheet | drawer | embedded | unknown",
  "primary_url": "http://localhost:3000/...",
  "open_steps": ["Коротко шаги для человека, напр. Открыть /dashboard → нажать Log weight"],
  "codebase_hits": ["apps/web/src/.../Component.tsx"]
}
```

**Действия агента:**

1. **Поиск в коде** `apps/web`: `grep` / семантический поиск по ключевым словам из **`stitch_title`** (log weight, swap meal, dialog, settings, …). Искать **`Dialog`**, **`Sheet`**, **`Modal`**, **`Drawer`**, **`AlertDialog`**, страницы с похожим заголовком.
2. **Эвристика по типу:** если компонент диалога/sheet найден → `ui_kind` modal/sheet/drawer; если только `page.tsx` под роут → `full_page`; мелкий блок на странице → `embedded`.
3. **Fallback — таблица route hints по title** (как ниже): если в коде туманно, начни с **`primary_url`** = base + путь из таблицы; **`open_steps`** опиши честно как *tentative* и уточни в браузере.
4. Если после разумных попыток неясно — `ui_kind: unknown`, `primary_url` лучший guess, `notes` с чем пробовали; в отчёте **BLOCKED** или **PARTIAL** для пикселей, exploratory — что успели.

#### 4) Браузер

- Открой **`primary_url`**, залогинься при необходимости (QA credentials).
- Выполни **`open_steps`** в Browser MCP (клики из snapshot), пока **целевой UI** (вся модалка или страница) не станет видим. После каждого шага при необходимости **snapshot**.
- **Viewport** подгони под Stitch `width`/`height`/`deviceType`.
- Для **modal/sheet**: скрин и сравнение **области макета** (оверлей допустим); в отчёте укажи, что сравнивается модалка, не весь viewport.
- Далее — **strict pixel diff** (если возможно) + **exploratory** по элементам **внутри** открытого UI.

#### 5) После прогона

- Обнови строку: **`done`** / **`blocked`** / **`skipped`**, **`last_run_at`**, **`last_verdict`**, уточнённый **`app_mapping`**.
- Перезапиши **`coverage-status.md`** из JSON.
- В отчёте — блок **«Прогресс покрытия»** по всем строкам.

**Явный запрос пользователя** («проверь экран X», URL + screenId) — выполни один прогон и **обнови** строку с совпадающим **`stitch_screen_id`** или добавь одноразовую запись.

**Все `pending` исчерпаны** — сводка «покрытие Stitch завершено»; для повтора выставь **`pending`** нужным строкам в JSON.

### Таблица route hints (fallback, если discovery в коде не дала роут)

| Title contains | Path |
|----------------|------|
| login, sign in | `/login` |
| sign up, register | `/signup` |
| onboarding | `/onboarding` |
| pricing | `/pricing` |
| chat, coach | `/chat` |
| settings | `/dashboard/settings` |
| progress | `/dashboard/progress` |
| nutrition, recipe, grocery, meal, macro | `/dashboard/nutrition` |
| workout, exercise, logging | `/dashboard/workouts` |
| dashboard | `/dashboard` |
| landing, home, forgefit landing, marketing | `/` |
| modal, dialog, sheet, popover, bottom sheet | *(часто не полноценный роут — опирайся на codebase + open_steps)* |

**Не** сравнивай десятки разных макетов с **`/`** только потому что нет ключевого слова — лучше **`unknown` + поиск в коде**.

### Queue mode (редко)

Много экранов **в одном чате подряд** — только если пользователь **явно** просит. Иначе — **один экран за вызов команды**, список ведёт **`coverage.json`**.

---

## Обязательный пайплайн для `single` (одним ответом, если хватает тулов)

Выполни **подряд** в одной сессии агента (не останавливайся после `get_screen`, чтобы пользователь снова писал continue):

### 1) Stitch MCP

- `get_project` → тема (цвета, шрифты, radius) — сверить с live на уровне «ожидание vs факт».
- `get_screen` → **референс**: скриншот, `width`/`height`/`deviceType`, при наличии `htmlCode`.

### 2) Референс-изображение Stitch — **только через MCP** (`cursor-ide-browser`)

**`user-stitch` / `get_screen`** отдаёт макет и поле **`screenshot.downloadUrl`**, но **не** отдаёт байты картинки отдельным вызовом. **Не используй** `curl` / `pnpm stitch:download-reference` как основной способ — у CDN часто **403** без контекста браузера.

**Основной путь (обязательно попробовать до skip):**

1. После `get_screen` возьми **полный** `screenshot.downloadUrl` (целиком, с query).
2. **`browser_tabs`** → `action: "new"` — **отдельная вкладка** под референс, чтобы не терять вкладку с приложением.
3. На новой вкладке: **`browser_navigate`** на этот URL (прямая навигация на картинку; страница часто показывает один image document).
4. **`browser_wait_for`** → `time: 2` (секунды).
5. **`browser_take_screenshot`** → сохрани в репозиторий, например  
   `filename: ".cursor/stitch-browser-qa/artifacts/stitch-reference-{stitch_screen_id}.png"`  
   При очень длинном макете — `fullPage: true`, если схема инструмента позволяет.
6. Вернись к работе с приложением: **`browser_tabs`** → `select` на вкладку с `localhost` или снова `browser_navigate` на `targetUrl`.

Если во вкладке вместо картинки **403 / Access denied** в snapshot — зафиксируй в отчёте; **последний fallback** (не MCP): `pnpm stitch:download-reference` или ручное сохранение PNG в `artifacts/`.

### 3) Браузер: приложение — viewport + live PNG

- **`browser_resize`**: **`width`** и **`height`** — **числа** (см. `mcps/cursor-ide-browser/tools/browser_resize.json`). Опционально **`viewId`** из `browser_tabs` `list`.
- После resize: **`browser_wait_for`** 1–2 с, затем **`browser_navigate`** на тот же **`targetUrl`** (reload для пересчёта breakpoints).
- Залогинься QA-учёткой при редиректе на `/login`.
- **`browser_take_screenshot`** → `artifacts/live-….png` (согласованное имя с референсом).

**Ограничение IDE:** встроенный браузер может не дать `innerWidth` &lt; `lg`; если мобильная ветка Tailwind не включается — опиши в отчёте *environment limitation*.

### 4) Пиксельное сравнение + **где именно** расходится дизайн

**Pixelmatch** — только вспомогательная метрика. **Обязательно** добавь в отчёт **смысловой разбор по зонам экрана**, чтобы было понятно *что* и *где* не совпало с макетом, а не одна цифра %.

1. Файлы: `artifacts/stitch-reference-….png` и `live-….png`; при возможности `diff.png` из pixelmatch.
2. Запусти дифф: `npx --yes pixelmatch … 0.1` — в отчёт: %, порог, пути к артефактам.
3. **Зональный обзор (обязательно, даже если % низкий):** пройди **Stitch** (референс) и **live** (скрин + `browser_snapshot`) и заполни таблицу в отчёте по областям, например:
   - шапка / навигация / логотип  
   - сайдбар / drawer (если есть)  
   - hero / заголовок экрана  
   - основной контент (карточки, списки, сетка)  
   - композер / форма / CTA  
   - футер / вторичные ссылки  
   - отступы и ритм между блоками  
   - типографика (размер/вес заголовков и body)  
   - цвета (фон, primary-кнопки, бордеры, текст)  
   - иконки / бейджи / чипы  
   Для **каждой затронутой зоны**: что ожидалось по макету vs что видно в live; **Major / Minor / OK**. Если есть `diff.png`, укажи **примерную область** (верх/центр/низ, лево/право) где лежит «пятно» отличий.
4. Если референса нет — всё равно **зональное** сравнение по snapshot + памяти макета из `get_screen` / HTML Stitch.

**Запрещено** заканчивать визуал только строкой «pixelmatch X%» без таблицы/списка **конкретных мест** на экране.

**Запрещено** «PASS conceptual» без задокументированной цепочки попыток и без зонального блока (хотя бы «все проверенные зоны OK» с перечислением зон).

### 5) Структура (Stitch HTML)

- Кратко: порядок блоков, ключевые заголовки, CTA — совпадают ли с live (accessibility tree / snapshot).

### 6) Симуляция пользователя (exploratory) — **обязательно**

На **открытом целевом UI** (страница целиком или **модалка/sheet** поверх роута) после статичного сравнения:

- Пройтись по **видимым** интерактивам внутри этого UI: кнопки модалки (Submit/Cancel), поля, ссылки в хедере страницы, табы/чипы если есть.
- Формы: пустой submit, невалидный ввод, затем валидный сценарий если уместно.
- Состояния: disabled кнопки (например Send при пустом поле), hover где даёт эффект.
- Не устраивать бесконечный тур по всему сайту: ушёл по ссылке на **другую** страницу — зафиксировать URL и **вернуться** на `targetUrl` для консистентности отчёта, либо отметить отдельным пунктом «навигация работает / сломана».

Фиксировать **каждый** сценарий: ожидание → что произошло → PASS/FAIL + при необходимости скрин.

### 7) Итоговый отчёт → **файл** `.cursor/stitch-browser-qa/reports/QA-….md`

Запиши **весь** блок ниже в markdown-файл с **говорящим именем** (см. выше). В чат не вставляй полный текст.

```markdown
# QA Report — [название страницы / Stitch title]

**Дата:** …  
**Окружение:** [URL, вьюпорт WxH, браузер MCP]  
**Stitch:** project …, screen …, «title»  
**Режим:** single | strict pixels

## 0. Маппинг Stitch → приложение

- **`ui_kind`:** full_page | modal | sheet | …  
- **`primary_url`:** …  
- **`open_steps`:** (как открыли целевой UI)  
- **`codebase_hits`:** пути к файлам, где нашли реализацию  

## Краткий вердикт

[PASS / FAIL / PARTIAL] — одно предложение.

## 1. Визуал vs Stitch — pixelmatch (вспомогательно)

| Метрика | Значение |
|---------|----------|
| Порог pixelmatch | … |
| Доля отличающихся пикселей | … % |
| Артефакты | пути к reference, live, diff |
| Вердикт по порогу | PASS / FAIL |

_Если дифф не запускался — причина._

## 1a. Где именно расходится дизайн (обязательно)

Таблица **по зонам UI** — не ограничивайся %. Для каждой строки: что в **макете Stitch** vs что в **live**; при отличии — **Major** / **Minor**; при совпадении — **OK**.

| Зона на экране | Ожидание (Stitch) | Факт (live) | Оценка |
|----------------|-------------------|-------------|--------|
| Напр. шапка / sidebar | … | … | OK / Minor / Major |
| … | … | … | … |

Кратко: если есть `diff.png` — **где** на кадре сконцентрированы отличия (верх/низ, левая колонка, …). Если зон много и все OK — явно перечисли проверенные зоны одной фразой.

## 2. Тема и токены

[primary/secondary/фон/шрифты vs get_project — коротко]

## 3. Структура и контент

[блоки, заголовки, CTA vs Stitch HTML]

## 4. Exploratory (симуляция пользователя)

| # | Действие | Ожидание | Факт | Статус |
|---|----------|----------|------|--------|
| 1 | … | … | … | PASS/FAIL |

## 5. Найденные проблемы

| # | Severity | Описание | Воспроизведение |
|---|----------|----------|-----------------|
| … | Critical/Major/Minor | … | … |

## 6. Что проверено (чеклист)

- [ ] Pixelmatch (или задокументированный skip)
- [ ] **Зональное описание дизайна** (§ 1a — конкретные места, не только %)
- [ ] Тема / типографика
- [ ] Структура / копирайт ключевых зон
- [ ] Клики по основным контролам и ссылкам
- [ ] Формы / валидация / edge cases на странице

## 7. Прогресс покрытия (coverage.json)

Таблица **всех** Stitch-экранов: title | ui_kind | primary_url | status | last verdict | сколько **pending** осталось.
```

После отчёта: обновить **`coverage.json`** (v2, `app_mapping`) и **`coverage-status.md`**; `state.json` / `run.log.md` — кратко.

### Batching

По запросу **продолжай / batch / быстрее** — несколько **pending** экранов за один ответ (в разумных лимитах). Один экран без запроса — один полный прогон за вызов команды.

---

## State protocol

- **State:** `.cursor/stitch-browser-qa/state.json`
- **Log:** `.cursor/stitch-browser-qa/run.log.md`
- **Artifacts:** `.cursor/stitch-browser-qa/artifacts/`
- **Reports:** `.cursor/stitch-browser-qa/reports/*.md` — полные QA-отчёты (см. правило `stitch-qa-reports.mdc`)

**Шаблон (single, strict по умолчанию):**

```json
{
  "schema_version": 3,
  "run_status": "in_progress",
  "run_mode": "single",
  "base_url": "http://localhost:3000",
  "pixel_mode": "strict",
  "targetUrl": "",
  "stitch": {
    "projectId": "7923897073544346409",
    "screenId": "",
    "name": ""
  },
  "stitch_screen_queue": [],
  "queue_index": 0,
  "viewport": { "width": null, "height": null, "notes": "" },
  "phases": {},
  "next_step": null
}
```

Для `single` фазы можно не дробить микроскопически; главное — **отчёт** и **артефакты** диффа.

## MCP

- **user-stitch** — схемы в `mcps/user-stitch/tools/`
- **cursor-ide-browser** — lock, snapshot, screenshot, interactions

## Related

- **`.cursor/rules/stitch-qa-reports.mdc`** — отчёты только в `reports/`, не в чат
- **manual-qa** — доп. паттерны таблиц и severity
