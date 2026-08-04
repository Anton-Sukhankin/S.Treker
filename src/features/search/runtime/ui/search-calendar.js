const RANGE_SEPARATOR = ' — ';
const CALENDAR_REFERENCE_TODAY = { year: 2026, month: 5, day: 14 };

function clearNode(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

function createMonthTitle(title) {
    const titleElement = document.createElement('div');
    titleElement.style.textAlign = 'center';
    titleElement.style.fontWeight = '700';
    titleElement.style.color = 'var(--primary)';
    titleElement.style.fontSize = '14px';
    titleElement.style.marginBottom = '12px';
    titleElement.style.textTransform = 'uppercase';
    titleElement.textContent = title;
    return titleElement;
}

function createDateValue(year, month, day) {
    return {
        year,
        month,
        day,
        key: year * 10000 + month * 100 + day
    };
}

function parseDisplayDate(value) {
    const match = String(value || '').trim().match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
    if (!match) return null;

    return createDateValue(Number(match[3]), Number(match[2]), Number(match[1]));
}

function parseInputSelection(value) {
    const parts = String(value || '').split(/\s+[—–-]\s+/).filter(Boolean);
    return {
        start: parseDisplayDate(parts[0]),
        end: parseDisplayDate(parts[1])
    };
}

function formatDate(date) {
    if (!date) return '';
    return `${String(date.day).padStart(2, '0')}.${String(date.month).padStart(2, '0')}.${date.year}`;
}

export function createSearchCalendarController(options) {
    const {
        inputId,
        dropdownId,
        rangeToggleId,
        clearButtonId,
        onBeforeOpen,
        onSelectDate
    } = options;

    const selectionByInput = new WeakMap();
    let activeInput = null;

    function getDropdown() {
        return document.getElementById(dropdownId);
    }

    function getRangeToggle() {
        return document.getElementById(rangeToggleId);
    }

    function getClearButton() {
        return clearButtonId ? document.getElementById(clearButtonId) : null;
    }

    function syncClearButton() {
        const input = document.getElementById(inputId);
        const clearButton = getClearButton();
        if (clearButton) clearButton.hidden = !input?.value;
    }

    function getSelection(input) {
        if (!input) return { start: null, end: null };

        const cached = selectionByInput.get(input);
        if (cached?.inputValue === input.value) return cached;

        const parsed = parseInputSelection(input.value);
        const selection = { ...parsed, inputValue: input.value };
        selectionByInput.set(input, selection);
        return selection;
    }

    function setSelection(input, start, end = null) {
        if (!input) return;

        input.value = end
            ? `${formatDate(start)}${RANGE_SEPARATOR}${formatDate(end)}`
            : formatDate(start);
        selectionByInput.set(input, { start, end, inputValue: input.value });
        if (input.id === inputId) syncClearButton();
    }

    function clearInput() {
        const input = document.getElementById(inputId);
        if (!input) return;

        input.value = '';
        selectionByInput.delete(input);
        syncClearButton();
        if (activeInput === input) renderCalendar();
        if (typeof onSelectDate === 'function') onSelectDate(input);
    }

    function close() {
        const dropdown = getDropdown();
        if (dropdown) {
            dropdown.classList.remove('visible');
            dropdown.setAttribute('aria-hidden', 'true');
        }
        if (activeInput) {
            activeInput.closest('.date-period-container')?.classList.remove('open');
        }
        activeInput = null;
    }

    function closeIfExcept(exceptContainer = null) {
        if (!activeInput) return;
        const activeContainer = activeInput.closest('.date-period-container');
        if (exceptContainer !== activeContainer) close();
    }

    function updatePosition() {
        const dropdown = getDropdown();
        if (!activeInput || !dropdown) return;

        const rect = activeInput.getBoundingClientRect();
        const calendarRect = dropdown.getBoundingClientRect();
        const calendarHeight = calendarRect.height || 400;
        const spaceBelow = window.innerHeight - rect.bottom;

        if (spaceBelow < calendarHeight && rect.top > calendarHeight) {
            dropdown.style.top = `${rect.top - calendarHeight - 4}px`;
        } else {
            dropdown.style.top = `${rect.bottom + 8}px`;
        }
        dropdown.style.left = `${rect.left}px`;
    }

    function selectDate(date) {
        const rangeEnabled = getRangeToggle()?.checked === true;
        const selection = getSelection(activeInput);

        if (!rangeEnabled) {
            setSelection(activeInput, date);
        } else if (!selection.start || selection.end) {
            setSelection(activeInput, date);
        } else if (date.key < selection.start.key) {
            setSelection(activeInput, date, selection.start);
        } else {
            setSelection(activeInput, selection.start, date);
        }

        renderCalendar();
        if (typeof onSelectDate === 'function') onSelectDate(activeInput);
    }

    function createMonthGrid(title, year, month) {
        const rangeEnabled = getRangeToggle()?.checked === true;
        const selection = getSelection(activeInput);
        const todayKey = createDateValue(
            CALENDAR_REFERENCE_TODAY.year,
            CALENDAR_REFERENCE_TODAY.month,
            CALENDAR_REFERENCE_TODAY.day
        ).key;
        const monthBlock = document.createElement('div');
        monthBlock.style.flex = '1';
        monthBlock.appendChild(createMonthTitle(title));

        const grid = document.createElement('div');
        grid.className = 'calendar-grid';

        ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'].forEach(dayName => {
            const header = document.createElement('div');
            header.className = 'calendar-day-header';
            header.textContent = dayName;
            grid.appendChild(header);
        });

        const daysInMonth = new Date(year, month, 0).getDate();
        const firstWeekday = (new Date(year, month - 1, 1).getDay() + 6) % 7;
        for (let offset = 0; offset < firstWeekday; offset += 1) {
            const placeholder = document.createElement('span');
            placeholder.className = 'calendar-day-placeholder';
            placeholder.setAttribute('aria-hidden', 'true');
            grid.appendChild(placeholder);
        }

        for (let dayNumber = 1; dayNumber <= daysInMonth; dayNumber += 1) {
            const date = createDateValue(year, month, dayNumber);
            const isSelected = date.key === selection.start?.key || date.key === selection.end?.key;
            const isInRange = rangeEnabled
                && selection.start
                && selection.end
                && date.key > selection.start.key
                && date.key < selection.end.key;
            const day = document.createElement('button');
            day.type = 'button';
            day.className = 'calendar-day';
            day.setAttribute('aria-label', formatDate(date));
            day.setAttribute('aria-pressed', String(isSelected));
            day.classList.toggle('today', date.key === todayKey);
            day.classList.toggle('selected', isSelected);
            day.classList.toggle('in-range', Boolean(isInRange));
            day.textContent = String(dayNumber);
            day.addEventListener('click', event => {
                event.stopPropagation();
                selectDate(date);
            });
            grid.appendChild(day);
        }

        monthBlock.appendChild(grid);
        return monthBlock;
    }

    function renderCalendar() {
        const dropdown = getDropdown();
        const rangeToggle = getRangeToggle();
        const container = dropdown?.querySelector('.calendar-main-content');
        if (!container) return;

        clearNode(container);

        if (rangeToggle?.checked) {
            const wrapper = document.createElement('div');
            wrapper.className = 'calendar-range-wrapper';
            wrapper.appendChild(createMonthGrid('МАЙ 2026', 2026, 5));
            wrapper.appendChild(createMonthGrid('ИЮНЬ 2026', 2026, 6));
            container.appendChild(wrapper);
        } else {
            container.appendChild(createMonthGrid('МАЙ 2026', 2026, 5));
        }

        setTimeout(updatePosition, 0);
    }

    function toggle(event, targetInput) {
        event.stopPropagation();
        const dropdown = getDropdown();
        const container = targetInput.closest('.date-period-container');
        if (!dropdown || !container) return;

        if (dropdown.classList.contains('visible') && container.classList.contains('open')) {
            close();
            return;
        }

        if (typeof onBeforeOpen === 'function') onBeforeOpen(container);
        activeInput = targetInput;
        getSelection(activeInput);
        container.classList.add('open');
        dropdown.classList.add('visible');
        dropdown.setAttribute('aria-hidden', 'false');
        updatePosition();
        renderCalendar();
    }

    function attachInput(input) {
        const container = input?.closest('.date-period-container');
        if (!input || !container || container.dataset.calendarAttached === 'true') return;

        container.dataset.calendarAttached = 'true';
        container.addEventListener('click', event => toggle(event, input));
    }

    function init() {
        const input = document.getElementById(inputId);
        const dropdown = getDropdown();
        const clearButton = getClearButton();
        attachInput(input);
        dropdown?.setAttribute('aria-hidden', 'true');
        dropdown?.addEventListener('click', event => event.stopPropagation());
        clearButton?.addEventListener('click', event => {
            event.stopPropagation();
            clearInput();
        });
        syncClearButton();

        document.addEventListener('scroll', () => {
            if (activeInput && dropdown?.classList.contains('visible')) {
                updatePosition();
            }
        }, true);

        getRangeToggle()?.addEventListener('change', () => {
            dropdown?.classList.toggle('range-mode', getRangeToggle().checked);
            const selection = getSelection(activeInput);
            if (!getRangeToggle().checked && activeInput && selection.start) {
                setSelection(activeInput, selection.start);
                if (typeof onSelectDate === 'function') onSelectDate(activeInput);
            }
            renderCalendar();
        });
    }

    return {
        init,
        attachInput,
        close,
        closeIfExcept,
        renderCalendar,
        sync: syncClearButton,
        clear: clearInput
    };
}
