/**
 * @file componentsSprites
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */



/**
 * @function insertSprites
 * @description Insert the svg icons of the `sprite` at the end of the `body` in all html files.
 * This sprite is located in the path `images/icons/sprites.svg` and is created with gulp.
 */

function insertSprites() {
	const url = 'images/icons/sprites.svg';
	const className = 'sprite';

	const getContentFile = async (urlFile) => {
		const getData = await fetch(urlFile);
		const data = await getData.text();

		return data;
	};

	getContentFile(url).then((data) => {
		const contentBody = document.querySelector('body');
		const contentSprites = document.createElement('div');

		contentSprites.setAttribute('class', className);
		contentBody.appendChild(contentSprites);
		contentSprites.insertAdjacentHTML('beforeend', data);
	});
}

document.addEventListener("DOMContentLoaded", function () {
	insertSprites();
});
