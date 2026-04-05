---
description: Stitch-first QA: sync list_screens to coverage.json, next pending = discover route/modal in apps/web, then strict pixels + report
---

# Stitch QA — один макет за запуск

Skill: **stitch-browser-qa**.

## Покрытие от Stitch (если не указан конкретный экран)

1. **`coverage.json`** (`schema_version` 2, `coverage_kind: stitch_screens`). Если **`items` пустой** — **`list_screens`** → заполни все экраны Stitch (сортировка по title), **`last_sync_from_stitch_at`**. При повторном sync **мержи** по `stitch_screen_id`, не сбрасывай `done` без причины.
2. Возьми **одну** строку: минимальный **`order`** среди **`pending`**.
3. **`get_screen`** для этого `stitch_screen_id`.
4. **Референс PNG (MCP):** новая вкладка **Browser MCP** → `browser_navigate` на **`screenshot.downloadUrl`** → `browser_wait_for` → `browser_take_screenshot` → `.cursor/stitch-browser-qa/artifacts/stitch-reference-{id}.png`. **Не** начинать с `curl` / `pnpm stitch:download-reference` (часто 403). Скрипт — только если вкладка с картинкой тоже 403.
5. **Discovery в `apps/web`:** по `stitch_title` заполни **`app_mapping`**. Fallback — route hints из skill.
6. Браузер (приложение): `primary_url` → **`open_steps`** → **`browser_resize`** числами → wait → reload → live screenshot → pixelmatch + **таблица расхождений по зонам** (шапка, контент, CTA, отступы, типографика, цвета — см. skill § 1a) → exploratory.
7. Полный **QA Report** → **файл** `reports/QA-….md` (**`stitch-qa-reports.mdc`**). В чат — путь + вердикт.
8. Строка **`coverage.json`** → **`done`** / …, обнови **`coverage-status.md`**.

## Явный экран

Пользователь дал title / screenId / URL — один прогон для этой пары; обнови соответствующую строку в `coverage.json` или добавь.

## Defaults

`http://localhost:3000`, Stitch `7923897073544346409`, QA login из `qa-local-credentials.mdc`.
