/**
 * @file componentSprites
 * @description Add sprite to html page
 * @author Beatriz Sopeña Merino <b.sopena@webpac.com>
 * @copyright (2020)
 */

/**
 * @function printSprites
 * @description Insert file sprites.svg with the icons to the end of the all html files
 */
function printSprites() {
	const url = './../images/icons/sprites.svg';
	const className = 'sprite';

	const getContentFile = async(urlFile) => {
		const getData = await fetch(urlFile);
		const data = await getData.text();

		return data;
	};

	getContentFile(url).then((data) => {
		const contentSprites = document.createElement('div');
		contentSprites.setAttribute('class', className);
		document.querySelector('body').appendChild(contentSprites);
		contentSprites.insertAdjacentHTML('beforeend', data);
	});
}

document.addEventListener("DOMContentLoaded", function () {
	printSprites();
});
