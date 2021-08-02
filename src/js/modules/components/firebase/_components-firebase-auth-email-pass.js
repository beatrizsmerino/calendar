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
			<div class="auth-email-pass">
				<div class="auth-email-pass__form auth-email-pass__form--register is-show">
					<form id="registerEmailPassForm" class="form">
						<fieldset class="fieldset">
							<legend class="legend">
								Register
							</legend>
							<div class="form__group">
								<div class="form__item">
									<label class="label">
										User
									</label>
									<input class="form__field" type="text" name="registerUser" placeholder="@">
								</div>
								<div class="form__item">
									<label class="label">
										Password
									</label>
									<input class="form__field" type="password" name="registerPassword" placeholder="***">
								</div>
							</div>
						</fieldset>
						<div class="form__button-list form__button-list--column">
							<button id="registerEmailPassButton" class="button button--bg-black" type="submit">
								Register
							</button>
							<p>
								Already have an account?
								<button id="loginEmailPassShowForm" class="button button--icon link" type="button">
									Login
								</button>
							</p>
						</div>
					</form>
				</div>
				<div class="auth-email-pass__form auth-email-pass__form--login">
					<form id="loginEmailPassForm" class="form">
						<fieldset class="fieldset">
							<legend class="legend">
								Login
							</legend>
							<div class="form__group">
								<div class="form__item">
									<label class="label">
										User
									</label>
									<input class="form__field" type="text" name="loginUser" placeholder="@">
								</div>
								<div class="form__item">
									<label class="label">
										Password
									</label>
									<input class="form__field" type="password" name="loginPassword" placeholder="***">
								</div>
							</div>
						</fieldset>
						<div class="form__button-list form__button-list--column">
							<button id="loginEmailPassButton" class="button button--bg-black" type="submit">
								Login
							</button>
							<p>
								First time here? Create an account.
								<button id="registerEmailPassShowForm" class="button button--icon link" type="button">
									Register
								</button>
							</p>
						</div>
					</form>
				</div>
			</div>
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
 * @function register
 * @description Register user with email and password
 * @param {String} email - Email data obtained from the register form
 * @param {String} password - Password data obtained from the register form
 */
function register(email, password) {
	console.log("Register email and password");
}



/**
 * @function setRegister
 * @description Set register when click on button
 */
function setRegister() {
	const button = document.getElementById("registerEmailPassButton");

	if (button) {
		button.addEventListener("click", function (event) {
			event.preventDefault();
			register();
		});
	}
}



/**
 * @function login
 * @description Login user with email and password
 * @param {String} email - Email data obtained from the login form
 * @param {String} password - Password data obtained from the login form
 */
function login(email, password) {
	console.log("Login email and password");
}



/**
 * @function setLogin
 * @description Set login when click on button
 */
function setLogin() {
	const button = document.getElementById("loginEmailPassButton");

	if (button) {
		button.addEventListener("click", function (event) {
			event.preventDefault();
			login();
		});
	}
}



/**
 * @function showModal
 * @description Show modal with form when click on button
 */
function showModal() {

	return new Promise((resolve) => {
		const button = document.getElementById("loginEmailPassShowModal");

		if (button) {
			button.addEventListener("click", function () {
				create();
				resolve();
			});
		}
	});

}



/**
 * @function showLoginForm
 * @description Show login form when click on button
 */
function showLoginForm() {
	const loginForm = document.querySelector(".auth-email-pass__form--login");
	const registerForm = document.querySelector(".auth-email-pass__form--register");
	const button = document.getElementById("loginEmailPassShowForm");

	if (button) {
		button.addEventListener("click", function () {
			loginForm.classList.add('is-show');
			registerForm.classList.remove('is-show');
		});
	}
}



/**
 * @function showRegisterForm
 * @description Show register form when click on button
 */
function showRegisterForm() {
	const loginForm = document.querySelector(".auth-email-pass__form--login");
	const registerForm = document.querySelector(".auth-email-pass__form--register");
	const button = document.getElementById("registerEmailPassShowForm");

	if (button) {
		button.addEventListener("click", function () {
			registerForm.classList.add('is-show');
			loginForm.classList.remove('is-show');
		});
	}
}


/**
 * @function addEvents
 * @description Add events for login form with button
 */
async function addEvents() {
	showModal()
		.then(() => {
			showLoginForm();
			showRegisterForm();
			setLogin();
			setRegister();
		});

}



/**
 * @function init
 * @description Initialize login with Email and Password component
 */
function init() {
	addEvents();
}



export { init }