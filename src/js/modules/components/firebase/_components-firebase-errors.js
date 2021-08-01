/**
 * @file _components-firebase-errors.js
 * @module firebaseErrors
 * @description Component Firebase Errors
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2021)
 */





/**
 * @const listMessages
 * @type {Object}
 * @description List of firebase errors
 */
const listMessages = {
	"auth/internal-error": "Internal error",
	"argument-error": "",
	"app-not-authorized": "This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.",
	"app-not-installed": "The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.",
	"captcha-check-failed": "",
	"code-expired": "",
	"cordova-not-ready": "Cordova framework is not ready.",
	"cors-unsupported": "This browser is not supported.",
	"credential-already-in-use": "This credential is already associated with a different user account.",
	"custom-token-mismatch": "The custom token corresponds to a different audience.",
	"requires-recent-login": "This operation is sensitive and requires recent authentication. Log in again before retrying this request.",
	"dynamic-link-not-activated": "Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.",
	"email-already-in-use": "The email address is already in use by another account.",
	"expired-action-code": "The action code has expired. ",
	"cancelled-popup-request": "This operation has been cancelled due to another conflicting popup being opened.",
	"internal-error": "An internal error has occurred.",
	"invalid-app-credential": "",
	"invalid-app-id": "The mobile app identifier is not registed for the current project.",
	"invalid-user-token": "The user's credential is no longer valid. The user must sign in again.",
	"invalid-auth-event": "An internal error has occurred.",
	"invalid-verification-code": "",
	"invalid-cordova-configuration": "The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.",
	"invalid-custom-token": "The custom token format is incorrect. Please check the documentation.",
	"invalid-email": "The email address is badly formatted.",
	"invalid-api-key": "Your API key is invalid, please check you have copied it correctly.",
	"invalid-credential": "The supplied auth credential is malformed or has expired.",
	"invalid-message-payload": "The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.",
	"invalid-oauth-provider": "EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.",
	"unauthorized-domain": "This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.",
	"invalid-action-code": "The action code is invalid. This can happen if the code is malformed, expired, or has already been used.",
	"wrong-password": "The password is invalid or the user does not have a password.",
	"invalid-identifier-number": "",
	"invalid-recipient-email": "The email corresponding to this action failed to send as the provided recipient email address is invalid.",
	"invalid-sender": "The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.",
	"invalid-verification-id": "",
	"missing-iframe-start": "An internal error has occurred.",
	"auth-domain-config-required": "Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.",
	"missing-app-credential": "",
	"missing-verification-code": "",
	"missing-identifier-number": "",
	"missing-verification-id": "",
	"app-deleted": "This instance of FirebaseApp has been deleted.",
	"account-exists-with-different-credential": "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.",
	"network-request-failed": "A network error (such as timeout, interrupted connection or unreachable host) has occurred.",
	"no-auth-event": "An internal error has occurred.",
	"no-such-provider": "User was not linked to an account with the given provider.",
	"operation-not-allowed": "The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.",
	"operation-not-supported-in-this-environment": 'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',
	"popup-blocked": "Unable to establish a connection with the popup. It may have been blocked by the browser.",
	"popup-closed-by-user": "The popup has been closed by the user before finalizing the operation.",
	"provider-already-linked": "User can only be linked to one identity for the given provider.",
	"quota-exceeded": "",
	"redirect-cancelled-by-user": "The redirect operation has been cancelled by the user before finalizing.",
	"redirect-operation-pending": "A redirect sign-in operation is already pending.",
	timeout: "The operation has timed out.",
	"user-token-expired": "The user's credential is no longer valid. The user must sign in again.",
	"too-many-requests": "We have blocked all requests from this device due to unusual activity. Try again later.",
	"user-cancelled": "User did not grant your application the permissions it requested.",
	"user-not-found": "There is no user record corresponding to this identifier. The user may have been deleted.",
	"user-disabled": "The user account has been disabled by an administrator.",
	"user-mismatch": "The supplied credentials do not correspond to the previously signed in user.",
	"user-signed-out": "",
	"weak-password": "The password must be 6 characters long or more.",
	"web-storage-unsupported": "This browser is not supported or 3rd party cookies and data may be disabled."
};



/**
 * @function verify
 * @description Verify if the firebase error it is a 'Internal error' for convert it to object
 * @param {Number} errorCode - Number of error code gets of try/catch
 * @param {String} errorMessage - Error message found on the 'listMessages' object
 */
function verify(errorCode, errorMessage) {
	if (errorCode === "Internal error") {
		const stringToObject = JSON.parse(errorMessage);
		const textMessage = stringToObject.error.message;

		return textMessage;

	} else {
		return errorMessage;
	}
}



export { listMessages, verify }