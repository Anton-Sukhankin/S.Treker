const freezeList = items => Object.freeze(items.map(item => Object.freeze(item)));

const leaves = (...names) => names.map(name => ({ name }));

const packageSeeds = [{
  name: '.',
  children: [{
    name: '1С ДО',
    children: [{
      name: 'Входящие из 1С',
      children: [{
        name: '2026 год',
        children: leaves(
          'Январь — входящие документы',
          'Февраль — входящие документы',
          'Март — входящие документы',
          'Апрель — входящие документы',
          'Май — входящие документы',
          'Июнь — входящие документы',
          'Июль — входящие документы',
        ),
      }, ...leaves(
        '2025 год',
        '2024 год',
        'Нераспознанные документы',
        'Ожидают маршрутизации',
        'С ошибками синхронизации',
        'Архив входящих из 1С',
      )],
    }, ...leaves(
      'Исходящие в 1С',
      'Черновики обмена',
      'Документы на согласовании',
      'Документы на подписании',
      'Ошибки интеграции',
      'Журнал обмена',
      'Архив 1С ДО',
    )],
  }, {
    name: 'privatepackage_s.beregovoy',
    children: [{
      name: 'Таганрог 2000',
      children: [{
        name: 'Договоры и обязательства',
        children: leaves(
          'Действующие договоры',
          'Договоры на согласовании',
          'Дополнительные соглашения',
          'Протоколы разногласий',
          'Акты исполнения обязательств',
          'Договоры на расторжении',
          'Архив договоров',
        ),
      }, ...leaves(
        'Корпоративные документы',
        'Входящая корреспонденция',
        'Исходящая корреспонденция',
        'Финансовые документы',
        'Кадровые документы',
        'Архив подразделения',
      )],
    }, ...leaves(
      'Личные документы',
      'Временные материалы',
      'Проекты документов',
      'Документы для проверки',
      'Совместная работа',
      'Импортированные пакеты',
    )],
  }, {
    name: 'ProcessTemporaryPackage',
  }, {
    name: 'АХР',
    children: [{
      name: 'Закупки и материальное обеспечение',
      children: [{
        name: 'Канцелярия и расходные материалы',
        children: leaves(
          'Заявки подразделений',
          'Коммерческие предложения',
          'Счета на оплату',
          'Накладные и УПД',
          'Акты приемки',
          'Реестр поставщиков',
          'Архив закупок',
        ),
      }, ...leaves(
        'Офисная техника',
        'Хозяйственные товары',
        'Мебель и оборудование',
        'Спецодежда',
        'Транспортные расходы',
        'Складские остатки',
      )],
    }, ...leaves(
      'Эксплуатация помещений',
      'Транспорт и логистика',
      'Охрана труда',
      'Пропуска и доступ',
      'Командировки',
      'Корпоративная связь',
      'Архив АХР',
    )],
  }, {
    name: 'Бухгалтерский и управленческий учет',
    children: [{
      name: 'Первичные документы',
      children: [{
        name: 'Поступление товаров и услуг',
        children: leaves(
          'Счета поставщиков',
          'Универсальные передаточные документы',
          'Товарные накладные',
          'Акты выполненных работ',
          'Корректировочные документы',
          'Документы с расхождениями',
          'Архив поступлений',
        ),
      }, ...leaves(
        'Реализация товаров и услуг',
        'Авансовые отчеты',
        'Банковские документы',
        'Кассовые документы',
        'Расчеты с контрагентами',
        'Документы на проверке',
      )],
    }, ...leaves(
      'Управленческая отчетность',
      'Бюджетирование',
      'Налоговый учет',
      'Заработная плата',
      'Основные средства',
      'Закрытие периода',
      'Архив бухгалтерии',
    )],
  }, {
    name: 'Входящие документы',
  }, {
    name: 'ДОВЕРЕННОСТЬ',
  }, {
    name: 'Договоры и обязательства',
    children: [{
      name: 'Действующие договоры',
      children: [{
        name: 'Договоры с поставщиками',
        children: leaves(
          'ИТ и программное обеспечение',
          'Аренда и эксплуатация',
          'Консультационные услуги',
          'Транспортные услуги',
          'Маркетинг и реклама',
          'Обучение сотрудников',
          'Прочие поставщики',
        ),
      }, ...leaves(
        'Договоры с заказчиками',
        'Внутригрупповые договоры',
        'Рамочные договоры',
        'Лицензионные договоры',
        'Договоры аренды',
        'Договоры страхования',
      )],
    }, ...leaves(
      'Договоры на согласовании',
      'Проекты договоров',
      'Дополнительные соглашения',
      'Протоколы разногласий',
      'Обеспечение обязательств',
      'Завершенные договоры',
      'Архив договоров',
    )],
  }, {
    name: 'Документооборот',
  }, {
    name: 'Документы',
    children: [{
      name: 'Проектная документация',
      children: [{
        name: 'Разделы проекта и рабочие материалы',
        children: leaves(
          'Исходные требования',
          'Функциональные спецификации',
          'Архитектурные решения',
          'Протоколы встреч',
          'Макеты и визуальные материалы',
          'Результаты тестирования',
          'Архив версий',
        ),
      }, ...leaves(
        'Планы проекта',
        'Отчеты о статусе',
        'Реестр решений',
        'Реестр рисков',
        'Проектная переписка',
        'Итоговые материалы',
      )],
    }, ...leaves(
      'Организационные документы',
      'Нормативные документы',
      'Служебные записки',
      'Протоколы и решения',
      'Шаблоны документов',
      'Общие материалы',
      'Архив документов',
    )],
  }, {
    name: 'Заявки',
  }, {
    name: 'Кадровые документы',
    children: [{
      name: 'Личные дела сотрудников',
      children: [{
        name: 'Действующие сотрудники',
        children: leaves(
          'Руководители',
          'Основной персонал',
          'Удаленные сотрудники',
          'Совместители',
          'Стажеры',
          'Временный персонал',
          'Сотрудники на испытательном сроке',
        ),
      }, ...leaves(
        'Уволенные сотрудники',
        'Кандидаты',
        'Переводы между подразделениями',
        'Изменения персональных данных',
        'Документы на ознакомлении',
        'Архив личных дел',
      )],
    }, ...leaves(
      'Прием на работу',
      'Переводы и изменения',
      'Отпуска и отсутствия',
      'Командировки',
      'Обучение и аттестация',
      'Увольнение',
      'Архив кадровых документов',
    )],
  }],
}];

