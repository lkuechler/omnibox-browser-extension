export class Footer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.render();
	}

	render() {
		this.shadowRoot.innerHTML = `
			<style>
				.wrapper {
					display: flex;
					justify-content: space-between;
					margin-top: 12px;
					padding: 6px 6px 0px 6px;
					font-size: 10px;
					color: var(--text-secondary);
					border-top: 1px solid var(--border);
				}

				a {
					color: var(--text-secondary);
					text-decoration: none;
				}

				a:hover {
					text-decoration: underline;
				}
			</style>
			<div class="wrapper">
				<a href="https://github.com/lkuechler/omnibox-browser-extension/issues" target="_blank" rel="noopener">Report bugs or suggest features</a>
				<span>v${browser.runtime.getManifest().version}</span>
			</div>
		`;
	}
}

customElements.define("footer-component", Footer);
