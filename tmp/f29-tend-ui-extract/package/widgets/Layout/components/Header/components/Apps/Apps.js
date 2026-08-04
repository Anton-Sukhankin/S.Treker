import { __rest } from 'tslib';
import React from 'react';
import { SEcm, SLimon, STask, SPlan, SFine, SBlueprint, SSecurity, SDocs, SPass, SContracts, SVolume, SCost, SKek, Roomer, SProject, SHome, SControl, SCenter, SSmr, STender, SProgress, SMaterials, STeam, SPro } from '@10d/tend-ui-logos';
import { useTranslation } from '@10d/tend-ui-locale/hooks/useTranslation';
import { ArrowForward } from '@10d/tend-ui-icons/ArrowForward';
import { BurgerMenu } from '../../../../../../components/BurgerMenu/BurgerMenu.js';
import { Button } from '@10d/tend-ui-primitives';

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
    ['s.pro']: SPro,
    ['s.team']: STeam,
    ['s.materials']: SMaterials,
    ['s.progress']: SProgress,
    ['s.tender']: STender,
    ['s.smr']: SSmr,
    ['s.center']: SCenter,
    ['s.control']: SControl,
    ['s.home']: SHome,
    ['s.project']: SProject,
    ['roomer']: Roomer,
    ['s.kek']: SKek,
    ['s.cost']: SCost,
    ['s.volume']: SVolume,
    ['s.contracts']: SContracts,
    ['s.pass']: SPass,
    ['s.docs']: SDocs,
    ['s.security']: SSecurity,
    ['s.blueprint']: SBlueprint,
    ['s.fine']: SFine,
    ['s.plan']: SPlan,
    ['s.task']: STask,
    ['s.limon']: SLimon,
    ['s.ecm']: SEcm,
};
const Apps = (_a) => {
    var { exclude, selected, available, include, hrefs = {}, allAppsHref } = _a, props = __rest(_a, ["exclude", "selected", "available", "include", "hrefs", "allAppsHref"]);
    const t = useTranslation();
    const _include = include === null || include === void 0 ? void 0 : include.map(v => v.toLowerCase());
    const _exclude = exclude === null || exclude === void 0 ? void 0 : exclude.map(v => v.toLowerCase());
    const _available = available === null || available === void 0 ? void 0 : available.map(v => v.toLowerCase());
    const _items = React.useMemo(() => {
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
                before: React.createElement(Icon, { color: disabled ? 'gray400' : undefined }),
                label: link.name,
                href,
                target: '_blank',
                disabled,
                tooltip,
            };
        });
    }, [_available, _exclude, _include, hrefs]);
    return (React.createElement(BurgerMenu, Object.assign({ selectedKeys: selected, items: _items, footer: allAppsHref ? (React.createElement(Button, { as: 'a', href: allAppsHref, target: '_blank', variant: 'ghost', after: React.createElement(ArrowForward, null) }, t(['widgets', 'Layout', 'Apps', 'all']))) : undefined }, props)));
};
Apps.displayName = 'Layout.Header.Apps';

export { Apps };
