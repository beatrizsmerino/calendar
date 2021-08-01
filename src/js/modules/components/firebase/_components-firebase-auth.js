/**
 * @file _components-firebase-auth.js
 * @module firebaseAuth
 * @description Authentication and CRUD (Create, Read, Update and Delete)
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2021)
 */





/**
 * @requires tools
 */
import * as tools from '../_components-tools.js';



/**
 * @function createTemplate
 * @description Create template for auth
 * @returns
 */
function createTemplate() {
	const template = `
		<div class="auth-dropdown">
			<button id="authButtonLogin" class="auth-dropdown__button button button--bg-black">
				Login
			</button>

			<nav id="authNav" class="auth-dropdown__nav">
				<h4 class="auth-dropdown__title">
					Login with:
				</h4>
				<ul class="auth-dropdown__list">
					<li class="auth-dropdown__item">
						<button id="buttonLoginGoogle" class="button">
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
						<button id="buttonLoginGoogle" class="button">
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
						<button id="buttonLoginGithub" class="button">
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
 * @description Insert the template of auth into the html
 */
function create() {
	const template = createTemplate();
	const nodeTemplate = tools.stringToNode(template);

	document.querySelector("body").appendChild(nodeTemplate);
}



/**
 * @function openClose
 * @description Open and close auth list for choose Login with Google or GitHub
 */
function openClose() {
	const loginButton = document.querySelector('#authButtonLogin');
	const loginNav = document.querySelector('#authNav');

	loginButton.addEventListener('click', function () {
		loginNav.classList.toggle('is-show');
	});
}



/**
 * @function addEvents
 * @description Add events for show and hide the message
 */
function addEvents() {
	openClose();
}



/**
 * @function init
 * @description Create, insert and add events for the auth component
 */
function init() {
	create();
	addEvents();
}



export { init }
