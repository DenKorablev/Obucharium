"use strict";
exports.__esModule = true;
var parser_1 = require("./parser");
var parser = new parser_1.Parser();
console.log(parser.Expression("1+2"));
console.log(parser.Expression("1-6/2"));
console.log(parser.Expression("2+2*2"));
