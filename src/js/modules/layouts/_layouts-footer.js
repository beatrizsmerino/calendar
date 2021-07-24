/**
 * @file _layouts-footer.js
 * @module layoutFooter
 * @description Layout Footer
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2021)
 */





/**
 * @requires date
 */
import * as date from '../components/_components-date.js';



/**
 * @function copyright
 * @description Add current year the copyright on the footer page
 */
function copyright() {
	document.querySelector("#currentYear").innerHTML = date.getThisYear();
}



export { copyright }