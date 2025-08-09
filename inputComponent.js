export class Input extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.render();
	}

	render() {
		this.shadowRoot.innerHTML = `
			<style>
				input {
					box-sizing: border-box;
					width: 100%;
					padding: 6px;
					font-size: 16px;
					background: transparent;
					color: var(--text);
					border: none;
					border-bottom: 1px solid var(--border);
				}
				
				input:focus {
					outline: none;
				}
			</style>
			<input type="text" placeholder="Type something..." autofocus />
		`;
	}

	connectedCallback() {
		const input = this.shadowRoot.querySelector("input");
		if (input) input.focus();
	}

	get value() {
		const input = this.shadowRoot.querySelector("input");
		return input ? input.value : "";
	}
}

customElements.define("input-component", Input);
