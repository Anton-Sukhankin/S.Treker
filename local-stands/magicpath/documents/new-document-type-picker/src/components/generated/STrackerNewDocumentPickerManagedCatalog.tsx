import { useMemo, useState } from 'react';
import { Check, FileText, Layers3, Search, X } from 'lucide-react';

type SourceId = 'ecm' | 'lego';

type CatalogItem = {
  id: number;
  name: string;
  source: SourceId;
};

const catalog: CatalogItem[] = [
  { id: 1, name: 'Бридж', source: 'ecm' },
  { id: 2, name: 'Корпоративный кредит', source: 'ecm' },
  { id: 3, name: 'Проектное финансирование', source: 'ecm' },
  { id: 4, name: 'Облигации Самостоятельный выпуск', source: 'ecm' },
  { id: 5, name: 'Программа биржевых облигаций', source: 'ecm' },
  { id: 6, name: 'Внешние займы', source: 'lego' },
  { id: 7, name: 'Факторинг', source: 'lego' },
  { id: 8, name: 'Кредитный договор', source: 'ecm' },
  { id: 9, name: 'Лимит финансирования', source: 'ecm' },
  { id: 10, name: 'Кредитный комитет', source: 'lego' },
  { id: 11, name: 'KYC-пакет заёмщика', source: 'lego' },
  { id: 12, name: 'Соглашение об обеспечении', source: 'lego' },
  { id: 13, name: 'Term sheet', source: 'lego' },
];

const sourceLabel = (source: SourceId) =>
  source === 'ecm' ? 'Стандартная ECM-форма' : 'Lego-шаблон';

export const STrackerNewDocumentPickerManagedCatalog = () => {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<number>(1);
  const [toast, setToast] = useState<string | null>(null);
  const [closed, setClosed] = useState(false);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('ru');
    if (!normalized) return catalog;

    return catalog.filter((item) =>
      `${item.name} ${sourceLabel(item.source)}`
        .toLocaleLowerCase('ru')
        .includes(normalized),
    );
  }, [query]);

  const choose = (item: CatalogItem) => {
    setSelectedId(item.id);
    setToast(`Выбран тип документа: ${item.name}`);
    window.setTimeout(() => setToast(null), 2800);
  };

  if (closed) {
    return (
      <main className="grid min-h-screen w-full place-items-center bg-slate-50 p-6 font-['Inter'] text-slate-900">
        <section className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-blue-50 text-blue-600">
            <Check size={24} />
          </div>
          <h1 className="text-xl font-semibold">Окно выбора закрыто</h1>
          <p className="mt-2 text-sm text-slate-500">
            Вернитесь к списку, чтобы выбрать вариант создания документа.
          </p>
          <button
            onClick={() => setClosed(false)}
            className="mt-6 h-10 rounded-md bg-blue-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Открыть список
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="relative flex h-screen min-h-[620px] w-full flex-col overflow-hidden bg-white font-['Inter'] text-slate-900">
      <header className="shrink-0 border-b border-slate-200 px-8 pb-6 pt-7">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-[26px] font-semibold leading-8 tracking-[-0.02em] text-slate-950">
              Загрузка нового документа
            </h1>
            <p className="mt-4 text-[17px] font-medium leading-6 text-slate-800">
              Выберите вариант создания документа
            </p>
            <p className="mt-0.5 text-[16px] leading-6 text-slate-500">
              В списке показаны стандартные ECM-формы и опубликованные Lego-шаблоны.
            </p>
          </div>
          <button
            onClick={() => setClosed(true)}
            aria-label="Закрыть окно"
            className="grid size-10 shrink-0 place-items-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-blue-600"
          >
            <X size={25} strokeWidth={1.8} />
          </button>
        </div>
      </header>

      <section className="flex min-h-0 flex-1 flex-col px-8 py-5">
        <label className="group relative block shrink-0">
          <span className="sr-only">Поиск типа документа или шаблона</span>
          <Search
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-600"
            size={23}
            strokeWidth={1.8}
          />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Найти тип документа или шаблон..."
            className="h-[54px] w-full rounded-md border border-slate-300 bg-white pr-12 text-[18px] text-slate-900 outline-none transition-shadow placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            style={{ paddingLeft: 50 }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              aria-label="Очистить поиск"
              className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={18} />
            </button>
          )}
        </label>

        <div className="flex h-[52px] shrink-0 items-center">
          <p className="text-[15px] font-medium text-slate-600">
            Найдено: <span className="text-slate-900">{filtered.length}</span>
          </p>
        </div>

        <div className="grid h-11 shrink-0 grid-cols-[minmax(280px,1.4fr)_minmax(280px,0.9fr)_120px] items-center gap-6 border-b border-slate-200 px-4 text-sm text-slate-500 max-md:grid-cols-[minmax(220px,1fr)_120px]">
          <span>Тип документа / шаблон</span>
          <span className="max-md:hidden">Источник / Тип</span>
          <span className="sr-only">Действие</span>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {filtered.length ? (
            filtered.map((item) => {
              const selected = selectedId === item.id;
              const SourceIcon = item.source === 'ecm' ? FileText : Layers3;

              return (
                <article
                  key={item.id}
                  tabIndex={0}
                  onClick={() => setSelectedId(item.id)}
                  onDoubleClick={() => choose(item)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      choose(item);
                    }
                  }}
                  aria-selected={selected}
                  className={`group grid min-h-[76px] cursor-pointer grid-cols-[minmax(280px,1.4fr)_minmax(280px,0.9fr)_120px] items-center gap-6 border-b border-slate-200 px-4 transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-500 max-md:grid-cols-[minmax(220px,1fr)_120px] ${
                    selected ? 'bg-blue-50/70' : 'bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="min-w-0">
                    <h3 className="truncate text-[16px] font-semibold leading-6 text-slate-900">
                      {item.name}
                    </h3>
                  </div>

                  <div className="flex min-w-0 items-center gap-3 max-md:hidden">
                    <SourceIcon
                      size={22}
                      strokeWidth={1.8}
                      className={`shrink-0 ${item.source === 'ecm' ? 'text-blue-500' : 'text-emerald-500'}`}
                    />
                    <div className="min-w-0">
                      <p className="truncate text-[15px] leading-5 text-slate-700">
                        {sourceLabel(item.source)}
                      </p>
                      <p className="truncate text-[12px] leading-4 text-slate-400">{item.name}</p>
                    </div>
                  </div>

                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      choose(item);
                    }}
                    className="h-10 rounded-md bg-blue-600 px-4 text-[15px] font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:translate-y-px"
                  >
                    Выбрать
                  </button>
                </article>
              );
            })
          ) : (
            <div className="grid h-full min-h-64 place-items-center text-center">
              <div>
                <div className="mx-auto grid size-12 place-items-center rounded-full bg-slate-100 text-slate-500">
                  <Search size={22} />
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">Ничего не найдено</h3>
                <p className="mt-1 text-sm text-slate-500">Измените поисковый запрос.</p>
                <button
                  onClick={() => setQuery('')}
                  className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-800"
                >
                  Сбросить поиск
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {toast && (
        <div
          role="status"
          className="absolute bottom-6 right-6 flex max-w-sm items-center gap-3 rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-xl"
        >
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-emerald-500">
            <Check size={15} strokeWidth={2.5} />
          </span>
          <span>{toast}</span>
          <button
            onClick={() => setToast(null)}
            aria-label="Закрыть уведомление"
            className="ml-2 text-slate-400 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </main>
  );
};
