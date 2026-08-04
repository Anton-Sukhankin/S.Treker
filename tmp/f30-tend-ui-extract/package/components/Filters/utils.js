import { extract as extract$1 } from '@10d/tend-ui-utils/extract';

const pack = (payload, scope) => {
    if (scope)
        return { [scope]: payload };
    return payload;
};
const extract = (payload, scope) => {
    if (scope)
        return extract$1(payload, [scope]) || {};
    return payload;
};

export { extract, pack };
