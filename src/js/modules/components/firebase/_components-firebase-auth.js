/**
 * @file _components-firebase-auth.js
 * @module firebaseAuth
 * @description Component Firebase Auth
 * Authentication and CRUD (Create, Read, Update and Delete)
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2021)
 */





/**
 * @requires firebaseAuthDropdown
 * @requires firebaseAuthEmailPass
 * @requires firebaseAuthGoogle
 * @requires firebaseAuthGithub
 */
import * as firebaseAuthDropdown from './_components-firebase-auth-dropdown.js';
import * as firebaseAuthEmailPass from './_components-firebase-auth-email-pass.js';
import * as firebaseAuthGoogle from './_components-firebase-auth-google.js';
import * as firebaseAuthGithub from './_components-firebase-auth-github.js';



/**
 * @function init
 * @description Initialize auth with Firebase component
 * - Create the login/logout buttons
 * - Add auth dropdown with the login options
 * - Add auth with email and password
 * - Add auth with GitHub
 * - Add auth with Google
 */
function init() {
	firebaseAuthDropdown.init();
	firebaseAuthEmailPass.init();
	firebaseAuthGithub.init();
	firebaseAuthGoogle.init();
}



export { init }