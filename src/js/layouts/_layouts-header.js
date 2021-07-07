/**
 * @file layoutsHeader
 * @description Close/Open the menu of the header
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */

/**
 * @function openCloseHeaderNav
 * @description Open/Close nav inside Header
 */

function openCloseHeaderNav() {
	const nav = document.querySelector('#headerNav');
	const navButton = document.querySelector('#headerNavButton');

	navButton.addEventListener('click', function () {
		nav.classList.add("is-animate");
		nav.classList.toggle("is-open");
	});

	window.addEventListener('resize', function () {
		const maxWidth = 786;
		if (window.innerWidth > maxWidth) {
			nav.classList.remove("is-animate");
		}
	});
}

document.addEventListener("DOMContentLoaded", function () {
	openCloseHeaderNav();
});