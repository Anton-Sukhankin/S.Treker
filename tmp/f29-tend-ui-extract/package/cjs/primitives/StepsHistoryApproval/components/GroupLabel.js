'use strict';

var React = require('react');
var ApprovalUser = require('./ApprovalUser.js');
var utils = require('../utils.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const GroupLabel = ({ group, showAvatar }) => {
    var _a;
    const step = React.useMemo(() => {
        var _a, _b, _c, _d;
        return ({
            user: {
                username: group.name,
                position: `${(_b = (_a = group.users) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0} ${utils.declOfNum((_d = (_c = group.users) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0, [
                    'сотрудник',
                    'сотрудника',
                    'сотрудников',
                ])}`,
                id: group.id,
            },
        });
    }, [group.id, group.name, (_a = group.users) === null || _a === void 0 ? void 0 : _a.length]);
    return React__default["default"].createElement(ApprovalUser.ApprovalUser, { src: utils.src, step: step, showAvatar: showAvatar });
};

exports.GroupLabel = GroupLabel;
