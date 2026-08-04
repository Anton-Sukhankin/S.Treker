# Lego-форма карточки задачи: данные, состояния и правила

Snapshot содержит `values`, `activeStep`, `completedSteps`, `highestUnlockedStep`, `activeStepComplete`, `taskCompleted`. Значения объекта строительства ограничены `north-terminal`, `industrial-park`, `office-complex`; валюта текущего mock-набора — `rub`.

Для этапа `Потребность` primary-действие активно при непустом предмете договора и выбранном объекте. Для этапа `Стоимость и бюджет` обязательны сумма и валюта, а при включённом НДС также ставка. Source-limited этапы доступны для демонстрационного подтверждения без вымышленных полей.

`saveDraft()` не меняет `completedSteps`; `confirmActiveStep()` фиксирует значения и открывает следующий этап; `discardDraft()` возвращает сохранённые значения; `selectStep(index)` принимает только завершённый или первый доступный этап.
