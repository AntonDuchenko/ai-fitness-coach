# QA Report — AI Coach Widget (Stitch) — dashboard

**Дата:** 2026-04-06  
**Окружение:** `http://localhost:3000/dashboard`, viewport **1106×906**, Chromium (Playwright для live PNG; Browser MCP — референс Stitch)  
**Stitch:** project `7923897073544346409`, screen `93bdd1dbee6c4316a6e9b920a5f80e0a`, title «AI Coach Widget»  
**Режим:** single — strict pixels (вспомогательно) + зональный разбор

## 0. Маппинг Stitch → приложение

- **`ui_kind`:** `embedded` — карточка **AI Coach** на дашборде (не отдельный роут).
- **`primary_url`:** `http://localhost:3000/dashboard`
- **`open_steps`:** Войти QA-аккаунтом при редиректе на `/login` → открыть `/dashboard` → карточка AI Coach в нижней сетке (рядом с Consistency Hub / Weekly Progress в зависимости от брейкпоинта; на desktop — вторая колонка ряда).
- **`codebase_hits`:**
  - `apps/web/src/features/dashboard/components/AiCoachCard.tsx`
  - `apps/web/src/features/dashboard/components/DashboardContent.tsx`

**Примечание:** экспорт Stitch `get_screen` задаёт большие `width`/`height` для артборда; фактический PNG референса из браузера по `screenshot.downloadUrl` — **1106×906**. Макет в референсе показывает **целый дашборд** (сайдбар + сетка виджетов), а не изолированную обрезку только карточки; сравнение pixelmatch ниже — **по полному кадру viewport**, с акцентом на зону карточки AI Coach в §1a.

## Краткий вердикт

**PARTIAL** — карточка AI Coach в приложении повторяет замысел виджета (иконка, заголовок, статус, превью сообщения, чипы, CTA, учёт лимита), но общий дашборд live заметно отличается от Stitch-мока (другой набор соседних виджетов, копирайт хедера, данные пользователя); pixelmatch по полному кадру ~14.4%.

## 1. Визуал vs Stitch — pixelmatch (вспомогательно)

| Метрика | Значение |
|---------|----------|
| Порог pixelmatch | 0.1 |
| Доля отличающихся пикселей | **14.38%** |
| Артефакты | `.cursor/stitch-browser-qa/artifacts/stitch-reference-93bdd1dbee6c4316a6e9b920a5f80e0a.png`, `live-dashboard-93bdd1dbee6c4316a6e9b920a5f80e0a.png`, `diff-93bdd1dbee6c4316a6e9b920a5f80e0a.png` |
| Вердикт по порогу | **PARTIAL** — ожидаемо при разном контенте дашборда и динамических данных; не считать «провалом» только из-за % без §1a |

**Технические заметки:**

- Референс: Browser MCP — новая вкладка → `browser_navigate` на `screenshot.downloadUrl` → скриншот сохранён относительным путём в артефакты (копия из temp в репозиторий).
- Live: **`browser_take_screenshot` (Browser MCP) дважды завершился таймаутом**; live-кадр получен **Playwright** с тем же viewport **1106×906** после логина QA.

## 1a. Где именно расходится дизайн (обязательно)

| Зона на экране | Ожидание (Stitch) | Факт (live) | Оценка |
|----------------|-------------------|-------------|--------|
| Левый сайдбар | ForgeFit, подзаголовок «The Longevity Mentor», пункты навигации, CTA «Start New Session» | ForgeFit, «AI Fitness Coach», набор ссылок Dashboard / Workouts / Nutrition / Progress / AI Coach; без кнопки Start New Session как в моке чата | **Major** (IA похожа, копирайт и состав отличаются) |
| Верхняя шапка контента | «Welcome back, Alex», подзаголовок про AI Mentor и вчерашнюю активность | «Good morning / afternoon / evening», имя пользователя, «Today is {date}» | **Major** |
| Карточка **AI Coach** (фокус) | Иконка/бот, «AI Coach», ACTIVE, бейдж FREE TIER, цитата про дедлифты, три чипа, «Open Coach Chat →», полоса 3/5 | `AiCoachCard`: Bot, «AI Coach», «Active», превью последнего **реального** ответа AI (может быть длинным), те же три текстовых чипа (ссылки на `/chat`), «Open Coach Chat», для не‑Premium — счётчик сообщений | **Minor** (паттерн совпадает; текст и бейджи отличаются) |
| Правая колонка / соседние виджеты | Energy Output, Rest Duration, блок Strength Progress, снизу Coach Intelligence Log | Live: блоки дашборда приложения (тренировка сегодня, вес, макросы, Consistency Hub и т.д.) — **другая композиция** | **Major** |
| Отступы и сетка | Плотная сетка мока V3 | Фактическая сетка `DashboardContent` (`max-w-7xl`, `gap-6`) | **Minor–Major** в зависимости от колонки |
| Типографика / цвет | Space Grotesk / Inter, тёмная тема, синий/зелёный акцент | Соответствует design tokens приложения (близко к теме проекта) | **OK** / **Minor** |

**Концентрация diff (по смыслу):** пятна отличий покрывают **весь кадр**: сильнее всего — **шапка**, **соседние карточки** и **нижняя часть** (в Stitch — intelligence log; в live — quick actions и др.). Зона **карточки AI Coach** даёт меньшую долю от общего diff, но не совпадает пиксель-в-пиксель из‑за контента.

## 2. Тема и токены

`get_project`: тёмный режим, **Space Grotesk** (headline), **Inter** (body), primary **#2563EB**, кастомные named colors в духе M3. В live используются те же принципы (tailwind + CSS variables); точное совпадение каждого токена с моком не проверялось пиксельным сэмплером — визуально палитра согласована.

## 3. Структура и контент

- Stitch HTML (экран): полноэкранный дашборд с акцентом на колонку AI Coach и лог «Coach Intelligence».
- Live: `DashboardContent` рендерит **другой набор секций** (тренировка, вес, питание, прогресс, затем `AiCoachCard`). Смысловой фокус «виджет коуча на дашборде» сохранён; **1:1 по блокам с макетом нет**.

## 4. Exploratory (симуляция пользователя)

| # | Действие | Ожидание | Факт | Статус |
|---|----------|----------|------|--------|
| 1 | Клик **Open Coach Chat** на карточке | Переход на `/chat` | URL `http://localhost:3000/chat` | PASS |
| 2 | Клик чипа **What should I eat today?** | Переход на `/chat` | URL `http://localhost:3000/chat` | PASS |

## 5. Найденные проблемы

| # | Severity | Описание | Воспроизведение |
|---|----------|----------|-----------------|
| 1 | Minor | Таймаут **Browser MCP** при сохранении live-скриншота дашборда | `browser_take_screenshot` на `/dashboard` (обошли Playwright) |
| 2 | Info | Референс Stitch по сути — **целый дашборд**, не только изолированный виджет | Сверка с title «AI Coach Widget» — интерпретировать зонально (§1a) |

## 6. Что проверено (чеклист)

- [x] Pixelmatch (live через Playwright из‑за таймаута MCP)
- [x] **Зональное описание дизайна** (§1a)
- [x] Тема / типографика (high-level)
- [x] Структура / копирайт ключевых зон
- [x] Клики по основным контролам карточки (CTA + чип)

## 7. Прогресс покрытия (`coverage.json`)

После этого прогона: **5 done / 64 total, 59 pending** (следующий по очереди — **order 5**, «AI Coach Widget Mobile»).

Полная таблица: `.cursor/stitch-browser-qa/coverage-status.md`.
