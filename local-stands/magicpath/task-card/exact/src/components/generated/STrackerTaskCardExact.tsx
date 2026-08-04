import { useRef, useState, type KeyboardEvent, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { Select, type SelectOption } from "./Select";
const DEFAULT_DRAWER_WIDTH = 740;
const MIN_DRAWER_WIDTH = 520;
const MAX_DRAWER_WIDTH = 1100;
const steps = ["Потребность", "Контрагент", "Стоимость и бюджет", "Условия оплаты", "Сроки и формат"];
const taskTitle = "Создайте заявку на приобретение оборудования и организацию работ для обеспечения потребности административно-хозяйственного подразделения";
const constructionObjects: SelectOption[] = [{
  value: "north-terminal",
  label: "Северный терминал"
}, {
  value: "industrial-park",
  label: "Индустриальный парк"
}, {
  value: "office-complex",
  label: "Офисный комплекс"
}];
const currencyOptions: SelectOption[] = [{
  value: "rub",
  label: "Российский рубль (RUB)"
}];
const historyItems = [{
  id: 1,
  date: "01.08.2026",
  time: "10:12",
  text: "Задача взята в работу Олегом Федоровым."
}, {
  id: 2,
  date: "01.08.2026",
  time: "10:05",
  text: "Сохранён черновик первого шага заявки."
}, {
  id: 3,
  date: "01.08.2026",
  time: "09:58",
  text: "Изменено значение поля «Предмет договора»."
}, {
  id: 4,
  date: "01.08.2026",
  time: "09:50",
  text: "Исполнителем задачи назначен Олег Федоров."
}, {
  id: 5,
  date: "01.08.2026",
  time: "09:45",
  text: "Создана задача по процессу «Заявка на потребность АХР»."
}];
const comments = [{
  id: 1,
  initials: "АС",
  name: "Смирнова Анна Викторовна",
  role: "Руководитель проекта",
  date: "01.08.2026",
  time: "10:20",
  text: "Проверьте объект строительства перед подтверждением первого шага."
}, {
  id: 2,
  initials: "ОФ",
  name: "Федоров Олег Сергеевич",
  role: "Исполнитель задачи",
  date: "01.08.2026",
  time: "10:16",
  text: "Объект строительства уточняю у инициатора заявки."
}, {
  id: 3,
  initials: "МК",
  name: "Кузнецова Мария Андреевна",
  role: "Инициатор заявки",
  date: "01.08.2026",
  time: "10:11",
  text: "Для заявки необходимо выбрать объект «Северный терминал»."
}, {
  id: 4,
  initials: "ОФ",
  name: "Федоров Олег Сергеевич",
  role: "Исполнитель задачи",
  date: "01.08.2026",
  time: "10:07",
  text: "Значение принято, внесу его в первый шаг."
}, {
  id: 5,
  initials: "АС",
  name: "Смирнова Анна Викторовна",
  role: "Руководитель проекта",
  date: "01.08.2026",
  time: "10:02",
  text: "Проверьте также формулировку предмета договора."
}, {
  id: 6,
  initials: "ЕВ",
  name: "Волкова Елена Игоревна",
  role: "Бизнес-аналитик",
  date: "01.08.2026",
  time: "09:57",
  text: "Формулировка должна соответствовать данным исходной заявки."
}, {
  id: 7,
  initials: "ОФ",
  name: "Федоров Олег Сергеевич",
  role: "Исполнитель задачи",
  date: "01.08.2026",
  time: "09:52",
  text: "Использовал наименование из карточки потребности."
}, {
  id: 8,
  initials: "ДП",
  name: "Петров Дмитрий Алексеевич",
  role: "Специалист по закупкам",
  date: "01.08.2026",
  time: "09:48",
  text: "На следующем этапе потребуется подтвердить контрагента."
}, {
  id: 9,
  initials: "МК",
  name: "Кузнецова Мария Андреевна",
  role: "Инициатор заявки",
  date: "31.07.2026",
  time: "18:24",
  text: "Контрагент будет выбран после согласования потребности."
}, {
  id: 10,
  initials: "АС",
  name: "Смирнова Анна Викторовна",
  role: "Руководитель проекта",
  date: "31.07.2026",
  time: "18:10",
  text: "Сначала завершите заполнение обязательных полей текущего шага."
}, {
  id: 11,
  initials: "ОФ",
  name: "Федоров Олег Сергеевич",
  role: "Исполнитель задачи",
  date: "31.07.2026",
  time: "17:56",
  text: "Принял задачу, приступаю к заполнению заявки."
}, {
  id: 12,
  initials: "ЕВ",
  name: "Волкова Елена Игоревна",
  role: "Бизнес-аналитик",
  date: "31.07.2026",
  time: "17:43",
  text: "Если справочник не загрузится, сохраните черновик шага."
}, {
  id: 13,
  initials: "ДП",
  name: "Петров Дмитрий Алексеевич",
  role: "Специалист по закупкам",
  date: "31.07.2026",
  time: "17:31",
  text: "Стоимость и бюджет заполняются после выбора контрагента."
}, {
  id: 14,
  initials: "МК",
  name: "Кузнецова Мария Андреевна",
  role: "Инициатор заявки",
  date: "31.07.2026",
  time: "17:18",
  text: "Все исходные данные по потребности приложены к задаче."
}];
type ContentView = "default" | "history" | "comments";
const IconButton = ({
  label,
  onClick,
  children
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) => <button type="button" onClick={onClick} aria-label={label} title={label} className="inline-grid h-9 w-9 shrink-0 place-items-center rounded-md border border-[#d8dee8] bg-white text-[#475467] transition hover:border-[#b9c5d5] hover:bg-[#f8fafc] hover:text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007bfb]/35">
  
    {children}
  </button>;
const ChevronIcon = ({
  expanded
}: {
  expanded: boolean;
}) => <svg aria-hidden="true" viewBox="0 0 20 20" className={`h-5 w-5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
  
    <path d="m5 7.5 5 5 5-5" />
  </svg>;
const CloseIcon = () => <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
  
    <path d="M5 5l10 10M15 5 5 15" />
  </svg>;
const TaskIcon = () => <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="3.5" width="14" height="17" rx="2" />
    <path d="M9 3.5h6v3H9zM8.5 11l1.5 1.5 3-3M8.5 16l1.5 1.5 3-3M15.5 11h1M15.5 16h1" />
  </svg>;
const SaveIcon = () => <svg aria-hidden="true" viewBox="0 0 20 20" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
  
    <path d="M4 3.5h10.3L16.5 5.7v10.8h-13v-13Z" />
    <path d="M6.5 3.5v5h7v-5M6.5 16.5v-5h7v5" />
  </svg>;
const HistoryIcon = () => <svg aria-hidden="true" viewBox="0 0 20 20" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
  
    <path d="M4.2 6.7A6.5 6.5 0 1 1 3.5 10" />
    <path d="M4.2 3.5v3.2H1" />
    <path d="M10 6.5V10l2.6 1.6" />
  </svg>;
const CommentIcon = () => <svg aria-hidden="true" viewBox="0 0 20 20" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
  
    <path d="M4.5 4h11A1.5 1.5 0 0 1 17 5.5v7a1.5 1.5 0 0 1-1.5 1.5H9l-4.5 3v-3A1.5 1.5 0 0 1 3 12.5v-7A1.5 1.5 0 0 1 4.5 4Z" />
  </svg>;
const BackIcon = () => <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
  
    <path d="m11.5 5-5 5 5 5" />
    <path d="M7 10h7" />
  </svg>;
const EmptyState = ({
  title,
  text,
  icon
}: {
  title: string;
  text: string;
  icon: "history" | "comments";
}) => <div className="grid min-h-[360px] flex-1 place-items-center px-8 py-12 text-center">
    <div>
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#f2f4f7] text-[#667085]">
        {icon === "history" ? <HistoryIcon /> : <CommentIcon />}
      </div>
      <h3 className="mt-4 text-sm font-semibold text-[#111827]">{title}</h3>
      <p className="mx-auto mt-1 max-w-[320px] text-sm leading-5 text-[#667085]">{text}</p>
    </div>
  </div>;
const SourceLimitedState = ({
  title,
  detail,
  observedValue
}: {
  title: string;
  detail: string;
  observedValue?: string;
}) => <div className="rounded-lg border border-dashed border-[#cfd7e3] bg-white px-4 py-5">
    <span className="inline-flex rounded-full bg-[#f2f4f7] px-2.5 py-1 text-xs font-medium text-[#475467]">Состав требует уточнения</span>
    <h4 className="mt-3 text-sm font-semibold text-[#111827]">{title}</h4>
    <p className="mt-1 text-sm leading-5 text-[#667085]">{detail}</p>
    {observedValue && <div className="mt-4 rounded-md bg-[#f8fafc] px-3 py-2 text-sm text-[#344054]">
        Наблюдавшееся значение: <span className="font-medium">{observedValue}</span>
      </div>}
  </div>;
export const STrackerTaskCardExact = () => {
  const [subject, setSubject] = useState("");
  const [constructionObject, setConstructionObject] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [amount, setAmount] = useState("");
  const [vatIncluded, setVatIncluded] = useState(false);
  const [vatRate, setVatRate] = useState("");
  const [currency, setCurrency] = useState("rub");
  const [dirty, setDirty] = useState(false);
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);
  const [contentView, setContentView] = useState<ContentView>("default");
  const [aboutExpanded, setAboutExpanded] = useState(true);
  const [stepsExpanded, setStepsExpanded] = useState(true);
  const [toast, setToast] = useState("");
  const [open, setOpen] = useState(true);
  const [drawerWidth, setDrawerWidth] = useState(DEFAULT_DRAWER_WIDTH);
  const [isResizing, setIsResizing] = useState(false);
  const resizeState = useRef({
    active: false,
    startX: 0,
    startWidth: DEFAULT_DRAWER_WIDTH
  });
  const clampDrawerWidth = (value: number) => {
    const maximum = Math.max(320, Math.min(MAX_DRAWER_WIDTH, window.innerWidth - 24));
    const minimum = Math.min(MIN_DRAWER_WIDTH, maximum);
    return Math.min(maximum, Math.max(minimum, Math.round(value)));
  };
  const startDrawerResize = (event: ReactPointerEvent<HTMLDivElement>) => {
    resizeState.current = {
      active: true,
      startX: event.clientX,
      startWidth: drawerWidth
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsResizing(true);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };
  const resizeDrawer = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!resizeState.current.active) return;
    setDrawerWidth(clampDrawerWidth(resizeState.current.startWidth + resizeState.current.startX - event.clientX));
  };
  const stopDrawerResize = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!resizeState.current.active) return;
    resizeState.current.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setIsResizing(false);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  };
  const resizeDrawerWithKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    setDrawerWidth(current => clampDrawerWidth(current + (event.key === "ArrowLeft" ? 20 : -20)));
  };
  const activeStepComplete = activeStep === 0 ? Boolean(subject.trim() && constructionObject) : activeStep === 2 ? Boolean(amount.trim() && currency && (!vatIncluded || vatRate.trim())) : true;
  const highestUnlockedStep = Math.min(steps.length - 1, completedSteps.reduce((highest, step) => step === highest ? highest + 1 : highest, 0));
  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };
  const save = () => {
    setDirty(false);
    notify("Черновик сохранен. Шаг останется активным до подтверждения.");
  };
  const markChanged = () => {
    setDirty(true);
    setCompletedSteps(current => current.filter(step => step < activeStep));
  };
  const confirmStep = () => {
    if (!activeStepComplete) return;
    setDirty(false);
    setCompletedSteps(current => current.includes(activeStep) ? current : [...current, activeStep].sort());
    if (activeStep < steps.length - 1) {
      notify(`Шаг «${steps[activeStep]}» подтвержден.`);
      setActiveStep(current => current + 1);
      return;
    }
    notify("Все доступные этапы подтверждены. Задача завершена.");
  };
  const renderStepContent = () => {
    if (activeStep === 0) {
      return <>
          <label className="block text-sm font-medium" htmlFor="exact-subject">
            Предмет договора <span className="text-[#d92d20]">*</span>
          </label>
          <input id="exact-subject" value={subject} onChange={event => {
          setSubject(event.target.value);
          markChanged();
        }} placeholder="Опишите предмет договора" className="mt-2 h-11 w-full rounded-md border border-[#cfd7e3] bg-white px-3 text-sm shadow-sm outline-none transition placeholder:text-[#98a2b3] focus:border-[#007bfb] focus:ring-2 focus:ring-[#007bfb]/15" />

          <label className="mt-4 block text-sm font-medium" htmlFor="exact-object">
            Объект строительства (справочник) <span className="text-[#d92d20]">*</span>
          </label>
          <Select id="exact-object" value={constructionObject} options={constructionObjects} placeholder="Выберите значение" onChange={nextValue => {
          setConstructionObject(nextValue);
          markChanged();
        }} />
        </>;
    }
    if (activeStep === 1) {
      return <SourceLimitedState title="Поля этапа «Контрагент» не перечислены в доступных материалах" detail="Навигация и состояние этапа реализованы. Атрибуты и значения справочников будут добавлены после появления подтвержденного источника." />;
    }
    if (activeStep === 2) {
      return <>
          <label className="mt-4 block text-sm font-medium" htmlFor="exact-amount">
            Сумма <span className="text-[#d92d20]">*</span>
          </label>
          <input id="exact-amount" inputMode="decimal" value={amount} onChange={event => {
          setAmount(event.target.value);
          markChanged();
        }} placeholder="Введите сумму" className="mt-2 h-11 w-full rounded-md border border-[#cfd7e3] bg-white px-3 text-sm shadow-sm outline-none transition placeholder:text-[#98a2b3] focus:border-[#007bfb] focus:ring-2 focus:ring-[#007bfb]/15" />

          <div className="mt-4 flex items-center justify-between gap-4">
            <span className="text-sm font-medium">Сумма включает НДС <span className="text-[#d92d20]">*</span></span>
            <button type="button" role="switch" aria-checked={vatIncluded} onClick={() => {
            setVatIncluded(current => !current);
            markChanged();
          }} className={`relative h-6 w-11 shrink-0 rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007bfb]/30 ${vatIncluded ? "bg-[#007bfb]" : "bg-[#cfd7e3]"}`}>
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${vatIncluded ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>

          {vatIncluded && <>
              <label className="mt-4 block text-sm font-medium" htmlFor="exact-vat-rate">
                Ставка НДС <span className="text-[#d92d20]">*</span>
              </label>
              <input id="exact-vat-rate" inputMode="decimal" value={vatRate} onChange={event => {
            setVatRate(event.target.value);
            markChanged();
          }} placeholder="Введите ставку НДС" className="mt-2 h-11 w-full rounded-md border border-[#cfd7e3] bg-white px-3 text-sm shadow-sm outline-none transition placeholder:text-[#98a2b3] focus:border-[#007bfb] focus:ring-2 focus:ring-[#007bfb]/15" />
            </>}

          <label className="mt-4 block text-sm font-medium" htmlFor="exact-currency">
            Валюта (справочник) <span className="text-[#d92d20]">*</span>
          </label>
          <Select id="exact-currency" value={currency} options={currencyOptions} placeholder="Выберите значение" onChange={nextValue => {
          setCurrency(nextValue);
          markChanged();
        }} />

          {["ЦФО (справочник)", "Статья оборотов", "БЮ (справочник)"].map((label, index) => <div key={label} className="mt-4">
              <label className="block text-sm font-medium" htmlFor={`source-limited-${index}`}>
                {label} <span className="text-[#d92d20]">*</span>
              </label>
              <Select id={`source-limited-${index}`} value="" options={[]} placeholder="Значения справочника не зафиксированы" disabled onChange={() => undefined} />
            </div>)}
          <p className="mt-4 rounded-md bg-[#fff8e7] px-3 py-2 text-xs leading-5 text-[#7a5b12]">Недоступные справочники показаны в составе шага, но не участвуют в демонстрационной валидации до уточнения значений.</p>
        </>;
    }
    if (activeStep === 3) {
      return <SourceLimitedState title="Поля этапа «Условия оплаты» не перечислены в доступных материалах" detail="Этап участвует в последовательности и сохраняет статус. Поля, обязательность и справочные значения не добавляются без подтвержденного референса." />;
    }
    return <SourceLimitedState title="Для этапа подтвержден только контекст сроков и формата" detail="Полный атрибутивный состав отсутствует в доступных кадрах и транскрипции." observedValue="Разовая услуга" />;
  };
  const requestClose = () => {
    if (dirty) {
      setLeaveDialogOpen(true);
      return;
    }
    setOpen(false);
  };
  if (!open) {
    return <main className="flex min-h-full w-full items-start justify-end bg-[#e9eef5] p-5 font-sans">
        <button type="button" onClick={() => setOpen(true)} className="inline-flex min-h-10 items-center rounded-md bg-[#007bfb] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#006ae0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007bfb]/40">
          
          Открыть карточку задачи
        </button>
      </main>;
  }
  return <main className="min-h-full w-full bg-[#e9eef5] font-sans text-[#111827]">
      <aside className="relative ml-auto flex h-screen max-h-screen max-w-full flex-col overflow-hidden border-l border-[#d7dee8] bg-[#f4f6f9] shadow-[-12px_0_36px_rgba(15,23,42,0.16)]" style={{
      width: `${drawerWidth}px`
    }}>
      
        <div role="separator" aria-label="Изменить ширину карточки задачи" aria-orientation="vertical" aria-valuemin={MIN_DRAWER_WIDTH} aria-valuemax={MAX_DRAWER_WIDTH} aria-valuenow={drawerWidth} aria-valuetext={`${drawerWidth} пикселей`} tabIndex={0} onPointerDown={startDrawerResize} onPointerMove={resizeDrawer} onPointerUp={stopDrawerResize} onPointerCancel={stopDrawerResize} onKeyDown={resizeDrawerWithKeyboard} className="group absolute inset-y-0 left-0 z-30 w-3 cursor-col-resize touch-none focus-visible:outline-none">
        
          <span className={`absolute inset-y-0 left-0 w-0.5 transition-colors ${isResizing ? "bg-[#007bfb]" : "bg-transparent group-hover:bg-[#007bfb] group-focus-visible:bg-[#007bfb]"}`} />
        
        </div>
        <header className="z-10 shrink-0 border-b border-[#e5e7eb] bg-white px-5 py-5">
          <div className="flex items-center gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#eef1f4] text-[#475467]" aria-hidden="true">
                <TaskIcon />
              </span>
              <h1 className="flex min-w-0 flex-1 items-center gap-2 whitespace-nowrap text-xl font-semibold leading-7 tracking-[-0.01em]">
                <span className="shrink-0">AHX-547</span>
                <span className="h-1 w-1 shrink-0 rounded-full bg-[#667085]" aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate" title={taskTitle}>{taskTitle}</span>
              </h1>
            </div>
            <button type="button" onClick={requestClose} aria-label="Закрыть карточку задачи" title="Закрыть" className="inline-grid h-9 w-9 shrink-0 place-items-center rounded-md text-[#667085] transition hover:bg-[#f3f4f6] hover:text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007bfb]/35">
              
              <CloseIcon />
            </button>
          </div>
        </header>

        {contentView === "default" ? <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
            <section className="overflow-hidden rounded-xl border border-[#dde3eb] bg-white shadow-sm">
              <div className="flex min-h-12 items-center gap-2 border-b border-[#e5e7eb] px-3 py-2">
                <button type="button" onClick={() => setAboutExpanded(current => !current)} aria-expanded={aboutExpanded} aria-controls="task-about-content" className="flex min-w-0 flex-1 items-center gap-2 rounded-md px-1 py-1.5 text-left transition hover:bg-[#f8fafc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007bfb]/30">
                
                  <span className="text-[#667085]">
                    <ChevronIcon expanded={aboutExpanded} />
                  </span>
                  <h2 className="text-base font-semibold">О задаче</h2>
                </button>
                <div className="flex items-center gap-2">
                  <IconButton label="История изменений" onClick={() => setContentView("history")}>
                    <HistoryIcon />
                  </IconButton>
                  <IconButton label="Комментарии" onClick={() => setContentView("comments")}>
                    <CommentIcon />
                  </IconButton>
                </div>
              </div>

              {aboutExpanded && <div id="task-about-content" className="p-4">
                  <dl className="overflow-hidden rounded-lg border border-[#e1e6ed]">
                    <div className="grid grid-cols-2">
                      <div className="border-b border-r border-[#e1e6ed] px-3 py-2.5">
                        <dt className="text-xs text-[#667085]">Исполнитель</dt>
                        <dd className="mt-1 text-sm font-medium">Олег Федоров</dd>
                      </div>
                      <div className="border-b border-[#e1e6ed] px-3 py-2.5">
                        <dt className="text-xs text-[#667085]">Статус</dt>
                        <dd className="mt-1">
                          <span className="inline-flex rounded-full bg-[#e4f3ff] px-2.5 py-1 text-xs font-medium text-[#006ac8]">
                            Взята в работу
                          </span>
                        </dd>
                      </div>
                      <div className="border-r border-[#e1e6ed] px-3 py-2.5">
                        <dt className="text-xs text-[#667085]">Срок исполнения</dt>
                        <dd className="mt-1 text-sm font-medium">Срок не установлен</dd>
                      </div>
                      <div aria-hidden="true" />
                    </div>
                    <div className="border-t border-[#e1e6ed] px-3 py-2.5">
                      <dt className="text-xs text-[#667085]">Описание</dt>
                      <dd className="mt-1 text-sm leading-5 text-[#344054]">
                        Заполните данные заявки. Завершение задачи становится доступно после прохождения всех применимых шагов формы.
                      </dd>
                    </div>
                  </dl>
                </div>}
            </section>

            <section className="relative z-20 overflow-visible rounded-xl border border-[#dde3eb] bg-white shadow-sm">
              <div className="flex min-h-12 items-center gap-2 border-b border-[#e5e7eb] px-3 py-2">
                <button type="button" onClick={() => setStepsExpanded(current => !current)} aria-expanded={stepsExpanded} aria-controls="task-steps-content" className="flex min-w-0 flex-1 items-center gap-2 rounded-md px-1 py-1.5 text-left transition hover:bg-[#f8fafc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007bfb]/30">
                  <span className="text-[#667085]">
                    <ChevronIcon expanded={stepsExpanded} />
                  </span>
                  <h2 className="text-base font-semibold">Создание заявки на потребность АХР</h2>
                </button>
                <div className="shrink-0">
                  <span className="shrink-0 rounded-full bg-[#e4f3ff] px-2.5 py-1 text-xs font-medium text-[#006ac8]">Шаг {activeStep + 1} из 5</span>
                </div>
              </div>

              {stepsExpanded && <div id="task-steps-content">
                <div className="border-b border-[#e5e7eb] p-4">
                  <ol className="grid gap-[7px]" style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))"
              }}>
                
                  {steps.map((step, index) => {
                  const completed = completedSteps.includes(index);
                  const active = activeStep === index;
                  const available = index <= highestUnlockedStep || completed;
                  return <li key={step} className="min-w-0">
                        <button type="button" disabled={!available} onClick={() => setActiveStep(index)} aria-current={active ? "step" : undefined} aria-label={`Шаг ${index + 1}: ${step}`} className={`group flex h-full min-h-[76px] min-w-0 w-full items-start gap-2 rounded-lg border p-2.5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007bfb]/30 disabled:cursor-not-allowed ${active ? "border-[#007bfb] bg-[#eef7ff]" : completed ? "border-[#b9dfcf] bg-[#f2fbf7] hover:border-[#8bcbb3]" : available ? "border-[#d8dee8] bg-white hover:border-[#b9c5d5] hover:bg-[#fbfcfe]" : "border-[#e5e7eb] bg-[#f2f4f7] opacity-70"}`}>
                          <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-md text-xs font-semibold transition ${completed ? "bg-[#36b37e] text-white" : active ? "bg-[#007bfb] text-white" : "border border-[#cfd7e3] bg-white text-[#667085]"}`}>
                            {completed ? "✓" : index + 1}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className={`block text-sm font-semibold leading-5 ${active ? "text-[#005eb8]" : completed ? "text-[#287a5b]" : "text-[#344054]"}`}>{step}</span>
                            <span className={`mt-1 block text-xs ${active ? "text-[#006ac8]" : completed ? "text-[#287a5b]" : "text-[#667085]"}`}>
                              {active ? "Текущий этап" : completed ? "Этап подтверждён" : available ? "Доступен" : "Будет доступен позже"}
                            </span>
                          </span>
                        </button>
                      </li>;
                })}
                  </ol>
                </div>

              <div className="m-4 rounded-lg border border-[#dce3ec] bg-[#fafbfd] p-4">
                {activeStep !== 0 && <h3 className="text-base font-semibold">{steps[activeStep]}</h3>}
                {renderStepContent()}
              </div>
              </div>}
            </section>
          </div> : <div className="flex min-h-0 flex-1 p-4">
            <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-[#dde3eb] bg-white shadow-sm">
              <div className="flex min-h-14 shrink-0 items-center border-b border-[#e5e7eb] px-3 py-2">
                <button type="button" onClick={() => setContentView("default")} aria-label="Вернуться к карточке задачи" title="Назад" className="flex min-w-0 flex-1 items-center gap-2 rounded-md px-1 py-1.5 text-left transition hover:bg-[#f8fafc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007bfb]/30">
                
                  <span className="text-[#667085]">
                    <BackIcon />
                  </span>
                  <h2 className="text-base font-semibold">
                    {contentView === "history" ? "История изменений" : "Комментарии"}
                  </h2>
                </button>
              </div>

              {contentView === "history" && (historyItems.length > 0 ? <ol className="flex-1 space-y-1 overflow-y-auto p-4">
                    {historyItems.map((item, index) => <li key={item.id} className="relative grid grid-cols-[18px_minmax(0,1fr)] gap-3 pb-5 last:pb-0">
                        <span className={`relative mt-1 grid h-[18px] w-[18px] place-items-center rounded-full bg-[#e4f3ff] ${index < historyItems.length - 1 ? "after:absolute after:top-[18px] after:h-[calc(100%+2px)] after:w-px after:bg-[#d8dee8]" : ""}`}>
                          <span className="h-1.5 w-1.5 rounded-full bg-[#007bfb]" />
                        </span>
                        <div>
                          <p className="text-sm leading-5 text-[#344054]">{item.text}</p>
                          <p className="mt-1 text-xs text-[#667085]">{item.date} · {item.time}</p>
                        </div>
                      </li>)}
                  </ol> : <EmptyState icon="history" title="Изменений нет" text="История появится после первого изменения задачи." />)}

              {contentView === "comments" && (comments.length > 0 ? <ul className="flex-1 space-y-3 overflow-y-auto p-4">
                    {comments.map(comment => <li key={comment.id} className="rounded-lg border border-[#e1e6ed] p-4">
                        <div className="flex items-start gap-3">
                          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e4f3ff] text-xs font-semibold text-[#006ac8]" aria-hidden="true">
                            {comment.initials}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-[#111827]">{comment.name}</p>
                                <p className="mt-0.5 text-xs text-[#667085]">{comment.role}</p>
                              </div>
                              <time className="shrink-0 text-xs text-[#667085]">{comment.date} · {comment.time}</time>
                            </div>
                            <p className="mt-3 text-sm leading-5 text-[#344054]">{comment.text}</p>
                          </div>
                        </div>
                      </li>)}
                  </ul> : <EmptyState icon="comments" title="Комментариев нет" text="Комментарии к задаче пока не добавлены." />)}
            </section>
          </div>}

        <footer className="z-10 flex min-h-16 shrink-0 items-center justify-between border-t border-[#d8dee8] bg-white px-5 py-3 shadow-[0_-8px_24px_rgba(15,23,42,0.06)]">
          <IconButton label="Сохранить" onClick={save}>
            <SaveIcon />
          </IconButton>
          <button type="button" disabled={!activeStepComplete} onClick={confirmStep} title={activeStepComplete ? activeStep === steps.length - 1 ? "Завершить задачу" : `Подтвердить шаг «${steps[activeStep]}»` : "Заполните обязательные поля активного шага."} className={`inline-flex min-h-10 items-center rounded-md px-5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007bfb]/35 ${activeStepComplete ? "bg-[#007bfb] text-white hover:bg-[#006ae0] active:bg-[#0056b3]" : "cursor-not-allowed border border-[#e0e5ec] bg-[#e9edf3] text-[#98a2b3]"}`}>
            {activeStep === steps.length - 1 ? "Завершить задачу" : "Подтвердить шаг"}
          </button>
        </footer>
      </aside>

      {leaveDialogOpen && <div className="fixed inset-0 z-40 grid place-items-center bg-[#101828]/35 p-5" role="presentation">
          <section role="dialog" aria-modal="true" aria-label="Несохраненные изменения" className="w-full max-w-[480px] rounded-xl border border-[#d8dee8] bg-white p-5 shadow-2xl">
            <h2 className="text-lg font-semibold">Несохраненные изменения</h2>
            <p className="mt-3 text-sm leading-5 text-[#667085]">Изменения в полях шага не сохранены.</p>
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setLeaveDialogOpen(false)} className="inline-flex min-h-10 items-center rounded-md border border-[#d8dee8] bg-white px-4 text-sm font-medium text-[#111827] hover:bg-[#f8fafc]">
              
                Остаться
              </button>
              <button type="button" onClick={() => {
            setLeaveDialogOpen(false);
            setOpen(false);
          }} className="inline-flex min-h-10 items-center rounded-md bg-[#d92d20] px-4 text-sm font-semibold text-white hover:bg-[#b42318]">
              
                Выйти без сохранения
              </button>
            </div>
          </section>
        </div>}

      {toast && <div role="status" className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-[#101828] px-4 py-3 text-sm font-medium text-white shadow-xl">
          {toast}
        </div>}
    </main>;
};
