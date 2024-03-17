
let inputDisplay = document.querySelector(".input");

const addTodisplay = val => {
    if ((val == '+' || val == '/' || val == 'x' || val == '%' || val == '-') && inputDisplay.value == '')
        inputDisplay.value = '';
    else
        inputDisplay.value = inputDisplay.value + val;
}


const deleteLastElement = () => inputDisplay.value = inputDisplay.value.slice(0, -1);

const getAllClear = () => inputDisplay.value = '';

const getResult = () => {
    let result = inputDisplay.value;
    console.log(result);
    if (result.length == 0)
        inputDisplay.value = '';
    else {
        result = result.replace(/x/g, '*');
        inputDisplay.value = eval(result);
    }
}