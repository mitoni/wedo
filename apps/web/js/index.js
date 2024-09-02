import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

/** @param (number} ms */
async function wait(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/** @type {HTMLElement} canvas */
let canvas;

const CREATE_LOOP_TIME = 500;
const PRODUCE_LOOP_TIME = 3000;
const TAKE_LOOP_TIME = 3000;

const OFF_Y = 30;

const industries = [];

const animations = css`
	@-webkit-keyframes scale-up-bottom {
		0% {
			-webkit-transform: scale(0.5);
			transform: scale(0.5);
			-webkit-transform-origin: 50% 100%;
			transform-origin: 50% 100%;
		}
		100% {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-transform-origin: 50% 100%;
			transform-origin: 50% 100%;
		}
	}
	@keyframes scale-up-bottom {
		0% {
			-webkit-transform: scale(0.5);
			transform: scale(0.5);
			-webkit-transform-origin: 50% 100%;
			transform-origin: 50% 100%;
		}
		100% {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-transform-origin: 50% 100%;
			transform-origin: 50% 100%;
		}
	}

	@-webkit-keyframes scale-up-left {
		0% {
			-webkit-transform: scale(0.5);
			transform: scale(0.5);
			-webkit-transform-origin: 0% 50%;
			transform-origin: 0% 50%;
		}
		100% {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-transform-origin: 0% 50%;
			transform-origin: 0% 50%;
		}
	}
	@keyframes scale-up-left {
		0% {
			-webkit-transform: scale(0.5);
			transform: scale(0.5);
			-webkit-transform-origin: 0% 50%;
			transform-origin: 0% 50%;
		}
		100% {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-transform-origin: 0% 50%;
			transform-origin: 0% 50%;
		}
	}

	@-webkit-keyframes puff-out-bottom {
		0% {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-transform-origin: 50% 100%;
			transform-origin: 50% 100%;
			-webkit-filter: blur(0px);
			filter: blur(0px);
			opacity: 1;
		}
		100% {
			-webkit-transform: scale(2);
			transform: scale(2);
			-webkit-transform-origin: 50% 100%;
			transform-origin: 50% 100%;
			-webkit-filter: blur(4px);
			filter: blur(4px);
			opacity: 0;
		}
	}
	@keyframes puff-out-bottom {
		0% {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-transform-origin: 50% 100%;
			transform-origin: 50% 100%;
			-webkit-filter: blur(0px);
			filter: blur(0px);
			opacity: 1;
		}
		100% {
			-webkit-transform: scale(2);
			transform: scale(2);
			-webkit-transform-origin: 50% 100%;
			transform-origin: 50% 100%;
			-webkit-filter: blur(4px);
			filter: blur(4px);
			opacity: 0;
		}
	}
`;

class PointTake extends LitElement {
	static properties = {
		_x: { type: Number },
		_y: { type: Number },
		x: { type: Number },
		y: { type: Number },
		icon: { type: String },
		product: { type: String }
	};

	icons = ['👨', '👩'];
	products = ['🏠', '🌲', '🌷', '🧸', '💎'];

	static styles = css`
		.take {
			position: absolute;
			min-height: 50px;
			font-size: 1.5rem;
			display: inline-flex;
			gap: var(--spacing-rg);
			justify-content: left;
			align-items: center;

			transition: transform var(--duration-xl) ease-in-out;
		}

		.icon {
			-webkit-animation: scale-up-bottom 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
			animation: scale-up-bottom 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
		}

		.product {
			font-size: 1rem;
			padding: var(--spacing-sm);
			background-color: rgba(255, 255, 255, 0.8);
			backdrop-filter: var(--blur);
			box-shadow: var(--shadow);
			border-radius: var(--rounding-rg);

			-webkit-animation: scale-up-left 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
			animation: scale-up-left 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
		}

		.exit {
			-webkit-animation: puff-out-bottom 0.9s cubic-bezier(0.165, 0.84, 0.44, 1) both;
			animation: puff-out-bottom 0.9s cubic-bezier(0.165, 0.84, 0.44, 1) both;
		}

		${animations}
	`;

	/**
	 * @param {number} x
	 * @param {number} y
	 * */
	go(x, y) {
		this._x = this.x;
		this._y = this.y;

		this.x = x;
		this.y = y;
	}

	async destroy() {
		this.renderRoot.querySelector('.icon').classList.add('exit');
		this.renderRoot.querySelector('.product').classList.add('exit');
		await wait(1000);
		canvas.removeChild(this);
	}

	async animate() {
		const style = getComputedStyle(document.body);
		const durationRg = parseFloat(style.getPropertyValue('--duration-rg')) * 1000;
		const durationXl = parseFloat(style.getPropertyValue('--duration-xl')) * 1000;

		const availableIndustries = industries.filter((i) => i.quantity > 0);
		const sortedIndustries = availableIndustries.sort((a, b) => {
			const d = Math.sqrt((a.x - this.x) ** 2 + (a.y - this.y) ** 2);
			const e = Math.sqrt((b.x - this.x) ** 2 + (b.y - this.y) ** 2);
			return d - e;
		});

		const industry = sortedIndustries[0];

		if (!industry) {
			setTimeout(animate, 100);
		}

		await wait(durationRg);

		this.go(industry.x, industry.y + OFF_Y);

		await wait(durationXl);

		const amount = Math.floor(Math.random() * industry.quantity * 1.5);

		industry.take(amount);
		this.product = '🛢️';

		await wait(durationRg);

		this.go(this._x, this._y);

		await wait(durationXl);

		this.product = this.products[Math.floor(Math.random() * this.products.length)];

		await wait(durationXl);

		this.destroy();
	}

	/**
	 * @param {number} width
	 * @param {number} height
	 * */
	constructor(width, height) {
		super();

		this.x = width * 0.1 + Math.random() * width * 0.8;
		this.y = height * 0.1 + Math.random() * height * 0.8;

		this.icon = this.icons[Math.floor(Math.random() * this.icons.length)];
		this.animate();
	}

	render() {
		return html`
			<div class="take" style="transform:translate(${this.x}px, ${this.y}px);">
				<span class="icon">${this.icon}</span>
				${this.product ? html`<span class="product">${this.product}</span>` : null}
			</div>
		`;
	}
}

class PointGive extends LitElement {
	static properties = {
		x: { type: Number },
		y: { type: Number },
		icon: { type: String },
		quantity: { type: Number },
		taken: { type: Boolean }
	};

	static styles = css`
		.give {
			position: absolute;
			min-height: 50px;
			font-size: 1.5rem;
			display: inline-flex;
			gap: var(--spacing-rg);
			justify-content: left;
			align-items: center;
			filter: drop-shadow(var(--shadow));
		}

		.icon {
			-webkit-animation: scale-up-bottom 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
			animation: scale-up-bottom 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
		}

		.waste {
			font-size: 1rem;
			padding: var(--spacing-sm);
			background-color: rgba(255, 255, 255, 0.3);
			backdrop-filter: var(--blur);
			box-shadow: var(--shadow);
			border-radius: var(--rounding-rg);

			-webkit-animation: scale-up-left 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
			animation: scale-up-left 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
		}

		${animations}
	`;

	loop() {
		setInterval(() => {
			this.quantity += 1;
			if (this.taken) {
				this.taken = false;
			}
		}, PRODUCE_LOOP_TIME);
	}

	/** @param {number} amount */
	take(amount) {
		let _quantity = this.quantity - amount;
		_quantity = _quantity < 0 ? 0 : _quantity;

		this.taken = true;
		this.quantity = _quantity;
	}

	/**
	 * @param {number} width
	 * @param {number} height
	 * */
	computePosition(width, height) {
		this.x = width * 0.1 + Math.random() * width * 0.8;
		this.y = height * 0.1 + Math.random() * height * 0.8;
	}

	/**
	 * @param {number} width
	 * @param {number} height
	 * */
	constructor(width, height) {
		super();

		loop: while (true) {
			this.computePosition(width, height);

			// check if it's close to another icon and recalculate
			for (const industry of industries) {
				const ix = industry.x;
				const iy = industry.y;
				if (Math.abs(ix - this.x) < 100 && Math.abs(iy - this.y) < 100) {
					continue loop;
				}
			}

			break;
		}

		industries.push(this);

		this.quantity = 0;
		this.loop();
	}

	render() {
		return html`
			<div class="give puffIn" style="transform:translate(${this.x}px, ${this.y}px);">
				<span class="icon">🏭</span>
				${this.quantity > 0
					? html`<span class="waste" style="color:${this.taken ? 'var(--green)' : 'unset'}"
							>${this.quantity}🛢️</span
						>`
					: null}
			</div>
		`;
	}
}

async function main() {
	canvas = document.getElementById('canvas');
	const { width, height } = canvas.getBoundingClientRect();

	let i = 6;
	function createLoop() {
		if (i === 0) {
			setTimeout(takeLoop, TAKE_LOOP_TIME);
			return;
		}

		canvas.appendChild(new PointGive(width, height));

		i--;

		setTimeout(createLoop, CREATE_LOOP_TIME);
	}

	function takeLoop() {
		canvas.appendChild(new PointTake(width, height));
		setTimeout(takeLoop, TAKE_LOOP_TIME);
	}

	await wait(CREATE_LOOP_TIME);

	createLoop();
}

customElements.define('point-take', PointTake);
customElements.define('point-give', PointGive);

main();
