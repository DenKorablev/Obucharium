
function numberIncrement(target: Object, propertyKey: string){
     
    let item = this[propertyKey]; 
 
    var geterValue = function () {
        return item = item+ 1;
    };
  
    var setterValue = function(value: Number){
        item = value;
        console.log(`Введенное значение - ${item}`);        
    }

    if (delete this[propertyKey]) {
        Object.defineProperty(target, propertyKey, {
            get: geterValue,
            set: setterValue
        });
    }
}
 
class Value{
    @numberIncrement
    _value: Number;

    NewValue(value: Number){
        this._value = value;
    }
}

let val: Value = new Value()

val.NewValue(10);
let setNumber1: Number = val._value;
console.log(`Полученное значение - ${setNumber1}`);

val.NewValue(8);
let setNumber2: Number = val._value;
console.log(`Полученное значение - ${setNumber2}`);

val._value = 15;