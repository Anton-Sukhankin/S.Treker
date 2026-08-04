'use strict';

var React = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const useDependsGraph = (filters) => {
    return React__default["default"].useMemo(() => {
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

exports.useDependsGraph = useDependsGraph;
