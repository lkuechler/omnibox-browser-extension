export class Intro extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.render();
	}

	render() {
		this.shadowRoot.innerHTML = `
			<style>
				:host {
					display: block;
					padding: 0 6px;
					font-size: 14px;
				}
				ul {
					display: flex;
					flex-direction: column;
					gap: 0.5em;
					margin: 0.5em 0 0 1.2em;
					padding: 0;
				}
			</style>
			<ul>
				<li>Type to search for tabs by title.</li>
				<li>Use <strong>Arrow Up</strong> and <strong>Arrow Down</strong> to navigate results.</li>
				<li>Press <strong>Enter</strong> to switch to the selected tab.</li>
				<li>Start your search with <strong>"&gt;"</strong> for to only get commands.</li>
				<li>Type <strong>:audio</strong> to filter tabs playing audio.</li>
			</ul>
		`;
	}
}

customElements.define("intro-component", Intro);
