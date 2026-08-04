import { __rest } from 'tslib';
import React from 'react';
import { NotFound } from './components/NotFound/NotFound.js';
import { Forbidden } from './components/Forbidden/Forbidden.js';
import { InternalServerError } from './components/InternalServerError/InternalServerError.js';

const Status = (_a) => {
    var { status = 404 } = _a, props = __rest(_a, ["status"]);
    return ({
        404: React.createElement(NotFound, Object.assign({}, props)),
        403: React.createElement(Forbidden, Object.assign({}, props)),
        500: React.createElement(InternalServerError, Object.assign({}, props)),
    }[status]);
};
Status.displayName = 'Status';

export { Status };
