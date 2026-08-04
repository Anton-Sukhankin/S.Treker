import React, { useMemo } from 'react';
import { ApprovalUser } from './ApprovalUser.js';
import { declOfNum, src } from '../utils.js';

const GroupLabel = ({ group, showAvatar }) => {
    var _a;
    const step = useMemo(() => {
        var _a, _b, _c, _d;
        return ({
            user: {
                username: group.name,
                position: `${(_b = (_a = group.users) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0} ${declOfNum((_d = (_c = group.users) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0, [
                    'сотрудник',
                    'сотрудника',
                    'сотрудников',
                ])}`,
                id: group.id,
            },
        });
    }, [group.id, group.name, (_a = group.users) === null || _a === void 0 ? void 0 : _a.length]);
    return React.createElement(ApprovalUser, { src: src, step: step, showAvatar: showAvatar });
};

export { GroupLabel };
