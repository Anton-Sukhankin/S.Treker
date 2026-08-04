'use strict';

var React = require('react');
var tendUiGrid = require('@10d/tend-ui-grid');
var ApprovalUser = require('./ApprovalUser.js');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const ApprovalsList = ({ list = [], showAvatar, maxVisibleItems = 4, }) => {
    const [showAll, setShowAll] = React.useState(false);
    const showMore = React.useCallback(() => {
        setShowAll(true);
    }, []);
    return (React__default["default"].createElement(tendUiGrid.Box, null,
        list.slice(0, showAll ? list.length : maxVisibleItems).map(item => (React__default["default"].createElement(ApprovalUser.ApprovalUser, { key: item.user.id, step: item, showAvatar: showAvatar }))),
        !showAll && list.length > maxVisibleItems && (React__default["default"].createElement(styled.StyledButton, { ml: -16, variant: 'link', onClick: showMore },
            "\u0415\u0449\u0435 ",
            list.length - maxVisibleItems))));
};

exports.ApprovalsList = ApprovalsList;
