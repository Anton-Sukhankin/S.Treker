'use strict';

var useScroll = require('../../primitives/Layout/hooks/useScroll.js');
var Root = require('./components/Root/Root.js');
var index = require('./components/Header/components/index.js');
var index$1 = require('./components/Main/components/index.js');
var Authenticated = require('./components/Authenticated/Authenticated.js');



exports.useScroll = useScroll.useScroll;
exports.Root = Root.Root;
exports.Header = index;
exports.Main = index$1;
exports.Authenticated = Authenticated.Authenticated;
