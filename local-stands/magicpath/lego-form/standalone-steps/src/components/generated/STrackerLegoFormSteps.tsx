import { useRef, useState, type ReactNode } from 'react';
type FieldValue = string | boolean;
type StepValues = Record<string, FieldValue>;
type FormValues = Record<string, StepValues>;
type StepDefinition = {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
};
const steps: StepDefinition[] = [{
  id: 'need',
  title: 'Потребность',
  shortTitle: 'Потребность',
  description: 'Опишите предмет закупки и выберите объект, для которого формируется потребность.'
}, {
  id: 'counterparty',
  title: 'Контрагент',
  shortTitle: 'Контрагент',
  description: 'Укажите предполагаемого поставщика и договорный контекст.'
}, {
  id: 'budget',
  title: 'Стоимость и бюджет',
  shortTitle: 'Стоимость и бюджет',
  description: 'Зафиксируйте сумму, валюту и источники финансирования.'
}, {
  id: 'payment',
  title: 'Условия оплаты',
  shortTitle: 'Условия оплаты',
  description: 'Определите схему расчётов и дополнительные условия платежа.'
}, {
  id: 'schedule',
  title: 'Сроки и формат',
  shortTitle: 'Сроки и формат',
  description: 'Укажите период исполнения и ожидаемый формат результата.'
}];
const initialValues: FormValues = {
  need: {
    contractSubject: '',
    constructionObject: '',
    needType: 'service',
    details: ''
  },
  counterparty: {
    isKnown: true,
    counterparty: '',
    contractType: '',
    contactPerson: '',
    requiresAccreditation: false
  },
  budget: {
    amount: '',
    includesVat: false,
    vatRate: '20',
    currency: 'RUB',
    cfo: '',
    turnoverArticle: '',
    budgetUnit: ''
  },
  payment: {
    paymentScheme: '',
    advancePercent: '',
    defermentDays: '',
    paymentBasis: '',
    specialTerms: ''
  },
  schedule: {
    serviceFrequency: 'one-time',
    startDate: '',
    endDate: '2026-09-30',
    resultFormat: '',
    deliveryAddress: '',
    attachmentName: ''
  }
};
const Icon = ({
  name,
  className = 'h-4 w-4'
}: {
  name: 'check' | 'chevron-right' | 'file' | 'upload';
  className?: string;
}) => {
  const paths: Record<typeof name, ReactNode> = {
    check: <path d="m5 12 4 4L19 6" />,
    'chevron-right': <path d="m9 18 6-6-6-6" />,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M8 13h8M8 17h5" /></>,
    upload: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m17 8-5-5-5 5M12 3v12" /></>
  };
  return <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>;
};
const Field = ({
  label,
  required,
  error,
  hint,
  children,
  full = false
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  full?: boolean;
}) => <div className={full ? 'grid content-start gap-1.5 md:col-span-2' : 'grid min-w-0 content-start gap-1.5'}>
    <label className="text-[13px] font-medium leading-5 text-[#26344a]">
      {label}{required && <span className="ml-1 text-[#d92d20]">*</span>}
    </label>
    {children}
    {error ? <p className="m-0 text-xs leading-4 text-[#d92d20]">{error}</p> : hint ? <p className="m-0 text-xs leading-4 text-[#7b8799]">{hint}</p> : null}
  </div>;
