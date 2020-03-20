function eval() {
    // Do not use eval!!!
    return;
}


function calc(vr){
    let mas = vr.split(' ');
   
    for (let i = 0; i < mas.length; i++) {
        switch (mas[i]) {
            case  "*": {
                mas[i-1] = Number(mas[i-1]) * Number(mas[i+1]);
                mas.splice(i, 2);
                i--;
                break;
            }    
            case "/":  {
                if (mas[i + 1] === '0') throw new Error('TypeError: Division by zero.');
                mas[i-1] =  Number(mas[i-1]) / Number(mas[i+1]);
                mas.splice(i, 2);
                i--;
                break;
            }    
        }
    }

    for (let i = 0; i < mas.length; i++) {
        switch (mas[i]) {
            case "+": {
                mas[i-1] =  Number(mas[i-1]) + Number(mas[i+1]);
                mas.splice(i, 2);
                i--;
                break;
            }   
            case "-":  {
                mas[i-1] =  Number(mas[i-1]) - Number(mas[i+1]);
                mas.splice(i, 2);
                i--;
                break;
            }   
        }
    }
    return parseFloat(mas[0]);
}   
   

function expressionCalculator(expr) {
    expr = expr.replace(/\s/g, '').replace(/(\*|\/|\+|\-)/g, ' $& ');
    let ls =  (expr.match(/[(]/g) != null )? expr.match(/[(]/g).length : 0 ; 
    let rs =  (expr.match(/[)]/g) != null )? expr.match(/[)]/g).length : 0 ; 
    if ( ls != rs )  throw new Error("ExpressionError: Brackets must be paired");

    let s = '';
    let template = /(\([0-9\+\/\*\-. ]+\))/g;
    while (  /\(|\)/.test(expr)) {
        s = expr.match( template);
        if (s  !== null) {
            for (let i = 0; i < s.length; i++) {
                let subs = s[i].replace(/\(|\)/g, "");
                expr = expr.replace(s[i], calc(subs));
            };    
        }
    }
    let res = calc(expr);
    return res;
}

module.exports = {
    expressionCalculator
}



