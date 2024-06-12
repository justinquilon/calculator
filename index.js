let display = '0';
let number1 = null;
let number2 = null;
let operator1 = null;
let operator2 = null;
let result = null;
const buttons = document.querySelectorAll('button');

function updateDisplay() {
	const calcDisplay = document.querySelector('.display');
	calcDisplay.innerText = display.substring(0, 9);
}

updateDisplay();

function clickButton() {
	for (let i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', function () {
			if (buttons[i].classList.contains('number')) {
				inputNumber(buttons[i].value);
				updateDisplay();
			} else if (buttons[i].classList.contains('clear')) {
				clearDisplay();
				updateDisplay();
			} else if (buttons[i].classList.contains('operator')) {
				inputOperator(buttons[i].value);
				updateDisplay();
			} else if (buttons[i].classList.contains('equals')) {
				inputEquals();
				updateDisplay();
			} else if (buttons[i].classList.contains('decimal')) {
				inputDecimal(buttons[i].value);
				updateDisplay();
			} else if (buttons[i].classList.contains('sign')) {
				inputSign(display);
				updateDisplay();
			} else if (buttons[i].classList.contains('percent')) {
				inputPercent(display);
				updateDisplay();
			}
		});
	}
}

clickButton();

function inputNumber(number) {
	if (operator1 === null) {
		if (display === '0' || display === 0) {
			//1st click
			display = number;
		} else if (display === number1) {
			//starts new operation after inputEquals
			display = number;
		} else {
			display += number;
		}
	} else {
		//3rd/5th click
		if (display === number1) {
			display = number;
		} else {
			display += number;
		}
	}
}

function inputOperator(operator) {
	if (operator1 !== null && operator2 === null) {
		//4th click - handles input of second operator
		operator2 = operator;
		number2 = display;
		result = operate(Number(number1), Number(number2), operator1);
		display = roundAccurately(result, 15).toString();
		number1 = display;
		result = null;
	} else if (operator1 !== null && operator2 !== null) {
		//6th click - new secondOperator
		number2 = display;
		result = operate(Number(number1), Number(number2), operator2);
		operator2 = operator;
		display = roundAccurately(result, 15).toString();
		number1 = display;
		result = null;
	} else {
		//2nd click - handles first operator input
		operator1 = operator;
		number1 = display;
	}
}

function clearDisplay() {
	display = '0';
	number1 = null;
	number2 = null;
	operator1 = null;
	operator2 = null;
	result = null;
}

const operate = (number1, number2, operator) => {
	if (operator === '+') {
		return number1 + number2;
	} else if (operator === '-') {
		return number1 - number2;
	} else if (operator === '*') {
		return number1 * number2;
	} else if (operator === '/') {
		if (number2 === 0) {
			return 'Error';
		} else {
			return number1 / number2;
		}
	}
};

function inputEquals() {
	if (operator1 === null) {
		display = display;
	} else if (operator2 !== null) {
		//handles final result
		number2 = display;
		result = operate(Number(number1), Number(number2), operator2);
		if (result === 'Error') {
			display = 'Error';
		} else {
			display = roundAccurately(result, 15).toString();
			number1 = display;
			number2 = null;
			operator1 = null;
			operator2 = null;
			result = null;
		}
	} else {
		//handles first operation
		number2 = display;
		result = operate(Number(number1), Number(number2), operator1);
		if (result === 'Error') {
			display = 'Error';
		} else {
			display = roundAccurately(result, 15).toString();
			number1 = display;
			number2 = null;
			operator1 = null;
			operator2 = null;
			result = null;
		}
	}
}

function inputDecimal(dot) {
	if (display === number1 || display === number2) {
		display = '0';
		display += dot;
	} else if (!display.includes(dot)) {
		display += dot;
	}
}

function roundAccurately(num, places) {
	return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}

function inputSign(num) {
	display = (num * -1).toString();
}

function inputPercent(num) {
	display = (num / 100).toString();
}
