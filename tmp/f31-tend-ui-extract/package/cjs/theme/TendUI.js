'use strict';

var React = require('react');
var AntConfigProvider = require('antd-core/es/config-provider');
var tendUiLocale = require('@10d/tend-ui-locale');
var styled = require('styled-components');
var tendUiApi = require('@10d/tend-ui-api');
var samolet = require('@10d/tend-ui-tokens/samolet');
var utils = require('./utils.js');
var SamoletTheme = require('./SamoletTheme.js');
var ConfigProvider = require('./ConfigProvider.js');
var tendUiTheme = require('@10d/tend-ui-theme');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var AntConfigProvider__default = /*#__PURE__*/_interopDefault(AntConfigProvider);

const styles = styled.css `
  /* Menu */
  .tend-ui-menu-submenu-popup .tend-ui-menu-vertical.tend-ui-menu-sub {
    padding: 8px 0;
  }

  /* Dialog */
  // TODO: remove after upgrading antd-core >=5.24.1
  .tend-ui-modal-mask {
    pointer-events: auto !important;
  }

  .tend-ui-modal-confirm {
    .tend-ui-modal-close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
    }
    &.tend-ui-modal-confirm-image {
      .tend-ui-modal-confirm-body {
        flex-direction: column;
        align-items: center;

        & > .anticon {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 24px;
          margin-inline-end: 0px;
          font-size: 48px;
          border-radius: 50%;
          width: 80px;
          height: 80px;
        }
      }
    }
    &.tend-ui-modal-confirm-image-cover {
      .tend-ui-modal-content {
        padding: 0px;
      }
      .tend-ui-modal-confirm-paragraph {
        padding: 0 32px;
      }
    }
    &.tend-ui-modal-confirm-info .tend-ui-modal-confirm-body > .tend-ui-icon-root {
      color: ${samolet.colors.blue600};
    }
    &.tend-ui-modal-confirm-success .tend-ui-modal-confirm-body > .tend-ui-icon-root {
      color: ${samolet.colors.green500};
    }
    &.tend-ui-modal-confirm-warning .tend-ui-modal-confirm-body > .tend-ui-icon-root {
      color: ${samolet.colors.gold600};
    }
    &.tend-ui-modal-confirm-error .tend-ui-modal-confirm-body > .tend-ui-icon-root {
      color: ${samolet.colors.red600};
    }
    &.tend-ui-modal-confirm-info,
    &.tend-ui-modal-confirm-success,
    &.tend-ui-modal-confirm-warning,
    &.tend-ui-modal-confirm-error {
      .tend-ui-modal-confirm-title {
        margin-top: 12px;
      }
      .tend-ui-modal-confirm-body {
        & > .anticon {
          font-size: 40px;
        }
      }
    }

    .tend-ui-modal-confirm-body-has-title > .anticon {
      margin-top: 0px;
    }

    .tend-ui-modal-confirm-paragraph {
      /* 24px иконка закрытия + 12px отступ */
      margin-right: 36px;
      gap: 12px;
    }
  }

  /* Toast */
  .tend-ui-notification
    .tend-ui-notification-notice
    .tend-ui-notification-notice-with-icon {
    .tend-ui-notification-notice-message {
      font-family: 'Museo Sans Cyrl', sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px;

      margin-inline-start: 42px;
      margin-bottom: 0;
    }

    .tend-ui-notification-notice-description {
      font-family: 'Museo Sans Cyrl', sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;

      margin-inline-start: 42px;
      margin-inline-end: 42px;
      min-height: 12px;
    }
  }

  /* Dropdown */
  .tend-ui-dropdown .tend-ui-dropdown-menu .tend-ui-dropdown-menu-item-divider,
  .tend-ui-dropdown-menu-submenu
    .tend-ui-dropdown-menu
    .tend-ui-dropdown-menu-item-divider,
  .tend-ui-dropdown .tend-ui-dropdown-menu .tend-ui-dropdown-menu-submenu-title-divider,
  .tend-ui-dropdown-menu-submenu
    .tend-ui-dropdown-menu
    .tend-ui-dropdown-menu-submenu-title-divider {
    margin-left: 16px;
    margin-right: 16px;
  }

  .tend-ui-dropdown .tend-ui-dropdown-menu .tend-ui-dropdown-menu-item-icon,
  .tend-ui-dropdown-menu-submenu .tend-ui-dropdown-menu .tend-ui-dropdown-menu-item-icon {
    font-size: 16px;
  }

  /* Notifications */
  /* Workaround for Chrome animation flickering */
  .tend-ui-notification-stack > .tend-ui-notification-notice-wrapper {
    transition: all 0.3s, backdrop-filter 0s, opacity 0s;
  }

  .tend-ui-notification .tend-ui-notification-notice {
    .tend-ui-notification-notice-close {
      inset-inline-end: 12px;
      padding: 2px;
      width: unset;
      height: unset;
      &:hover {
        background-color: transparent;
      }
    }

    .tend-ui-notification-notice-icon {
      padding: 2px;
    }

    /* Neutral icon */
    &.tend-ui-notification-notice-neutral .tend-ui-notification-notice-icon {
      &.tend-ui-notification-notice-icon-info {
        color: ${samolet.colors.gray400};
      }
    }

    &.tend-ui-notification-notice-loading .tend-ui-notification-notice-icon {
      color: ${samolet.colors.gray400};
    }
  }

  /* Dropdown */
  .tend-ui-dropdown .tend-ui-dropdown-menu,
  .tend-ui-dropdown-menu-submenu .tend-ui-dropdown-menu {
    overflow: hidden;
    padding: 8px 0;
  }

  /* Header "Project" dropdown */
  .tend-ui-header-project-dropdown-overlay.tend-ui-dropdown .tend-ui-dropdown-menu,
  .tend-ui-header-project-dropdown-overlay.tend-ui-dropdown-menu-submenu
    .tend-ui-dropdown-menu {
    max-height: 245px;
    overflow: auto;
  }

  .tend-ui-dropdown .tend-ui-dropdown-menu .tend-ui-dropdown-menu-item,
  .tend-ui-dropdown-menu-submenu .tend-ui-dropdown-menu .tend-ui-dropdown-menu-item,
  .tend-ui-dropdown .tend-ui-dropdown-menu .tend-ui-dropdown-menu-submenu-title,
  .tend-ui-dropdown-menu-submenu
    .tend-ui-dropdown-menu
    .tend-ui-dropdown-menu-submenu-title {
    border-radius: 0px;
    padding: 4px 16px;
  }

  .tend-ui-dropdown .tend-ui-dropdown-menu .tend-ui-dropdown-menu-item-group-list,
  .tend-ui-dropdown-menu-submenu
    .tend-ui-dropdown-menu
    .tend-ui-dropdown-menu-item-group-list {
    margin: 0px;
  }

  .tend-ui-dropdown .tend-ui-dropdown-menu .tend-ui-dropdown-menu-item-group-title,
  .tend-ui-dropdown-menu-submenu
    .tend-ui-dropdown-menu
    .tend-ui-dropdown-menu-item-group-title {
    padding: 4px 16px;
    font-size: 12px;
  }

  .tend-ui-dropdown .tend-ui-dropdown-menu .tend-ui-dropdown-menu-item-divider,
  .tend-ui-dropdown-menu-submenu
    .tend-ui-dropdown-menu
    .tend-ui-dropdown-menu-item-divider,
  .tend-ui-dropdown .tend-ui-dropdown-menu .tend-ui-dropdown-menu-submenu-title-divider,
  .tend-ui-dropdown-menu-submenu
    .tend-ui-dropdown-menu
    .tend-ui-dropdown-menu-submenu-title-divider {
    margin-top: 12px;
    margin-bottom: 12px;
  }

  /* Tooltip */
  .tend-ui-tooltip {
    .tend-ui-tooltip-arrow::before {
      clip-path: polygon(
        1.6568542494923806px 100%,
        50% 1.6568542494923806px,
        14.34314575050762px 100%,
        1.6568542494923806px 100%
      );
    }
  }
`;
const GlobalStyles = styled.createGlobalStyle `${styles}`;
const TendUI = ({ lang = 'ru', theme = 'samolet', client, children, }) => {
    return (React__default["default"].createElement(tendUiApi.ApiClient, { client: client },
        React__default["default"].createElement(tendUiTheme.Theme, { theme: theme },
            React__default["default"].createElement(GlobalStyles, null),
            React__default["default"].createElement(tendUiLocale.Language, { language: lang },
                React__default["default"].createElement(ConfigProvider.ConfigProvider, null, children)))));
};
TendUI.init = (theme = SamoletTheme.SamoletTheme) => {
    AntConfigProvider__default["default"].config({
        prefixCls: 'tend-ui',
        theme: utils.createAntdTheme(theme),
    });
};

exports.TendUI = TendUI;
