'use strict';

var samolet = require('@10d/tend-ui-tokens/samolet');
var utils = require('./utils.js');

const SamoletTheme = utils.themeFactory(samolet.colors, {
    Button: {
        dangerDefaultBg: samolet.colors.red600,
        dangerGhostDefaultBg: samolet.colors.red100,
        dangerGhostDefaultText: samolet.colors.red600,
        dangerGhostHoverBg: samolet.colors.red50,
        dangerGhostHoverText: samolet.colors.red500,
        dangerGhostPressedBg: samolet.colors.red300,
        dangerGhostPressedText: samolet.colors.red700,
        dangerHoverBg: samolet.colors.red500,
        dangerPressedBg: samolet.colors.red700,
        dangerSecondaryDefaultBg: samolet.colors.red100,
        dangerSecondaryDefaultText: samolet.colors.red600,
        dangerSecondaryHoverBg: samolet.colors.red50,
        dangerSecondaryHoverText: samolet.colors.red500,
        dangerSecondaryPressedBg: samolet.colors.red200,
        dangerSecondaryPressedText: samolet.colors.red700,
        dangerText: samolet.colors.gray0,
        disabledBg: samolet.colors.gray50,
        disabledBorder: samolet.colors.gray200,
        disabledIcon: samolet.colors.gray400,
        disabledText: samolet.colors.gray400,
        ghostDefaultText: samolet.colors.gray900,
        ghostHoverBg: samolet.colors.blue50,
        ghostHoverText: samolet.colors.blue500,
        ghostPressedBg: samolet.colors.blue200,
        ghostPressedText: samolet.colors.blue700,
        primaryDefaultBg: samolet.colors.blue600,
        primaryHoverBg: samolet.colors.blue500,
        primaryPressedBg: samolet.colors.blue700,
        primaryText: samolet.colors.gray0,
        secondaryDefaultBg: samolet.colors.blue100,
        secondaryDefaultText: samolet.colors.blue600,
        secondaryHoverBg: samolet.colors.blue50,
        secondaryHoverText: samolet.colors.blue500,
        secondaryPressedBg: samolet.colors.blue200,
        secondaryPressedText: samolet.colors.blue700,
    },
});

exports.SamoletTheme = SamoletTheme;
