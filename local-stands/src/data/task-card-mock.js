const freezeList = items => Object.freeze(items.map(item => Object.freeze(item)));

const freezeValues = values => Object.freeze(Object.fromEntries(
  Object.entries(values).map(([stepId, stepValues]) => [stepId, Object.freeze({ ...stepValues })]),
));

export const legoDocumentFormMock = Object.freeze({
  title: 'Создание заявки на потребность АХР',
  summaryTitle: 'Приказ',
  summarySubtitle: 'Lego Document Form · Сводка заполненных этапов',
  steps: freezeList([
    { id: 'need', label: 'Потребность', description: 'Опишите предмет закупки и выберите объект, для которого формируется потребность.' },
    { id: 'counterparty', label: 'Контрагент', description: 'Укажите предполагаемого поставщика и договорный контекст.' },
    { id: 'budget', label: 'Стоимость и бюджет', description: 'Зафиксируйте сумму, валюту и источники финансирования.' },
    { id: 'payment', label: 'Условия оплаты', description: 'Определите схему расчётов и дополнительные условия платежа.' },
    { id: 'schedule', label: 'Сроки и формат', description: 'Укажите период исполнения и ожидаемый формат результата.' },
  ]),
  dictionaries: Object.freeze({
    constructionObjects: freezeList([
      { value: 'north-terminal', label: 'Северный терминал' },
      { value: 'industrial-park', label: 'Индустриальный парк' },
      { value: 'office-complex', label: 'Офисный комплекс' },
    ]),
    needTypes: freezeList([
      { value: 'service', label: 'Услуга' },
      { value: 'goods', label: 'Товары' },
      { value: 'works', label: 'Работы' },
    ]),
    counterparties: freezeList([
      { value: 'vector', label: 'ООО «Вектор Снаб»' },
      { value: 'proline', label: 'АО «ПроЛайн»' },
      { value: 'stroyresurs', label: 'ООО «СтройРесурс»' },
    ]),
    contractTypes: freezeList([
      { value: 'supply', label: 'Поставка' },
      { value: 'service', label: 'Оказание услуг' },
      { value: 'work', label: 'Выполнение работ' },
    ]),
    currencies: freezeList([
      { value: 'RUB', label: 'Российский рубль (RUB)' },
      { value: 'USD', label: 'Доллар США (USD)' },
      { value: 'EUR', label: 'Евро (EUR)' },
    ]),
    vatRates: freezeList([
      { value: '20', label: '20%' },
      { value: '10', label: '10%' },
      { value: '0', label: '0%' },
    ]),
    cfo: freezeList([
      { value: 'admin', label: 'Административно-хозяйственный блок' },
      { value: 'construction', label: 'Дирекция строительства' },
      { value: 'operations', label: 'Операционная деятельность' },
    ]),
    turnoverArticles: freezeList([
      { value: 'materials', label: 'Материалы и комплектующие' },
      { value: 'services', label: 'Услуги сторонних организаций' },
      { value: 'maintenance', label: 'Эксплуатационные расходы' },
    ]),
    budgetUnits: freezeList([
      { value: 'bu-101', label: 'БЮ-101 · Общехозяйственные расходы' },
      { value: 'bu-204', label: 'БЮ-204 · Строительные проекты' },
      { value: 'bu-310', label: 'БЮ-310 · Техническое обеспечение' },
    ]),
    paymentSchemes: freezeList([
      { value: 'postpay', label: 'Оплата по факту' },
      { value: 'advance', label: 'Предоплата' },
      { value: 'combined', label: 'Аванс и окончательный расчёт' },
      { value: 'stages', label: 'Оплата по этапам' },
    ]),
    paymentBases: freezeList([
      { value: 'invoice', label: 'Счёт' },
      { value: 'act', label: 'Акт выполненных работ' },
      { value: 'waybill', label: 'Товарная накладная' },
      { value: 'universal', label: 'УПД' },
    ]),
    serviceFrequencies: freezeList([
      { value: 'one-time', label: 'Разовая услуга' },
      { value: 'monthly', label: 'Ежемесячно' },
      { value: 'quarterly', label: 'Ежеквартально' },
      { value: 'continuous', label: 'Непрерывное оказание' },
    ]),
    resultFormats: freezeList([
      { value: 'document', label: 'Документ / отчёт' },
      { value: 'delivery', label: 'Поставка на объект' },
      { value: 'acceptance', label: 'Результат по акту приёмки' },
      { value: 'digital', label: 'Электронный результат' },
    ]),
  }),
  initialValues: freezeValues({
    need: { contractSubject: '', constructionObject: '', needType: 'service', details: '' },
    counterparty: { isKnown: true, counterparty: '', contractType: '', contactPerson: '', requiresAccreditation: false },
    budget: { amount: '', includesVat: false, vatRate: '20', currency: 'RUB', cfo: '', turnoverArticle: '', budgetUnit: '' },
    payment: { paymentScheme: '', advancePercent: '', defermentDays: '', paymentBasis: '', specialTerms: '' },
    schedule: { serviceFrequency: 'one-time', startDate: '', endDate: '2026-09-30', resultFormat: '', deliveryAddress: '', attachmentName: '' },
  }),
  summarySections: freezeList([
    { id: 'need', title: 'Шаг 1. Потребность', fields: Object.freeze([{ key: 'contractSubject', label: 'Предмет договора' }, { key: 'constructionObject', label: 'Объект строительства' }, { key: 'needType', label: 'Вид потребности' }, { key: 'details', label: 'Дополнительное описание' }]) },
    { id: 'counterparty', title: 'Шаг 2. Контрагент', fields: Object.freeze([{ key: 'isKnown', label: 'Контрагент определён' }, { key: 'counterparty', label: 'Контрагент' }, { key: 'contractType', label: 'Тип договора' }, { key: 'contactPerson', label: 'Контактное лицо' }, { key: 'requiresAccreditation', label: 'Требуется аккредитация' }]) },
    { id: 'budget', title: 'Шаг 3. Стоимость и бюджет', fields: Object.freeze([{ key: 'amount', label: 'Сумма' }, { key: 'currency', label: 'Валюта' }, { key: 'includesVat', label: 'Сумма включает НДС' }, { key: 'vatRate', label: 'Ставка НДС' }, { key: 'cfo', label: 'ЦФО' }, { key: 'turnoverArticle', label: 'Статья оборотов' }, { key: 'budgetUnit', label: 'Бюджетная единица' }]) },
    { id: 'payment', title: 'Шаг 4. Условия оплаты', fields: Object.freeze([{ key: 'paymentScheme', label: 'Схема оплаты' }, { key: 'advancePercent', label: 'Размер аванса' }, { key: 'defermentDays', label: 'Отсрочка платежа' }, { key: 'paymentBasis', label: 'Основание платежа' }, { key: 'specialTerms', label: 'Особые условия' }]) },
    { id: 'schedule', title: 'Шаг 5. Сроки и формат', fields: Object.freeze([{ key: 'serviceFrequency', label: 'Периодичность' }, { key: 'startDate', label: 'Плановая дата начала' }, { key: 'endDate', label: 'Плановая дата завершения' }, { key: 'resultFormat', label: 'Формат результата' }, { key: 'deliveryAddress', label: 'Адрес или место исполнения' }, { key: 'attachmentName', label: 'Техническое задание' }]) },
  ]),
});

