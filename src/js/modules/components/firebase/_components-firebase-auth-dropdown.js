/**
 * @file _components-firebase-auth-dropdown.js
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
 * @description Create template for auth dropdown
 * @returns
 */
function createTemplate() {
	const template = `
		<div id="authDropdown" class="auth-dropdown">
			<button id="authDropdownLoginButton" class="auth-dropdown__button button button--bg-black">
				Login
			</button>

			<nav id="authDropdownLoginNav" class="auth-dropdown__nav">
				<h4 class="auth-dropdown__title">
					Login with:
				</h4>
				<ul class="auth-dropdown__list">
					<li class="auth-dropdown__item">
						<button id="loginEmailPassShow" class="button">
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
					<li class="auth-dropdown__item">
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
					<li class="auth-dropdown__item">
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
 * @description Insert the template of auth dropdown into the html
 */
function create() {
	const template = createTemplate();
	const nodeTemplate = tools.stringToNode(template);

	document.querySelector("body").appendChild(nodeTemplate);
}



/**
 * @function closeOutside
 * @description Close auth dropdown when click outside
 * If the target element of the click isn't the nav of auth dropdown close it
 */
function closeOutside() {
	const authDropdown = document.querySelector('#authDropdown');
	const authDropdownNav = document.querySelector('#authDropdownLoginNav');

	document.addEventListener('mouseup', function (e) {
		if (!authDropdown.contains(e.target)) {
			authDropdownNav.classList.remove('is-show');
		}
	});
}



/**
 * @function openClose
 * @description Open and close auth dropdown when click login button
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
 * @description Add events for the auth dropdown
 */
function addEvents() {
	openClose();
	closeOutside();
}



/**
 * @function init
 * @description Init the auth dropdown component
 */
function init() {
	create();
	addEvents();
}



export { init }