const inputClass = (hasError = false) => `h-10 w-full rounded-lg border bg-white px-3 text-sm text-[#162033] outline-none transition placeholder:text-[#98a2b3] hover:border-[#aeb9c8] focus:border-[#087df0] focus:ring-3 focus:ring-[#087df0]/12 ${hasError ? 'border-[#f04438]' : 'border-[#d7dee8]'}`;
const selectClass = (_value: FieldValue, hasError = false) => `${inputClass(hasError)} lego-select`;
const textareaClass = (hasError = false) => `min-h-24 w-full resize-y rounded-lg border bg-white px-3 py-2.5 text-sm leading-5 text-[#162033] outline-none transition placeholder:text-[#98a2b3] hover:border-[#aeb9c8] focus:border-[#087df0] focus:ring-3 focus:ring-[#087df0]/12 ${hasError ? 'border-[#f04438]' : 'border-[#d7dee8]'}`;
const Toggle = ({
  checked,
  onChange,
  label,
  description
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}) => <label className="flex cursor-pointer items-start gap-3">
    <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)} className={`relative mt-0.5 h-5 w-9 shrink-0 rounded-full transition focus:outline-none focus:ring-3 focus:ring-[#087df0]/20 ${checked ? 'bg-[#087df0]' : 'bg-[#cbd5e1]'}`}>
    
      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition ${checked ? 'left-[18px]' : 'left-0.5'}`} />
    </button>
    <span className="grid gap-0.5">
      <span className="text-[13px] font-medium text-[#26344a]">{label}</span>
      {description && <span className="text-xs leading-4 text-[#7b8799]">{description}</span>}
    </span>
  </label>;
type SummarySection = {
  id: keyof FormValues;
  title: string;
  fields: Array<{
    key: string;
    label: string;
  }>;
};
const summarySections: SummarySection[] = [{
  id: 'need',
  title: 'Шаг 1. Потребность',
  fields: [{
    key: 'contractSubject',
    label: 'Предмет договора'
  }, {
    key: 'constructionObject',
    label: 'Объект строительства'
  }, {
    key: 'needType',
    label: 'Вид потребности'
  }, {
    key: 'details',
    label: 'Дополнительное описание'
  }]
}, {
  id: 'counterparty',
  title: 'Шаг 2. Контрагент',
  fields: [{
    key: 'isKnown',
    label: 'Контрагент определён'
  }, {
    key: 'counterparty',
    label: 'Контрагент'
  }, {
    key: 'contractType',
    label: 'Тип договора'
  }, {
    key: 'contactPerson',
    label: 'Контактное лицо'
  }, {
    key: 'requiresAccreditation',
    label: 'Требуется аккредитация'
  }]
}, {
  id: 'budget',
  title: 'Шаг 3. Стоимость и бюджет',
  fields: [{
    key: 'amount',
    label: 'Сумма'
  }, {
    key: 'currency',
    label: 'Валюта'
  }, {
    key: 'includesVat',
    label: 'Сумма включает НДС'
  }, {
    key: 'vatRate',
    label: 'Ставка НДС'
  }, {
    key: 'cfo',
    label: 'ЦФО'
  }, {
    key: 'turnoverArticle',
    label: 'Статья оборотов'
  }, {
    key: 'budgetUnit',
    label: 'Бюджетная единица'
  }]
}, {
  id: 'payment',
  title: 'Шаг 4. Условия оплаты',
  fields: [{
    key: 'paymentScheme',
    label: 'Схема оплаты'
  }, {
    key: 'advancePercent',
    label: 'Размер аванса'
  }, {
    key: 'defermentDays',
    label: 'Отсрочка платежа'
  }, {
    key: 'paymentBasis',
    label: 'Основание платежа'
  }, {
    key: 'specialTerms',
    label: 'Особые условия'
  }]
}, {
  id: 'schedule',
  title: 'Шаг 5. Сроки и формат',
  fields: [{
    key: 'serviceFrequency',
    label: 'Периодичность'
  }, {
    key: 'startDate',
    label: 'Плановая дата начала'
  }, {
    key: 'endDate',
    label: 'Плановая дата завершения'
  }, {
    key: 'resultFormat',
    label: 'Формат результата'
  }, {
    key: 'deliveryAddress',
    label: 'Адрес или место исполнения'
  }, {
    key: 'attachmentName',
    label: 'Техническое задание'
  }]
}];
const summaryLabels: Record<string, string> = {
  'need.constructionObject.north-terminal': 'Северный терминал',
  'need.constructionObject.industrial-park': 'Индустриальный парк',
  'need.constructionObject.office-complex': 'Офисный комплекс',
  'need.needType.service': 'Услуга',
  'need.needType.goods': 'Товары',
  'need.needType.works': 'Работы',
  'counterparty.counterparty.vector': 'ООО «Вектор Снаб»',
  'counterparty.counterparty.proline': 'АО «ПроЛайн»',
  'counterparty.counterparty.stroyresurs': 'ООО «СтройРесурс»',
  'counterparty.contractType.supply': 'Поставка',
  'counterparty.contractType.service': 'Оказание услуг',
  'counterparty.contractType.work': 'Выполнение работ',
  'budget.currency.RUB': 'Российский рубль (RUB)',
  'budget.currency.USD': 'Доллар США (USD)',
  'budget.currency.EUR': 'Евро (EUR)',
  'budget.cfo.admin': 'Административно-хозяйственный блок',
  'budget.cfo.construction': 'Дирекция строительства',
  'budget.cfo.operations': 'Операционная деятельность',
  'budget.turnoverArticle.materials': 'Материалы и комплектующие',
  'budget.turnoverArticle.services': 'Услуги сторонних организаций',
  'budget.turnoverArticle.maintenance': 'Эксплуатационные расходы',
  'budget.budgetUnit.bu-101': 'БЮ-101 · Общехозяйственные расходы',
  'budget.budgetUnit.bu-204': 'БЮ-204 · Строительные проекты',
  'budget.budgetUnit.bu-310': 'БЮ-310 · Техническое обеспечение',
  'payment.paymentScheme.postpay': 'Оплата по факту',
  'payment.paymentScheme.advance': 'Предоплата',
  'payment.paymentScheme.combined': 'Аванс и окончательный расчёт',
  'payment.paymentScheme.stages': 'Оплата по этапам',
  'payment.paymentBasis.invoice': 'Счёт',
  'payment.paymentBasis.act': 'Акт выполненных работ',
  'payment.paymentBasis.waybill': 'Товарная накладная',
  'payment.paymentBasis.universal': 'УПД',
  'schedule.serviceFrequency.one-time': 'Разовая услуга',
  'schedule.serviceFrequency.monthly': 'Ежемесячно',
  'schedule.serviceFrequency.quarterly': 'Ежеквартально',
  'schedule.serviceFrequency.continuous': 'Непрерывное оказание',
  'schedule.resultFormat.document': 'Документ / отчёт',
  'schedule.resultFormat.delivery': 'Поставка на объект',
  'schedule.resultFormat.acceptance': 'Результат по акту приёмки',
  'schedule.resultFormat.digital': 'Электронный результат'
};
const formatSummaryValue = (sectionId: string, key: string, value: FieldValue, sectionValues: StepValues) => {
  if (typeof value === 'boolean') return value ? 'Да' : 'Нет';
  if (!String(value).trim()) return '—';
  if (sectionId === 'budget' && key === 'vatRate' && !sectionValues.includesVat) return '—';
  if (key === 'amount') {
    const amount = Number(String(value).replace(/\s/g, '').replace(',', '.'));
    if (!Number.isNaN(amount)) {
      const formatted = new Intl.NumberFormat('ru-RU', {
        maximumFractionDigits: 2
      }).format(amount);
      const symbols: Record<string, string> = {
        RUB: '₽',
        USD: '$',
        EUR: '€'
      };
      return `${formatted} ${symbols[String(sectionValues.currency)] ?? String(sectionValues.currency ?? '')}`.trim();
    }
  }
  if (key === 'vatRate') return `${value}%`;
  if (key === 'advancePercent') return `${value}%`;
  if (key === 'defermentDays') return `${value} дней`;
  if (key === 'startDate' || key === 'endDate') {
    const date = new Date(`${value}T00:00:00`);
    return Number.isNaN(date.getTime()) ? String(value) : new Intl.DateTimeFormat('ru-RU').format(date);
  }
  return summaryLabels[`${sectionId}.${key}.${value}`] ?? String(value);
};
const SummaryScreen = ({
  values,
  onEdit,
  onAction
}: {
  values: FormValues;
  onEdit: () => void;
  onAction: (message: string) => void;
}) => {
  const [actionMessage, setActionMessage] = useState('');
  const notify = (message: string) => {
    setActionMessage(message);
    onAction(message);
  };
  return <main className="h-screen w-full overflow-hidden bg-[#e9edf2] font-sans text-[#162033]">
      <section className="flex h-full min-h-0 w-full flex-col bg-[#eef1f5]">
        <header className="z-20 flex shrink-0 items-center justify-between gap-6 border-b border-[#d8dee8] bg-white px-7 py-4 shadow-[0_2px_8px_rgba(16,24,40,0.04)] lg:px-10">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <h1 className="m-0 truncate text-[24px] font-semibold leading-8 text-[#111827]">Приказ</h1>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e9f8f2] px-2.5 py-1 text-xs font-medium text-[#167456]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22a779]" />
                Печатная форма сформирована
              </span>
            </div>
            <p className="m-0 mt-1 text-xs text-[#7b8799]">Lego Document Form · Сводка заполненных этапов</p>
          </div>
          <div className="flex shrink-0 items-center gap-2.5">
            <button type="button" onClick={() => notify('Документ отправлен на верификацию')} className="inline-flex h-10 items-center justify-center rounded-lg border border-[#c9d3df] bg-white px-4 text-sm font-medium text-[#344054] transition hover:bg-[#f7f9fc] focus:outline-none focus:ring-3 focus:ring-[#087df0]/15">Верифицировать</button>
            <button type="button" onClick={() => notify('Печатная форма подготовлена к скачиванию')} className="inline-flex h-10 items-center justify-center rounded-lg bg-[#087df0] px-4 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(8,125,240,0.22)] transition hover:bg-[#066ed6] focus:outline-none focus:ring-3 focus:ring-[#087df0]/25">Скачать</button>
          </div>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(330px,1fr)]">
          <div className="min-h-0 overflow-y-auto px-5 py-6 sm:px-7 lg:px-10 lg:py-8">
            <div className="mx-auto grid w-full max-w-[920px] gap-5 pb-6">
              <div>
                <p className="m-0 text-xs font-semibold uppercase tracking-[0.08em] text-[#0875dd]">Результат заполнения</p>
                <h2 className="m-0 mt-1 text-xl font-semibold text-[#111827]">Данные по этапам</h2>
                <p className="m-0 mt-1.5 text-sm leading-5 text-[#667085]">Проверьте значения перед сохранением документа. Каждый блок соответствует одному завершённому этапу.</p>
              </div>
              {summarySections.map(section => <section key={section.id} className="overflow-hidden rounded-xl border border-[#dfe5ed] bg-white shadow-[0_1px_3px_rgba(16,24,40,0.04)]" aria-labelledby={`summary-${section.id}`}>
                  <div className="border-b border-[#e4e9f0] px-5 py-4">
                    <h3 id={`summary-${section.id}`} className="m-0 text-[15px] font-semibold text-[#26344a]">{section.title}</h3>
                  </div>
                  <dl className="m-0 grid grid-cols-1 sm:grid-cols-2">
                    {section.fields.map((field, index) => <div key={field.key} className={`min-w-0 px-5 py-3.5 ${index > 0 ? 'border-t border-[#edf0f4] sm:border-t-0' : ''} ${index >= 2 ? 'sm:border-t sm:border-[#edf0f4]' : ''} ${index % 2 === 1 ? 'sm:border-l sm:border-[#edf0f4]' : ''}`}>
                        <dt className="text-[11px] font-medium leading-4 text-[#7b8799]">{field.label}</dt>
                        <dd className="m-0 mt-1 break-words text-[13px] font-medium leading-5 text-[#26344a]">{formatSummaryValue(section.id, field.key, values[section.id][field.key], values[section.id])}</dd>
                      </div>)}
                  </dl>
                </section>)}
            </div>
          </div>

          <aside className="min-h-0 overflow-hidden border-l border-[#d8dee8] bg-white px-7 py-7 lg:px-8" aria-label="Действия со сводкой">
            <div className="mx-auto flex h-full max-w-[390px] flex-col">
              <div>
                <p className="m-0 text-xs font-semibold uppercase tracking-[0.08em] text-[#0875dd]">Финальная проверка</p>
                <h2 className="m-0 mt-2 text-[22px] font-semibold leading-7 text-[#111827]">Сводка готова к проверке</h2>
                <p className="m-0 mt-2 text-sm leading-5 text-[#667085]">Сверьте параметры слева. Если всё верно, сохраните сформированный документ в ECM. Для исправления данных вернитесь к этапам.</p>
              </div>

              <div className="mt-5 grid gap-2.5">
                <button type="button" onClick={() => notify('Документ сохранён в ECM')} className="inline-flex h-11 items-center justify-center rounded-lg bg-[#087df0] px-5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(8,125,240,0.22)] transition hover:bg-[#066ed6] focus:outline-none focus:ring-3 focus:ring-[#087df0]/25">Сохранить документ в ECM</button>
                <button type="button" onClick={onEdit} className="inline-flex h-11 items-center justify-center rounded-lg border border-[#c9d3df] bg-white px-5 text-sm font-medium text-[#344054] transition hover:bg-[#f7f9fc] focus:outline-none focus:ring-3 focus:ring-[#087df0]/15">Вернуться к редактированию</button>
              </div>

              {actionMessage && <p role="status" className="m-0 mt-3 rounded-lg bg-[#ecfdf8] px-3 py-2.5 text-xs font-medium leading-4 text-[#126b5d]">{actionMessage}</p>}

              <div className="mt-auto min-h-0 pt-5">
                <img src="https://storage.googleapis.com/storage.magicpath.ai/component-assets/434634985115381760/434650818713649152/f0a2cc17c23bcefc546019dbcf9baec1b67a8987fb901baa4c053510ac831cc4.png" alt="Проверка сформированного документа" className="mx-auto h-full max-h-[310px] w-full object-contain object-bottom" />
              </div>
              <p className="m-0 mt-3 border-t border-[#edf0f4] pt-3 text-xs leading-4 text-[#7b8799]">После сохранения документ будет доступен в ECM и связан с исходной задачей.</p>
            </div>
          </aside>
        </div>
      </section>
    </main>;
};
export const STrackerLegoFormSteps = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [view, setView] = useState<'form' | 'summary'>('form');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const contentScrollRef = useRef<HTMLDivElement>(null);
  const activeStep = steps[activeIndex];
  const stepValues = values[activeStep.id];
  const setValue = (name: string, value: FieldValue) => {
    setValues(current => ({
      ...current,
      [activeStep.id]: {
        ...current[activeStep.id],
        [name]: value
      }
    }));
    setErrors(current => {
      if (!current[name]) return current;
      const next = {
        ...current
      };
      delete next[name];
      return next;
    });
  };
  const validate = () => {
    const nextErrors: Record<string, string> = {};
    const requireText = (name: string, message: string) => {
      if (!String(stepValues[name] ?? '').trim()) nextErrors[name] = message;
    };
    if (activeStep.id === 'need') {
      requireText('contractSubject', 'Укажите предмет договора.');
      requireText('constructionObject', 'Выберите объект строительства.');
    }
    if (activeStep.id === 'counterparty') {
      if (stepValues.isKnown) requireText('counterparty', 'Выберите контрагента.');
      requireText('contractType', 'Выберите тип договора.');
    }
    if (activeStep.id === 'budget') {
      requireText('amount', 'Укажите сумму.');
      requireText('currency', 'Выберите валюту.');
      requireText('cfo', 'Выберите ЦФО.');
      requireText('turnoverArticle', 'Выберите статью оборотов.');
      requireText('budgetUnit', 'Выберите бюджетную единицу.');
      if (stepValues.includesVat) requireText('vatRate', 'Выберите ставку НДС.');
    }
    if (activeStep.id === 'payment') {
      requireText('paymentScheme', 'Выберите схему оплаты.');
      if (['advance', 'combined'].includes(String(stepValues.paymentScheme))) requireText('advancePercent', 'Укажите размер аванса.');
      requireText('paymentBasis', 'Выберите основание платежа.');
    }
    if (activeStep.id === 'schedule') {
      requireText('serviceFrequency', 'Выберите периодичность.');
      requireText('endDate', 'Укажите плановую дату завершения.');
      requireText('resultFormat', 'Выберите формат результата.');
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };
  const moveForward = () => {
    if (!validate()) return;
    setCompleted(current => new Set([...current, activeIndex]));
    setErrors({});
    if (activeIndex < steps.length - 1) {
      setActiveIndex(activeIndex + 1);
      contentScrollRef.current?.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      setView('summary');
    }
  };
  const openStep = (index: number) => {
    if (index > activeIndex && !completed.has(index)) return;
    if (index > activeIndex && !completed.has(activeIndex)) return;
    setActiveIndex(index);
    setErrors({});
    contentScrollRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const renderStep = () => {
    if (activeStep.id === 'need') {
      return <div className="grid gap-5 md:grid-cols-2">
          <Field label="Предмет договора" required error={errors.contractSubject} full>
            <input className={inputClass(Boolean(errors.contractSubject))} value={String(stepValues.contractSubject)} onChange={event => setValue('contractSubject', event.target.value)} placeholder="Например, поставка офисной мебели" />
          </Field>
          <Field label="Объект строительства (справочник)" required error={errors.constructionObject}>
            <select className={selectClass(stepValues.constructionObject, Boolean(errors.constructionObject))} value={String(stepValues.constructionObject)} onChange={event => setValue('constructionObject', event.target.value)}>
              <option value="">Выберите значение</option>
              <option value="north-terminal">Северный терминал</option>
              <option value="industrial-park">Индустриальный парк</option>
              <option value="office-complex">Офисный комплекс</option>
            </select>
          </Field>
          <Field label="Вид потребности" required>
            <select className={selectClass(stepValues.needType)} value={String(stepValues.needType)} onChange={event => setValue('needType', event.target.value)}>
              <option value="service">Услуга</option>
              <option value="goods">Товары</option>
              <option value="works">Работы</option>
            </select>
          </Field>
          <Field label="Дополнительное описание" hint="Уточните объём, назначение или особые требования." full>
            <textarea className={textareaClass()} value={String(stepValues.details)} onChange={event => setValue('details', event.target.value)} placeholder="Добавьте детали потребности" />
          </Field>
        </div>;
    }
    if (activeStep.id === 'counterparty') {
      return <div className="grid gap-5 md:grid-cols-2">
          {stepValues.isKnown && <Field label="Контрагент (справочник)" required error={errors.counterparty}>
              <select className={selectClass(stepValues.counterparty, Boolean(errors.counterparty))} value={String(stepValues.counterparty)} onChange={event => setValue('counterparty', event.target.value)}>
                <option value="">Выберите организацию</option>
                <option value="vector">ООО «Вектор Снаб»</option>
                <option value="proline">АО «ПроЛайн»</option>
                <option value="stroyresurs">ООО «СтройРесурс»</option>
              </select>
            </Field>}
          <Field label="Тип договора" required error={errors.contractType}>
            <select className={selectClass(stepValues.contractType, Boolean(errors.contractType))} value={String(stepValues.contractType)} onChange={event => setValue('contractType', event.target.value)}>
              <option value="">Выберите тип договора</option>
              <option value="supply">Поставка</option>
              <option value="service">Оказание услуг</option>
              <option value="work">Выполнение работ</option>
            </select>
          </Field>
          {stepValues.isKnown && <Field label="Контактное лицо" hint="Необязательное поле">
              <input className={inputClass()} value={String(stepValues.contactPerson)} onChange={event => setValue('contactPerson', event.target.value)} placeholder="Фамилия, имя, должность" />
            </Field>}
          <div className="grid gap-4 border-t border-[#dfe5ed] pt-5 md:col-span-2">
            <Toggle checked={Boolean(stepValues.isKnown)} onChange={checked => setValue('isKnown', checked)} label="Контрагент уже определён" description="Отключите, если поставщик будет выбран позднее в процессе." />
            <Toggle checked={Boolean(stepValues.requiresAccreditation)} onChange={checked => setValue('requiresAccreditation', checked)} label="Требуется аккредитация" description="Добавляет проверку поставщика перед заключением договора." />
          </div>
        </div>;
    }
    if (activeStep.id === 'budget') {
      return <div className="grid gap-6">
          <section className="grid gap-5 md:grid-cols-2" aria-label="Параметры стоимости">
            <Field label="Сумма" required error={errors.amount}>
              <div className="relative">
                <input inputMode="decimal" className={`${inputClass(Boolean(errors.amount))} pr-14`} value={String(stepValues.amount)} onChange={event => setValue('amount', event.target.value.replace(/[^0-9.,\s]/g, ''))} placeholder="0,00" />
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-medium text-[#7b8799]">₽</span>
              </div>
            </Field>
            <Field label="Валюта (справочник)" required error={errors.currency}>
              <select className={selectClass(stepValues.currency, Boolean(errors.currency))} value={String(stepValues.currency)} onChange={event => setValue('currency', event.target.value)}>
                <option value="RUB">Российский рубль (RUB)</option>
                <option value="USD">Доллар США (USD)</option>
                <option value="EUR">Евро (EUR)</option>
              </select>
            </Field>
            <div className="border-y border-[#d7dee8] py-5 md:col-span-2">
              <Toggle checked={Boolean(stepValues.includesVat)} onChange={checked => setValue('includesVat', checked)} label="Сумма включает НДС" description="При включении потребуется указать применимую ставку." />
            </div>
            {stepValues.includesVat && <Field label="Ставка НДС" required error={errors.vatRate}>
              <select className={selectClass(stepValues.vatRate, Boolean(errors.vatRate))} value={String(stepValues.vatRate)} onChange={event => setValue('vatRate', event.target.value)}>
                <option value="">Выберите ставку</option>
                <option value="20">20%</option>
                <option value="10">10%</option>
                <option value="0">0%</option>
              </select>
            </Field>}
          </section>

          <section className="grid gap-5 md:grid-cols-2" aria-label="Параметры бюджета">
            <Field label="ЦФО (справочник)" required error={errors.cfo}>
              <select className={selectClass(stepValues.cfo, Boolean(errors.cfo))} value={String(stepValues.cfo)} onChange={event => setValue('cfo', event.target.value)}>
                <option value="">Выберите ЦФО</option>
                <option value="admin">Административно-хозяйственный блок</option>
                <option value="construction">Дирекция строительства</option>
                <option value="operations">Операционная деятельность</option>
              </select>
            </Field>
            <Field label="Статья оборотов" required error={errors.turnoverArticle}>
              <select className={selectClass(stepValues.turnoverArticle, Boolean(errors.turnoverArticle))} value={String(stepValues.turnoverArticle)} onChange={event => setValue('turnoverArticle', event.target.value)}>
                <option value="">Выберите статью</option>
                <option value="materials">Материалы и комплектующие</option>
                <option value="services">Услуги сторонних организаций</option>
                <option value="maintenance">Эксплуатационные расходы</option>
              </select>
            </Field>
            <Field label="БЮ (справочник)" required error={errors.budgetUnit}>
              <select className={selectClass(stepValues.budgetUnit, Boolean(errors.budgetUnit))} value={String(stepValues.budgetUnit)} onChange={event => setValue('budgetUnit', event.target.value)}>
                <option value="">Выберите бюджетную единицу</option>
                <option value="bu-101">БЮ-101 · Общехозяйственные расходы</option>
                <option value="bu-204">БЮ-204 · Строительные проекты</option>
                <option value="bu-310">БЮ-310 · Техническое обеспечение</option>
              </select>
            </Field>
          </section>
        </div>;
    }
    if (activeStep.id === 'payment') {
      const hasAdvance = ['advance', 'combined'].includes(String(stepValues.paymentScheme));
      return <div className="grid gap-5 md:grid-cols-2">
          <Field label="Схема оплаты" required error={errors.paymentScheme}>
            <select className={selectClass(stepValues.paymentScheme, Boolean(errors.paymentScheme))} value={String(stepValues.paymentScheme)} onChange={event => setValue('paymentScheme', event.target.value)}>
              <option value="">Выберите схему</option>
              <option value="postpay">Оплата по факту</option>
              <option value="advance">Предоплата</option>
              <option value="combined">Аванс и окончательный расчёт</option>
              <option value="stages">Оплата по этапам</option>
            </select>
          </Field>
          {hasAdvance ? <Field label="Размер аванса" required error={errors.advancePercent}>
              <div className="relative">
                <input inputMode="numeric" className={`${inputClass(Boolean(errors.advancePercent))} pr-10`} value={String(stepValues.advancePercent)} onChange={event => setValue('advancePercent', event.target.value.replace(/\D/g, '').slice(0, 3))} placeholder="Например, 30" />
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-[#7b8799]">%</span>
              </div>
            </Field> : <Field label="Отсрочка платежа" hint="Количество календарных дней после приёмки">
              <div className="relative">
                <input inputMode="numeric" className={`${inputClass()} pr-14`} value={String(stepValues.defermentDays)} onChange={event => setValue('defermentDays', event.target.value.replace(/\D/g, ''))} placeholder="Например, 15" />
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-[#7b8799]">дней</span>
              </div>
            </Field>}
          <Field label="Основание платежа" required error={errors.paymentBasis}>
            <select className={selectClass(stepValues.paymentBasis, Boolean(errors.paymentBasis))} value={String(stepValues.paymentBasis)} onChange={event => setValue('paymentBasis', event.target.value)}>
              <option value="">Выберите основание</option>
              <option value="invoice">Счёт</option>
              <option value="act">Акт выполненных работ</option>
              <option value="waybill">Товарная накладная</option>
              <option value="universal">УПД</option>
            </select>
          </Field>
          <Field label="Особые условия" full>
            <textarea className={textareaClass()} value={String(stepValues.specialTerms)} onChange={event => setValue('specialTerms', event.target.value)} placeholder="Например, удержание гарантийной суммы или особый график платежей" />
          </Field>
        </div>;
    }
    return <div className="grid gap-5 md:grid-cols-2">
        <Field label="Периодичность" required error={errors.serviceFrequency}>
          <select className={selectClass(stepValues.serviceFrequency, Boolean(errors.serviceFrequency))} value={String(stepValues.serviceFrequency)} onChange={event => setValue('serviceFrequency', event.target.value)}>
            <option value="one-time">Разовая услуга</option>
            <option value="monthly">Ежемесячно</option>
            <option value="quarterly">Ежеквартально</option>
            <option value="continuous">Непрерывное оказание</option>
          </select>
        </Field>
        <Field label="Формат результата" required error={errors.resultFormat}>
          <select className={selectClass(stepValues.resultFormat, Boolean(errors.resultFormat))} value={String(stepValues.resultFormat)} onChange={event => setValue('resultFormat', event.target.value)}>
            <option value="">Выберите формат</option>
            <option value="document">Документ / отчёт</option>
            <option value="delivery">Поставка на объект</option>
            <option value="acceptance">Результат по акту приёмки</option>
            <option value="digital">Электронный результат</option>
          </select>
        </Field>
        <Field label="Плановая дата начала" hint="Необязательное поле">
          <input type="date" className={inputClass()} value={String(stepValues.startDate)} onChange={event => setValue('startDate', event.target.value)} />
        </Field>
        <Field label="Плановая дата завершения" required error={errors.endDate}>
          <input type="date" className={inputClass(Boolean(errors.endDate))} value={String(stepValues.endDate)} onChange={event => setValue('endDate', event.target.value)} />
        </Field>
        <Field label="Адрес или место исполнения" hint="Необязательное поле" full>
          <input className={inputClass()} value={String(stepValues.deliveryAddress)} onChange={event => setValue('deliveryAddress', event.target.value)} placeholder="Укажите адрес объекта или место передачи результата" />
        </Field>
        <Field label="Техническое задание" hint="PDF, DOCX или XLSX до 50 МБ" full>
          <input ref={fileInputRef} type="file" className="hidden" accept=".pdf,.doc,.docx,.xls,.xlsx" onChange={event => setValue('attachmentName', event.target.files?.[0]?.name ?? '')} />
          
          <button type="button" onClick={() => fileInputRef.current?.click()} className="group flex min-h-24 w-full items-center justify-center gap-3 rounded-xl border border-dashed border-[#b9c7d8] bg-[#fbfcfe] px-5 py-4 text-left transition hover:border-[#087df0] hover:bg-[#f4f9ff] focus:outline-none focus:ring-3 focus:ring-[#087df0]/15">
            
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-[#d7e5f5] bg-white text-[#087df0] shadow-sm"><Icon name={stepValues.attachmentName ? 'file' : 'upload'} className="h-5 w-5" /></span>
            <span className="grid gap-0.5">
              <span className="text-sm font-medium text-[#26344a]">{stepValues.attachmentName ? String(stepValues.attachmentName) : 'Выберите файл или перетащите его сюда'}</span>
              <span className="text-xs text-[#7b8799]">{stepValues.attachmentName ? 'Нажмите, чтобы заменить файл' : 'Файл прикрепится к текущему шагу'}</span>
            </span>
          </button>
        </Field>
      </div>;
  };
  if (view === 'summary') {
    return <SummaryScreen values={values} onEdit={() => {
      setView('form');
      setActiveIndex(steps.length - 1);
    }} onAction={() => undefined} />;
  }
  return <main className="h-screen w-full overflow-hidden bg-[#eef2f7] px-4 py-5 font-sans text-[#162033] sm:px-6 lg:px-8">
      <section className="mx-auto flex h-[calc(100vh-40px)] min-h-0 w-full max-w-[1180px] flex-col overflow-hidden rounded-2xl border border-[#d7dee8] bg-white shadow-[0_10px_30px_rgba(31,52,78,0.08)]">
        <header className="flex shrink-0 items-center border-b border-[#e3e8ef] bg-white px-5 py-5 sm:px-7 lg:px-9">
          <div className="flex min-w-0 items-center gap-3.5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#eaf4ff] text-[#087df0]"><Icon name="file" className="h-5 w-5" /></span>
            <div className="min-w-0">
              <h1 className="m-0 truncate text-xl font-semibold leading-7 text-[#111827] sm:text-[22px]">Создание заявки на потребность АХР</h1>
            </div>
          </div>
        </header>

        <div className="shrink-0 border-b border-[#e3e8ef] bg-[#fbfcfe] px-5 py-5 sm:px-7 lg:px-9">
          <ol className="grid gap-2" style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(185px, 100%), 1fr))'
        }} aria-label="Этапы заполнения формы">
            {steps.map((step, index) => {
            const isActive = index === activeIndex;
            const isComplete = completed.has(index);
            const isAvailable = index <= activeIndex || isComplete || completed.has(index - 1);
            return <li key={step.id} className="min-w-0">
                  <button type="button" onClick={() => openStep(index)} disabled={!isAvailable} aria-current={isActive ? 'step' : undefined} aria-label={`Шаг ${index + 1}: ${step.shortTitle}`} className={`group flex h-full min-h-[78px] w-full items-start gap-2.5 rounded-xl border p-3 text-left transition focus:outline-none focus:ring-3 focus:ring-[#087df0]/15 disabled:cursor-not-allowed ${isActive ? 'border-[#087df0] bg-[#eef7ff] shadow-[0_1px_2px_rgba(8,125,240,0.08)]' : isComplete ? 'border-[#b9dfcf] bg-[#f2fbf7] hover:border-[#8bcbb3]' : isAvailable ? 'border-[#d8dee8] bg-white hover:border-[#b9c5d5] hover:bg-[#fbfcfe]' : 'border-[#e5e7eb] bg-[#f2f4f7] opacity-70'}`}>
                    <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-md text-xs font-semibold transition ${isComplete ? 'bg-[#36b37e] text-white' : isActive ? 'bg-[#087df0] text-white' : 'border border-[#cfd7e3] bg-white text-[#667085]'}`}>
                      {isComplete ? <Icon name="check" className="h-4 w-4" /> : index + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-[13px] font-semibold leading-[18px] ${isActive ? 'text-[#005eb8]' : isComplete ? 'text-[#287a5b]' : 'text-[#344054]'}`}>{step.shortTitle}</span>
                      <span className={`mt-1 block text-[11px] leading-4 ${isActive ? 'text-[#006ac8]' : isComplete ? 'text-[#287a5b]' : 'text-[#667085]'}`}>
                        {isActive ? 'Текущий этап' : isComplete ? 'Этап подтверждён' : isAvailable ? 'Доступен' : 'Будет доступен позже'}
                      </span>
                    </span>
                  </button>
                </li>;
          })}
          </ol>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <div ref={contentScrollRef} className="lego-form-scroll min-h-0 flex-1 overflow-y-scroll py-6 pl-5 pr-2.5 sm:pl-7 sm:pr-[18px] lg:py-8 lg:pl-9 lg:pr-[26px]">
            <div className="w-full pb-2">
            <div className="mb-5">
              <div>
                <h2 className="m-0 text-xl font-semibold leading-7 text-[#111827]">{activeStep.title}</h2>
                <p className="m-0 mt-1.5 max-w-2xl text-sm leading-5 text-[#667085]">{activeStep.description}</p>
              </div>
            </div>

            <section className="rounded-2xl border border-[#dfe5ed] bg-[#f8fafc] p-5 shadow-[0_1px_2px_rgba(16,24,40,0.03)] sm:p-6" aria-label={`${activeStep.title}: поля формы`}>
              {renderStep()}
            </section>
            </div>
          </div>

          <footer className="shrink-0 border-t border-[#e3e8ef] bg-white px-5 py-4 sm:px-7 lg:px-9">
            <div className="flex w-full justify-end">
              <button type="button" onClick={moveForward} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#087df0] px-5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(8,125,240,0.2)] transition hover:bg-[#066ed6] focus:outline-none focus:ring-3 focus:ring-[#087df0]/25 active:translate-y-px">
                {activeIndex === steps.length - 1 ? 'Завершить заполнение' : 'Подтвердить и продолжить'}
                {activeIndex === steps.length - 1 ? <Icon name="check" /> : <Icon name="chevron-right" />}
              </button>
            </div>
          </footer>
        </div>
      </section>
    </main>;
};
