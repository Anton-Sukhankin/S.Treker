const cloneValues = values => Object.fromEntries(
  Object.entries(values).map(([stepId, stepValues]) => [stepId, { ...stepValues }]),
);

const normalizeValues = values => Object.fromEntries(
  Object.entries(values).map(([stepId, stepValues]) => [
    stepId,
    Object.fromEntries(Object.entries(stepValues).map(([name, value]) => [
      name,
      typeof value === 'string' ? value.trim() : value,
    ])),
  ]),
);

const errorMessages = Object.freeze({
  contractSubject: 'Укажите предмет договора.',
  constructionObject: 'Выберите объект строительства.',
  counterparty: 'Выберите контрагента.',
  contractType: 'Выберите тип договора.',
  amount: 'Укажите сумму.',
  currency: 'Выберите валюту.',
  cfo: 'Выберите ЦФО.',
  turnoverArticle: 'Выберите статью оборотов.',
  budgetUnit: 'Выберите бюджетную единицу.',
  vatRate: 'Выберите ставку НДС.',
  paymentScheme: 'Выберите схему оплаты.',
  advancePercent: 'Укажите размер аванса.',
  paymentBasis: 'Выберите основание платежа.',
  serviceFrequency: 'Выберите периодичность.',
  endDate: 'Укажите плановую дату завершения.',
  resultFormat: 'Выберите формат результата.',
});

function validateStep(stepId, values) {
  const errors = {};
  const requireValue = name => {
    if (!String(values[name] ?? '').trim()) errors[name] = errorMessages[name];
  };

  if (stepId === 'need') {
    requireValue('contractSubject');
    requireValue('constructionObject');
  } else if (stepId === 'counterparty') {
    if (values.isKnown) requireValue('counterparty');
    requireValue('contractType');
  } else if (stepId === 'budget') {
    requireValue('amount');
    requireValue('currency');
    requireValue('cfo');
    requireValue('turnoverArticle');
    requireValue('budgetUnit');
    if (values.includesVat) requireValue('vatRate');
  } else if (stepId === 'payment') {
    requireValue('paymentScheme');
    if (['advance', 'combined'].includes(String(values.paymentScheme))) requireValue('advancePercent');
    requireValue('paymentBasis');
  } else if (stepId === 'schedule') {
    requireValue('serviceFrequency');
    requireValue('endDate');
    requireValue('resultFormat');
  }

  return errors;
}

export function createLegoDocumentState({ form, summaryEnabled = true } = {}) {
  if (!form?.steps?.length || !form?.initialValues) throw new Error('Lego form configuration is required.');

  let savedValues = cloneValues(form.initialValues);
  let draftValues = cloneValues(form.initialValues);
  let activeStep = 0;
  let completedSteps = [];
  let view = 'form';
  let taskCompleted = false;
  let errors = {};

  const stepIdAt = index => form.steps[index]?.id;
  const getStepErrors = index => validateStep(stepIdAt(index), draftValues[stepIdAt(index)] ?? {});
  const highestUnlockedStep = () => Math.min(
    form.steps.length - 1,
    completedSteps.reduce((highest, step) => (step === highest ? highest + 1 : highest), 0),
  );

  const snapshot = () => ({
    values: cloneValues(draftValues),
    activeStep,
    completedSteps: [...completedSteps],
    highestUnlockedStep: highestUnlockedStep(),
    activeStepComplete: Object.keys(getStepErrors(activeStep)).length === 0,
    errors: { ...errors },
    view,
    taskCompleted,
  });

  return {
    getSnapshot: snapshot,
    setDraftValue(stepId, name, value) {
      const stepIndex = form.steps.findIndex(step => step.id === stepId);
      if (stepIndex < 0 || !(name in (draftValues[stepId] ?? {}))) return snapshot();
      draftValues = {
        ...draftValues,
        [stepId]: { ...draftValues[stepId], [name]: value },
      };
      completedSteps = completedSteps.filter(index => index < stepIndex);
      taskCompleted = false;
      view = 'form';
      if (errors[name]) {
        const nextErrors = { ...errors };
        delete nextErrors[name];
        errors = nextErrors;
      }
      return snapshot();
    },
    selectStep(index) {
      if (index <= highestUnlockedStep() || completedSteps.includes(index)) {
        activeStep = index;
        errors = {};
        view = 'form';
      }
      return snapshot();
    },
    hasUnsavedChanges() {
      return JSON.stringify(normalizeValues(draftValues)) !== JSON.stringify(normalizeValues(savedValues));
    },
    saveDraft() {
      savedValues = normalizeValues(draftValues);
      draftValues = cloneValues(savedValues);
      return snapshot();
    },
    confirmActiveStep() {
      errors = getStepErrors(activeStep);
      if (Object.keys(errors).length) return { ok: false, snapshot: snapshot() };

      savedValues = normalizeValues(draftValues);
      draftValues = cloneValues(savedValues);
      if (!completedSteps.includes(activeStep)) {
        completedSteps = [...completedSteps, activeStep].sort((a, b) => a - b);
      }
      const confirmedStep = activeStep;
      if (activeStep < form.steps.length - 1) activeStep += 1;
      else if (summaryEnabled) view = 'summary';
      else taskCompleted = true;
      errors = {};
      return { ok: true, confirmedStep, snapshot: snapshot() };
    },
    returnToEdit() {
      view = 'form';
      activeStep = form.steps.length - 1;
      errors = {};
      return snapshot();
    },
    discardDraft() {
      draftValues = cloneValues(savedValues);
      errors = {};
      return snapshot();
    },
  };
}
