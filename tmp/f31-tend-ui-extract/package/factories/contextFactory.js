import React from 'react';

function contextFactory(provider = 'Context', initial) {
    const Context = React.createContext(initial);
    function useContext(consumer = 'useContext') {
        const context = React.useContext(Context);
        if (context)
            return context;
        throw new Error(`\`${consumer}\` must be used within \`${provider}\`!`);
    }
    Context.displayName = provider;
    return [Context.Provider, useContext];
}

export { contextFactory };
