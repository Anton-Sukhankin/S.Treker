import React from 'react';

const useDependsGraph = (filters) => {
    return React.useMemo(() => {
        if (!filters)
            return {};
        return filters.reduce((graph, value) => {
            if (!value.depends)
                return graph;
            value.depends.forEach(dependency => {
                if (Array.isArray(graph[value.name])) {
                    graph[value.name].push(dependency);
                    return;
                }
                graph[value.name] = [];
                graph[value.name].push(dependency);
            });
            return graph;
        }, {});
    }, [filters]);
};

export { useDependsGraph };
