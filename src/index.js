/* function eval() {
    // Do not use eval!!!
    return;
} */

function expressionCalculator(expr) {
    let arr = expr.split('');
    computeBrackets(arr);
    computeOperators(arr, /[*\/]/);
    computeOperators(arr, /[+-]/);
    return +arr;
}

function computeBrackets(arr) {
    let indexOfFirstBrace;
    let indexOfSecondBrace;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '(') {
            indexOfFirstBrace = i;
        }
        if (arr[i] === ')') {
            indexOfSecondBrace = i;
            let exprInBrackets = arr.slice(indexOfFirstBrace + 1, indexOfSecondBrace);
                computeOperators(exprInBrackets, /[*\/]/);
                computeOperators(exprInBrackets, /[+-]/);
            arr.splice(indexOfFirstBrace,
                indexOfSecondBrace - indexOfFirstBrace + 1,
                Number(exprInBrackets));
        }
    }
    return arr;
}


function computeOperators(arr, pattern) {
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] === "string" && arr[i].match(pattern)) {
            let result = calculate(arr[i - 1], arr[i + 1], arr[i]);
            arr.splice(i - 1, 3, result);
            i--;
        }
    }
}

function calculate(a, b, operator) {
    let aNum = Number(a);
    let bNum = Number(b);
    if (operator === '+') {
        return aNum + bNum;
    }
    if (operator === '-') {
        return aNum - bNum;
    }
    if (operator === '*') {
        return aNum * bNum;
    }
    if (operator === '/') {
        return aNum / bNum;
    }
}



 module.exports = {
    expressionCalculator
};
  