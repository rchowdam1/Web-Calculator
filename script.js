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
        //console.log(operandOne)


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
            //resume here 7/8 | test this expression: 65 + 8
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
    let operatorMap = new Map() /* key: index | value: priority of operations
                                 +, - => 1
                                 *, / => 2
                                */ 


    let operations = []

    for (let i = 1; i < expression.length; i = i + 2) {
        if (expression[i] === '+' || expression[i] === '-') {
            operatorMap.set(i, 1)
        } 

        if (expression[i] === '*' || expression[i] === '/') {
            operatorMap.set(i, 2)
        }

        operations.push(i)
    }

    //console.log(operations)
    /*for (let key of operatorMap.keys()) {
        console.log(key)
    }*/

    //console.log(operatorMap)

    //sort keys according to order of operations
    //using selection sort
    for (let i = 0; i < operations.length; i++) {
        let smallestIndex = i
        for (let j = i + 1; j < operations.length; j++) {
            /*if (operations[j] < operations[smallestIndex]) {
                smallestIndex = j
            }*/

            if (operatorMap.get(operations[j]) > operatorMap.get(operations[smallestIndex])) {
                smallestIndex = j
            }
        }

        //swap
        let temp = operations[i]
        operations[i] = operations[smallestIndex]
        operations[smallestIndex] = temp
    }

    let indexChange = 0 // the index in which the order of operations changes from 2 (* /) to 1 (- +)

    for (let i = 0; i < operations.length; i++) {
        if (operatorMap.get(operations[i]) == 1) {
            indexChange = i
            break
        }
    }

    

    //sort starting at indexChange
    for (let i = indexChange; i < operations.length; i++) {
        let smallestIndex = i
        for (let j = i + 1; j < operations.length; j++) {
            if (operations[j] < operations[smallestIndex]) {
                smallestIndex = j
            }
        }

        let temp = operations[i]
        operations[i] = operations[smallestIndex]
        operations[smallestIndex] = temp
    }

    console.log(operations + " priority changes at index " + indexChange)


    // resume here 7/23
    // perform *,/ expression first
    // Once you reach +, - indicies in the expression, break out of the loop and continue the expression with + or -
    // thought process for now
    

    let mulDivOperands = []


    for (let i = 0; i < operations.length; i++) {
        //start from the beginning to the end of operations sorted by PEMDAS

        let result = 0

        if (operatorMap.get(operations[i]) < 2) { //if the operator is + or - then break from the loop
            break
        }

        let left  = Number(expression[operations[i] - 1])
        let right = Number(expression[operations[i] + 1])
        //perform operation (* or /)

        if (expression[operations[i]] === "*") { // operator is *
            result = left * right
            /*
            This if statement checks if consecutive operators are * or /
            if they are, then it performs the operation with 2 operators and 3 operands
            EX: 6 * 9 / 2
                   54 / 2
            */
            while (expression[operations[i] + 2] === "*" || expression[operations[i] + 2] === "/") {
                if (expression[operations[i] + 2] === "*") {
                    result = result * Number(expression[operations[i] + 3])
                } else {
                    result = result / Number(expression[operations[i] + 3])
                }
                i++

                

            }

            //console.log("result of the expression at index " + operations[i] + " is " + result)
        } else { // operator is / 
            result = left / right
            /*
            This if statement checks if consecutive operators are * or /
            if they are, then it performs the operation with 2 operators and 3 operands
            EX: 6 * 9 / 2
                   54 / 2
            */
            while (expression[operations[i] + 2] === "*" || expression[operations[i] + 2] === "/") {
                if (expression[operations[i] + 2] === "*") {
                    result = result * Number(expression[operations[i] + 3])
                } else {
                    result = result / Number(expression[operations[i] + 3])
                }
                i++

            }
            //console.log("result of the expression at index " + operations[i] + " is " + result)
        }

        mulDivOperands.push(result)
        console.log(mulDivOperands) // works

    }

    //final loop
    

    let lastWasMulDiv = false // this will be used to check whether the last operator was */ or not

    for (let i = 1; i < expression.length; i = i + 2) {
        
    }


    
}