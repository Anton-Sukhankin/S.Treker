import { useState, type FormEvent, type ReactNode } from "react";

const steps = ["Потребность", "Контрагент", "Стоимость и бюджет", "Условия оплаты", "Сроки и формат"];
type DialogKind = "history" | "comments" | "leave" | null;

const OutlineButton = ({ children, onClick }: { children: ReactNode; onClick: () => void }) => (
  <button type="button" onClick={onClick} className="min-h-10 rounded-md border border-[#d6dee8] bg-white px-4 text-sm font-semibold text-[#172033] transition hover:border-[#aebbd0] hover:bg-[#f8fafc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007bfb]/30">
    {children}
  </button>
);

export const STrackerTaskCardProcess = () => {
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
  const save = () => { setDirty(false); notify("Черновик сохранен. Шаг останется активным до подтверждения."); };
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
    return <main className="flex min-h-full w-full items-start justify-end bg-[#e9eef5] p-5 font-sans"><button onClick={() => setOpen(true)} className="rounded-md bg-[#007bfb] px-5 py-3 text-sm font-semibold text-white">Открыть карточку задачи</button></main>;
  }

  return (
    <main className="min-h-full w-full bg-[#e9eef5] font-sans text-[#111827]">
      <aside className="ml-auto min-h-screen w-full max-w-[650px] border-l border-[#d5dde8] bg-[#f7f9fc] shadow-[-12px_0_34px_rgba(15,23,42,0.15)]">
        <header className="border-b border-[#dde3eb] bg-white px-5 pb-5 pt-5">
          <div className="flex items-start justify-between gap-4">
            <div><p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#667085]">AHX-547 · Задача процесса</p><h1 className="mt-1.5 text-xl font-semibold leading-7 tracking-[-0.01em]">Создайте заявку на потребность АХР</h1></div>
            <button type="button" onClick={close} className="rounded-md px-2 py-1 text-sm font-medium text-[#667085] hover:bg-[#f2f4f7] hover:text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007bfb]/30">Закрыть</button>
          </div>
          <div className="mt-4 grid grid-cols-[150px_minmax(0,1fr)] gap-2"><OutlineButton onClick={save}>Сохранить</OutlineButton><button type="button" disabled title="Завершите все применимые шаги формы." className="min-h-10 cursor-not-allowed rounded-md border border-[#e0e5ec] bg-[#e9edf3] px-4 text-sm font-semibold text-[#98a2b3]">Завершить задачу</button></div>
        </header>

        <div className="space-y-4 p-4">
          <section className="rounded-xl border border-[#dde3eb] bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between"><h2 className="text-base font-semibold">О задаче</h2><span className="text-xs text-[#667085]">4 параметра</span></div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div><p className="text-xs text-[#667085]">Исполнитель</p><p className="mt-1 text-sm font-medium">Олег Федоров</p></div>
              <div><p className="text-xs text-[#667085]">Статус</p><span className="mt-1 inline-flex rounded-full bg-[#e4f3ff] px-2 py-1 text-xs font-medium text-[#006ac8]">Взята в работу</span></div>
              <div><p className="text-xs text-[#667085]">Срок исполнения</p><p className="mt-1 text-sm font-medium">Срок не установлен</p></div>
            </div>
            <div className="mt-4 border-t border-[#e5e9ef] pt-3"><p className="text-xs text-[#667085]">Описание</p><p className="mt-1 text-sm leading-5 text-[#344054]">Заполните данные заявки. Завершение задачи становится доступно после прохождения всех применимых шагов формы.</p></div>
            <div className="mt-4 grid grid-cols-2 gap-2"><OutlineButton onClick={() => setDialog("history")}>История изменений</OutlineButton><OutlineButton onClick={() => setDialog("comments")}>Комментарии</OutlineButton></div>
          </section>

          <section className="rounded-xl border border-[#efc46b] bg-[#fff8e8] px-4 py-3 shadow-sm">
            <div className="border-l-2 border-[#f2a400] pl-3"><h2 className="text-sm font-semibold text-[#7a4b00]">Условие завершения задачи</h2><p className="mt-1 text-sm text-[#8a5b12]">Завершите все применимые шаги формы.</p></div>
          </section>

          <section className="rounded-xl border border-[#dce3ec] bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div><p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#667085]">Форма процесса</p><h2 className="mt-1.5 text-lg font-semibold">Создание заявки на потребность АХР</h2></div>
              <span className="shrink-0 rounded-full bg-[#e4f3ff] px-2.5 py-1 text-xs font-medium text-[#006ac8]">Шаг 1 из 5</span>
            </div>
            <p className="mt-3 text-sm leading-5 text-[#667085]">Заполните обязательные поля и подтвердите шаг, чтобы продолжить процесс.</p>

            <div className="mt-5 grid gap-3 min-[560px]:grid-cols-[170px_minmax(0,1fr)]">
              <nav aria-label="Этапы создания заявки" className="rounded-lg border border-[#dce3ec] bg-[#f8fafc] p-3">
                <ol className="grid grid-cols-5 gap-1 min-[560px]:flex min-[560px]:flex-col min-[560px]:gap-0">
                  {steps.map((step, index) => (
                    <li key={step} className="relative flex min-w-0 flex-col items-center text-center min-[560px]:min-h-[62px] min-[560px]:flex-row min-[560px]:items-start min-[560px]:text-left">
                      {index < steps.length - 1 && <span aria-hidden="true" className="absolute left-[calc(50%+12px)] right-[calc(-50%+12px)] top-3 h-px bg-[#d2dae5] min-[560px]:bottom-0 min-[560px]:left-3 min-[560px]:right-auto min-[560px]:top-6 min-[560px]:h-auto min-[560px]:w-px" />}
                      <span className={`relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full border bg-white text-[11px] ${index === 0 ? "border-[#007bfb] text-[#006ac8] ring-2 ring-[#d9efff]" : "border-[#cfd7e3] text-[#667085]"}`}>{index + 1}</span>
                      <span className={`mt-2 hidden min-[560px]:ml-3 min-[560px]:mt-0 min-[560px]:block min-[560px]:text-xs min-[560px]:leading-4 ${index === 0 ? "font-semibold text-[#006ac8]" : "text-[#667085]"}`}>{step}</span>
                    </li>
                  ))}
                </ol>
              </nav>

              <form onSubmit={submit} className="rounded-lg border border-[#dce3ec] p-4" noValidate>
                <div className="flex items-start justify-between gap-3"><h3 className="text-lg font-semibold">Потребность</h3><span className="text-right text-[11px] leading-4 text-[#667085]">Обязательные поля отмечены <span className="text-[#d92d20]">*</span></span></div>
                <label htmlFor="process-subject" className="mt-5 block text-sm font-medium">Предмет договора <span className="text-[#d92d20]">*</span></label>
                <input id="process-subject" value={subject} onChange={(event) => { setSubject(event.target.value); setDirty(true); }} aria-invalid={attempted && !subject.trim()} placeholder="Опишите предмет договора" className="mt-2 h-11 w-full rounded-md border border-[#cfd7e3] bg-white px-3 text-sm outline-none transition placeholder:text-[#98a2b3] focus:border-[#007bfb] focus:ring-2 focus:ring-[#007bfb]/15 aria-[invalid=true]:border-[#d92d20]" />
                {attempted && !subject.trim() && <p className="mt-1.5 text-xs text-[#b42318]">Заполните обязательное поле.</p>}
                <label htmlFor="process-object" className="mt-4 block text-sm font-medium">Объект строительства (справочник) <span className="text-[#d92d20]">*</span></label>
                <select id="process-object" value={constructionObject} onChange={(event) => { setConstructionObject(event.target.value); setDirty(true); }} aria-invalid={attempted && !constructionObject} className="mt-2 h-11 w-full rounded-md border border-[#cfd7e3] bg-white px-3 text-sm outline-none transition focus:border-[#007bfb] focus:ring-2 focus:ring-[#007bfb]/15 aria-[invalid=true]:border-[#d92d20]">
                  <option value="">Выберите значение</option><option>Северный терминал</option><option>Индустриальный парк</option><option>Офисный комплекс</option>
                </select>
                {attempted && !constructionObject && <p className="mt-1.5 text-xs text-[#b42318]">Выберите значение.</p>}
                <div className="mt-5 flex justify-end"><button type="submit" className="min-h-10 rounded-md bg-[#007bfb] px-5 text-sm font-semibold text-white transition hover:bg-[#006ae0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007bfb]/35 active:bg-[#0056b3]">Подтвердить шаг</button></div>
              </form>
            </div>
          </section>
        </div>
      </aside>

      {dialog && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-[#101828]/35 p-5" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target && dialog !== "leave") setDialog(null); }}>
          <section role="dialog" aria-modal="true" aria-label={dialog === "history" ? "История изменений" : dialog === "comments" ? "Комментарии" : "Несохраненные изменения"} className="w-full max-w-[480px] rounded-xl border border-[#d8dee8] bg-white p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-4"><h2 className="text-lg font-semibold">{dialog === "history" ? "История изменений" : dialog === "comments" ? "Комментарии" : "Несохраненные изменения"}</h2>{dialog !== "leave" && <button type="button" onClick={() => setDialog(null)} aria-label="Закрыть" className="rounded px-2 py-1 text-[#667085] hover:bg-[#f2f4f7]">×</button>}</div>
            {dialog === "history" && <ul className="mt-4 space-y-3 text-sm"><li className="rounded-lg bg-[#f8fafc] p-3"><time className="text-xs text-[#667085]">01.08.2026, 10:12</time><p className="mt-1">Задача взята в работу Олегом Федоровым.</p></li><li className="rounded-lg bg-[#f8fafc] p-3"><time className="text-xs text-[#667085]">01.08.2026, 09:45</time><p className="mt-1">Создана задача по процессу «Заявка на потребность АХР».</p></li></ul>}
            {dialog === "comments" && <div className="mt-4 rounded-lg bg-[#f8fafc] p-3 text-sm"><p className="font-semibold">Анна Смирнова</p><p className="mt-1 leading-5 text-[#344054]">Проверьте объект строительства перед подтверждением первого шага.</p></div>}
            {dialog === "leave" && <><p className="mt-3 text-sm text-[#667085]">Изменения в полях шага не сохранены.</p><div className="mt-5 flex justify-end gap-2"><OutlineButton onClick={() => setDialog(null)}>Остаться</OutlineButton><button type="button" onClick={() => { setDialog(null); setOpen(false); }} className="min-h-10 rounded-md bg-[#d92d20] px-4 text-sm font-semibold text-white hover:bg-[#b42318]">Выйти без сохранения</button></div></>}
          </section>
        </div>
      )}
      {toast && <div role="status" className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-[#101828] px-4 py-3 text-sm font-medium text-white shadow-xl">{toast}</div>}
    </main>
  );
};
