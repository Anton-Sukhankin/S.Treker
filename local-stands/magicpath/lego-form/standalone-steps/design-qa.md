# Design QA — Lego Document Form Summary

## Artifacts

- Source visual truth: `C:\Users\armad\.codex\generated_images\019fc237-e41c-78e2-9064-955f5c130675\exec-7ac26ea3-8246-4019-bf32-0dc0fe00a286.png`
- Browser-rendered implementation: `C:\Users\armad\OneDrive\Документы\Проект в разработке\S-Tracker\local-stands\magicpath\lego-form\standalone-steps\qa-summary-1440x900.png`
- Full-view comparison: `C:\Users\armad\OneDrive\Документы\Проект в разработке\S-Tracker\local-stands\magicpath\lego-form\standalone-steps\qa-summary-comparison.png`
- Focused header/right-rail comparison: `C:\Users\armad\OneDrive\Документы\Проект в разработке\S-Tracker\local-stands\magicpath\lego-form\standalone-steps\qa-summary-focus-header-rail.png`
- Focused summary-card comparison: `C:\Users\armad\OneDrive\Документы\Проект в разработке\S-Tracker\local-stands\magicpath\lego-form\standalone-steps\qa-summary-focus-cards.png`
- MagicPath component: `434634985115381760`
- Verified revision: `434655084496982016`

## Normalization and state

- Source pixels: 1487 × 1058.
- Implementation pixels: 1280 × 720.
- Browser CSS viewport: 1280 × 720; reported device pixel ratio: 1.25. The in-app browser screenshot API returned one output pixel per CSS pixel.
- The full comparison contains each artifact proportionally inside an equal 630 × 450 slot without stretching. Focused comparisons use corresponding header/right-rail and summary-card crops.
- State: all five form steps completed; the final `Завершить заполнение` action opened the summary; realistic sample values are shown.

## Full-view comparison evidence

- Both views use a fixed white header over a gray workspace and split the remaining viewport into a scrollable left summary and a persistent right action rail.
- The implementation intentionally uses taller, lower-density label/value cells than the concept so every parameter remains readable and follows the task-card `О задаче` pattern requested by the user.
- At 1280 × 720 the right rail, its explanatory copy, both actions, the generated illustration, and the ECM helper text remain fully visible.
- Scrolling the left region from 0 to 548 px kept `headerTop = 0`, `asideTop = 84.79`, and `asideBottom = 720.00`; only the left region moved. Its visible height is 635 px and scroll height is 1586 px.

## Focused comparison evidence

- Header and right rail: title/status hierarchy, right-aligned verification/download actions, guidance title, supporting copy, two ECM actions, and a real raster illustration are present and aligned to the selected direction.
- Summary cards: each step owns a separate white block; each parameter is a semantic label/value cell with visible row and column boundaries. Text remains readable without disabled form controls.

## Required fidelity surfaces

- Fonts and typography: system sans-serif hierarchy is consistent with the existing S-Tracker/MagicPath component; title, eyebrow, section title, label, and value weights remain distinct at the tested viewport.
- Spacing and layout rhythm: header height, two-column proportion, card spacing, cell padding, radii, and borders remain consistent. No persistent control is clipped.
- Colors and tokens: white surfaces, cool gray workspace, S-Tracker blue actions, teal completion state, and neutral borders match the selected visual direction.
- Image quality and asset fidelity: the right-side illustration is a dedicated high-resolution raster asset generated for the measured slot. It is not CSS art, an emoji, a placeholder, or an inline SVG, and it stays sharp at its rendered size.
- Copy and content: header data follows the reference; guidance explains the purpose of the page and both actions; all five step groups and their values are represented.

## Findings

- No actionable P0, P1, or P2 findings remain.
- P3: the implementation illustration is more restrained and has fewer document layers than the concept. This is acceptable because it preserves the complete action rail within the tighter 720 px visible height.

## Comparison history

### Pass 1

- [P2] The amount appeared as raw `1250000`, reducing scanability.
- [P2] A default `20%` VAT rate appeared even when `Сумма включает НДС` was `Нет`, which could misrepresent submitted data.
- Fixes: formatted the amount as `1 250 000 ₽`; suppressed the VAT rate to `—` when VAT is disabled.

### Pass 2

- Post-fix browser DOM confirmed `1 250 000 ₽` and `Ставка НДС —`.
- Re-captured the final implementation and rebuilt full-view and focused comparison images.
- Header/right-rail fixed-position measurements were unchanged after 548 px of left-column scrolling.
- No browser console warnings or errors were recorded.

## Primary interactions tested

- Completed all five form steps and opened the summary from the final action.
- Scrolled the left summary independently while checking header and right-rail coordinates.
- Triggered `Сохранить документ в ECM` and observed the success status.
- Used `Вернуться к редактированию`, returned to step 5, and reopened the summary.
- Confirmed the summary values and generated illustration are present in the rendered DOM.

final result: passed