const materializePackages = (seeds, prefix = 'package') => Object.freeze(seeds.map((seed, index) => {
  const id = `${prefix}-${index + 1}`;
  const node = { id, name: seed.name };
  if (seed.children) node.children = materializePackages(seed.children, id);
  return Object.freeze(node);
}));

export const DOCUMENT_PACKAGES = materializePackages(packageSeeds);

export const DOCUMENT_NAME_TEMPLATES = Object.freeze([
  'Партнерское соглашение о взаимодействии и порядке обмена документами',
  'Договор подряда на выполнение проектных работ (редакция 2.1)',
  'Информационное письмо о смене юридического адреса организации',
  'Об утверждении графика отпусков сотрудников на 2026 год',
  'Акт приема-передачи выполненных работ по этапу проекта',
  'Дополнительное соглашение к договору оказания консультационных услуг',
  'Заявка на приобретение оборудования для нового рабочего пространства',
  'Протокол согласования существенных условий договора',
  'Служебная записка о продлении срока исполнения обязательств',
  'Приказ о проведении ежегодной инвентаризации имущества',
  'Письмо о подтверждении долгосрочного сотрудничества',
  'Универсальный передаточный документ по поставке оборудования',
  'Доверенность на представление интересов организации',
  'Отчет о выполнении работ и использовании бюджета проекта',
  'Заявка на командирование сотрудников регионального подразделения',
]);

export const DOCUMENT_TYPES = Object.freeze([
  'Соглашение',
  'Договор',
  'Письмо',
  'Приказ',
  'Акт',
  'Заявка',
  'Доверенность',
]);

