'use strict';

var Root = require('./components/Root/Root.js');
var Image = require('./components/Image/Image.js');
var Fallback = require('./components/Fallback/Fallback.js');
var List = require('./components/List/List.js');
var Avatar$1 = require('./components/Avatar/Avatar.js');

const Avatar = Object.assign(Avatar$1.Avatar, {
    Root: Root.Root,
    Image: Image.Image,
    Fallback: Fallback.Fallback,
    List: List.List,
});

exports.Avatar = Avatar;
