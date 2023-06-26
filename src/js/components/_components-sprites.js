/**
 * @file componentsSprites
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */



/**
 * @function getContentFile
 * @description Gets the content of a file as text, through an asynchronous request.
 */

async function getContentFile(urlFile) {
	const data = await fetch(urlFile);
	const content = await data.text();

	return content;
}


/**
 * @function insertSprites
 * @description Insert the svg icons of the `sprite` at the end of the `body` in all html files.
 * This sprite is located in the path `images/icons/sprites.svg` and is created with gulp.
 */

async function insertSprites() {
	const urlFile = 'images/icons/sprites.svg';
	const className = 'sprite';
	const contentBody = document.querySelector('body');
	const contentSprites = document.createElement('DIV');

	try {
		const data = await getContentFile(urlFile);
		contentSprites.setAttribute('class', className);
		contentBody.appendChild(contentSprites);
		contentSprites.insertAdjacentHTML('beforeend', data);
	} catch (error) {
		console.log('Error:', error);
	}
}

document.addEventListener("DOMContentLoaded", function () {
	insertSprites();
});
