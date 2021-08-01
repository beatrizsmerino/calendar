/**
 * @file _components-firebase-auth-email-pass.js
 * @module firebaseAuthEmailPass
 * @description Component Firebase Auth Email Pass
 * Authentication with Email and Password
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2021)
 */





/**
 * @requires modal
 * @requires message
 * @requires firebaseErrors
 */
import * as modal from '../_components-modal.js';
import * as message from '../_components-message.js';
import * as firebaseErrors from './_components-firebase-errors.js';



/**
 * @function createTemplate
 * @description Create template for form of email and password
 * @returns
 */
function createTemplate() {
	const template = `
			<form id="formLoginEmailPass" class="form">
				<fieldset class="fieldset">
					<legend class="legend">
						Login
					</legend>
					<div class="form__group">
						<div class="form__item">
							<label class="label">
								User
							</label>
							<input class="form__field" type="text" name="user" placeholder="@">
						</div>
						<div class="form__item">
							<label class="label">
								Password
							</label>
							<input class="form__field" type="password" name="password" placeholder="***">
						</div>
					</div>
				</fieldset>
				<div class="form__button-list">
					<button id="loginEmailPassButton" class="button button--bg-black">
						Login
					</button>
				</div>
			</form>
		`;

	return template;
}



/**
 * @function create
 * @description Insert the template of modal with form into the html
 */
function create() {
	const template = createTemplate();
	modal.init(template);
}



/**
 * @function login
 * @description Login user with email & password
 */
function login() {
	console.log("Login email and password");
}



/**
 * @function set
 * @description Set login when click on button
 */
function set() {
	const button = document.getElementById("loginEmailPassButton");

	if (button) {
		button.addEventListener("click", function () {
			login();
		});
	}
}



/**
 * @function show
 * @description Show modal with form when click on button
 */
function show() {
	const button = document.getElementById("loginEmailPassShow");

	if (button) {
		button.addEventListener("click", function () {
			create();
		});
	}
}



/**
 * @function addEvents
 * @description Add events for login form with button
 */
function addEvents() {
	show();
	set();
}



/**
 * @function init
 * @description Initialize login with Email and Password component
 */
function init() {
	addEvents();
}



export { init }