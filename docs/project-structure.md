# S-Tracker Project Structure

This prototype is organized as a Vite-powered vanilla HTML/CSS/JS application.

## Runtime Entry

- `index.html` keeps the static page markup and loads `/src/main.js`.
- `src/main.js` initializes application state and wires feature modules on `DOMContentLoaded`.

## Source Layers

- `src/data/` contains dictionaries, mock task data, and the shared users/authors directory.
- `src/data/task-statuses.js` contains the task status dictionary and tag color metadata.
- `src/domain/` contains reusable business rules and calculations.
- `src/features/` contains UI behavior grouped by product area.
- `src/ui/` contains small shared UI helpers and fragments.
- `src/styles/` contains CSS split by responsibility.
- `public/avatars/` contains optimized avatars used by the interface.
- `assets/avatar-originals/` contains large source avatar images that are kept for future replacement or re-export.

## Feature Modules

- `features/tasks/tasks-view.js` renders task tabs, cards, table rows, and task counts.
- `features/sidebar/sidebar.js` controls sidebar navigation, counters, generated groups, and custom groups.
- `features/filters/` controls filter drawer and multi-select behavior.
- `features/columns/columns-drawer.js` controls column visibility, presets, and attribute library changes.
- `features/task-selection/floating-action-bar.js` controls row selection and bulk action bar behavior.
- `features/pagination/pagination-controls.js` renders pagination controls.
- `features/grouping/grouping-controls.js` handles table-header grouping triggers.

## CSS Layers

- `styles/base/tokens.css` defines tokens and base page rules.
- `styles/layout/app-shell.css` defines app shell, header, sidebar, and main layout.
- `styles/components/core-ui.css` defines reusable UI component classes.
- `styles/patterns/drawers-filters-actions.css` defines larger UI patterns.
- `styles/features/task-workspace.css` defines task workspace-specific styles.
- `styles/overrides/user-zone.css` keeps late overrides isolated until they are normalized.

## Commands

- `npm.cmd run dev` starts the local Vite server.
- `npm.cmd run build -- --emptyOutDir` verifies the production bundle.

## Notes

- `node_modules/`, `dist/`, `.vite/`, and `.npm-cache/` are generated and ignored.
- The current implementation keeps the existing DOM structure and class names to preserve prototype behavior.
