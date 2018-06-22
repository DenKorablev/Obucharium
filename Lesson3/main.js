var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function numberIncrement(target, propertyKey) {
    var item = this[propertyKey];
    var geterValue = function () {
        return item = item + 1;
    };
    var setterValue = function (value) {
        item = value;
        console.log("\u0412\u0432\u0435\u0434\u0435\u043D\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 - " + item);
    };
    if (delete this[propertyKey]) {
        Object.defineProperty(target, propertyKey, {
            get: geterValue,
            set: setterValue
        });
    }
}
var Value = /** @class */ (function () {
    function Value() {
    }
    Value.prototype.NewValue = function (value) {
        this._value = value;
    };
    __decorate([
        numberIncrement
    ], Value.prototype, "_value");
    return Value;
}());
var val = new Value();
val.NewValue(10);
var setNumber1 = val._value;
console.log("\u041F\u043E\u043B\u0443\u0447\u0435\u043D\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 - " + setNumber1);
val.NewValue(8);
var setNumber2 = val._value;
console.log("\u041F\u043E\u043B\u0443\u0447\u0435\u043D\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 - " + setNumber2);
val._value = 15;
//# sourceMappingURL=main.js.map