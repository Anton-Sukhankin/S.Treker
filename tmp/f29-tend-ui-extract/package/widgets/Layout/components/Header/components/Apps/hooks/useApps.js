import React from 'react';
import { STask, SPlan, SFine, SBlueprint, SSecurity, SDocs, SPass, SContracts, SKek, SRoomer, SProject, SHome, SControl, SCenter, SSmr, STender, SProgress, SMaterials, STeam, SPro } from '@10d/tend-ui-logos';

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
    ['S.Pro']: React.createElement(SPro, null),
    ['S.Team']: React.createElement(STeam, null),
    ['S.Materials']: React.createElement(SMaterials, null),
    ['S.Progress']: React.createElement(SProgress, null),
    ['S.Tender']: React.createElement(STender, null),
    ['S.Smr']: React.createElement(SSmr, null),
    ['S.Center']: React.createElement(SCenter, null),
    ['S.Control']: React.createElement(SControl, null),
    ['S.Home']: React.createElement(SHome, null),
    ['S.Project']: React.createElement(SProject, null),
    ['S.Roomer']: React.createElement(SRoomer, null),
    ['S.Kek']: React.createElement(SKek, null),
    ['S.Cost']: '',
    ['S.Volume']: '',
    ['S.Contracts']: React.createElement(SContracts, null),
    ['S.Pass']: React.createElement(SPass, null),
    ['S.Docs']: React.createElement(SDocs, null),
    ['S.Security']: React.createElement(SSecurity, null),
    ['S.Blueprint']: React.createElement(SBlueprint, null),
    ['S.Fine']: React.createElement(SFine, null),
    ['S.Plan']: React.createElement(SPlan, null),
    ['S.Task']: React.createElement(STask, null),
};
const useApps = (hrefs = {}) => {
    return React.useMemo(() => links.map(link => ({
        as: 'a',
        key: link.name,
        before: icons[link.name],
        label: link.name,
        href: hrefs[link.name],
        target: '_blank',
        disabled: !hrefs[link.name],
    })), [hrefs]);
};

export { useApps };
