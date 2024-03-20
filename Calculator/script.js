// variables declarations ---------------------------------
let isResult = true;
const previousValues = [];
let indexOfPreviousValue = previousValues.length - 1;
const inputDisplay = document.querySelector(".input");
const backButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const symbols = ['.', '/', '*', '%', '-', '+'];
const numbers = ['', '', '', '', '', '']
const E_VALUE = String(Math.E).slice(0, 5);



///////////////////////------------- Functions ---------------/////////////////////////

// function --> adding values to display on clicking on any cell
const addToDisplay = val => {

    // when user enters first value as symbol other than numbers
    if (symbols.includes(val) && inputDisplay.value === '') {
        inputDisplay.value = '';
        return;
    }


    // when user enters consecutive dots in one value
    if (val === ".") {
        let currentString = "";
        let inputStr = inputDisplay.value;
        for (let i = inputDisplay.value.length - 1; i--; i >= 0) {
            if (inputStr[i] !== "." && isNaN(+inputStr[i]))
                break;
            else
                currentString = currentString + inputStr[i];
        }

        if (currentString.includes(".")) return;
    }

    // if last character on screen is symbol and entered value is number
    if (symbols.includes(inputDisplay.value.slice(-1)) && !symbols.includes(val)) {
        inputDisplay.value += val;
        return;
    }

    // changing the previous symbol if user enters consecutive symbols
    if (symbols.includes(inputDisplay.value.slice(-1))
        && val !== '.' && symbols.includes(val)) {
        if (inputDisplay.value.slice(-1) === "+" ||
            inputDisplay.value.slice(-1) === "-") {
            console.log("++");
            inputDisplay.value = inputDisplay.value.slice(0, inputDisplay.value.length - 1) + val;
            return;
        }
        else if (inputDisplay.value.slice(-1) === "*" || inputDisplay.value.slice(-1) === "/") {

            if (val !== "-") {
                inputDisplay.value = inputDisplay.value.slice(0, inputDisplay.value.length - 1) + val;
                return;
            }
            console.log("***");
            inputDisplay.value = inputDisplay.value + val;
            return;
        }

    }

    // if it is result and entered character is symbol
    if (symbols.includes(val) && isResult) {


        // checking if result is latest or past 
        // if it is latest then user can do other operations on it 
        if (indexOfPreviousValue === previousValues.length - 1) {
            inputDisplay.value = inputDisplay.value.getResultStrOnly() + val;
        }
        else {
            return;
        }
        isResult = false;
        return;
    }

    // if last character on screen is symbol and entered character is also symbol.
    if (symbols.includes(inputDisplay.value.slice(-1)) && symbols.includes(val)) {
        inputDisplay.value += '';
        return;
    }

    // checking if it is result or not 
    if (isResult) {

        // checking if it is latest result or not 
        // and entered value is symbol or not
        if (indexOfPreviousValue === previousValues.length - 1 && symbols.includes(val)) {
            inputDisplay.value = inputDisplay.value.getResultStrOnly() + val;
        }
        else {
            inputDisplay.value = val;
        }
        isResult = false;
        return;
    }
    inputDisplay.value += val;
    return;
}



// function --> deleting last value from display screen
const deleteLastElement = () => {
    // cheking that if it is past result or not
    if (!isResult) inputDisplay.value = inputDisplay.value.slice(0, -1);
}




// function --> to clear whole display screen
const getAllClear = () => {
    inputDisplay.value = '';
    previousValues.length = 0;
}




