'use strict';

var React = require('react');
var tendUiLogos = require('@10d/tend-ui-logos');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const links = [
    {
        name: 'S.Pro',
    },
    {
        name: 'S.Team',
    },
    {
        name: 'S.Materials',
    },
    {
        name: 'S.Progress',
    },
    {
        name: 'S.Tender',
    },
    {
        name: 'S.Smr',
    },
    {
        name: 'S.Center',
    },
    {
        name: 'S.Control',
    },
    {
        name: 'S.Home',
    },
    {
        name: 'S.Project',
    },
    {
        name: 'S.Roomer',
    },
    {
        name: 'S.Kek',
    },
    {
        name: 'S.Cost',
    },
    {
        name: 'S.Volume',
    },
    {
        name: 'S.Contracts',
    },
    {
        name: 'S.Pass',
    },
    {
        name: 'S.Docs',
    },
    {
        name: 'S.Security',
    },
    {
        name: 'S.Blueprint',
    },
    {
        name: 'S.Fine',
    },
    {
        name: 'S.Plan',
    },
    {
        name: 'S.Task',
    },
];
const icons = {
    ['S.Pro']: React__default["default"].createElement(tendUiLogos.SPro, null),
    ['S.Team']: React__default["default"].createElement(tendUiLogos.STeam, null),
    ['S.Materials']: React__default["default"].createElement(tendUiLogos.SMaterials, null),
    ['S.Progress']: React__default["default"].createElement(tendUiLogos.SProgress, null),
    ['S.Tender']: React__default["default"].createElement(tendUiLogos.STender, null),
    ['S.Smr']: React__default["default"].createElement(tendUiLogos.SSmr, null),
    ['S.Center']: React__default["default"].createElement(tendUiLogos.SCenter, null),
    ['S.Control']: React__default["default"].createElement(tendUiLogos.SControl, null),
    ['S.Home']: React__default["default"].createElement(tendUiLogos.SHome, null),
    ['S.Project']: React__default["default"].createElement(tendUiLogos.SProject, null),
    ['S.Roomer']: React__default["default"].createElement(tendUiLogos.SRoomer, null),
    ['S.Kek']: React__default["default"].createElement(tendUiLogos.SKek, null),
    ['S.Cost']: '',
    ['S.Volume']: '',
    ['S.Contracts']: React__default["default"].createElement(tendUiLogos.SContracts, null),
    ['S.Pass']: React__default["default"].createElement(tendUiLogos.SPass, null),
    ['S.Docs']: React__default["default"].createElement(tendUiLogos.SDocs, null),
    ['S.Security']: React__default["default"].createElement(tendUiLogos.SSecurity, null),
    ['S.Blueprint']: React__default["default"].createElement(tendUiLogos.SBlueprint, null),
    ['S.Fine']: React__default["default"].createElement(tendUiLogos.SFine, null),
    ['S.Plan']: React__default["default"].createElement(tendUiLogos.SPlan, null),
    ['S.Task']: React__default["default"].createElement(tendUiLogos.STask, null),
};
const useApps = (hrefs = {}) => {
    return React__default["default"].useMemo(() => links.map(link => ({
        as: 'a',
        key: link.name,
        before: icons[link.name],
        label: link.name,
        href: hrefs[link.name],
        target: '_blank',
        disabled: !hrefs[link.name],
    })), [hrefs]);
};

exports.useApps = useApps;
