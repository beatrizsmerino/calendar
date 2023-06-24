/**
 * @file layoutsFooter
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2023)
 */



/**
 * @function copyright
 * @description Gets the current year and inserts it in the `copyright` located in the `footer`.
 * This ensures that the year is updated dynamically without the need to modify the code manually each year.
 */

function copyright() {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();

	document.querySelector("#currentYear").innerHTML = currentYear;
}


document.addEventListener("DOMContentLoaded", function () {
	copyright();
});
