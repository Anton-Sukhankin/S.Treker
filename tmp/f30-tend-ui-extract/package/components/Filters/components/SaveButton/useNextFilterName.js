import React from 'react';

const useNextFilterName = (names) => {
    return React.useMemo(() => {
        const numbers = names
            .map(name => name.match(/Сохраненный фильтр (\d+)/))
            .filter((value) => Boolean(value))
            .map(([, matched]) => parseInt(matched, 10))
            .sort((a, b) => a - b);
        const missing = Array.from({ length: numbers.length + 1 }, (_, i) => i + 1).find(n => !numbers.includes(n));
        return `Сохраненный фильтр ${missing}`;
    }, [names]);
};

export { useNextFilterName };
