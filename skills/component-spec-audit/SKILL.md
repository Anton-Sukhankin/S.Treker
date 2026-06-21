---
name: component-spec-audit
description: Use when Codex needs to audit, create, or rewrite S-Tracker component documentation for AI-ready interface generation. Applies to docs/components component specs, especially 01-structure.md, 02-behavior.md, and 03-data-states-rules.md; use for removing abstract wording, checking component boundaries, spatial contracts, state rules, and cross-component contracts against docs/documentation-standards.md.
---

# Component Spec Audit

## Role

Use this skill as a working procedure for auditing or rewriting S-Tracker component specifications.

Do not treat this skill as a second standard. `docs/documentation-standards.md` defines the required result. This skill defines the working steps for applying that standard.

## Source Hierarchy

Apply sources in this order:

1. User request: current scope and desired action.
2. Current prototype: factual behavior and visible interface.
3. `AGENTS.md`: project constraints.
4. `docs/documentation-standards.md`: documentation quality standard.
5. Component files: material to audit or rewrite.

If this skill conflicts with `docs/documentation-standards.md`, follow `docs/documentation-standards.md`.

## Scope Control

Before editing, define the scope:

- target component folder;
- target files: `01-structure.md`, `02-behavior.md`, `03-data-states-rules.md`, or a child component set;
- whether the task is structure, behavior, states, cross-component contract, or full audit;
- whether code verification is required.

Do not read or rewrite all `docs/components` unless the user requests a full documentation audit.

## Base Workflow

1. Read the relevant sections of `docs/documentation-standards.md`.
2. Read the target component files in order: `01`, `02`, `03`.
3. Check the component against the current prototype when factual behavior is uncertain.
4. Identify abstract wording, unclear boundaries, missing states, duplicated logic, and weak contracts.
5. Rewrite the target files directly when the requested task allows edits.
6. Preserve factual behavior. Do not add future functionality.
7. Report changed files and the main corrections.

## Abstract Wording Audit

Replace abstract wording with a verifiable interface rule.

Do not rely only on a fixed banned-word list. Test every statement by asking:

| Check | Required answer |
|---|---|
| Element | Which exact visible element, zone, state, value, or neighboring area is described? |
| Condition | Under what user action, mode, state, role, value, or empty condition does it happen? |
| Change | What exact visibility, value, text, count, selected state, availability, composition, or result changes? |
| Result | What concrete state or value exists after the condition is met? |

Risk words such as `управляет`, `влияет`, `связано`, `обновляется`, `появляется`, `позволяет`, `отвечает за`, `обеспечивает` are indicators only. A sentence without these words can still be too abstract.

Rewrite by type:

| Statement type | Required replacement |
|---|---|
| Location | Spatial contract. |
| User action | User action, initial condition, exact UI result. |
| State | Entry condition, visible state, exit or reset condition. |
| Component relation | Source component, transmitted result, receiving component, visible result. |
| Data | Interface-level source, usage location, visible value or selection rule. |
| Limitation | What the component does not create, open, change, reset, or own. |

## Spatial Contract Audit

For important placement rules, describe location without CSS properties.

Require:

- visible area where the element is located;
- anchor area or neighboring area;
- visibility condition;
- interface layer: inline, fixed, drawer, modal, overlay, sticky, or floating;
- effect on neighboring areas: shifts, does not shift, covers, does not cover;
- trigger action when the element is not always visible;
- state owner.

Do not add `margin`, `padding`, `top`, `bottom`, `left`, `right`, `z-index`, class names, selectors, or technical layout values unless the value is a product rule.

## File Checks

### `01-structure.md`

Check:

- component location and visible structure;
- entry points;
- component boundary;
- internal zones;
- child components;
- neighboring components;
- role-dependent and dynamic lists;
- spatial contracts for floating, modal, drawer, sticky, and overlay areas.

Do not let `01` describe full user behavior or state rules.

### `02-behavior.md`

Check:

- one main user path at the start;
- actions are in user order;
- every action has a condition and concrete UI result;
- secondary mechanics do not duplicate full state contracts;
- external results are mentioned briefly when needed for the user path.

Do not let `02` become a full contract map. Put full cross-component contracts in `03`.

### `03-data-states-rules.md`

Check:

- component states and their entry conditions;
- active, empty, selected, applied, draft, saved, disabled, and visible states when relevant;
- counters and visibility rules;
- filtering, selection, grouping, pagination, or column rules when relevant;
- incoming links from neighboring components;
- outgoing links to neighboring components;
- owner of dynamic state;
- no repeated structure from `01`;
- no repeated click-by-click scenario from `02`.

Use contract tables for cross-component links.

## Cross-Component Integration

For integration tasks, do not load full `01/02/03` sets for every related component by default.

Use `03-data-states-rules.md` from the source and receiver components first.

Add:

- source `01-structure.md` only when the trigger location is unclear;
- receiver `01-structure.md` only when result placement is unclear;
- source `02-behavior.md` only when the integration depends on an exact user action.

Formula: build a component with `01/02/03`; connect components with the contract parts of `03`.

## Editing Rules

When editing documentation:

- preserve all factual behavior from the prototype;
- remove repetition before shortening important rules;
- keep text concrete even if the file becomes slightly longer;
- use tables when they improve precision;
- keep component specs free of source-code paths, DOM selectors, function names, and implementation identifiers;
- keep backend and API design out of component specs;
- do not describe standard styling of a corporate component library unless it changes product behavior or state distinction.

## Subagent Use

When delegating to a subagent, pass this skill and a narrow scope.

The subagent task must include:

- exact component folder;
- exact files to audit;
- applicable `docs/documentation-standards.md` sections or a short instruction to apply the standard;
- instruction to preserve current prototype behavior;
- instruction not to add new functionality;
- required output: changed files, issues fixed, unresolved questions.

The primary agent must review the subagent result before final response.

## Output

After an audit or rewrite, report:

- files changed;
- abstraction and boundary issues corrected;
- state or contract issues corrected;
- anything intentionally left unchanged;
- whether code/build verification was skipped because only Markdown changed.
