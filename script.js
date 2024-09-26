//buttons
const numbers = document.querySelectorAll('.number')
const clearButton = document.querySelector('.clear')
const equalButton = document.querySelector('.equals')
const plusButton = document.querySelector('.plus')
const minusButton = document.querySelector('.subtract')
const timesButton = document.querySelector('.multiply')
const divideButton = document.querySelector('.divide')
const answerNumber = document.getElementById("expressionAnswer")

let expression = [] 
let operandOne = ""
let answer = null // resume here do 6 * 6 + 6
let recentOperator = 1 // 1 for plus, 2 for minus, 3 for mul, 4 for div
//let operations = ""


// variables for equal button functionality
let numberEntered = false


numbers.forEach((number) => {
    number.addEventListener('click', () => {

        if (number.innerHTML === '0' && operandOne === "") {
            return;
        }

        operandOne = operandOne + number.innerHTML
        answerNumber.innerHTML = operandOne

    })
})

clearButton.addEventListener('click', () => {
    operandOne = ""
    expression = []
    answerNumber.innerHTML = "0"
    answer = null
})

plusButton.addEventListener('click', () => {
    //operations = operations + " " + plusButton.innerHTML + " "

    if (operandOne.length != "") {
        expression.push(operandOne)
    }

    //expression.push(operandOne)
    expression.push("+")
    operandOne = ""
    recentOperator = 1
})

minusButton.addEventListener('click', () => {
    //operations = operations + " " + minusButton.innerHTML + " "

    if (operandOne.length != "") {
        expression.push(operandOne)
    }
    //expression.push(operandOne)
    expression.push("-")
    operandOne = ""
    recentOperator = 2
})

timesButton.addEventListener('click', () => {
    //operations = operations + " " + timesButton.innerHTML + " "

    if (operandOne.length != "") {
        expression.push(operandOne)
    }
    //expression.push(operandOne)
    expression.push("*")
    operandOne = ""
    recentOperator = 3
})

divideButton.addEventListener('click', () => {

    if (operandOne.length != "") {
        expression.push(operandOne)
    }
    expression.push("/")
    operandOne = ""
    recentOperator = 4
})

equalButton.addEventListener('click', () => { 
    
    if (answer) {

        if (operandOne) {
            expression.push(operandOne)
        }

        const lastNumber = expression[expression.length - 1]

        console.log(expression)

        if (recentOperator == 1) {
            answer = answer + Number(lastNumber)
        } else if (recentOperator == 2) {
            answer = answer - Number(lastNumber)
        } else if (recentOperator == 3) {
            answer = answer * Number(lastNumber)
        } else if (recentOperator == 4) {
            answer = answer / Number(lastNumber)
        }

        console.log(answer)
        answerNumber.innerHTML = answer
        return
    }
    
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

    answer = Number(eval(expressionString))
    console.log(answer)
    answerNumber.innerHTML = answer
}
    