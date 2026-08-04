'use strict';

var Header = require('./components/Header/Header.js');
var Footer = require('./components/Footer/Footer.js');
var Main = require('./components/Main/Main.js');
var Root = require('./components/Root/Root.js');
var Content = require('./components/Content/Content.js');
var Sider = require('./components/Sider/Sider.js');
var useScroll = require('./hooks/useScroll.js');



exports.Header = Header.Header;
exports.Footer = Footer.Footer;
exports.Main = Main.Main;
exports.Root = Root.Root;
exports.Content = Content.Content;
exports.Sider = Sider.Sider;
exports.useScroll = useScroll.useScroll;