export const taskCardMock = Object.freeze({
  id: 'AHX-547',
  title: 'Создайте заявку на приобретение оборудования и организацию работ для обеспечения потребности административно-хозяйственного подразделения',
  status: 'Взята в работу',
  assignee: 'Олег Федоров',
  dueDate: 'Срок не установлен',
  description: 'Заполните данные заявки. Завершение задачи становится доступно после прохождения всех применимых шагов формы.',
  history: freezeList([
    { id: 1, date: '01.08.2026', time: '10:12', text: 'Задача взята в работу Олегом Федоровым.' },
    { id: 2, date: '01.08.2026', time: '10:05', text: 'Сохранён черновик первого шага заявки.' },
    { id: 3, date: '01.08.2026', time: '09:58', text: 'Изменено значение поля «Предмет договора».' },
    { id: 4, date: '01.08.2026', time: '09:50', text: 'Исполнителем задачи назначен Олег Федоров.' },
    { id: 5, date: '01.08.2026', time: '09:45', text: 'Создана задача по процессу «Заявка на потребность АХР».' },
  ]),
  comments: freezeList([
    { id: 1, initials: 'АС', name: 'Смирнова Анна Викторовна', role: 'Руководитель проекта', date: '01.08.2026', time: '10:20', text: 'Проверьте объект строительства перед подтверждением первого шага.' },
    { id: 2, initials: 'ОФ', name: 'Федоров Олег Сергеевич', role: 'Исполнитель задачи', date: '01.08.2026', time: '10:16', text: 'Объект строительства уточняю у инициатора заявки.' },
    { id: 3, initials: 'МК', name: 'Кузнецова Мария Андреевна', role: 'Инициатор заявки', date: '01.08.2026', time: '10:11', text: 'Для заявки необходимо выбрать объект «Северный терминал».' },
    { id: 4, initials: 'ОФ', name: 'Федоров Олег Сергеевич', role: 'Исполнитель задачи', date: '01.08.2026', time: '10:07', text: 'Значение принято, внесу его в первый шаг.' },
    { id: 5, initials: 'АС', name: 'Смирнова Анна Викторовна', role: 'Руководитель проекта', date: '01.08.2026', time: '10:02', text: 'Проверьте также формулировку предмета договора.' },
    { id: 6, initials: 'ЕВ', name: 'Волкова Елена Игоревна', role: 'Бизнес-аналитик', date: '01.08.2026', time: '09:57', text: 'Формулировка должна соответствовать данным исходной заявки.' },
    { id: 7, initials: 'ОФ', name: 'Федоров Олег Сергеевич', role: 'Исполнитель задачи', date: '01.08.2026', time: '09:52', text: 'Использовал наименование из карточки потребности.' },
    { id: 8, initials: 'ДП', name: 'Петров Дмитрий Алексеевич', role: 'Специалист по закупкам', date: '01.08.2026', time: '09:48', text: 'На следующем этапе потребуется подтвердить контрагента.' },
    { id: 9, initials: 'МК', name: 'Кузнецова Мария Андреевна', role: 'Инициатор заявки', date: '31.07.2026', time: '18:24', text: 'Контрагент будет выбран после согласования потребности.' },
    { id: 10, initials: 'АС', name: 'Смирнова Анна Викторовна', role: 'Руководитель проекта', date: '31.07.2026', time: '18:10', text: 'Сначала завершите заполнение обязательных полей текущего шага.' },
    { id: 11, initials: 'ОФ', name: 'Федоров Олег Сергеевич', role: 'Исполнитель задачи', date: '31.07.2026', time: '17:56', text: 'Принял задачу, приступаю к заполнению заявки.' },
    { id: 12, initials: 'ЕВ', name: 'Волкова Елена Игоревна', role: 'Бизнес-аналитик', date: '31.07.2026', time: '17:43', text: 'Если справочник не загрузится, сохраните черновик шага.' },
    { id: 13, initials: 'ДП', name: 'Петров Дмитрий Алексеевич', role: 'Специалист по закупкам', date: '31.07.2026', time: '17:31', text: 'Стоимость и бюджет заполняются после выбора контрагента.' },
    { id: 14, initials: 'МК', name: 'Кузнецова Мария Андреевна', role: 'Инициатор заявки', date: '31.07.2026', time: '17:18', text: 'Все исходные данные по потребности приложены к задаче.' },
  ]),
  form: legoDocumentFormMock,
});
