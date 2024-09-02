const endpoint =
	'https://script.google.com/macros/s/AKfycbw9-JmDJ6dCmmunnv78NVo9I1GiCzwN8LsFusCfBqTPqukuX3w_7wZWqWYoT0YXU6U/exec';

async function sendForm(event) {
	const data = new FormData(event.target);

	const name = data.get('name');
	const company = data.get('company');
	const email = data.get('email');
	const city = data.get('city');
	const informed = data.get('informed');

	const params = `name=${name}&company=${company}&email=${email}&city=${city}&informed=${informed}`;

	document.querySelector('#form-loading').style.display = 'block';

	const res = await fetch(`${endpoint}?${params}`, { method: 'POST' });
	const text = await res.text();

	document.querySelector('#form-loading').style.display = 'none';

	if (text === 'ok') {
		document.querySelector('#form-success').style.display = 'block';
		document.querySelector('#form-error').style.display = 'none';
	} else {
		document.querySelector('#form-success').style.display = 'none';
		document.querySelector('#form-error').style.display = 'block';
	}
}
