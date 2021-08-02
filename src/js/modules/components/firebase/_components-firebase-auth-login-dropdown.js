/**
 * @file _components-firebase-auth-login-dropdown.js
 * @module firebaseAuthDropdown
 * @description Component Auth Dropdown
 * Create the Login/Logout buttons and dropdown with the options for login
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2021)
 */





/**
 * @requires tools
 */
import * as tools from '../_components-tools.js';



/**
 * @function createTemplate
 * @description Create template for 'auth dropdown' component
 * @returns
 */
function createTemplate() {
	const template = `
		<div id="authDropdown" class="auth-login-dropdown">
			<button id="authDropdownLoginButton" class="auth-login-dropdown__button button button--bg-black">
				Login
			</button>

			<nav id="authDropdownLoginNav" class="auth-login-dropdown__nav">
				<h4 class="auth-login-dropdown__title">
					Login with:
				</h4>
				<ul class="auth-login-dropdown__list">
					<li class="auth-login-dropdown__item">
						<button id="loginEmailPassShowModal" class="button">
							<span class="button__icon">
								<i class="icon">
									<svg class="icon__svg">
										<use class="icon__use" href="#icon-lock" />
									</svg>
								</i>
							</span>
							<span class="button__text">
								email & password
							</span>
						</button>
					</li>
					<li class="auth-login-dropdown__item">
						<button id="loginGoogleButton" class="button">
							<span class="button__icon">
								<i class="icon">
									<svg class="icon__svg">
										<use class="icon__use" href="#icon-google" />
									</svg>
								</i>
							</span>
							<span class="button__text">
								Google
							</span>
						</button>
					</li>
					<li class="auth-login-dropdown__item">
						<button id="loginGithubButton" class="button">
							<span class="button__icon">
								<i class="icon">
									<svg class="icon__svg">
										<use class="icon__use" href="#icon-github" />
									</svg>
								</i>
							</span>
							<span class="button__text">
								GitHub
							</span>
						</button>
					</li>
				</ul>
			</nav>
		</div>
	`;

	return template;
}



/**
 * @function create
 * @description Insert the template of 'auth dropdown' component into the html
 */
function create() {
	const template = createTemplate();
	const nodeTemplate = tools.stringToNode(template);

	document.querySelector("body").appendChild(nodeTemplate);
}



/**
 * @function closeOutside
 * @description Close the nav of 'auth dropdown' component when click outside it
 * If the target element of the click isn't the nav of 'auth dropdown' close it
 */
function closeOutside() {
	const authDropdown = document.querySelector('#authDropdown');
	const authDropdownNav = document.querySelector('#authDropdownLoginNav');

	document.addEventListener('mouseup', function (event) {
		if (!authDropdown.contains(event.target)) {
			authDropdownNav.classList.remove('is-show');
		}
	});
}



/**
 * @function openClose
 * @description Open and close the nav of 'auth dropdown' component when click on the login button
 */
function openClose() {
	const authDropdownButton = document.querySelector('#authDropdownLoginButton');
	const authDropdownNav = document.querySelector('#authDropdownLoginNav');

	authDropdownButton.addEventListener('click', function () {
		authDropdownNav.classList.toggle('is-show');
	});
}



/**
 * @function addEvents
 * @description Add events for the 'auth dropdown' component
 */
function addEvents() {
	openClose();
	closeOutside();
}



/**
 * @function init
 * @description Initialize the 'auth dropdown' component
 */
function init() {
	create();
	addEvents();
}



export { init }
