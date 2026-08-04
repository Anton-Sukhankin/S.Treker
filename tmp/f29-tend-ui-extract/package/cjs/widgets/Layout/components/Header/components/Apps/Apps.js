'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiLogos = require('@10d/tend-ui-logos');
var useTranslation = require('@10d/tend-ui-locale/hooks/useTranslation');
var ArrowForward = require('@10d/tend-ui-icons/ArrowForward');
var BurgerMenu = require('../../../../../../components/BurgerMenu/BurgerMenu.js');
var tendUiPrimitives = require('@10d/tend-ui-primitives');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const links = [
    {
        key: 's.pro',
        name: 'S.Pro',
    },
    {
        key: 's.team',
        name: 'S.Team',
    },
    {
        key: 's.materials',
        name: 'S.Materials',
    },
    {
        key: 's.progress',
        name: 'S.Progress',
    },
    {
        key: 's.tender',
        name: 'S.Tender',
    },
    {
        key: 's.smr',
        name: 'S.Smr',
    },
    {
        key: 's.center',
        name: 'S.Center',
    },
    {
        key: 's.control',
        name: 'S.Control',
    },
    {
        key: 's.home',
        name: 'S.Home',
    },
    {
        key: 's.project',
        name: 'S.Project',
    },
    {
        key: 'roomer',
        name: 'Roomer',
    },
    {
        key: 's.kek',
        name: 'S.Kek',
    },
    {
        key: 's.cost',
        name: 'S.Cost',
    },
    {
        key: 's.volume',
        name: 'S.Volume',
    },
    {
        key: 's.contracts',
        name: 'S.Contracts',
    },
    {
        key: 's.pass',
        name: 'S.Pass',
    },
    {
        key: 's.docs',
        name: 'S.Docs',
    },
    {
        key: 's.security',
        name: 'S.Security',
    },
    {
        key: 's.blueprint',
        name: 'S.Blueprint',
    },
    {
        key: 's.fine',
        name: 'S.Fine',
    },
    {
        key: 's.plan',
        name: 'S.Plan',
    },
    {
        key: 's.task',
        name: 'S.Task',
    },
];
const icons = {
    ['s.pro']: tendUiLogos.SPro,
    ['s.team']: tendUiLogos.STeam,
    ['s.materials']: tendUiLogos.SMaterials,
    ['s.progress']: tendUiLogos.SProgress,
    ['s.tender']: tendUiLogos.STender,
    ['s.smr']: tendUiLogos.SSmr,
    ['s.center']: tendUiLogos.SCenter,
    ['s.control']: tendUiLogos.SControl,
    ['s.home']: tendUiLogos.SHome,
    ['s.project']: tendUiLogos.SProject,
    ['roomer']: tendUiLogos.Roomer,
    ['s.kek']: tendUiLogos.SKek,
    ['s.cost']: tendUiLogos.SCost,
    ['s.volume']: tendUiLogos.SVolume,
    ['s.contracts']: tendUiLogos.SContracts,
    ['s.pass']: tendUiLogos.SPass,
    ['s.docs']: tendUiLogos.SDocs,
    ['s.security']: tendUiLogos.SSecurity,
    ['s.blueprint']: tendUiLogos.SBlueprint,
    ['s.fine']: tendUiLogos.SFine,
    ['s.plan']: tendUiLogos.SPlan,
    ['s.task']: tendUiLogos.STask,
    ['s.limon']: tendUiLogos.SLimon,
    ['s.ecm']: tendUiLogos.SEcm,
};
const Apps = (_a) => {
    var { exclude, selected, available, include, hrefs = {}, allAppsHref } = _a, props = tslib.__rest(_a, ["exclude", "selected", "available", "include", "hrefs", "allAppsHref"]);
    const t = useTranslation.useTranslation();
    const _include = include === null || include === void 0 ? void 0 : include.map(v => v.toLowerCase());
    const _exclude = exclude === null || exclude === void 0 ? void 0 : exclude.map(v => v.toLowerCase());
    const _available = available === null || available === void 0 ? void 0 : available.map(v => v.toLowerCase());
    const _items = React__default["default"].useMemo(() => {
        return links
            .filter(link => {
            if (_include === null || _include === void 0 ? void 0 : _include.length) {
                return _include.includes(link.key);
            }
            if (_exclude === null || _exclude === void 0 ? void 0 : _exclude.length) {
                return !(_exclude === null || _exclude === void 0 ? void 0 : _exclude.includes(link.key));
            }
            return true;
        })
            .map(link => {
            const href = hrefs[link.key];
            const disabled = !href || ((_available === null || _available === void 0 ? void 0 : _available.length) ? !_available.includes(link.key) : false);
            const tooltip = disabled
                ? {
                    title: 'Другие сервисы производственной системы будут доступны после подписания договора',
                }
                : undefined;
            const Icon = icons[link.key];
            return {
                as: 'a',
                key: link.key,
                before: React__default["default"].createElement(Icon, { color: disabled ? 'gray400' : undefined }),
                label: link.name,
                href,
                target: '_blank',
                disabled,
                tooltip,
            };
        });
    }, [_available, _exclude, _include, hrefs]);
    return (React__default["default"].createElement(BurgerMenu.BurgerMenu, Object.assign({ selectedKeys: selected, items: _items, footer: allAppsHref ? (React__default["default"].createElement(tendUiPrimitives.Button, { as: 'a', href: allAppsHref, target: '_blank', variant: 'ghost', after: React__default["default"].createElement(ArrowForward.ArrowForward, null) }, t(['widgets', 'Layout', 'Apps', 'all']))) : undefined }, props)));
};
Apps.displayName = 'Layout.Header.Apps';

exports.Apps = Apps;
