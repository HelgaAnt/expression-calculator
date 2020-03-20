function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

    let ls =  (expr.match(/[(]/g) != null )? expr.match(/[(]/g).length : 0 ; 
    let rs =  (expr.match(/[)]/g) != null )? expr.match(/[)]/g).length : 0 ; 
    if ( ls != rs )  throw new Error("ExpressionError: Brackets must be paired");
   
    //let res = '';
    let s = expr.replace(/\s/g, "");
    console.log(s);
    var plus = /(\()?-?\d+(?:\.\d+)?\+-?\d+(?:\.\d+)?(\))?/g;
    //var plus = /(\()?-?\d+(?:\.\d+)?\+-?\d+(?:\.\d+)?(\))?/g;
    //var plus = new RegExp("(\\()?-?\\d+(?:\\.\\d+)?\\+-?\\d+(?:\\.\\d+)?(\\))?", "g");
    var minus = new RegExp("(\\()?-?\\d+(?:\\.\\d+)?\\--?\\d+(?:\\.\\d+)?(\\))?", "g");
    //console.log(minus);
    var mult = new RegExp("(\\()?-?\\d+(?:\\.\\d+)?\\*-?\\d+(?:\\.\\d+)?(\\))?");
    var dev = new RegExp("(\\()?-?\\d+(?:\\.\\d+)?\\/-?\\d+(?:\\.\\d+)?(\\))?");
    var sign = /\*|\//;
    var sk = /\(|\)/;

    //var vr = /\([\d+\+\-*\/]\)/;
    //var vr = /(-?[\d\.]+)([\*\/])(-?[\d\.]+)/;
    //var tmp = s.match(vr);
    var template = /(\([0-9\+\/\*\-. ]+\))/g;
    //console.log(tmp);
    let ss = s;
    //console.log(sk.test(s));

    while ( sk.test(ss) ) {
        console.log('while');
        //var t = ss.match(/(\([0-9\+\/\*\-. ]+\))/g);
        s = ss.match(template);
        console.log(s);
        //t = t.replace(/\(|\)/g, "");
        //console.log(t);

        let fl=1;
        while ( fl != 0 ) {
            console.log('while 1');
            fl = 0;
            var znak = s.match(sign);
            //console.log(znak[0]);
            if ( znak != null) {
                console.log(znak[0]);
                switch ( znak[0] ) {
                case '*': {
                    s = s.replace(mult, function (ex, x, y) {
                        fl++;
                        var  result = "";
                        var D = ex.replace(/\(|\)/g, "").split('*');
                        console.log(D[0]);
                        console.log(D[1]);
                            result = D[0] * D[1];
                            console.log(result);
                            return result;
                    });   
                    break;
                }
                case '/': {
                    s = s.replace(dev, function (ex, x, y) {
                        fl++;
                        var  result = "";
                        var D = ex.replace(/\(|\)/g, "").split('/');
                            if ( D[1] == 0 )  throw new Error("TypeError: Division by zero.");
                            console.log(D[0]);
                            console.log(D[1]);
                            result = D[0] / D[1];
                            console.log(result);
                            return result;
                    });  
                }
            }
            }
        }
        
        console.log(s);
        
        fl = 1;
        while ( fl != 0 ) {
            fl = 0;
        // console.log(s); 
            s = s.replace(plus, function (ex, x, y) {
                fl++;
                let z = (ex.substring(0,1) == '-')? '-': '';
                //console.log(fl);
                var  result = "";
                var D = ex.replace(/\(|\)/g, "").split('+');
                console.log(D[0]);
                console.log(D[1]);
                result = +D[0] + +D[1];
                //if (z == '-' $$ )
                console.log(((z=='-') && (result >= 0) )? '+'+result : result);
                return (((z=='-') && (result >= 0) )? '+'+result : result);
            });  
        
            s = s.replace(minus, function (ex, x, y) {
                fl++;
                let z = 0;
                z = (ex.substring(0,1) == '-')? '-': '';
                console.log(ex);
                console.log(z);
                var  result = "";
                if (z == '-') {
                    var tmp = ex.substring(1);
                    console.log(tmp);
                    var D = tmp.replace(/\(|\)/g, "").split('-');
                    console.log(D);
                }        
                else {
                    console.log(2);
                    var D = ex.replace(/\(|\)/g, "").split('-');
                    
                }    
                console.log(D[0]);
                console.log(D[1]);
                D[0] = z + D[0];
                result = D[0] - D[1];
                console.log(result);
                return result;
            }); 
        };           
        ss = ss.replace(template, s);   
        console.log(ss); 
    }   
    

   
    return parseFloat(s);

}

