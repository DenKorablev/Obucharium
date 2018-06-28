function Parser (line: string): number {
    let signs = ["*", "+", "-", "/"];          
    let chars = line.split(/\b/);      
    let newChars:string[] = chars;       
    let mul = (x, y) => result = x * y; 
    let del = (x, y) => result = x / y;
    let sum = (x, y) => result = x + y;
    let min = (x, y) => result = x - y;        
    let mathFuncs = [mul, sum, min, del];      
    let cycle = (signs, newChars, result, mathFuncs, sign) => {
        for (let char = 0; char < newChars.length; char++) {  
            if (newChars[char] == signs[sign]) {                     
                let a = parseInt(newChars[char - 1]);   
                let b = parseInt(newChars[char + 1]);       
                result = mathFuncs[sign](a, b);    
                newChars[char - 1] = result.toString();   
                newChars.splice(char--, 2); 
            }
        }    
    }      
    let result;

    for (let sign = 0; sign < signs.length; sign++) {  
        if(signs[sign] == "*" || signs[sign] == "/") {
            cycle(signs, newChars, result, mathFuncs, sign);
        }     
    }

    for (let sign = 0; sign < signs.length; sign++) {  
        cycle(signs, newChars, result, mathFuncs, sign);  
    }
    
    return parseInt(newChars[0]);                       
}
console.log(Parser("1+2"));
console.log(Parser("1-6/2"));
console.log(Parser("2+2*2"));