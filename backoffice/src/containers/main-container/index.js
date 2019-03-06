import { MetaContainer } from '@rebelstack-io/metaflux';
import Navigo from 'navigo';
import '../../css/general.css';
import '../../handlers';
import '../../components/loby'
import '../../components/login';
import '../../components/sidebar';
import '../../components/settings';
import '../../components/operators/confirm-invitation'

class YakMainContainer extends MetaContainer {
	constructor () {
		super();
		this.handleRoute = this.handleRoute.bind(this);
	}
	
	// eslint-disable-next-line class-method-use-this
	render () {
		this.content = document.createElement('div');
		this.content.id = 'container';
		this.handleRoute();
		this.handleStoreEvents();
		return this.content;
	}

	handleRoute () {
		let el;
		var root = null;
		var useHash = true; // Defaults to: false
		var hash = '#'; // Defaults to: '#'
		var router = new Navigo(root, useHash, hash);
		// TODO: CREATE EACH VIEW
		el = document.createElement('yak-loby');
		router.on({
			'/lobby': () => {
				console.log('loby',this.requireAuth())
				if (!this.requireAuth()) {
					this.innerHTML = '';
					// Add to the DOM
					el = document.createElement('yak-loby');
					this.appendChild(el);
				} else {
					router.navigate('/login');
				}
			},
			'/dashboard': () => {
				console.log('dashboard',global.storage.getState().Main.auth)
				if (!this.requireAuth()) {
					// Add to the DOM
					this.appendChild(el);
				} else {
					router.navigate('/login');
				}
			},
			'/login': () => {
				this.innerHTML = '';
				// Add to the DOM
				el = document.createElement('yak-login');
				this.appendChild(el);
				
			},
			'/invite': () => {
				this.innerHTML = '';
				el = document.createElement('confirm-invitation');
				this.appendChild(el);
			}
		})
		.resolve();
	}
	
	/**
	 * TODO: make a real require auth
	 */
	requireAuth () {
		return !global.storage.getState().Main.auth;
		//return true;
	}
	/**
	 * @description create the view depending on your user role
	 * @param {Integer} accessLevel 
	 * @param {Boolean} admin 
	 */
	createRoleView (accessLevel, admin) {
		
		if (admin && accessLevel === 10) {
			// admin login
			console.log('i\'m admin');
		} else {
			switch (accessLevel) {
				case 3: 
					//operator
					console.log('i\'m admin an operatorator');
					document.location.hash = '#/lobby';
				break;
				case 5:
					//client t0
					console.log('i\'m admin a client T0');
					document.location.hash = '#/dashboard';
				break;
				case 6: 
					//client t1
					console.log('i\'m admin a client T1');
				break;
				case 7:
					// client t2
					console.log('i\'m admin a client T2');
				break;
			}
		}
	}
	
	handleStoreEvents () {
		const { storage } = global;
		storage.on('LOGIN-SUCCESS', (state) => {
			const {accessLevel, admin} = state.newState;
			this.createRoleView(accessLevel, admin)
		});

		storage.on('LOGOUT', () => {
			// Clean the current content
			this.innerHTML = '';
			// Create the login component
			const login = document.createElement('yak-login');
			// Add to the DOM
			this.appendChild(login);
		})
	}

}

window.customElements.define('yak-main-container', YakMainContainer);
