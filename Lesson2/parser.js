"use strict";
exports.__esModule = true;
var Parser = /** @class */ (function () {
    function Parser() {
    }
    Parser.prototype.Expression = function (line) {
        var result = this.ParseFuncs(line);
        return result;
    };
    Parser.prototype.ParseFuncs = function (line) {
        var signs = ["*", "+", "-", "/"];
        var chars = line.split(/\b/);
        var newChars = chars;
        var res;
        for (var sign = 0; sign < signs.length; sign++) {
            if (signs[sign] == "*" || signs[sign] == "/") {
                this.CycleFuncs(signs, newChars, res, sign);
            }
        }
        for (var sign = 0; sign < signs.length; sign++) {
            this.CycleFuncs(signs, newChars, res, sign);
        }
        return parseInt(newChars[0]);
    };
    Parser.prototype.MathFuncs = function (res, sign, a, b) {
        var mul = function (x, y) { return res = x * y; };
        var del = function (x, y) { return res = x / y; };
        var sum = function (x, y) { return res = x + y; };
        var min = function (x, y) { return res = x - y; };
        var math = [mul, sum, min, del];
        math[sign](a, b);
        return res;
    };
    Parser.prototype.CycleFuncs = function (signs, newChars, res, sign) {
        for (var char = 0; char < newChars.length; char++) {
            if (newChars[char] == signs[sign]) {
                var a = parseInt(newChars[char - 1]);
                var b = parseInt(newChars[char + 1]);
                res = this.MathFuncs(res, sign, a, b);
                newChars[char - 1] = res.toString();
                newChars.splice(char--, 2);
            }
        }
    };
    return Parser;
}());
exports.Parser = Parser;
