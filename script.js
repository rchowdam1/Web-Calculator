//buttons
const numbers = document.querySelectorAll('.number')
const clearButton = document.querySelector('.clear')
const equalButton = document.querySelector('.equals')
const plusButton = document.querySelector('.plus')
const minusButton = document.querySelector('.subtract')
const timesButton = document.querySelector('.multiply')
const divideButton = document.querySelector('.divide')

let expression = [] // holds the expression typed into the calculator (resume here 7/2)
let operandOne = ""
//let operations = ""


// variables for equal button functionality
let numberEntered = false


numbers.forEach((number) => {
    number.addEventListener('click', () => {

        if (number.innerHTML === '0' && operandOne === "") {
            return;
        }

        operandOne = operandOne + number.innerHTML

    })
})

clearButton.addEventListener('click', () => {
    operandOne = ""
    expression = []
})

plusButton.addEventListener('click', () => {
    //operations = operations + " " + plusButton.innerHTML + " "

    if (operandOne.length != "") {
        expression.push(operandOne)
    }

    //expression.push(operandOne)
    expression.push("+")
    operandOne = ""
})

minusButton.addEventListener('click', () => {
    //operations = operations + " " + minusButton.innerHTML + " "

    if (operandOne.length != "") {
        expression.push(operandOne)
    }
    //expression.push(operandOne)
    expression.push("-")
    operandOne = ""
})

timesButton.addEventListener('click', () => {
    //operations = operations + " " + timesButton.innerHTML + " "

    if (operandOne.length != "") {
        expression.push(operandOne)
    }
    //expression.push(operandOne)
    expression.push("*")
    operandOne = ""
})

divideButton.addEventListener('click', () => {

    if (operandOne.length != "") {
        expression.push(operandOne)
    }
    expression.push("/")
    operandOne = ""
})

equalButton.addEventListener('click', () => {   
    /*
    * if the equals button is clicked and the expression contains the same amount of numbers as operators
    * then the expression is not valid
    * EX: ['65', '+']            -> not valid
    *     ['65', '+', '43', '-'] -> not valid
    *     ['65', '+', '87']      -> valid
    *     ['3',  '*', '33']      -> valid
    * 
    * A special case to consider is that one number by itself in the expression is valid
    * EX: ['65'] -> valid
    */
    if(expression.length % 2 == 0) { //invalid expressions are an even number in length

        if (expression.length == 0 && operandOne.length != 0) {
            console.log(operandOne)
            return
        }

        if (operandOne.length != 0) { //this means the expression is not empty and contains some operands
            expression.push(operandOne)
            operandOne = ""
            console.log(expression)
            perform()
            return
        }

        console.log(expression + " Expression must contain valid number of operands. Length of expression is " + expression.length)
        return
    }


    expression.push(operandOne)
    console.log(expression)



    // now time to perform the expression
    perform()
})


function perform() {
    let expressionString = ""

    for (let i = 0; i < expression.length; i++) {
        expressionString += expression[i]
    }

    let answer = eval(expressionString)
    console.log(answer)
}
    