module.exports = {
    expressionCalculator
}



// calculateDepth( arr ) {
//     let maxDepth = 1;
//     let arrDepth = 1;
//     for (let i = 0; i<arr.length; i++ ) {
//         if (Array.isArray(arr[i])){
//             arrDepth = arrDepth + this.calculateDepth(arr[i]);
//             maxDepth = (maxDepth < arrDepth)? arrDepth: maxDepth;
//             arrDepth = 1;
//         }
//     }
// return maxDepth;    
// }


// var S = "3 * 3 * 3 + 1 * 2", i = 0;
// 02
// S = S.replace(/\s/g, "");
// 03
 
// 04
// /*
// 05
//     Вычисляет выражение вида a + b, a * b, т.е.
// 06
//     число, оператор и число
// 07
// */
// 08
// function expr(A, O) {
// 09
//     var D = A.replace(/\(|\)/g, "").split(O);
// 10
//     if ( O == "+" ) return +D[0] + +D[1];
// 11
//     if ( O == "-" ) return D[0] - D[1];
// 12
//     if ( O == "*" ) return D[0] * D[1];
// 13
//     if ( O == "/" ) return D[0] / D[1];
// 14
//     if ( O == "^" ) return Math.pow(D[0], D[1]);
// 15
// }
// 16
 
// 17
// /*
// 18
//     Проверяет, не осталось ли в S только число
// 19
//     Если да — выражение вычислено
// 20
// */
// 21
// function simple() {
// 22
//     return /^-?\d+(?:\.\d+)?$/.test(S);
// 23
// }
// 24
 
// 25
// /*
// 26
//     Ищем такие последовательности символов, чтобы
// 27
//     было "число, оператор, число". Если с обеих сторон
// 28
//     выражения есть скобки, то убираем их
// 29
// */
// 30
// function compute(operator) {
// 31
//     var re = new RegExp("(\\()?-?\\d+(?:\\.\\d+)?\\" + operator + "-?\\d+(?:\\.\\d+)?(\\))?", "g");
// 32
//     S = S.replace(re, function (a, b, c) {
// 33
//         var C, R = "";
// 34
//         if ( b == undefined || c == undefined )
// 35
//             C = 1;
// 36
//         else
// 37
//             C = 0;
// 38
//         if (C) R += b || "";
// 39
//         R += expr(a, operator);
// 40
//         if (C) R += c || "";
// 41
//         return R;
// 42
//     });
// 43
// }
// 44
 
// 45
// /*
// 46
//     В бесконечном цикле обрабатываем все операции
// 47
//     в порядке их приоритета: ^, *, /, +, -
// 48
//     Если в S осталось только число, то прерываем цикл
// 49
//     и показываем результат
// 50
// */
// 51
// while (true) {
// 52
//     compute("^");
// 53
//     compute("*"); compute("/");
// 54
//     compute("+"); compute("-");
// 55
//     if (simple()) {
// 56
//         alert(S);
// 57
//         break;
// 58
//     }
// 59
//     if (++i > 10000) {
// 60
//         alert("Unexpercted error");
// 61
//         break;
// 62
//     }alert(S)
// 63
// }
