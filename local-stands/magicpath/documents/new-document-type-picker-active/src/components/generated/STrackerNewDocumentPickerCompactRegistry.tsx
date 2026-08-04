import { Check, ChevronRight, FileText, PackageOpen, RotateCcw, Search, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
type RegistryItem = {
  id: string;
  name: string;
  source: 'Стандартная ECM-форма' | 'Lego-шаблон';
  type: string;
};
const ITEMS: RegistryItem[] = [{
  id: 'bridge',
  name: 'Бридж',
  source: 'Стандартная ECM-форма',
  type: 'Бридж'
}, {
  id: 'corporate-credit',
  name: 'Корпоративный кредит',
  source: 'Стандартная ECM-форма',
  type: 'Корпоративный кредит'
}, {
  id: 'project-finance',
  name: 'Проектное финансирование',
  source: 'Стандартная ECM-форма',
  type: 'Проектное финансирование'
}, {
  id: 'standalone-bonds',
  name: 'Облигации Самостоятельный выпуск',
  source: 'Стандартная ECM-форма',
  type: 'Облигации Самостоятельный выпуск'
}, {
  id: 'exchange-bonds',
  name: 'Программа биржевых облигаций',
  source: 'Стандартная ECM-форма',
  type: 'Программа биржевых облигаций'
}, {
  id: 'external-loans',
  name: 'Внешние займы',
  source: 'Lego-шаблон',
  type: 'Внешние займы'
}, {
  id: 'factoring',
  name: 'Факторинг',
  source: 'Lego-шаблон',
  type: 'Факторинг'
}];
export const STrackerNewDocumentPickerCompactRegistry = () => {
  const [query, setQuery] = useState('');
  const [activeId, setActiveId] = useState(ITEMS[0].id);
  const [selectedItem, setSelectedItem] = useState<RegistryItem | null>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [toastVisible, setToastVisible] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('ru');
    if (!normalized) return ITEMS;
    return ITEMS.filter(item => `${item.name} ${item.source} ${item.type}`.toLocaleLowerCase('ru').includes(normalized));
  }, [query]);
  useEffect(() => {
    if (!filteredItems.some(item => item.id === activeId)) {
      setActiveId(filteredItems[0]?.id ?? '');
    }
  }, [activeId, filteredItems]);
  useEffect(() => {
    if (!toastVisible) return;
    const timer = window.setTimeout(() => setToastVisible(false), 2600);
    return () => window.clearTimeout(timer);
  }, [toastVisible]);
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        searchRef.current?.focus();
        return;
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        if (query) {
          setQuery('');
          searchRef.current?.focus();
        } else {
          setIsOpen(false);
        }
        return;
      }
      if (!filteredItems.length) return;
      const currentIndex = Math.max(0, filteredItems.findIndex(item => item.id === activeId));
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        const direction = event.key === 'ArrowDown' ? 1 : -1;
        const nextIndex = (currentIndex + direction + filteredItems.length) % filteredItems.length;
        setActiveId(filteredItems[nextIndex].id);
      }
      if (event.key === 'Enter') {
        event.preventDefault();
        const item = filteredItems[currentIndex];
        if (item) {
          setSelectedItem(item);
          setToastVisible(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeId, filteredItems, isOpen, query]);
  const selectItem = (item: RegistryItem) => {
    setActiveId(item.id);
    setSelectedItem(item);
    setToastVisible(true);
  };
  if (!isOpen) {
    return <main className="flex min-h-screen w-full items-center justify-center bg-[#f6f7f9] p-6 font-sans text-[#1e2738]">
        <section className="w-full max-w-[460px] rounded-xl border border-[#dfe3e8] bg-white p-10 text-center shadow-[0_14px_38px_rgba(35,45,65,0.08)]">
          <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full bg-[#edf4ff] text-[#0869ee]">
            <X aria-hidden="true" size={24} strokeWidth={1.8} />
          </div>
          <h1 className="text-[22px] font-semibold tracking-[-0.01em]">Окно выбора закрыто</h1>
          <p className="mt-2 text-[14px] leading-6 text-[#667085]">Вы можете вернуться к выбору типа нового документа.</p>
          <button type="button" onClick={() => setIsOpen(true)} className="mt-7 inline-flex h-10 items-center gap-2 rounded-md bg-[#0869ee] px-5 text-[14px] font-semibold text-white shadow-sm transition-colors hover:bg-[#005bd6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0869ee]">
            
            <RotateCcw aria-hidden="true" size={17} />
            Вернуться к выбору
          </button>
        </section>
      </main>;
  }
  return <main className="min-h-screen w-full bg-white font-sans text-[#1d2638]">
      <section className="mx-auto flex min-h-screen w-full max-w-[1910px] flex-col px-4 sm:px-6 lg:px-8">
        <header className="sticky top-0 z-20 bg-white/95 pt-6 backdrop-blur-sm sm:pt-7">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-[24px] font-semibold leading-8 tracking-[-0.015em] sm:text-[26px]">Загрузка нового документа</h1>
              <p className="mt-3 text-[16px] leading-6 text-[#303b50]">Выберите вариант создания документа.</p>
              <p className="text-[14px] leading-6 text-[#6f788b]">В списке показаны стандартные ECM-формы и опубликованные Lego-шаблоны.</p>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} className="group mt-1 inline-flex h-9 shrink-0 items-center gap-2 rounded-md px-2.5 text-[14px] font-medium text-[#5d6678] transition-colors hover:bg-[#f4f6f8] hover:text-[#20293a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0869ee]" aria-label="Закрыть выбор типа документа">
              
              <X aria-hidden="true" size={20} strokeWidth={1.8} />
              <span className="hidden sm:inline">Закрыть</span>
            </button>
          </div>

          <div className="relative mt-5 pb-4">
            <Search className="pointer-events-none absolute left-3.5 top-3 text-[#7c869a]" aria-hidden="true" size={21} strokeWidth={1.8} />
            <input ref={searchRef} value={query} onChange={event => setQuery(event.target.value)} placeholder="Найти тип документа или шаблон..." className="h-12 w-full rounded-md border border-[#cad1dc] bg-white pl-12 pr-24 text-[16px] text-[#1f2937] shadow-[0_1px_2px_rgba(16,24,40,0.02)] outline-none transition-[border-color,box-shadow] placeholder:text-[#8a93a4] hover:border-[#aeb7c6] focus:border-[#0869ee] focus:ring-2 focus:ring-[#0869ee]/15" role="combobox" aria-expanded="true" aria-controls="document-type-registry" aria-activedescendant={activeId ? `document-type-${activeId}` : undefined} />
            
            {query ? <button type="button" onClick={() => {
            setQuery('');
            searchRef.current?.focus();
          }} className="absolute right-3 top-2.5 flex size-7 items-center justify-center rounded text-[#6f788b] hover:bg-[#f0f2f5] hover:text-[#263044] focus-visible:outline-2 focus-visible:outline-[#0869ee]" aria-label="Очистить поиск">
              
                <X aria-hidden="true" size={17} />
              </button> : <kbd className="pointer-events-none absolute right-3 top-2.5 rounded border border-[#dfe3e8] bg-[#fafbfc] px-2 py-1 font-sans text-[12px] text-[#717b8e] shadow-sm">Ctrl + K</kbd>}
          </div>
        </header>

        <div className="flex min-h-0 flex-1 flex-col pb-5">
          <div className="mb-2 flex items-center justify-between text-[13px] text-[#5d677a]">
            <span>Найдено: <strong className="font-semibold text-[#344054]">{filteredItems.length}</strong></span>
            {selectedItem && <span className="hidden sm:block">Выбрано: <strong className="font-semibold text-[#0869ee]">{selectedItem.name}</strong></span>}
          </div>

          <div className="grid h-8 grid-cols-[minmax(0,1fr)_minmax(220px,39%)_118px] items-center gap-4 border-b border-[#d8dde6] px-4 text-[13px] font-semibold text-[#626c7e] max-md:grid-cols-[minmax(0,1fr)_110px]">
            <span>Название</span>
            <span className="max-md:hidden">Источник / Тип</span>
            <span className="text-right">Действие</span>
          </div>

          <div id="document-type-registry" role="listbox" aria-label="Типы нового документа" className="min-h-0 flex-1 overflow-y-auto overscroll-contain py-1">
            {filteredItems.map(item => {
            const isActive = item.id === activeId;
            const isSelected = item.id === selectedItem?.id;
            const isLego = item.source === 'Lego-шаблон';
            const Icon = isLego ? PackageOpen : FileText;
            return <div key={item.id} id={`document-type-${item.id}`} role="option" aria-selected={isActive} tabIndex={isActive ? 0 : -1} onMouseEnter={() => setActiveId(item.id)} onFocus={() => setActiveId(item.id)} onDoubleClick={() => selectItem(item)} className={`group relative grid min-h-[76px] cursor-default grid-cols-[minmax(0,1fr)_minmax(220px,39%)_118px] items-center gap-4 border-b px-4 transition-[background-color,border-color,box-shadow] max-md:grid-cols-[minmax(0,1fr)_110px] ${isActive ? 'z-10 rounded-[3px] border border-[#0869ee] bg-[linear-gradient(90deg,#f8fbff_0%,#ffffff_72%)] shadow-[0_0_0_1px_rgba(8,105,238,0.04)]' : 'border-[#e3e6eb] hover:bg-[#fafbfc]'}`}>
                  
                  <div className="flex min-w-0 items-center gap-4">
                    <div className={`flex size-9 shrink-0 items-center justify-center rounded-md ${isLego ? 'bg-[#effbf4] text-[#22b86b]' : 'bg-[#f2f4f7] text-[#697386]'}`}>
                      <Icon aria-hidden="true" size={23} strokeWidth={1.7} />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[16px] font-semibold leading-6 text-[#1f2937]">{item.name}</p>
                      <p className="truncate text-[14px] leading-5 text-[#727c8e]">{item.source} · {item.type}</p>
                    </div>
                  </div>

                  <div className="flex min-w-0 items-center gap-3 max-md:hidden">
                    <Icon aria-hidden="true" className={isLego ? 'text-[#28be70]' : 'text-[#0877f9]'} size={21} strokeWidth={1.8} />
                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-medium leading-5 text-[#566074]">{item.source}</p>
                      <p className="truncate text-[12px] leading-4 text-[#9098a8]">{item.type}</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button type="button" onClick={() => selectItem(item)} className={`inline-flex h-10 min-w-[102px] items-center justify-center gap-1.5 rounded-md px-4 text-[14px] font-semibold transition-[background-color,box-shadow,transform] active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0869ee] ${isSelected ? 'bg-[#eaf3ff] text-[#0869ee] shadow-none' : 'bg-[#0869ee] text-white shadow-[0_2px_6px_rgba(8,105,238,0.2)] hover:bg-[#005fdb] hover:shadow-[0_3px_9px_rgba(8,105,238,0.27)]'}`}>
                      
                      {isSelected ? <Check aria-hidden="true" size={17} strokeWidth={2.2} /> : null}
                      {isSelected ? 'Выбрано' : 'Выбрать'}
                    </button>
                  </div>
                </div>;
          })}

            {!filteredItems.length && <div className="flex min-h-[320px] flex-col items-center justify-center px-6 text-center">
                <div className="flex size-11 items-center justify-center rounded-full bg-[#f1f4f8] text-[#697386]">
                  <Search aria-hidden="true" size={21} />
                </div>
                <p className="mt-4 text-[16px] font-semibold">Ничего не найдено</p>
                <p className="mt-1 text-[14px] text-[#727c8e]">Измените запрос или очистите строку поиска.</p>
                <button type="button" onClick={() => setQuery('')} className="mt-4 text-[14px] font-semibold text-[#0869ee] hover:text-[#005bd6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0869ee]">Очистить поиск</button>
              </div>}
          </div>

          <footer className="flex min-h-12 items-center justify-between gap-4 border-t border-[#d8dde6] px-4 text-[13px] text-[#6b7487]">
            <span>Клавиши: ↑ ↓ — навигация; Enter — выбрать; Esc — закрыть</span>
            <span className="hidden items-center gap-1 font-medium text-[#546075] sm:flex">Двойной клик по строке <ChevronRight aria-hidden="true" size={15} /></span>
          </footer>
        </div>
      </section>

      <div role="status" aria-live="polite" className={`fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-lg bg-[#172033] px-4 py-3 text-[14px] font-medium text-white shadow-[0_12px_32px_rgba(15,23,42,0.24)] transition-all duration-200 ${toastVisible && selectedItem ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}>
        
        <span className="flex size-6 items-center justify-center rounded-full bg-[#36c978] text-white"><Check aria-hidden="true" size={15} strokeWidth={2.5} /></span>
        {selectedItem ? `Выбран тип «${selectedItem.name}»` : ''}
      </div>
    </main>;
};