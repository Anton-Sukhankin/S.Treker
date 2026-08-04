import { useEffect, useId, useRef, useState } from "react";
export type SelectOption = {
  value: string;
  label: string;
};
type SelectProps = {
  id?: string;
  value: string;
  options: SelectOption[];
  placeholder: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};
const SelectChevronIcon = () => <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
  
    <path d="m5 7.5 5 5 5-5" />
  </svg>;
const CheckIcon = () => <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
  
    <path d="m5.5 10 3 3 6-6" />
  </svg>;
export const Select = ({
  id,
  value,
  options,
  placeholder,
  onChange,
  disabled = false
}: SelectProps) => {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const listboxId = `${selectId}-listbox`;
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<"top" | "bottom">("bottom");
  const selectedOption = options.find(option => option.value === value);
  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, []);
  const selectOption = (option: SelectOption) => {
    onChange(option.value);
    setOpen(false);
  };
  const openSelect = () => {
    const trigger = buttonRef.current;
    if (!trigger) {
      setOpen(true);
      return;
    }
    let scrollContainer: HTMLElement | null = trigger.parentElement;
    while (scrollContainer) {
      const overflowY = window.getComputedStyle(scrollContainer).overflowY;
      if (overflowY === "auto" || overflowY === "scroll") break;
      scrollContainer = scrollContainer.parentElement;
    }
    const triggerRect = trigger.getBoundingClientRect();
    const boundaryRect = scrollContainer?.getBoundingClientRect();
    const boundaryTop = boundaryRect?.top ?? 0;
    const boundaryBottom = boundaryRect?.bottom ?? window.innerHeight;
    const expectedListHeight = Math.min(224, options.length * 40 + 8) + 4;
    const spaceBelow = boundaryBottom - triggerRect.bottom;
    const spaceAbove = triggerRect.top - boundaryTop;
    setPlacement(spaceBelow < expectedListHeight && spaceAbove > spaceBelow ? "top" : "bottom");
    setOpen(true);
  };
  return <div ref={rootRef} className="relative mt-2">
      <button ref={buttonRef} id={selectId} type="button" disabled={disabled} aria-haspopup="listbox" aria-controls={listboxId} aria-expanded={open} onClick={() => open ? setOpen(false) : openSelect()} onKeyDown={event => {
      if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openSelect();
      }
      if (event.key === "Escape") {
        setOpen(false);
      }
    }} className="flex h-11 w-full items-center justify-between gap-3 rounded-md border border-[#cfd7e3] bg-white px-3 text-left text-sm shadow-sm outline-none transition hover:border-[#aeb8c6] focus:border-[#007bfb] focus:ring-2 focus:ring-[#007bfb]/15 disabled:cursor-not-allowed disabled:border-[#e0e5ec] disabled:bg-[#f2f4f7] disabled:text-[#98a2b3] disabled:shadow-none">
        
        <span className={`min-w-0 flex-1 truncate ${selectedOption ? "text-[#111827]" : "text-[#98a2b3]"}`}>
          {selectedOption?.label ?? placeholder}
        </span>
        <span className={`shrink-0 text-[#667085] transition-transform ${open ? "rotate-180" : ""}`}>
          <SelectChevronIcon />
        </span>
      </button>

      {open && <ul id={listboxId} role="listbox" aria-labelledby={selectId} className={`absolute z-30 max-h-56 w-full overflow-y-auto rounded-md border border-[#d8dee8] bg-white p-1 shadow-[0_12px_28px_rgba(15,23,42,0.16)] ${placement === "top" ? "bottom-full mb-1" : "top-full mt-1"}`}>
        
          {options.map(option => {
        const selected = option.value === value;
        return <li key={option.value} role="presentation">
                <button type="button" role="option" aria-selected={selected} onClick={() => selectOption(option)} className={`flex min-h-10 w-full items-center justify-between gap-3 rounded px-3 py-2 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007bfb]/25 ${selected ? "bg-[#eaf5ff] font-medium text-[#006ac8]" : "text-[#344054] hover:bg-[#f4f6f9]"}`}>
                
                  <span className="min-w-0 flex-1 truncate">{option.label}</span>
                  {selected && <span className="shrink-0 text-[#007bfb]">
                      <CheckIcon />
                    </span>}
                </button>
              </li>;
      })}
        </ul>}
    </div>;
};