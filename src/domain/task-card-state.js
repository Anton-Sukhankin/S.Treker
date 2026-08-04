const initialValues = Object.freeze({
  contractSubject: '',
  constructionObject: '',
  amount: '',
  vatIncluded: false,
  vatRate: '',
  currency: 'rub',
});

const normalize = values => ({
  ...values,
  contractSubject: values.contractSubject.trim(),
  amount: values.amount.trim(),
  vatRate: values.vatRate.trim(),
});

export function createTaskCardState(task) {
  let savedValues = { ...initialValues };
  let draftValues = { ...initialValues };
  let activeStep = 0;
  let completedSteps = [];
  let taskCompleted = false;

  const stepComplete = index => {
    const values = normalize(draftValues);
    if (index === 0) return Boolean(values.contractSubject && values.constructionObject);
    if (index === 2) return Boolean(values.amount && values.currency && (!values.vatIncluded || values.vatRate));
    return true;
  };

  const highestUnlockedStep = () => Math.min(
    task.form.steps.length - 1,
    completedSteps.reduce((highest, step) => (step === highest ? highest + 1 : highest), 0),
  );

  return {
    getSnapshot() {
      return {
        values: { ...draftValues },
        activeStep,
        completedSteps: [...completedSteps],
        highestUnlockedStep: highestUnlockedStep(),
        activeStepComplete: stepComplete(activeStep),
        taskCompleted,
      };
    },
    setDraftValue(name, value) {
      draftValues = { ...draftValues, [name]: value };
      completedSteps = completedSteps.filter(step => step < activeStep);
      taskCompleted = false;
    },
    selectStep(index) {
      if (index <= highestUnlockedStep() || completedSteps.includes(index)) activeStep = index;
      return this.getSnapshot();
    },
    hasUnsavedChanges() {
      return JSON.stringify(normalize(draftValues)) !== JSON.stringify(normalize(savedValues));
    },
    saveDraft() {
      savedValues = normalize(draftValues);
      draftValues = { ...savedValues };
      return this.getSnapshot();
    },
    confirmActiveStep() {
      if (!stepComplete(activeStep)) return { ok: false, snapshot: this.getSnapshot() };
      savedValues = normalize(draftValues);
      draftValues = { ...savedValues };
      if (!completedSteps.includes(activeStep)) completedSteps = [...completedSteps, activeStep].sort((a, b) => a - b);
      const confirmedStep = activeStep;
      if (activeStep < task.form.steps.length - 1) activeStep += 1;
      else taskCompleted = true;
      return { ok: true, confirmedStep, snapshot: this.getSnapshot() };
    },
    discardDraft() {
      draftValues = { ...savedValues };
      return this.getSnapshot();
    },
  };
}