// function --> for getting end result of expression 
const getResult = () => {

    if (isResult) {
        return;
    }
    let displayStr = inputDisplay.value;
    console.log(displayStr);

    if (!(displayStr.includes("/-") || displayStr.includes("*-"))) {
        if (!displayStr.isCorrectExpression()) return
    }



    //if no cell is clicked
    if (displayStr.length === 0) {
        inputDisplay.value = '';
        return;
    }

    //if last character was multiply symbol and pressing equal symbol
    if (displayStr.slice(-1) === '*') {
        inputDisplay.value = displayStr;
        return;
    }
    console.log(displayStr);
    // displayStr = displayStr.replace(/x/g, '*');
    if (displayStr.indexOf("%") === displayStr.length - 1) {
        displayStr = displayStr.replace(/%/g, "*0.01");
    }
    else {
        displayStr = displayStr.replace(/%/g, "*0.01*");
    }
    let displayStrE = displayStr;
    displayStr = displayStr.replace(/e/g, E_VALUE);
    console.log(displayStr);

    //if invalid format is added (Ex. 8++)
    if (!displayStr.isCorrectExpression()) {
        inputDisplay.value = displayStr;
        return;
    }
    else {

        try {
            let resultEval = eval(displayStr);
            let resultStr = String(resultEval);
            let indexOfDot = resultStr.indexOf(".");
            let addingStr = displayStr.replace(/\*0.01\*/g, "%");
            console.log(addingStr);
            let finalAns;
            if (indexOfDot === -1) {
                // if answer is in whole number format
                if (displayStr !== displayStrE)
                    finalAns = displayStrE + " = " + resultStr;
                else
                    finalAns = displayStr + " = " + resultStr;
                addToCacheArray(finalAns);
                inputDisplay.value = finalAns;
            }
            else {
                // if answer is in decimal format
                let decimalPart = resultStr.slice(indexOfDot, indexOfDot + 4);
                let integerPart = resultStr.slice(0, indexOfDot);
                if (displayStr !== displayStrE)
                    finalAns = displayStrE + " = " + resultStr;
                else
                    finalAns = addingStr + " = " + integerPart + decimalPart;

                addToCacheArray(finalAns);
                inputDisplay.value = finalAns;
            }
        }
        catch (error) {
            console.log(error.message);
            inputDisplay.value = "Invalid";
        }
    }
    isResult = true;

}


// pushing latest results into 'previousValues' array.
const addToCacheArray = (result) => {

    //here, at max only three past results can be stored
    //so, whenever forth result will be pushed , first will
    // be automatically removed from the array.
    if (previousValues.length >= 3) {
        previousValues.shift();
        previousValues.push(result);
        indexOfPreviousValue = previousValues.length - 1;
    }
    if (previousValues.length < 3) {
        previousValues.push(result);
        indexOfPreviousValue = previousValues.length - 1;
    }

}


///////////////////////////----------- EventListeners-------------///////////////////////

// Back button
backButton.addEventListener("click", () => {
    if (inputDisplay.value === '') {
        inputDisplay.value = '';
        return;
    }
    if (indexOfPreviousValue <= 0) {
        if (previousValues.isEmpty()) return;
        else
            inputDisplay.value = previousValues[0];

        isResult = true;
        return;
    }
    inputDisplay.value = previousValues[--indexOfPreviousValue];
    isResult = true;
})


// Next button
nextButton.addEventListener("click", () => {

    // if (!inputDisplay.value.getExpressionStrOnly().isCorrectExpression()) return;
    if (inputDisplay.value === '') {
        inputDisplay.value = '';
        return;
    }
    // checking that this is the latest result so it can't go for next.
    if (indexOfPreviousValue === previousValues.length - 1) {
        return;
    }
    else {
        inputDisplay.value = previousValues[++indexOfPreviousValue];
    }
    isResult = true;

})


////////////////////////---------- Prototype methods ------------//////////////////////

// checking that given array is Empty or not 
Array.prototype.isEmpty = function () {
    if (this.length === 0) return true;
    else return false;
}

// checking that given mathematical expression can be evaulated or not 
//(correct or incorrect) 
String.prototype.isCorrectExpression = function () {
    let pattern = /^(?!.*[+\-*/%]{2})(?=.*[+\-*/%])[0-9]+(\.[0-9]+)?([+\-*/%][0-9]+(\.[0-9]+)?)*([+\-*/%][0-9]+(\.[0-9]+)?)*$/;
    return (this.match(pattern) !== null);
}



// returning string containing only LHS of result string
// Ex. '8+7 = 15'-->this function will return only '8+7'
String.prototype.getExpressionStrOnly = function () {
    let index = this.indexOf(" ");
    return this.slice(0, index);
}

// returning string containing only RHS of result string
// Ex. '8+7 = 15'-->this function will return only '15'
String.prototype.getResultStrOnly = function () {
    let index = this.indexOf("=");
    return this.slice(index + 2);
}