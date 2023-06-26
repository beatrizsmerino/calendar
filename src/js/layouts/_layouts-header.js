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

async function toggleNav() {
	const pageNav = document.querySelector("#headerNav");
	const pageNavButton = document.querySelector("#headerNavButton");

	pageNavButton.addEventListener("click", function () {
		pageNav.classList.add("is-animate");
		pageNav.classList.toggle("is-open");
	});

	window.addEventListener("resize", function () {
		const windowWidthMax = 786;
		if (window.innerWidth > windowWidthMax) {
			pageNav.classList.remove("is-animate");
		}
	});
}

document.addEventListener("DOMContentLoaded", async function () {
	await toggleNav();
});