export const DOCUMENT_CREATION_OPTIONS = freezeList([
  { id: 'ecm-bridge', name: 'Бридж', source: 'ecm', sourceLabel: 'Стандартная ECM-форма', documentTypeId: 'agreement', documentTypeLabel: 'Соглашение', templateVersionId: null, published: true, available: true },
  { id: 'ecm-corporate-loan', name: 'Корпоративный кредит', source: 'ecm', sourceLabel: 'Стандартная ECM-форма', documentTypeId: 'contract', documentTypeLabel: 'Договор', templateVersionId: null, published: true, available: true },
  { id: 'ecm-project-finance', name: 'Проектное финансирование', source: 'ecm', sourceLabel: 'Стандартная ECM-форма', documentTypeId: 'application', documentTypeLabel: 'Заявка', templateVersionId: null, published: true, available: true },
  { id: 'ecm-bond-issue', name: 'Облигации Самостоятельный выпуск', source: 'ecm', sourceLabel: 'Стандартная ECM-форма', documentTypeId: 'agreement', documentTypeLabel: 'Соглашение', templateVersionId: null, published: true, available: true },
  { id: 'ecm-exchange-bond-program', name: 'Программа биржевых облигаций', source: 'ecm', sourceLabel: 'Стандартная ECM-форма', documentTypeId: 'application', documentTypeLabel: 'Заявка', templateVersionId: null, published: true, available: true },
  { id: 'lego-external-loans', name: 'Внешние займы', source: 'lego', sourceLabel: 'Lego-шаблон', documentTypeId: 'contract', documentTypeLabel: 'Договор', templateVersionId: 'lego-external-loans-v3', published: true, available: true },
  { id: 'lego-factoring', name: 'Факторинг', source: 'lego', sourceLabel: 'Lego-шаблон', documentTypeId: 'contract', documentTypeLabel: 'Договор', templateVersionId: 'lego-factoring-v2', published: true, available: true },
  { id: 'ecm-credit-agreement', name: 'Кредитный договор', source: 'ecm', sourceLabel: 'Стандартная ECM-форма', documentTypeId: 'contract', documentTypeLabel: 'Договор', templateVersionId: null, published: true, available: true },
  { id: 'ecm-financing-limit', name: 'Лимит финансирования', source: 'ecm', sourceLabel: 'Стандартная ECM-форма', documentTypeId: 'agreement', documentTypeLabel: 'Соглашение', templateVersionId: null, published: true, available: true },
  { id: 'lego-credit-committee', name: 'Кредитный комитет', source: 'lego', sourceLabel: 'Lego-шаблон', documentTypeId: 'protocol', documentTypeLabel: 'Акт', templateVersionId: 'lego-credit-committee-v4', published: true, available: true },
  { id: 'lego-kyc-borrower', name: 'KYC-пакет заёмщика', source: 'lego', sourceLabel: 'Lego-шаблон', documentTypeId: 'application', documentTypeLabel: 'Заявка', templateVersionId: 'lego-kyc-borrower-v1', published: true, available: true },
  { id: 'lego-security-agreement', name: 'Соглашение об обеспечении', source: 'lego', sourceLabel: 'Lego-шаблон', documentTypeId: 'agreement', documentTypeLabel: 'Соглашение', templateVersionId: 'lego-security-agreement-v2', published: true, available: true },
  { id: 'lego-term-sheet', name: 'Term sheet', source: 'lego', sourceLabel: 'Lego-шаблон', documentTypeId: 'letter', documentTypeLabel: 'Письмо', templateVersionId: 'lego-term-sheet-v3', published: true, available: true },
]);

export const ALL_DOCUMENT_TYPES = 'Все типы';

export const DOCUMENT_ATTRIBUTE_DEFINITIONS = freezeList([
  { key: 'type', label: 'Тип документа' },
  { key: 'name', label: 'Наименование' },
  { key: 'number', label: 'Номер' },
  { key: 'date', label: 'Дата' },
  { key: 'contractPlannedDate', label: 'План. дата договора' },
  { key: 'documentKind', label: 'Вид документа (справочник)' },
  { key: 'contractType', label: 'Тип договора (справочник)' },
  { key: 'organization', label: 'Организация (справочник)' },
  { key: 'author', label: 'Автор' },
  { key: 'organizationPowerOfAttorneyNumber', label: 'Номер доверенности подписанта организации' },
  { key: 'counterparty', label: 'Контрагент (справочник)' },
  { key: 'otherTerms', label: 'Прочие условия' },
  { key: 'counterpartyPowerOfAttorneyDate', label: 'Дата доверенности подписанта контрагента' },
  { key: 'organizationPowerOfAttorneyDate', label: 'Дата доверенности подписанта организации' },
  { key: 'bankAccounts', label: 'Расчетные счета (справочник)' },
  { key: 'trackerBusinessKey', label: 'Бизнес ключ Трекера', technical: true },
  { key: 'masterSystemGuid', label: 'GUID мастер системы', technical: true },
  { key: 'locked', label: 'Заблокирован', technical: true },
  { key: 'contractKind', label: 'Вид договора' },
  { key: 'organizationRepresentative', label: 'Представитель (организации)' },
  { key: 'representativeBasisType', label: 'Тип документа основания представителя' },
  { key: 'standardContract', label: 'Договор является типовым' },
  { key: 'masterSystem', label: 'Мастер система', technical: true },
  { key: 'counterpartyPowerOfAttorneyNumber', label: 'Номер доверенности подписанта контрагента' },
  { key: 'project', label: 'Проект (справочник)' },
  { key: 'businessUnit', label: 'БЮ (справочник)' },
  { key: 'contractSubject', label: 'Предмет договора' },
  { key: 'counterpartySelectionMethod', label: 'Метод выбора контрагента (GUID 1С:ДО)', technical: true },
  { key: 'counterpartyEmail', label: 'Email контрагента' },
  { key: 'status', label: 'Статус' },
  { key: 'specializations', label: 'Специализации (справочник)' },
  { key: 'package', label: 'Пакет' },
]);

