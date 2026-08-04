'use strict';

var React = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

function contextFactory(provider = 'Context', initial) {
    const Context = React__default["default"].createContext(initial);
    function useContext(consumer = 'useContext') {
        const context = React__default["default"].useContext(Context);
        if (context)
            return context;
        throw new Error(`\`${consumer}\` must be used within \`${provider}\`!`);
    }
    Context.displayName = provider;
    return [Context.Provider, useContext];
}

exports.contextFactory = contextFactory;
