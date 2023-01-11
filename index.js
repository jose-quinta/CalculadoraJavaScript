
const body = document.querySelector('#body');
const container = document.querySelector('.container');
const background = document.querySelector('.circle');

const changeBackground = () => {
	if ( background.classList.contains('day') ) {

		background.classList.add('night');
		background.classList.remove('day');

		body.classList.add('day');
		body.classList.remove('night');

		container.classList.add('night-container');
		container.classList.remove('day-container');

	} else {

		background.classList.add('day');
		background.classList.remove('night');

		body.classList.add('night');
		body.classList.remove('day');

		container.classList.add('day-container');
		container.classList.remove('night-container');
	}
};

background.addEventListener('click', changeBackground);

// END CHANGE BACKGROUND

let save = [];
let number = '';
let result = 0;
let operation = document.querySelector('#operation');
let result_operation = document.querySelector('#result');
let type_operation = document.querySelector('.type');


function reset() {
	number = '';
	save = [];
	operation.value = number;
	result_operation.value = number;
}


function delete_number() {
	number = '';
	if ( save.length < 2 ) {
		operation.value = number;
		result_operation.value = '';
	} else {
		operation.value = ''.concat(save).replace(',', '') + number;
	}
}


function delete_last_number() {
	last_position = number.length - 1;
	number = number.substring(0, last_position);
	if ( save.length < 2 ) {
		operation.value = number;
		result_operation.value = '';
	} else {
		operation.value = ''.concat(save).replace(',', '') + number;
	}
}


function get_number(parameter) {
	number += parameter;
	operation.value += parameter;
}


function get_function(parameter) {
	if ( number === '' && parameter === '-' ) {
		number += parameter;
		operation.value += number;
		return;
	}

	if ( number ) {
		save.push(number);
	}

	number = '';
	save.push(parameter);
	operation.value += parameter;
}


function operation_standar() {
	if (save[1] === '/') {
		return parseFloat(save[0]) / parseFloat(save[2]);
	}

	if (save[1] === '*') {
		return parseFloat(save[0]) * parseFloat(save[2]);
	}

	if (save[1] === '+') {
		return parseFloat(save[0]) + parseFloat(save[2]);
	}

	if (save[1] === '-') {
		return parseFloat(save[0]) - parseFloat(save[2]);
	}

	if (save.length === 2) {
		return parseFloat(save[0]) + parseFloat(save[1]);
	}
}


function get_result() {
	save.push(number);
	if ( type_operation.value === 'standar' ) {
		result = operation_standar();
	}

	if ( type_operation.value === 'decimal_binary' ) {
		result = parseInt(save[0]);
		result =  result.toString(2);
	}

	if ( type_operation.value === 'binary_decimal' ) {
		result = parseInt(save[0], 2);
	}

	save = [];

	number = String(result);
	save.push(number);
	operation.value = number;
	result_operation.value = number;

	console.log(number);
}

// console.log('Number global: ', number);