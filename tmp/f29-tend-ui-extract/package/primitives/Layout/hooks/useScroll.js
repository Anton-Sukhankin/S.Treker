import { useCallbackRef } from '@10d/tend-ui-hooks';

const __NODES = new Map();
/**
 * Хук для скроллинга страницы
 */
const useScroll = () => {
    const register = useCallbackRef((key, target) => {
        __NODES.set(key, target);
    });
    const scroll = useCallbackRef((key) => {
        const instance = __NODES.get(key);
        if (!(instance === null || instance === void 0 ? void 0 : instance.current))
            return;
        instance.current.scrollIntoView({ behavior: 'smooth' });
    });
    return { register, scroll };
};

export { useScroll };
