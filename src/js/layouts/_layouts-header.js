/**
 * @file layoutsHeader
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */



/**
 * @function toggleNav
 * @description Controls the opening and closing of the navigation located in the `header`.
 * Clicking the navigation button shows or hides the menu, and prevents the animation from being applied when the window is resized beyond a certain limit.
 */

function toggleNav() {
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
	toggleNav();
});
