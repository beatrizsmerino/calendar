/**
 * @file _components-firebase.js
 * @module firebaseConexion
 * @description Authentication and CRUD (Create, Read, Update and Delete)
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2021)
 */





/**
 * @requires message
 */
import * as message from '../_components-message.js';
import * as firebaseErrors from './_components-firebase-errors.js';




/**
 * @const settings
 * @type {Object}
 * @description Data to connect to my Firebase project database
 * Change this string 'XXXXXXXXXXXX' for yor data
 * Your web app's Firebase configuration
 */
const settings = {
	apiKey: "XXXXXXXXXXXX",
	authDomain: "XXXXXXXXXXXX",
	projectId: "XXXXXXXXXXXX",
	storageBucket: "XXXXXXXXXXXX",
	messagingSenderId: "XXXXXXXXXXXX",
	appId: "XXXXXXXXXXXX"
};



/**
 * @function init
 * @description Initialize Firebase
 */
function init() {
	try {
		firebase.initializeApp(settings);

		message.init({
			title: "Success",
			description: "Firebase conexion inizialized",
			className: "is-success"
		});

	} catch (error) {
		// Handle errors
		const errorCode = error.code;
		const errorMessage = error.message;
		const listMessages = firebaseErrors.listMessages;
		const verifyMessage = firebaseErrors.verify(listMessages[errorCode], errorMessage);

		message.init({
			title: "Error!",
			description: verifyMessage,
			className: "is-error"
		});
	}

	console.info("Firebase Conexion:", firebase);
}



export { init }