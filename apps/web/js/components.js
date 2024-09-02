import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class WedoNavbar extends LitElement {
	static styles = css`
		nav {
			display: flex;
			align-items: center;

			padding: var(--spacing-rg) calc(2 * var(--spacing-rg));
			gap: var(--spacing-rg);

			border-radius: var(--rounding-full);
			box-shadow: var(--shadow);

			background-color: rgba(255, 255, 255, 0.8);
			backdrop-filter: var(--blur);

			z-index: 10;
		}

		.logo {
			font-weight: 300;
			color: var(--green);
		}

		@media (max-width: 768px) {
			.button :first-child {
				display: none;
			}
		}
	`;

	render() {
		return html`
			<nav>
				<span class="logo">?What do we do with you</span>
				<wedo-button href="/join.html" class="button"
					><span>Join the Beta</span><span>🧪</span></wedo-button
				>
			</nav>
		`;
	}
}

class WedoButton extends LitElement {
	static properties = {
		href: { type: String },
		type: { type: String }
	};

	static styles = css`
		a {
			--transition: all var(--duration-rg) ease-in-out;

			display: inline-flex;
			justify-content: start;
			align-items: center;
			position: relative;

			padding: var(--spacing-sm) calc(2 * var(--spacing-sm));
			text-decoration: none;
			color: var(--white);

			border-radius: var(--rounding-full);
			border: 1px solid var(--green);

			transition: var(--transition);

			background-color: var(--green);
		}

		a:hover {
			color: var(--green);
			background-color: var(--white);
		}

		a:hover::before {
			opacity: 0;
		}
	`;

	render() {
		return html`
			<a href="${this.href}" class="${this.type}">
				<slot />
			</a>
		`;
	}
}

customElements.define('wedo-navbar', WedoNavbar);
customElements.define('wedo-button', WedoButton);
