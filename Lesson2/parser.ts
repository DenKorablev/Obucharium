export class Parser {  
    Expression(line: string): number {
        let result: number = this.ParseFuncs(line);
        return result; 
    }        

    private ParseFuncs(line: string): number {
        let signs = ["*", "+", "-", "/"]; 
        let chars = line.split(/\b/);                
        let newChars:string[] = chars;           
        let res;
        for (let sign = 0; sign < signs.length; sign++) {  
            if(signs[sign] == "*" || signs[sign] == "/") {
                this.CycleFuncs(signs, newChars, res, sign);
            }     
        }

        for (let sign = 0; sign < signs.length; sign++) {  
            this.CycleFuncs(signs, newChars, res,  sign);  
        } 
        return parseInt(newChars[0]); 
    }    

    private MathFuncs (res, sign, a, b): number {
        let mul = (x, y) => res = x * y; 
        let del = (x, y) => res = x / y;
        let sum = (x, y) => res = x + y;
        let min = (x, y) => res = x - y; 
        let math = [mul, sum, min, del];
        math[sign](a,b);
        return res;     
    }

    private CycleFuncs (signs, newChars, res, sign): void{
        for (let char = 0; char < newChars.length; char++) {  
            if (newChars[char] == signs[sign]) {                     
                let a = parseInt(newChars[char - 1]);   
                let b = parseInt(newChars[char + 1]);       
                res = this.MathFuncs(res, sign, a, b);    
                newChars[char - 1] = res.toString();   
                newChars.splice(char--, 2); 
            }
        }
    }
}
