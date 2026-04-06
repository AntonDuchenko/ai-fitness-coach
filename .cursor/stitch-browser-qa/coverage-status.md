# QA coverage — статус экранов Stitch

Источник: [`coverage.json`](./coverage.json). **Сброс 2026-04-05:** все строки в `pending`.

| # | Stitch title | screenId | Status | Last run | Verdict |
|---|--------------|----------|--------|----------|---------|
| 0 | AI Coach Chat | `b62f1e67…` | done | — | — |
| 1 | AI Coach Chat Mobile | `c0b7613b…` | done | — | — |
| 2 | AI Coach Empty State | `4654aa4b…` | done | — | — |
| 3 | AI Coach Empty State Mobile | `6373f333…` | done | — | — |
| 4 | AI Coach Widget | `93bdd1db…` | done | — | — |
| 5 | AI Coach Widget Mobile | `808189c5…` | done | — | — |
| 6 | AI Pocket Trainer Dashboard V3 | `b03134ef…` | pending | — | — |
| 7 | AI Pocket Trainer Mobile Dashboard | `269656ea…` | pending | — | — |
| 8 | Daily Limit Reached | `7807d258…` | pending | — | — |
| 9 | Daily Limit Reached Mobile | `4612d1d8…` | pending | — | — |
| 10 | Daily Macros Widget | `6d62253c…` | pending | — | — |
| 11 | Daily Macros Widget Mobile | `bb72eae2…` | pending | — | — |
| 12 | ForgeFit Landing Page (Human-Centered) | `08c7a415…` | pending | — | — |
| 13 | ForgeFit Landing Page (Human-Centered) | `e5d77f1e…` | pending | — | — |
| 14 | ForgeFit Login Screen | `cf45fef0…` | pending | — | — |
| 15 | ForgeFit Mobile (Synced Backgrounds) | `cbb12ec0…` | pending | — | — |
| 16 | ForgeFit Mobile Login | `d845cb7b…` | pending | — | — |
| 17 | ForgeFit Mobile Navigation Menu | `79e04b9b…` | pending | — | — |
| 18 | ForgeFit Mobile Sign Up | `d86f2062…` | pending | — | — |
| 19 | ForgeFit Sign Up Screen | `cba5e3c3…` | pending | — | — |
| 20 | Grocery List Mobile | `03879779…` | pending | — | — |
| 21 | Grocery List View | `aa41fc45…` | pending | — | — |
| 22 | Heatmap of ForgeFit Landing Page (Human-Centered) | `f38f653d…` | pending | — | — |
| 23 | Log Weight Dialog | `31b6c38c…` | pending | — | — |
| 24 | Log Weight Mobile | `6eb04edf…` | pending | — | — |
| 25 | Nutrition Plan Mobile | `3b41b7a3…` | pending | — | — |
| 26 | Nutrition Plan View | `e7429b99…` | pending | — | — |
| 27 | Onboarding - Basic Info | `53324387…` | pending | — | — |
| 28 | Onboarding - Basic Info Desktop | `52e99a7e…` | pending | — | — |
| 29 | Onboarding - Equipment | `5ede21b3…` | pending | — | — |
| 30 | Onboarding - Equipment Desktop | `218bf813…` | pending | — | — |
| 31 | Onboarding - Experience | `27c4ddbf…` | pending | — | — |
| 32 | Onboarding - Experience Desktop | `ec01c880…` | pending | — | — |
| 33 | Onboarding - Goals | `4ead4bbf…` | pending | — | — |
| 34 | Onboarding - Goals Desktop | `9a202442…` | pending | — | — |
| 35 | Onboarding - Health | `11de8976…` | pending | — | — |
| 36 | Onboarding - Health Desktop | `c7e375dd…` | pending | — | — |
| 37 | Onboarding - Loading | `2c608920…` | pending | — | — |
| 38 | Onboarding - Loading Desktop | `728e2f4f…` | pending | — | — |
| 39 | Onboarding - Motivation | `ebbe248b…` | pending | — | — |
| 40 | Onboarding - Motivation Desktop | `bc8a2640…` | pending | — | — |
| 41 | Onboarding - Nutrition | `c880b8a9…` | pending | — | — |
| 42 | Onboarding - Nutrition Desktop | `c1bcecee…` | pending | — | — |
| 43 | Onboarding - Schedule | `c700e198…` | pending | — | — |
| 44 | Onboarding - Schedule Desktop | `6f8f424f…` | pending | — | — |
| 45 | Profile & Settings | `eae9070c…` | pending | — | — |
| 46 | Profile & Settings Mobile | `25de3485…` | pending | — | — |
| 47 | Progress Dashboard Mobile | `388db909…` | pending | — | — |
| 48 | Progress Dashboard Widgets | `8c6b54de…` | pending | — | — |
| 49 | Progress Overview | `710e4adf…` | pending | — | — |
| 50 | Progress Overview Mobile | `d8a320f2…` | pending | — | — |
| 51 | Recipe Detail Dialog | `29331631…` | pending | — | — |
| 52 | Recipe Detail Mobile | `d434b676…` | pending | — | — |
| 53 | Recipes Mobile | `ab73df4f…` | pending | — | — |
| 54 | Recipes View | `70bd26e5…` | pending | — | — |
| 55 | Regenerate Plan Modal | `2441e3e1…` | pending | — | — |
| 56 | Swap Meal Flow | `79c99942…` | pending | — | — |
| 57 | Swap Meal Mobile | `d80139bf…` | pending | — | — |
| 58 | Today's Workout Widget | `73622723…` | pending | — | — |
| 59 | Today's Workout Widget Mobile | `f29bc8d5…` | pending | — | — |
| 60 | Workout Logging Mobile View | `6d3558d2…` | pending | — | — |
| 61 | Workout Logging Session | `57295545…` | pending | — | — |
| 62 | Workout Plan Mobile View | `33cc41b9…` | pending | — | — |
| 63 | Workout Plan View | `a88f1785…` | pending | — | — |

Следующий прогон команды stitch-qa: **order 0** — «AI Coach Chat».

**Агенту:** референс Stitch — **Browser MCP**: новая вкладка → navigate `screenshot.downloadUrl` → `browser_take_screenshot` в `artifacts/`. Потом live + `browser_resize` (числа) + wait + reload.