export const DOCUMENT_ATTRIBUTE_VALUES = Object.freeze({
  notApplicable: 'Не применяется для этого типа документа',
  contractPlannedDate: '31.12.2026',
  contractDocumentKind: 'Договорной документ',
  generalDocumentKind: 'Организационно-распорядительный документ',
  agreementContractType: 'Партнерское соглашение',
  serviceContractType: 'Договор оказания услуг',
  organization: 'ООО «Сфера Про»',
  author: 'Береговой Сергей Александрович',
  organizationPowerOfAttorneyNumber: '70с02779-d134-48ac-bc83-89c1540bc9e4',
  counterparty: 'ООО «Вектор Проект»',
  otherTerms: 'Автоматическая пролонгация на 12 месяцев при отсутствии возражений сторон',
  counterpartyPowerOfAttorneyDate: '12.12.2025',
  organizationPowerOfAttorneyDate: '15.01.2026',
  bankAccounts: '40702 810 5 0000 0123456, ПАО Сбербанк',
  locked: 'Нет',
  contractKind: 'Возмездный, двусторонний',
  organizationRepresentative: 'Кузнецова Мария Игоревна',
  representativeBasisType: 'Доверенность',
  standardContract: 'Да',
  masterSystem: 'S.Docs ECM',
  counterpartyPowerOfAttorneyNumber: '77-АА-908',
  project: 'S.Docs / Документооборот',
  businessUnit: 'Цифровые продукты',
  contractSubject: 'Организация электронного документооборота и сопровождение совместных проектов',
  counterpartySelectionMethod: 'По регистрационным данным организации',
  counterpartyEmail: 'office@vector-project.example',
  currentStatus: 'Действует',
  archivedStatus: 'Архивная версия',
  specializations: 'Документооборот, договорная работа',
});

export const DOCUMENT_FILE_TEMPLATES = freezeList([
  { key: 'main', name: null, extension: 'pdf', format: 'PDF', size: '1,8 МБ' },
  { key: 'receipt', name: 'Receipt.pdf', format: 'PDF', size: '186 КБ' },
  { key: 'source', name: 'Исходник документа.docx', format: 'DOCX', size: '742 КБ' },
]);

export const DOCUMENTS_WORKSPACE_DEFAULTS = Object.freeze({
  selectedPackageId: 'package-1-1',
  expandedPackageIds: Object.freeze(['package-1']),
  includeNested: false,
  sortAscending: true,
  typeFilter: ALL_DOCUMENT_TYPES,
  pageSize: 25,
  pageSizes: Object.freeze([25, 50, 100]),
});

export const documentsWorkspaceMock = Object.freeze({
  packages: DOCUMENT_PACKAGES,
  creationOptions: DOCUMENT_CREATION_OPTIONS,
  documentTypes: DOCUMENT_TYPES,
  documentNameTemplates: DOCUMENT_NAME_TEMPLATES,
  attributeDefinitions: DOCUMENT_ATTRIBUTE_DEFINITIONS,
  attributeValues: DOCUMENT_ATTRIBUTE_VALUES,
  fileTemplates: DOCUMENT_FILE_TEMPLATES,
  defaults: DOCUMENTS_WORKSPACE_DEFAULTS,
});
