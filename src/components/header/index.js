import { MetaComponent } from '@rebelstack-io/metaflux';

class Header extends MetaComponent {
	/**
	 * MetaComponent constructor needs storage.
	 */
	constructor () {
		super(global.storage);
	}
	// eslint-disable-next-line class-method-use-this
	render () {
		this.hederContent = document.createElement('div');
		this.createHeaderContent();
		return this.hederContent;
	}
	/**
	 * create the header structure
	 */
	createHeaderContent () {
		this.hederContent.className = 'yak-header-items'
		const title = document.createElement('span');
		title.textContent = 'Yak Chat';
		this.hederContent.appendChild(title);
		this.createCloseButton();
	}
	/**
	 * create the toggle chat
	 */
	createCloseButton () {
		this.closeButton = document.createElement('div')
		this.closeButton.className = 'yak-min-open';
		this.closeButton.addEventListener('click', () => {
			this.closeButton.classList.toggle('yak-min-close');
			this.storage.dispatch({type: 'TOGGLE-CHAT'})
		})
		this.hederContent.appendChild(this.closeButton);
	}
	/**
	 * Handle Events in a organized way.
	 */
	handleStoreEvents () {
		return {
			'TOGGLE-CHAT': action => {
				this.className = this.storage.getState().Main.isOpen ? 'header-up' : 'header-down';
			}
		};
	}
}

window.customElements.define('yak-header', Header);
