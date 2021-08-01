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
		<div class="auth">
			<button id="authButtonLogin" class="auth__button button button--bg-black">
				Login
			</button>

			<ul id="authList" class="auth__list">
				<li class="auth__item">
					<button id="buttonLoginGoogle" class="button button--line-black">
						<span class="button__text">
							with email&password
						</span>
						<span class="button__icon">
							<i class="icon">
								<svg class="icon__svg">
									<use class="icon__use" href="#icon-lock" />
								</svg>
							</i>
						</span>
					</button>
				</li>
				<li class="auth__item">
					<button id="buttonLoginGoogle" class="button button--line-black">
						<span class="button__text">
							with Google
						</span>
						<span class="button__icon">
							<i class="icon">
								<svg class="icon__svg">
									<use class="icon__use" href="#icon-google" />
								</svg>
							</i>
						</span>
					</button>
				</li>
				<li class="auth__item">
					<button id="buttonLoginGithub" class="button button--line-black">
						<span class="button__text">
							with GitHub
						</span>
						<span class="button__icon">
							<i class="icon">
								<svg class="icon__svg">
									<use class="icon__use" href="#icon-github" />
								</svg>
							</i>
						</span>
					</button>
				</li>
			</ul>
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
	const loginNav = document.querySelector('#authList');

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
