
let data = [];
let number = '';
let signs = ["/", "*", "-", ".", '=', "+"];

let back = document.querySelector('#background');

const background = () => {
	//alert('Me has tocado pervertido');
	if (back.classList.contains('background__dark')) {
		document.querySelector('#body').style.background = 'rgb(81, 79, 79)';
		document.querySelector('.container').style = 'box-shadow: 0.2em 0.2em 0.4em 0.3em rgb(228, 219, 219)';
		back.classList.add('background__light');
		back.classList.remove('background__dark');
	} else {
		document.querySelector('#body').style.background = 'white';
		document.querySelector('.container').style = 'box-shadow: 0.2em 0.2em 0.4em 0.3em rgb(18, 17, 17)';
		back.classList.remove('background__light');
		back.classList.add('background__dark');
	}
};

back.addEventListener('click', background);

const posMD = (data) => {
	return data.findIndex((element, index) => {
		if (element === '*' || element === '/') {
			return element, index;
		}
	});
};

const posSR = (data) => {
	return data.findIndex((element, index) => {
		if (element === '+' || element === '-') {
			return element, index;
		}
	});
};

const suma = (array, pos) => {
    if (array[pos] === '+') {
        let result = array[pos-1] + array[pos+1];
        return result;
    }
}

const resta = (array, pos) => {
	if (pos === -1) {
		let result = array[0] + array[1];
		return result;
	}

    if (array[pos] === '-') {
        let result = array[pos-1] - array[pos+1];
        return result;
    }
}

const multi = (array, pos) => {
    if (array[pos] === '*') {
        let result = array[pos-1] * array[pos+1];
        return result;
    }
}

const divi = (array, pos) => {
    if (array[pos] === '/') {
        let result = array[pos-1] / array[pos+1];
        return result;
    }
}

const func = (data) => {
	if (data.length === 1) {
		return data[0];
	} else {
		let pos = 0;

		if (posMD(data) === -1) {
			pos = posSR(data);
		} else {
			pos = posMD(data);
		}

		//console.log(pos);

		if (pos) {
			if (data[pos] === '/') {
				let result = divi(data, pos);
				data[pos-1] = result;
				data.splice(pos, pos+1);
				return func(data);
			}

			if (data[pos] === '*') {
				let result = multi(data, pos);
				data[pos-1] = result;
				data.splice(pos, pos+1);
				return func(data);
			}

			if (data[pos] === '+') {
				let result = suma(data, pos);
				data[pos-1] = result;
				data.splice(pos, pos+1);
				return func(data);
			}

			if (data[pos] === '-' || pos === -1) {
				if (pos === -1) {
					let result = resta(data, pos);
					data[0] = result;
					data.splice(1, 1);
					return func(data);
				} else {
					let result = resta(data, pos);
					data[pos-1] = result;
					data.splice(pos, pos+1);
					return func(data);
				}
			}
		}
	}
};

const boton = (value) => {
	if ((/[0-9]/g).test(value)){
		number += value;
		document.querySelector('.display__numbers').value += value;
	}

	if (["/", "*", "+"].includes(value)) {
		if (value === data[data.length-1]) {
			return;
		}

		if (number === NaN || !number) {
			data.push(value);
			document.querySelector('.display__numbers').value += value;
			number = '';
		} else {
			data.push(parseFloat(number));
			data.push(value);
			document.querySelector('.display__numbers').value += value;
			number = '';
		}
	}

	if (value === '-') {
		if (number === value) {
			return;
		}

		if (!number) {
			number += value;
			document.querySelector('.display__numbers').value += number;
			return;
		}

		if (number !== NaN) {
			data.push(parseFloat(number));
			data.push(value);
			document.querySelector('.display__numbers').value += value;
			number = '';
			//console.log(number);
		}

		return;
	}

	if (value === '.') {
		if (!number) {
			number += '0'+value;
			document.querySelector('.display__numbers').value += number;
			return;
		}

		if (number.includes(value)) {
			return;
		}

		number += value;
		document.querySelector('.display__numbers').value += value;
	}

	if (value === '=') {
		if (!number) {
			return;
		}

		if (number !== NaN) {
			data.push(parseFloat(number));
			document.querySelector('.display__numbers').value = data.join('');
			number = func(data);
			document.querySelector('.display__result').innerHTML = Math.round(number * 100) / 100;
			number = '';
		}

		return;
	}

	//let result = data.join('');
	//console.log('number: ',number,'\narray: ',data,'\nresult: ',parseFloat(result));
};

const numbers = () => {
	let numbers_bottons = ``;
	for (let i=9; i>0; i--) {
		numbers_bottons += `<div class="number" onclick="boton(${i})">${i}</div>`;
	}

	return numbers_bottons;
};

document.querySelector('.numbers').innerHTML = numbers();

const methods = () => {
	let methods_bottons = ``;
	for (let i=0; i<3; i++) {
		methods_bottons += `<div class="method" onclick="boton('${signs[i]}')">${signs[i]}</div>`;
	}

	return methods_bottons;
};

document.querySelector('.methods').innerHTML = methods();

const last_methods = () => {
	let number_methods_bottons = ``;
	number_methods_bottons += `<div class="number" onclick="boton(${'0'})">${'0'}</div>`;
	for (let i=3; i<6; i++) {
		number_methods_bottons += `<div class="method" onclick="boton('${signs[i]}')">${signs[i]}</div>`;
	}

	return number_methods_bottons;
};

document.querySelector('.last_methods').innerHTML = last_methods();