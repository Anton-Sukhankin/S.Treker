'use strict';

var React = require('react');
var Search$1 = require('../../../../components/Search/Search.js');
var Form = require('../../../../components/Form/Form.js');
var FormName = require('../../consts/FormName.js');
var useTableForm = require('../../hooks/useTableForm.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Search = (props) => {
    const { form } = useTableForm.useTableForm();
    return (React__default["default"].createElement(Form.Form, { component: false, form: form, name: FormName.FormName.Search },
        React__default["default"].createElement(Form.Form.Item, { noStyle: true, name: 'search' },
            React__default["default"].createElement(Search$1.Search, Object.assign({ style: { width: '256px' } }, props)))));
};

exports.Search = Search;
