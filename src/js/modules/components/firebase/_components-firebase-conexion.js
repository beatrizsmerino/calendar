/**
 * @file _components-firebase.js
 * @module firebaseConexion
 * @description Authentication and CRUD (Create, Read, Update and Delete)
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2021)
 */





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
	firebase.initializeApp(settings);

	console.info("Firebase Conexion:", firebase);
}



export { init }