import { useState, type FormEvent, type ReactNode } from "react";

const steps = ["Потребность", "Контрагент", "Стоимость и бюджет", "Условия оплаты", "Сроки и формат"];
type DialogKind = "history" | "comments" | "leave" | null;

const OutlineButton = ({ children, onClick }: { children: ReactNode; onClick: () => void }) => (
  <button type="button" onClick={onClick} className="min-h-10 rounded-md border border-[#d4dce7] bg-white px-4 text-sm font-semibold text-[#172033] transition hover:border-[#aebbd0] hover:bg-[#f8fafc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007bfb]/30">
    {children}
  </button>
);

export const STrackerTaskCardSections = () => {
  const [subject, setSubject] = useState("");
  const [constructionObject, setConstructionObject] = useState("");
  const [dirty, setDirty] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [dialog, setDialog] = useState<DialogKind>(null);
  const [toast, setToast] = useState("");
  const [open, setOpen] = useState(true);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };

  const save = () => {
    setDirty(false);
    notify("Черновик сохранен. Шаг останется активным до подтверждения.");
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted(true);
    if (!subject.trim() || !constructionObject) {
      notify("Заполните обязательные поля перед подтверждением шага.");
      return;
    }
    setDirty(false);
    notify("Данные шага «Потребность» подтверждены.");
  };

  const close = () => dirty ? setDialog("leave") : setOpen(false);

  if (!open) {
    return <main className="flex min-h-full w-full items-start justify-end bg-[#edf1f6] p-5 font-sans"><button onClick={() => setOpen(true)} className="rounded-md bg-[#007bfb] px-5 py-3 text-sm font-semibold text-white">Открыть карточку задачи</button></main>;
  }

  return (
    <main className="min-h-full w-full bg-[#edf1f6] font-sans text-[#111827]">
      <aside className="ml-auto min-h-screen w-full max-w-[650px] border-l border-[#d7dee8] bg-white shadow-[-10px_0_30px_rgba(15,23,42,0.14)]">
        <header className="px-6 pb-5 pt-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#667085]">AHX-547 · Задача процесса</p>
              <h1 className="mt-2 text-[22px] font-semibold leading-7 tracking-[-0.02em]">Создайте заявку на потребность АХР</h1>
            </div>
            <button type="button" onClick={close} className="rounded-md px-2 py-1 text-sm font-medium text-[#667085] hover:bg-[#f2f4f7] hover:text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007bfb]/30">Закрыть</button>
          </div>
          <div className="mt-5 grid grid-cols-[160px_minmax(0,1fr)] gap-3">
            <OutlineButton onClick={save}>Сохранить</OutlineButton>
            <button type="button" disabled title="Завершите все применимые шаги формы." className="min-h-10 cursor-not-allowed rounded-md border border-[#e1e6ed] bg-[#eef1f5] px-4 text-sm font-semibold text-[#98a2b3]">Завершить задачу</button>
          </div>
        </header>

        <section className="border-t border-[#dde3eb] px-6 py-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">О задаче</h2>
            <span className="text-xs text-[#667085]">4 параметра</span>
          </div>
          <dl className="mt-3">
            <div className="grid grid-cols-2 border-b border-[#e5e9ef] py-4">
              <div className="pr-4"><dt className="text-xs text-[#667085]">Исполнитель</dt><dd className="mt-1.5 text-sm font-medium">Олег Федоров</dd></div>
              <div className="border-l border-[#e5e9ef] pl-4"><dt className="text-xs text-[#667085]">Статус</dt><dd className="mt-1.5"><span className="inline-flex rounded-full bg-[#e4f3ff] px-2.5 py-1 text-xs font-medium text-[#006ac8]">Взята в работу</span></dd></div>
            </div>
            <div className="border-b border-[#e5e9ef] py-4"><dt className="text-xs text-[#667085]">Срок исполнения</dt><dd className="mt-1.5 text-sm font-medium">Срок не установлен</dd></div>
            <div className="py-4"><dt className="text-xs text-[#667085]">Описание</dt><dd className="mt-1.5 text-sm leading-5 text-[#344054]">Заполните данные заявки. Завершение задачи становится доступно после прохождения всех применимых шагов формы.</dd></div>
          </dl>
          <div className="grid grid-cols-2 gap-3">
            <OutlineButton onClick={() => setDialog("history")}>История изменений</OutlineButton>
            <OutlineButton onClick={() => setDialog("comments")}>Комментарии</OutlineButton>
          </div>
        </section>

        <section className="border-t border-[#dde3eb] px-6 py-5">
          <h2 className="text-sm font-semibold">Условие завершения задачи</h2>
          <p className="mt-1.5 text-sm text-[#667085]">Завершите все применимые шаги формы.</p>
        </section>

        <section className="border-t border-[#dde3eb] px-6 pb-8 pt-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#667085]">Форма процесса</p>
              <h2 className="mt-1.5 text-lg font-semibold">Создание заявки на потребность АХР</h2>
            </div>
            <span className="shrink-0 rounded-full bg-[#e4f3ff] px-2.5 py-1 text-xs font-medium text-[#006ac8]">Шаг 1 из 5</span>
          </div>
          <p className="mt-3 text-sm leading-5 text-[#667085]">Заполните обязательные поля и подтвердите шаг, чтобы продолжить процесс.</p>
          <ol className="relative mt-5 grid grid-cols-5 gap-1 border-b border-[#e5e9ef] pb-5 before:absolute before:left-[10%] before:right-[10%] before:top-3 before:h-px before:bg-[#d4dce7]">
            {steps.map((step, index) => (
              <li key={step} className="relative z-10 flex flex-col items-center text-center">
                <span className={`grid h-6 w-6 place-items-center rounded-full border bg-white text-[11px] ${index === 0 ? "border-[#007bfb] text-[#006ac8] ring-2 ring-[#d9efff]" : "border-[#cfd7e3] text-[#667085]"}`}>{index + 1}</span>
                <span className={`mt-2 text-[10px] leading-3 ${index === 0 ? "font-semibold text-[#006ac8]" : "text-[#667085]"}`}>{step}</span>
              </li>
            ))}
          </ol>

          <form onSubmit={submit} className="pt-5" noValidate>
            <div className="flex items-start justify-between gap-3"><h3 className="text-lg font-semibold">Потребность</h3><span className="text-xs text-[#667085]">Обязательные поля отмечены <span className="text-[#d92d20]">*</span></span></div>
            <label htmlFor="sections-subject" className="mt-5 block text-sm font-medium">Предмет договора <span className="text-[#d92d20]">*</span></label>
            <input id="sections-subject" value={subject} onChange={(event) => { setSubject(event.target.value); setDirty(true); }} aria-invalid={attempted && !subject.trim()} placeholder="Опишите предмет договора" className="mt-2 h-11 w-full rounded-md border border-[#cfd7e3] bg-white px-3 text-sm outline-none transition placeholder:text-[#98a2b3] focus:border-[#007bfb] focus:ring-2 focus:ring-[#007bfb]/15 aria-[invalid=true]:border-[#d92d20]" />
            {attempted && !subject.trim() && <p className="mt-1.5 text-xs text-[#b42318]">Заполните обязательное поле.</p>}
            <label htmlFor="sections-object" className="mt-4 block text-sm font-medium">Объект строительства (справочник) <span className="text-[#d92d20]">*</span></label>
            <select id="sections-object" value={constructionObject} onChange={(event) => { setConstructionObject(event.target.value); setDirty(true); }} aria-invalid={attempted && !constructionObject} className="mt-2 h-11 w-full rounded-md border border-[#cfd7e3] bg-white px-3 text-sm outline-none transition focus:border-[#007bfb] focus:ring-2 focus:ring-[#007bfb]/15 aria-[invalid=true]:border-[#d92d20]">
              <option value="">Выберите значение</option><option>Северный терминал</option><option>Индустриальный парк</option><option>Офисный комплекс</option>
            </select>
            {attempted && !constructionObject && <p className="mt-1.5 text-xs text-[#b42318]">Выберите значение.</p>}
            <div className="mt-5 flex justify-end"><button type="submit" className="min-h-10 rounded-md bg-[#007bfb] px-5 text-sm font-semibold text-white transition hover:bg-[#006ae0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007bfb]/35 active:bg-[#0056b3]">Подтвердить шаг</button></div>
          </form>
        </section>
      </aside>

      {dialog && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-[#101828]/35 p-5" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target && dialog !== "leave") setDialog(null); }}>
          <section role="dialog" aria-modal="true" aria-label={dialog === "history" ? "История изменений" : dialog === "comments" ? "Комментарии" : "Несохраненные изменения"} className="w-full max-w-[480px] rounded-xl border border-[#d8dee8] bg-white p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-4"><h2 className="text-lg font-semibold">{dialog === "history" ? "История изменений" : dialog === "comments" ? "Комментарии" : "Несохраненные изменения"}</h2>{dialog !== "leave" && <button type="button" onClick={() => setDialog(null)} aria-label="Закрыть" className="rounded px-2 py-1 text-[#667085] hover:bg-[#f2f4f7]">×</button>}</div>
            {dialog === "history" && <ul className="mt-4 space-y-3 text-sm"><li className="border-l-2 border-[#007bfb] pl-3"><time className="text-xs text-[#667085]">01.08.2026, 10:12</time><p className="mt-1">Задача взята в работу Олегом Федоровым.</p></li><li className="border-l-2 border-[#d8dee8] pl-3"><time className="text-xs text-[#667085]">01.08.2026, 09:45</time><p className="mt-1">Создана задача по процессу «Заявка на потребность АХР».</p></li></ul>}
            {dialog === "comments" && <div className="mt-4 border-l-2 border-[#007bfb] pl-3 text-sm"><p className="font-semibold">Анна Смирнова</p><p className="mt-1 leading-5 text-[#344054]">Проверьте объект строительства перед подтверждением первого шага.</p></div>}
            {dialog === "leave" && <><p className="mt-3 text-sm text-[#667085]">Изменения в полях шага не сохранены.</p><div className="mt-5 flex justify-end gap-2"><OutlineButton onClick={() => setDialog(null)}>Остаться</OutlineButton><button type="button" onClick={() => { setDialog(null); setOpen(false); }} className="min-h-10 rounded-md bg-[#d92d20] px-4 text-sm font-semibold text-white hover:bg-[#b42318]">Выйти без сохранения</button></div></>}
          </section>
        </div>
      )}
      {toast && <div role="status" className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-[#101828] px-4 py-3 text-sm font-medium text-white shadow-xl">{toast}</div>}
    </main>
  );
};
