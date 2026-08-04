import { type CSSProperties, type KeyboardEvent, type PointerEvent as ReactPointerEvent, useEffect, useMemo, useRef, useState } from 'react';
import { ArchiveRestore, ArrowDownAZ, ArrowUpAZ, Check, ChevronDown, ChevronLeft, ChevronRight, CirclePlay, Copy, Download, Edit3, FileCog, FilePlus2, FileText, Filter, Folder, FolderInput, FolderMinus, FolderPlus, Link2, MoreVertical, MoveHorizontal, Plus, RefreshCw, Search, Settings, ShieldCheck, SlidersHorizontal, SquareArrowOutUpRight, Trash2, X } from 'lucide-react';
type PackageNode = {
  id: string;
  name: string;
  children?: PackageNode[];
};
type PackageSeed = {
  name: string;
  children?: PackageSeed[];
};
type DocumentRow = {
  id: string;
  name: string;
  number: string;
  type: string;
  date: string;
  version: number;
  changed: string;
};
type DocumentAttribute = {
  label: string;
  value: string;
  technical?: boolean;
};
type DocumentFile = {
  id: string;
  name: string;
  format: 'PDF' | 'DOCX';
  size: string;
};
const DEFAULT_SIDEBAR_WIDTH = 320;
const MIN_SIDEBAR_WIDTH = 272;
const MAX_SIDEBAR_WIDTH = 560;
const leaves = (...names: string[]): PackageSeed[] => names.map(name => ({
  name
}));
function materializePackages(seeds: PackageSeed[], prefix = 'package'): PackageNode[] {
  return seeds.map((seed, index) => {
    const id = `${prefix}-${index + 1}`;
    return {
      id,
      name: seed.name,
      children: seed.children ? materializePackages(seed.children, id) : undefined
    };
  });
}
const initialPackages: PackageNode[] = materializePackages([{
  name: '.',
  children: [{
    name: '1С ДО',
    children: [{
      name: 'Входящие из 1С',
      children: [{
        name: '2026 год',
        children: leaves('Январь — входящие документы', 'Февраль — входящие документы', 'Март — входящие документы', 'Апрель — входящие документы', 'Май — входящие документы', 'Июнь — входящие документы', 'Июль — входящие документы')
      }, ...leaves('2025 год', '2024 год', 'Нераспознанные документы', 'Ожидают маршрутизации', 'С ошибками синхронизации', 'Архив входящих из 1С')]
    }, ...leaves('Исходящие в 1С', 'Черновики обмена', 'Документы на согласовании', 'Документы на подписании', 'Ошибки интеграции', 'Журнал обмена', 'Архив 1С ДО')]
  }, {
    name: 'privatepackage_s.beregovoy',
    children: [{
      name: 'Таганрог 2000',
      children: [{
        name: 'Договоры и обязательства',
        children: leaves('Действующие договоры', 'Договоры на согласовании', 'Дополнительные соглашения', 'Протоколы разногласий', 'Акты исполнения обязательств', 'Договоры на расторжении', 'Архив договоров')
      }, ...leaves('Корпоративные документы', 'Входящая корреспонденция', 'Исходящая корреспонденция', 'Финансовые документы', 'Кадровые документы', 'Архив подразделения')]
    }, ...leaves('Личные документы', 'Временные материалы', 'Проекты документов', 'Документы для проверки', 'Совместная работа', 'Импортированные пакеты')]
  }, {
    name: 'ProcessTemporaryPackage'
  }, {
    name: 'АХР',
    children: [{
      name: 'Закупки и материальное обеспечение',
      children: [{
        name: 'Канцелярия и расходные материалы',
        children: leaves('Заявки подразделений', 'Коммерческие предложения', 'Счета на оплату', 'Накладные и УПД', 'Акты приемки', 'Реестр поставщиков', 'Архив закупок')
      }, ...leaves('Офисная техника', 'Хозяйственные товары', 'Мебель и оборудование', 'Спецодежда', 'Транспортные расходы', 'Складские остатки')]
    }, ...leaves('Эксплуатация помещений', 'Транспорт и логистика', 'Охрана труда', 'Пропуска и доступ', 'Командировки', 'Корпоративная связь', 'Архив АХР')]
  }, {
    name: 'Бухгалтерский и управленческий учет',
    children: [{
      name: 'Первичные документы',
      children: [{
        name: 'Поступление товаров и услуг',
        children: leaves('Счета поставщиков', 'Универсальные передаточные документы', 'Товарные накладные', 'Акты выполненных работ', 'Корректировочные документы', 'Документы с расхождениями', 'Архив поступлений')
      }, ...leaves('Реализация товаров и услуг', 'Авансовые отчеты', 'Банковские документы', 'Кассовые документы', 'Расчеты с контрагентами', 'Документы на проверке')]
    }, ...leaves('Управленческая отчетность', 'Бюджетирование', 'Налоговый учет', 'Заработная плата', 'Основные средства', 'Закрытие периода', 'Архив бухгалтерии')]
  }, {
    name: 'Входящие документы'
  }, {
    name: 'ДОВЕРЕННОСТЬ'
  }, {
    name: 'Договоры и обязательства',
    children: [{
      name: 'Действующие договоры',
      children: [{
        name: 'Договоры с поставщиками',
        children: leaves('ИТ и программное обеспечение', 'Аренда и эксплуатация', 'Консультационные услуги', 'Транспортные услуги', 'Маркетинг и реклама', 'Обучение сотрудников', 'Прочие поставщики')
      }, ...leaves('Договоры с заказчиками', 'Внутригрупповые договоры', 'Рамочные договоры', 'Лицензионные договоры', 'Договоры аренды', 'Договоры страхования')]
    }, ...leaves('Договоры на согласовании', 'Проекты договоров', 'Дополнительные соглашения', 'Протоколы разногласий', 'Обеспечение обязательств', 'Завершенные договоры', 'Архив договоров')]
  }, {
    name: 'Документооборот'
  }, {
    name: 'Документы',
    children: [{
      name: 'Проектная документация',
      children: [{
        name: 'Разделы проекта и рабочие материалы',
        children: leaves('Исходные требования', 'Функциональные спецификации', 'Архитектурные решения', 'Протоколы встреч', 'Макеты и визуальные материалы', 'Результаты тестирования', 'Архив версий')
      }, ...leaves('Планы проекта', 'Отчеты о статусе', 'Реестр решений', 'Реестр рисков', 'Проектная переписка', 'Итоговые материалы')]
    }, ...leaves('Организационные документы', 'Нормативные документы', 'Служебные записки', 'Протоколы и решения', 'Шаблоны документов', 'Общие материалы', 'Архив документов')]
  }, {
    name: 'Заявки'
  }, {
    name: 'Кадровые документы',
    children: [{
      name: 'Личные дела сотрудников',
      children: [{
        name: 'Действующие сотрудники',
        children: leaves('Руководители', 'Основной персонал', 'Удаленные сотрудники', 'Совместители', 'Стажеры', 'Временный персонал', 'Сотрудники на испытательном сроке')
      }, ...leaves('Уволенные сотрудники', 'Кандидаты', 'Переводы между подразделениями', 'Изменения персональных данных', 'Документы на ознакомлении', 'Архив личных дел')]
    }, ...leaves('Прием на работу', 'Переводы и изменения', 'Отпуска и отсутствия', 'Командировки', 'Обучение и аттестация', 'Увольнение', 'Архив кадровых документов')]
  }]
}]);
function nodeContains(node: PackageNode, normalizedQuery: string): boolean {
  return node.name.toLocaleLowerCase('ru').includes(normalizedQuery) || Boolean(node.children?.some(child => nodeContains(child, normalizedQuery)));
}
function filterNodes(nodes: PackageNode[], normalizedQuery: string): PackageNode[] {
  if (!normalizedQuery) return nodes;
  return nodes.filter(node => nodeContains(node, normalizedQuery)).map(node => ({
    ...node,
    children: node.children ? filterNodes(node.children, normalizedQuery) : undefined
  }));
}
function collectAncestorIds(nodes: PackageNode[], normalizedQuery: string, result = new Set<string>()) {
  nodes.forEach(node => {
    if (node.children?.some(child => nodeContains(child, normalizedQuery))) {
      result.add(node.id);
      collectAncestorIds(node.children, normalizedQuery, result);
    }
  });
  return result;
}
function findNode(nodes: PackageNode[], id: string): PackageNode | null {
  for (const node of nodes) {
    if (node.id === id) return node;
    const nested = node.children ? findNode(node.children, id) : null;
    if (nested) return nested;
  }
  return null;
}
function updateNodeName(nodes: PackageNode[], id: string, name: string): PackageNode[] {
  return nodes.map(node => ({
    ...node,
    name: node.id === id ? name : node.name,
    children: node.children ? updateNodeName(node.children, id, name) : undefined
  }));
}
function appendNode(nodes: PackageNode[], parentId: string, child: PackageNode): PackageNode[] {
  return nodes.map(node => {
    if (node.id === parentId) {
      return {
        ...node,
        children: [...(node.children ?? []), child]
      };
    }
    return {
      ...node,
      children: node.children ? appendNode(node.children, parentId, child) : undefined
    };
  });
}
function findNodePath(nodes: PackageNode[], id: string, path: PackageNode[] = []): PackageNode[] | null {
  for (const node of nodes) {
    const nextPath = [...path, node];
    if (node.id === id) return nextPath;
    const nested = node.children ? findNodePath(node.children, id, nextPath) : null;
    if (nested) return nested;
  }
  return null;
}
const documentNameTemplates = ['Партнерское соглашение о взаимодействии и порядке обмена документами', 'Договор подряда на выполнение проектных работ (редакция 2.1)', 'Информационное письмо о смене юридического адреса организации', 'Об утверждении графика отпусков сотрудников на 2026 год', 'Акт приема-передачи выполненных работ по этапу проекта', 'Дополнительное соглашение к договору оказания консультационных услуг', 'Заявка на приобретение оборудования для нового рабочего пространства', 'Протокол согласования существенных условий договора', 'Служебная записка о продлении срока исполнения обязательств', 'Приказ о проведении ежегодной инвентаризации имущества', 'Письмо о подтверждении долгосрочного сотрудничества', 'Универсальный передаточный документ по поставке оборудования', 'Доверенность на представление интересов организации', 'Отчет о выполнении работ и использовании бюджета проекта', 'Заявка на командирование сотрудников регионального подразделения'];
const documentTypes = ['Соглашение', 'Договор', 'Письмо', 'Приказ', 'Акт', 'Заявка', 'Доверенность'];
function hashString(value: string) {
  return value.split('').reduce((result, char) => result * 31 + char.charCodeAt(0) >>> 0, 7);
}
function generateDocuments(packageId: string, packageName: string, includeNested: boolean): DocumentRow[] {
  const seed = hashString(packageId);
  const count = 48 + seed % 17 + (includeNested ? 18 : 0);
  return Array.from({
    length: count
  }, (_, index) => {
    const type = documentTypes[(index + seed) % documentTypes.length];
    const day = String(index % 28 + 1).padStart(2, '0');
    const month = String((index * 3 + seed) % 12 + 1).padStart(2, '0');
    const changedDay = String(index % 27 + 2).padStart(2, '0');
    const name = index === 0 ? 'Партнерское соглашение (для prod)- ОТ 2026-04-09-СФ-42-К-26-PS' : `${documentNameTemplates[index % documentNameTemplates.length]}${index % 6 === 0 ? ` — ${packageName}` : ''}`;
    return {
      id: `${packageId}-document-${index + 1}`,
      name,
      number: index === 0 ? 'СФ-42-К-26-PS' : `${String(seed % 90 + 10)}-${String(index + 1).padStart(3, '0')}/26`,
      type,
      date: index === 0 ? '09.04.2026' : `${day}.${month}.2026`,
      version: index % 8 === 0 ? 3 : index % 4 === 0 ? 2 : 1,
      changed: index === 0 ? '09.04.2026' : `${changedDay}.${month}.2026`
    };
  });
}
function createDocumentAttributes(document: DocumentRow, packageName: string, selectedVersion: number): DocumentAttribute[] {
  const contractLike = document.type === 'Соглашение' || document.type === 'Договор';
  const referenceNumber = document.number.replace(/[^A-ZА-Я0-9-]/gi, '').slice(-18);
  const seed = hashString(document.id);
  const guidPart = seed.toString(16).padStart(8, '0');
  const contractValue = (value: string) => contractLike ? value : 'Не применяется для этого типа документа';
  return [{
    label: 'Тип документа',
    value: document.type
  }, {
    label: 'Наименование',
    value: document.name
  }, {
    label: 'Номер',
    value: document.number
  }, {
    label: 'Дата',
    value: document.date
  }, {
    label: 'План. дата договора',
    value: contractValue('31.12.2026')
  }, {
    label: 'Вид документа (справочник)',
    value: contractLike ? 'Договорной документ' : 'Организационно-распорядительный документ'
  }, {
    label: 'Тип договора (справочник)',
    value: contractValue(document.type === 'Соглашение' ? 'Партнерское соглашение' : 'Договор оказания услуг')
  }, {
    label: 'Организация (справочник)',
    value: 'ООО «Сфера Про»'
  }, {
    label: 'Автор',
    value: 'Береговой Сергей Александрович'
  }, {
    label: 'Номер доверенности подписанта организации',
    value: contractValue('70с02779-d134-48ac-bc83-89c1540bc9e4')
  }, {
    label: 'Контрагент (справочник)',
    value: contractValue('ООО «Вектор Проект»')
  }, {
    label: 'Прочие условия',
    value: contractValue('Автоматическая пролонгация на 12 месяцев при отсутствии возражений сторон')
  }, {
    label: 'Дата доверенности подписанта контрагента',
    value: contractValue('12.12.2025')
  }, {
    label: 'Дата доверенности подписанта организации',
    value: contractValue('15.01.2026')
  }, {
    label: 'Расчетные счета (справочник)',
    value: contractValue('40702 810 5 0000 0123456, ПАО Сбербанк')
  }, {
    label: 'Бизнес ключ Трекера',
    value: `DOC-${referenceNumber || document.id.toUpperCase()}`,
    technical: true
  }, {
    label: 'GUID мастер системы',
    value: `${guidPart}-7d1c-4dc1-b4d9-b11bed0ec64e`,
    technical: true
  }, {
    label: 'Заблокирован',
    value: 'Нет',
    technical: true
  }, {
    label: 'Вид договора',
    value: contractValue('Возмездный, двусторонний')
  }, {
    label: 'Представитель (организации)',
    value: contractValue('Кузнецова Мария Игоревна')
  }, {
    label: 'Тип документа основания представителя',
    value: contractValue('Доверенность')
  }, {
    label: 'Договор является типовым',
    value: contractValue('Да')
  }, {
    label: 'Мастер система',
    value: 'S.Docs ECM',
    technical: true
  }, {
    label: 'Номер доверенности подписанта контрагента',
    value: contractValue('77-АА-908')
  }, {
    label: 'Проект (справочник)',
    value: 'S.Docs / Документооборот'
  }, {
    label: 'БЮ (справочник)',
    value: 'Цифровые продукты'
  }, {
    label: 'Предмет договора',
    value: contractValue('Организация электронного документооборота и сопровождение совместных проектов')
  }, {
    label: 'Метод выбора контрагента (GUID 1С:ДО)',
    value: contractValue('По регистрационным данным организации'),
    technical: true
  }, {
    label: 'Email контрагента',
    value: contractValue('office@vector-project.example')
  }, {
    label: 'Статус',
    value: selectedVersion === document.version ? 'Действует' : 'Архивная версия'
  }, {
    label: 'Специализации (справочник)',
    value: 'Документооборот, договорная работа'
  }, {
    label: 'Пакет',
    value: packageName
  }];
}
function createDocumentFiles(document: DocumentRow): DocumentFile[] {
  const compactName = document.name.length > 54 ? `${document.name.slice(0, 51)}…` : document.name;
  return [{
    id: `${document.id}-main`,
    name: `${compactName}.pdf`,
    format: 'PDF',
    size: '1,8 МБ'
  }, {
    id: `${document.id}-receipt`,
    name: 'Receipt.pdf',
    format: 'PDF',
    size: '186 КБ'
  }, {
    id: `${document.id}-source`,
    name: 'Исходник документа.docx',
    format: 'DOCX',
    size: '742 КБ'
  }];
}
function getVisiblePages(currentPage: number, totalPages: number): Array<number | 'ellipsis'> {
  if (totalPages <= 7) return Array.from({
    length: totalPages
  }, (_, index) => index + 1);
  if (currentPage <= 3) return [1, 2, 3, 4, 'ellipsis', totalPages];
  if (currentPage >= totalPages - 2) return [1, 'ellipsis', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  return [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages];
}
function PackageName({
  name
}: {
  name: string;
}) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);
  useEffect(() => {
    const element = textRef.current;
    if (!element) return;
    const measure = () => setIsTruncated(element.scrollWidth > element.clientWidth + 1);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [name]);
  return <span ref={textRef} className="package-name" title={isTruncated ? name : undefined}>
      {name}
    </span>;
}
type TreeRowProps = {
  node: PackageNode;
  depth: number;
  isLast: boolean;
  ancestorContinuation: boolean[];
  selectedId: string;
  expandedIds: Set<string>;
  forcedExpandedIds: Set<string>;
  searchActive: boolean;
  openMenuId: string | null;
  editingId: string | null;
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
  onMenu: (id: string | null) => void;
  onStartCreate: (parentId: string) => void;
  onStartRename: (id: string) => void;
  onCommitRename: (id: string, value: string) => void;
};
function TreeRow({
  node,
  depth,
  isLast,
  ancestorContinuation,
  selectedId,
  expandedIds,
  forcedExpandedIds,
  searchActive,
  openMenuId,
  editingId,
  onSelect,
  onToggle,
  onMenu,
  onStartCreate,
  onStartRename,
  onCommitRename
}: TreeRowProps) {
  const hasChildren = Boolean(node.children?.length);
  const expanded = hasChildren && (expandedIds.has(node.id) || forcedExpandedIds.has(node.id));
  const selected = selectedId === node.id;
  const renameInput = useRef<HTMLInputElement>(null);
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(node.id);
    }
    if (event.key === 'ArrowRight' && hasChildren && !expanded) {
      event.preventDefault();
      onToggle(node.id);
    }
    if (event.key === 'ArrowLeft' && hasChildren && expanded && !searchActive) {
      event.preventDefault();
      onToggle(node.id);
    }
  };
  return <div className="package-tree-node">
      <div className={`package-row group ${selected ? 'is-selected' : ''}`} role="treeitem" aria-selected={selected} aria-expanded={hasChildren ? expanded : undefined} tabIndex={0} onKeyDown={handleKeyDown} onClick={() => onSelect(node.id)}>
        
        <div className="tree-indent" aria-hidden="true">
          {ancestorContinuation.map((continues, index) => <span key={`${node.id}-guide-${index}`} className={continues ? 'guide-line' : ''} />)}
          {depth > 0 && <span className={isLast ? 'guide-branch guide-branch-last' : 'guide-branch'} />}
        </div>

        <button type="button" className="folder-toggle" aria-label={hasChildren ? `${expanded ? 'Свернуть' : 'Развернуть'} пакет «${node.name}»` : `Пакет «${node.name}»`} aria-expanded={hasChildren ? expanded : undefined} onClick={event => {
        event.stopPropagation();
        if (hasChildren) onToggle(node.id);else onSelect(node.id);
      }}>
          
          {hasChildren ? expanded ? <FolderMinus size={18} strokeWidth={1.8} /> : <FolderPlus size={18} strokeWidth={1.8} /> : <Folder size={18} strokeWidth={1.8} />}
        </button>

        {editingId === node.id ? <input ref={renameInput} autoFocus className="rename-input" defaultValue={node.name} aria-label={`Новое название пакета «${node.name}»`} onClick={event => event.stopPropagation()} onKeyDown={event => {
        if (event.key === 'Enter') onCommitRename(node.id, event.currentTarget.value);
        if (event.key === 'Escape') onCommitRename(node.id, node.name);
      }} onBlur={event => onCommitRename(node.id, event.currentTarget.value)} /> : <PackageName name={node.name} />}

        <button type="button" className={`package-more ${openMenuId === node.id ? 'is-open' : ''}`} aria-label={`Действия пакета «${node.name}»`} aria-expanded={openMenuId === node.id} onClick={event => {
        event.stopPropagation();
        onMenu(openMenuId === node.id ? null : node.id);
      }}>
          
          <MoreVertical size={17} />
        </button>

        {openMenuId === node.id && <div className="package-menu" role="menu" onClick={event => event.stopPropagation()}>
            <button type="button" role="menuitem" onClick={() => onStartCreate(node.id)}>
              Создать вложенный
            </button>
            <button type="button" role="menuitem" onClick={() => onStartRename(node.id)}>
              Переименовать
            </button>
          </div>}
      </div>

      {expanded && node.children && <div role="group">
          {node.children.map((child, index) => <TreeRow key={child.id} node={child} depth={depth + 1} isLast={index === node.children!.length - 1} ancestorContinuation={[...ancestorContinuation, !isLast]} selectedId={selectedId} expandedIds={expandedIds} forcedExpandedIds={forcedExpandedIds} searchActive={searchActive} openMenuId={openMenuId} editingId={editingId} onSelect={onSelect} onToggle={onToggle} onMenu={onMenu} onStartCreate={onStartCreate} onStartRename={onStartRename} onCommitRename={onCommitRename} />)}
        </div>}
    </div>;
}
export const STrackerDocumentsPackageSidebar = () => {
  const [packages, setPackages] = useState(initialPackages);
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState('package-1-1');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['package-1']));
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [createParentId, setCreateParentId] = useState<string | null>(null);
  const [newPackageName, setNewPackageName] = useState('');
  const [createdId, setCreatedId] = useState<string | null>(null);
  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_SIDEBAR_WIDTH);
  const [isResizing, setIsResizing] = useState(false);
  const [includeNested, setIncludeNested] = useState(false);
  const [sortAscending, setSortAscending] = useState(true);
  const [typeFilter, setTypeFilter] = useState('Все типы');
  const [activeWorkspaceMenu, setActiveWorkspaceMenu] = useState<'filter' | 'settings' | 'more' | null>(null);
  const [openDocumentMenuId, setOpenDocumentMenuId] = useState<string | null>(null);
  const [visibleOptionalColumns, setVisibleOptionalColumns] = useState(new Set(['version', 'changed']));
  const [selectedDocumentIds, setSelectedDocumentIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [activeDocument, setActiveDocument] = useState<DocumentRow | null>(null);
  const [selectedDocumentVersion, setSelectedDocumentVersion] = useState(1);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [isDetailActionsOpen, setIsDetailActionsOpen] = useState(false);
  const detailCloseButtonRef = useRef<HTMLButtonElement>(null);
  const detailActionsRef = useRef<HTMLDivElement>(null);
  const detailActionsButtonRef = useRef<HTMLButtonElement>(null);
  const documentTriggerRef = useRef<HTMLElement | null>(null);
  const resizeStart = useRef({
    pointerX: 0,
    width: DEFAULT_SIDEBAR_WIDTH
  });
  const normalizedQuery = query.trim().toLocaleLowerCase('ru');
  const visiblePackages = useMemo(() => filterNodes(packages, normalizedQuery), [packages, normalizedQuery]);
  const forcedExpandedIds = useMemo(() => normalizedQuery ? collectAncestorIds(packages, normalizedQuery) : new Set<string>(), [packages, normalizedQuery]);
  const createParent = createParentId ? findNode(packages, createParentId) : null;
  const selectedPackage = findNode(packages, selectedId);
  const selectedPackagePath = findNodePath(packages, selectedId) ?? [];
  const packageBreadcrumbs = selectedPackagePath.filter(node => node.name !== '.');
  const allDocuments = useMemo(() => generateDocuments(selectedId, selectedPackage?.name ?? 'Документы', includeNested), [selectedId, selectedPackage?.name, includeNested]);
  const filteredDocuments = useMemo(() => {
    const filtered = typeFilter === 'Все типы' ? allDocuments : allDocuments.filter(document => document.type === typeFilter);
    return [...filtered].sort((first, second) => sortAscending ? first.name.localeCompare(second.name, 'ru') : second.name.localeCompare(first.name, 'ru'));
  }, [allDocuments, sortAscending, typeFilter]);
  const totalPages = Math.max(1, Math.ceil(filteredDocuments.length / pageSize));
  const normalizedCurrentPage = Math.min(currentPage, totalPages);
  const pageStart = (normalizedCurrentPage - 1) * pageSize;
  const pageDocuments = filteredDocuments.slice(pageStart, pageStart + pageSize);
  const allPageDocumentsSelected = pageDocuments.length > 0 && pageDocuments.every(document => selectedDocumentIds.has(document.id));
  const isDocumentDetailOpen = Boolean(activeDocument);
  const detailAttributes = useMemo(() => activeDocument ? createDocumentAttributes(activeDocument, selectedPackage?.name ?? 'Документы', selectedDocumentVersion) : [], [activeDocument, selectedDocumentVersion, selectedPackage?.name]);
  const detailFiles = useMemo(() => activeDocument ? createDocumentFiles(activeDocument) : [], [activeDocument]);
  useEffect(() => () => {
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, []);
  useEffect(() => {
    setCurrentPage(1);
    setSelectedDocumentIds(new Set());
    setOpenDocumentMenuId(null);
    setActiveDocument(null);
  }, [selectedId]);
  useEffect(() => {
    setCurrentPage(1);
  }, [includeNested, typeFilter, pageSize]);
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);
  useEffect(() => {
    if (!notice) return;
    const timeoutId = window.setTimeout(() => setNotice(null), 2400);
    return () => window.clearTimeout(timeoutId);
  }, [notice]);
  useEffect(() => {
    if (!isDocumentDetailOpen) return;
    detailCloseButtonRef.current?.focus({
      preventScroll: true
    });
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDocument(null);
        setIsDetailActionsOpen(false);
        window.setTimeout(() => documentTriggerRef.current?.focus(), 0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDocumentDetailOpen]);
  useEffect(() => {
    if (!isDetailActionsOpen) return;
    const handlePointerDown = (event: globalThis.PointerEvent) => {
      if (!detailActionsRef.current?.contains(event.target as Node)) setIsDetailActionsOpen(false);
    };
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      event.stopImmediatePropagation();
      setIsDetailActionsOpen(false);
      detailActionsButtonRef.current?.focus();
    };
    document.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown, true);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [isDetailActionsOpen]);
  const clampWidth = (width: number) => Math.min(MAX_SIDEBAR_WIDTH, Math.max(MIN_SIDEBAR_WIDTH, width));
  const beginResize = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    resizeStart.current = {
      pointerX: event.clientX,
      width: sidebarWidth
    };
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    setIsResizing(true);
  };
  const resizeSidebar = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isResizing) return;
    setSidebarWidth(clampWidth(resizeStart.current.width + event.clientX - resizeStart.current.pointerX));
  };
  const finishResize = (event?: ReactPointerEvent<HTMLDivElement>) => {
    if (event?.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    setIsResizing(false);
  };
  const resetSidebarWidth = () => setSidebarWidth(DEFAULT_SIDEBAR_WIDTH);
  const handleResizeKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 40 : 16;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setSidebarWidth(width => clampWidth(width - step));
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      setSidebarWidth(width => clampWidth(width + step));
    }
    if (event.key === 'Home') {
      event.preventDefault();
      resetSidebarWidth();
    }
  };
  const toggleNode = (id: string) => {
    if (normalizedQuery) return;
    setExpandedIds(current => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);else next.add(id);
      return next;
    });
  };
  const selectNode = (id: string) => {
    setSelectedId(id);
    setOpenMenuId(null);
  };
  const toggleDocument = (id: string) => {
    setSelectedDocumentIds(current => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);else next.add(id);
      return next;
    });
  };
  const togglePageDocuments = () => {
    setSelectedDocumentIds(current => {
      const next = new Set(current);
      pageDocuments.forEach(document => {
        if (allPageDocumentsSelected) next.delete(document.id);else next.add(document.id);
      });
      return next;
    });
  };
  const toggleOptionalColumn = (column: 'version' | 'changed') => {
    setVisibleOptionalColumns(current => {
      const next = new Set(current);
      if (next.has(column)) next.delete(column);else next.add(column);
      return next;
    });
  };
  const refreshDocuments = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    window.setTimeout(() => {
      setIsRefreshing(false);
      setNotice('Список документов обновлен');
    }, 650);
  };
  const showActionNotice = (message: string) => {
    setActiveWorkspaceMenu(null);
    setOpenDocumentMenuId(null);
    setNotice(message);
  };
  const runDetailAction = (message: string) => {
    setIsDetailActionsOpen(false);
    setNotice(message);
  };
  const openDocumentDetail = (document: DocumentRow, trigger?: HTMLElement) => {
    documentTriggerRef.current = trigger ?? null;
    const files = createDocumentFiles(document);
    setActiveDocument(document);
    setSelectedDocumentVersion(document.version);
    setSelectedFileId(files[0]?.id ?? null);
    setIsDetailActionsOpen(false);
    setOpenDocumentMenuId(null);
    setActiveWorkspaceMenu(null);
  };
  const closeDocumentDetail = () => {
    setActiveDocument(null);
    setIsDetailActionsOpen(false);
    window.setTimeout(() => documentTriggerRef.current?.focus(), 0);
  };
  const copyDocumentLink = async () => {
    if (!activeDocument) return;
    try {
      await navigator.clipboard?.writeText(`https://s-tracker.local/documents/${activeDocument.id}?version=${selectedDocumentVersion}`);
    } catch {

      // The canvas preview may not expose clipboard permissions; feedback still confirms the intended action.
    }
    setNotice('Ссылка на документ скопирована');
  };
  const startCreate = (parentId: string) => {
    setCreateParentId(parentId);
    setNewPackageName('');
    setOpenMenuId(null);
  };
  const createPackage = () => {
    const name = newPackageName.trim();
    const parentId = createParentId ?? 'package-1';
    if (!name) return;
    const id = `package-${Date.now()}`;
    setPackages(current => appendNode(current, parentId, {
      id,
      name
    }));
    setExpandedIds(current => new Set([...current, parentId]));
    setSelectedId(id);
    setCreatedId(id);
    setCreateParentId(null);
    setNewPackageName('');
  };
  const commitRename = (id: string, value: string) => {
    const name = value.trim();
    if (name) setPackages(current => updateNodeName(current, id, name));
    setEditingId(null);
  };
  const sidebarStyle = {
    '--package-sidebar-width': `${sidebarWidth}px`
  } as CSSProperties;
  return <main className="s-tracker-frame" aria-label="Прототип раздела «Документы»">
      <aside className={`package-sidebar ${isResizing ? 'is-resizing' : ''}`} style={sidebarStyle} aria-label="Пакеты документов">
        
        <header className="package-sidebar-header">
          <div className="package-search-wrap">
            <Search size={17} aria-hidden="true" />
            <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Поиск по названию пакета" aria-label="Поиск по названию пакета" />
            
            {query && <button type="button" aria-label="Очистить поиск" onClick={() => setQuery('')}>
                <X size={15} />
              </button>}
          </div>
        </header>

        <div className="package-tree-scroll">
          {createParentId && <form className="create-package-form" onSubmit={event => {
          event.preventDefault();
          createPackage();
        }}>
            
              <div>
                Новый пакет {createParent && <span>в «{createParent.name}»</span>}
              </div>
              <div className="create-package-controls">
                <input autoFocus value={newPackageName} onChange={event => setNewPackageName(event.target.value)} placeholder="Название пакета" aria-label="Название нового пакета" />
              
                <button type="submit" disabled={!newPackageName.trim()} aria-label="Создать пакет">
                  <Check size={16} />
                </button>
                <button type="button" aria-label="Отменить" onClick={() => setCreateParentId(null)}>
                  <X size={16} />
                </button>
              </div>
            </form>}

          <div className="package-tree" role="tree" aria-label="Дерево пакетов">
            {visiblePackages.length ? visiblePackages.map((node, index) => <TreeRow key={node.id} node={node} depth={0} isLast={index === visiblePackages.length - 1} ancestorContinuation={[]} selectedId={selectedId} expandedIds={expandedIds} forcedExpandedIds={forcedExpandedIds} searchActive={Boolean(normalizedQuery)} openMenuId={openMenuId} editingId={editingId} onSelect={selectNode} onToggle={toggleNode} onMenu={setOpenMenuId} onStartCreate={startCreate} onStartRename={id => {
            setEditingId(id);
            setOpenMenuId(null);
          }} onCommitRename={commitRename} />) : <div className="package-empty">
                <Folder size={22} />
                <p>Пакеты не найдены</p>
                <button type="button" onClick={() => setQuery('')}>Сбросить поиск</button>
              </div>}
          </div>
        </div>

        <footer className="package-sidebar-footer">
          <button type="button" className="create-package-button" onClick={() => startCreate('package-1')}>
            <Plus size={17} />
            <span>Создать пакет</span>
          </button>
        </footer>

        <div className="sidebar-resize-handle" role="separator" aria-label="Изменить ширину панели пакетов" aria-orientation="vertical" aria-valuemin={MIN_SIDEBAR_WIDTH} aria-valuemax={MAX_SIDEBAR_WIDTH} aria-valuenow={sidebarWidth} tabIndex={0} title="Перетащите для изменения ширины. Двойной клик — ширина по умолчанию" onPointerDown={beginResize} onPointerMove={resizeSidebar} onPointerUp={finishResize} onPointerCancel={finishResize} onDoubleClick={resetSidebarWidth} onKeyDown={handleResizeKeyDown}>
          
          <span className="resize-indicator" aria-hidden="true">
            <MoveHorizontal size={13} strokeWidth={2.2} />
          </span>
        </div>

        <div className="sr-only" aria-live="polite">
          {createdId ? `Пакет ${findNode(packages, createdId)?.name ?? ''} создан` : ''}
        </div>
      </aside>

      <section className="documents-workspace" aria-label="Документы выбранного пакета">
        <header className="documents-context-bar">
          <nav className="package-breadcrumbs" aria-label="Путь выбранного пакета">
            <span className="breadcrumbs-root">Документы</span>
            {packageBreadcrumbs.map((node, index) => <span key={node.id} className="breadcrumb-segment">
                <ChevronRight size={14} aria-hidden="true" />
                <button type="button" className={index === packageBreadcrumbs.length - 1 ? 'is-current' : ''} onClick={() => selectNode(node.id)}>
                  {node.name}
                </button>
              </span>)}
          </nav>
          <span className="documents-count">{filteredDocuments.length} документов</span>
        </header>

        <div className="documents-toolbar">
          <div className="documents-toolbar-left">
            <div className="workspace-menu-anchor">
              <button type="button" className={`toolbar-button ${typeFilter !== 'Все типы' ? 'is-active' : ''}`} aria-expanded={activeWorkspaceMenu === 'filter'} onClick={() => setActiveWorkspaceMenu(activeWorkspaceMenu === 'filter' ? null : 'filter')}>
                <Filter size={16} />
                <span>Фильтры</span>
                {typeFilter !== 'Все типы' && <span className="filter-count">1</span>}
              </button>
              {activeWorkspaceMenu === 'filter' && <div className="workspace-popover filter-popover" role="dialog" aria-label="Фильтр документов по типу">
                  <div className="workspace-popover-title">Тип документа</div>
                  {['Все типы', ...documentTypes].map(type => <button key={type} type="button" className={typeFilter === type ? 'is-selected' : ''} onClick={() => {
                setTypeFilter(type);
                setActiveWorkspaceMenu(null);
              }}>
                      <span>{type}</span>
                      {typeFilter === type && <Check size={15} />}
                    </button>)}
                </div>}
            </div>

            <button type="button" className="icon-toolbar-button" aria-label={sortAscending ? 'Сортировка по наименованию: по возрастанию' : 'Сортировка по наименованию: по убыванию'} title={sortAscending ? 'По возрастанию' : 'По убыванию'} onClick={() => setSortAscending(value => !value)}>
              {sortAscending ? <ArrowDownAZ size={17} /> : <ArrowUpAZ size={17} />}
            </button>

            <div className="workspace-menu-anchor">
              <button type="button" className="icon-toolbar-button" aria-label="Настройки колонок" aria-expanded={activeWorkspaceMenu === 'settings'} onClick={() => setActiveWorkspaceMenu(activeWorkspaceMenu === 'settings' ? null : 'settings')}>
                <Settings size={17} />
              </button>
              {activeWorkspaceMenu === 'settings' && <div className="workspace-popover settings-popover" role="dialog" aria-label="Настройки колонок таблицы">
                  <div className="workspace-popover-title">Колонки таблицы</div>
                  <label><input type="checkbox" checked disabled />Наименование</label>
                  <label><input type="checkbox" checked disabled />Номер</label>
                  <label><input type="checkbox" checked disabled />Тип документа</label>
                  <label><input type="checkbox" checked={visibleOptionalColumns.has('version')} onChange={() => toggleOptionalColumn('version')} />Версия</label>
                  <label><input type="checkbox" checked={visibleOptionalColumns.has('changed')} onChange={() => toggleOptionalColumn('changed')} />Последнее изменение</label>
                </div>}
            </div>

            <div className="workspace-menu-anchor">
              <button type="button" className="icon-toolbar-button" aria-label="Дополнительные действия списка" aria-expanded={activeWorkspaceMenu === 'more'} onClick={() => setActiveWorkspaceMenu(activeWorkspaceMenu === 'more' ? null : 'more')}>
                <MoreVertical size={17} />
              </button>
              {activeWorkspaceMenu === 'more' && <div className="workspace-popover list-actions-popover" role="menu">
                  <button type="button" role="menuitem" onClick={() => showActionNotice('Выгрузка списка подготовлена')}><Download size={15} />Выгрузить список</button>
                  <button type="button" role="menuitem" onClick={() => showActionNotice('Параметры отображения сохранены')}><SlidersHorizontal size={15} />Сохранить представление</button>
                </div>}
            </div>

            <label className="nested-documents-toggle">
              <input type="checkbox" checked={includeNested} onChange={event => setIncludeNested(event.target.checked)} />
              <span className="toggle-track"><span /></span>
              <span>Включая вложенные</span>
            </label>
          </div>

          <div className="documents-toolbar-right">
            <button type="button" className={`icon-toolbar-button ${isRefreshing ? 'is-refreshing' : ''}`} aria-label="Обновить список документов" onClick={refreshDocuments}>
              <RefreshCw size={17} />
            </button>
            <button type="button" className="toolbar-button toolbar-button-secondary" onClick={() => showActionNotice('Открыты права доступа пакета')}>
              <ShieldCheck size={16} />
              <span>Права доступа</span>
            </button>
            <button type="button" className="toolbar-button toolbar-button-secondary" onClick={() => showActionNotice('Открыт выбор документов для добавления')}>
              <FolderInput size={16} />
              <span>Добавить в пакет</span>
            </button>
            <button type="button" className="toolbar-button toolbar-button-primary" onClick={() => showActionNotice('Открыт выбор способа создания документа')}>
              <FilePlus2 size={16} />
              <span>Создать новый документ</span>
            </button>
          </div>
        </div>

        <div className="documents-table-scroll">
          <table className="documents-table">
            <thead>
              <tr>
                <th className="document-selection-column">
                  <input type="checkbox" aria-label="Выбрать все документы на странице" checked={allPageDocumentsSelected} onChange={togglePageDocuments} />
                </th>
                <th className="document-name-column">Наименование</th>
                <th>Номер</th>
                <th>Тип документа</th>
                <th>Дата документа</th>
                {visibleOptionalColumns.has('version') && <th className="document-version-column">Версия</th>}
                {visibleOptionalColumns.has('changed') && <th>Последнее изменение</th>}
                <th className="document-actions-column"><span className="sr-only">Действия</span></th>
              </tr>
            </thead>
            <tbody>
              {pageDocuments.length ? pageDocuments.map(document => {
              const isSelected = selectedDocumentIds.has(document.id);
              const isDetailActive = activeDocument?.id === document.id;
              return <tr key={document.id} className={`${isSelected ? 'is-selected' : ''} ${isDetailActive ? 'is-detail-active' : ''}`.trim()} onClick={() => toggleDocument(document.id)}>
                    <td className="document-selection-column">
                      <input type="checkbox" aria-label={`Выбрать документ «${document.name}»`} checked={isSelected} onClick={event => event.stopPropagation()} onChange={() => toggleDocument(document.id)} />
                    </td>
                    <td className="document-name-column">
                      <button type="button" className="document-name-button" title={document.name} onClick={event => {
                    event.stopPropagation();
                    openDocumentDetail(document, event.currentTarget);
                  }}>
                        <FileText size={16} />
                        <span>{document.name}</span>
                      </button>
                    </td>
                    <td>{document.number}</td>
                    <td>{document.type}</td>
                    <td>{document.date}</td>
                    {visibleOptionalColumns.has('version') && <td className="document-version-column">{document.version}</td>}
                    {visibleOptionalColumns.has('changed') && <td>{document.changed}</td>}
                    <td className="document-actions-column">
                      <div className="document-row-menu-anchor">
                        <button type="button" className="document-row-menu-button" aria-label={`Действия документа «${document.name}»`} aria-expanded={openDocumentMenuId === document.id} onClick={event => {
                      event.stopPropagation();
                      setOpenDocumentMenuId(openDocumentMenuId === document.id ? null : document.id);
                    }}>
                          <MoreVertical size={17} />
                        </button>
                        {openDocumentMenuId === document.id && <div className="document-row-menu" role="menu" onClick={event => event.stopPropagation()}>
                            <button type="button" role="menuitem" onClick={event => openDocumentDetail(document, event.currentTarget)}>Открыть карточку</button>
                            <button type="button" role="menuitem" onClick={() => showActionNotice('Файл документа подготовлен к скачиванию')}>Скачать</button>
                            <button type="button" role="menuitem" onClick={() => showActionNotice('Открыты связи документа')}>Показать связи</button>
                          </div>}
                      </div>
                    </td>
                  </tr>;
            }) : <tr className="documents-empty-row">
                  <td colSpan={8}>
                    <Folder size={24} />
                    <strong>В пакете нет документов выбранного типа</strong>
                    <button type="button" onClick={() => setTypeFilter('Все типы')}>Сбросить фильтр</button>
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>

        <footer className="documents-pagination-bar">
          <div className="pagination-summary">
            {filteredDocuments.length ? `${pageStart + 1}–${Math.min(pageStart + pageSize, filteredDocuments.length)} из ${filteredDocuments.length}` : '0 документов'}
          </div>
          <nav className={`documents-pagination ${totalPages <= 1 ? 'is-hidden' : ''}`} aria-label="Страницы документов пакета">
            <button type="button" className="pagination-button pagination-arrow" aria-label="Предыдущая страница" disabled={normalizedCurrentPage === 1} onClick={() => setCurrentPage(page => Math.max(1, page - 1))}>
              <ChevronLeft size={16} />
            </button>
            {getVisiblePages(normalizedCurrentPage, totalPages).map((page, index) => page === 'ellipsis' ? <span key={`ellipsis-${index}`} className="pagination-ellipsis" aria-hidden="true">…</span> : <button key={page} type="button" className={`pagination-button ${page === normalizedCurrentPage ? 'is-active' : ''}`} aria-label={`Страница ${page}`} aria-current={page === normalizedCurrentPage ? 'page' : undefined} onClick={() => setCurrentPage(page)}>{page}</button>)}
            <button type="button" className="pagination-button pagination-arrow" aria-label="Следующая страница" disabled={normalizedCurrentPage === totalPages} onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}>
              <ChevronRight size={16} />
            </button>
          </nav>
          <label className="page-size-control">
            <span>Показывать по</span>
            <select value={pageSize} onChange={event => setPageSize(Number(event.target.value))} aria-label="Количество документов на странице">
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <ChevronDown size={14} aria-hidden="true" />
          </label>
        </footer>

        {activeDocument && <section className="document-detail-layer" role="dialog" aria-modal="false" aria-labelledby="document-detail-title" aria-describedby="document-detail-navigation-hint">
            <header className="document-detail-header">
              <div className="document-detail-title-row">
                <div className="document-detail-heading">
                  <h1 id="document-detail-title" title={activeDocument.name}>{activeDocument.name}</h1>
                  <span id="document-detail-navigation-hint" className="sr-only">Для переключения документа выберите другое наименование в видимой части таблицы.</span>
                </div>
                <button ref={detailCloseButtonRef} type="button" className="document-detail-close" aria-label="Закрыть карточку документа" title="Закрыть (Esc)" onClick={closeDocumentDetail}>
                  <X size={20} />
                </button>
              </div>

              <div className="document-detail-toolbar" aria-label="Инструменты карточки документа">
                <button type="button" className="detail-icon-button" aria-label="Открыть документ в отдельном окне" title="Открыть в отдельном окне" onClick={() => setNotice('Документ открыт в отдельном окне')}>
                  <SquareArrowOutUpRight size={16} />
                </button>
                <label className="document-version-control">
                  <span className="sr-only">Версия документа</span>
                  <FileText size={15} aria-hidden="true" />
                  <select value={selectedDocumentVersion} onChange={event => setSelectedDocumentVersion(Number(event.target.value))}>
                    {Array.from({
                  length: activeDocument.version
                }, (_, index) => activeDocument.version - index).map(version => <option key={version} value={version}>Версия {version} от {activeDocument.date}</option>)}
                  </select>
                  <ChevronDown size={14} aria-hidden="true" />
                </label>

                <div ref={detailActionsRef} className="detail-actions-anchor">
                  <button ref={detailActionsButtonRef} type="button" className="detail-toolbar-button" aria-haspopup="menu" aria-controls="document-detail-actions-menu" aria-expanded={isDetailActionsOpen} onClick={() => setIsDetailActionsOpen(value => !value)}>
                    <span>Действия</span>
                    <ChevronDown size={14} />
                  </button>
                  {isDetailActionsOpen && <div id="document-detail-actions-menu" className="detail-actions-menu" role="menu" aria-label="Действия с документом">
                      <div className="detail-actions-group">
                        <button type="button" role="menuitem" onClick={() => runDetailAction('Открыт договор «Демо Контрактс 12-11-2025»')}><CirclePlay size={16} />Демо Контрактс 12-11-2025</button>
                      </div>
                      <div className="detail-actions-separator" role="separator" />
                      <div className="detail-actions-group">
                        <button type="button" role="menuitem" onClick={() => runDetailAction('Документ показан в архиве')}><ArchiveRestore size={16} />Показать в архиве</button>
                        <button type="button" role="menuitem" onClick={() => runDetailAction('Открыты пакеты документа')}><Folder size={16} />Пакеты документа</button>
                        <button type="button" role="menuitem" onClick={() => runDetailAction('Открыты связи документа')}><Link2 size={16} />Связи документа</button>
                      </div>
                      <div className="detail-actions-separator" role="separator" />
                      <div className="detail-actions-group">
                        <button type="button" role="menuitem" onClick={() => runDetailAction('Открыт режим редактирования документа')}><Edit3 size={16} />Редактировать</button>
                        <button type="button" role="menuitem" onClick={() => runDetailAction('Открыт выбор типа документа')}><FileCog size={16} />Изменить тип</button>
                      </div>
                      <div className="detail-actions-separator" role="separator" />
                      <div className="detail-actions-group">
                        <button type="button" role="menuitem" onClick={() => runDetailAction('Создана копия документа')}><Copy size={16} />Создать копию</button>
                        <button type="button" role="menuitem" onClick={() => runDetailAction('Создана новая версия документа')}><FilePlus2 size={16} />Создать версию</button>
                        <button type="button" role="menuitem" onClick={() => runDetailAction('Атрибутивный состав подготовлен к скачиванию')}><Download size={16} />Скачать атрибутивный состав</button>
                        <button type="button" role="menuitem" onClick={() => runDetailAction('Файлы документа подготовлены к скачиванию')}><Download size={16} />Скачать файлы</button>
                      </div>
                      <div className="detail-actions-separator" role="separator" />
                      <div className="detail-actions-group">
                        <button type="button" role="menuitem" className="is-destructive" onClick={() => runDetailAction('Документ помечен на удаление')}><Trash2 size={16} />Пометить на удаление</button>
                      </div>
                    </div>}
                </div>

                <button type="button" className="copy-document-link" onClick={copyDocumentLink}>
                  <Copy size={15} />
                  <span>Копировать ссылку</span>
                </button>
              </div>
            </header>

            <div className="document-detail-content">
              <section className="document-attributes-panel" aria-labelledby="document-attributes-title">
                <div className="detail-panel-heading">
                  <h2 id="document-attributes-title">Атрибуты</h2>
                  <span className="detail-panel-count">{detailAttributes.length}</span>
                </div>
                <div className="document-attributes-grid">
                  {detailAttributes.map(attribute => <div key={attribute.label} className={`document-attribute-cell ${attribute.technical ? 'is-technical' : ''}`}>
                      <div className="document-attribute-label">
                        <span>{attribute.label}</span>
                        {attribute.technical && <span className="technical-badge">Системный</span>}
                      </div>
                      <div className="document-attribute-value" title={attribute.value}>{attribute.value}</div>
                    </div>)}
                </div>
              </section>

              <aside className="document-files-panel" aria-labelledby="document-files-title">
                <div className="detail-panel-heading files-heading">
                  <h2 id="document-files-title">Файлы</h2>
                  <span className="detail-panel-count">{detailFiles.length}</span>
                </div>
                <div className="document-files-list">
                  {detailFiles.map(file => <div key={file.id} className={`document-file-row ${selectedFileId === file.id ? 'is-selected' : ''}`}>
                      <button type="button" className="document-file-select" aria-pressed={selectedFileId === file.id} onClick={() => setSelectedFileId(file.id)}>
                        <span className={`document-file-icon is-${file.format.toLocaleLowerCase()}`}>
                          <FileText size={22} />
                          <small>{file.format}</small>
                        </span>
                        <span className="document-file-meta">
                          <strong title={file.name}>{file.name}</strong>
                          <span>{file.format} · {file.size}</span>
                        </span>
                      </button>
                      <button type="button" className="document-file-download" aria-label={`Скачать ${file.name}`} title="Скачать" onClick={() => setNotice(`Файл «${file.name}» подготовлен к скачиванию`)}><Download size={16} /></button>
                    </div>)}
                </div>
              </aside>
            </div>

            <footer className="document-detail-footer">
              <div className="document-detail-footer-actions">
                <button type="button" className="detail-footer-secondary" onClick={closeDocumentDetail}>Закрыть</button>
                <button type="button" className="detail-footer-primary" onClick={() => setNotice('Открыт режим редактирования атрибутов')}>
                  <Edit3 size={15} />
                  <span>Редактировать атрибуты</span>
                </button>
              </div>
            </footer>
          </section>}

        {selectedDocumentIds.size > 0 && <div className="documents-selection-bar" role="status">
            <span>Выбрано: {selectedDocumentIds.size}</span>
            <button type="button" onClick={() => showActionNotice('Выбранные документы добавлены в пакет')}><FolderInput size={15} />Добавить в пакет</button>
            <button type="button" onClick={() => showActionNotice('Выбранные документы подготовлены к скачиванию')}><Download size={15} />Скачать</button>
            <button type="button" className="selection-clear" aria-label="Снять выделение" onClick={() => setSelectedDocumentIds(new Set())}><X size={15} /></button>
          </div>}

        {notice && <div className="documents-toast" role="status">
            <Check size={16} />
            <span>{notice}</span>
          </div>}
      </section>
    </main>;
};
