import {Parser} from "./parser"

let parser: Parser = new Parser();

console.log(parser.Expression("1+2"));
console.log(parser.Expression("1-6/2"));
console.log(parser.Expression("2+2*2"));
