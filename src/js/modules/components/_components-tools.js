/**
 * @file _components-tools.js
 * @module tools
 * @description Component Tools
 * Helper functions
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2021)
 */






/**
 * @function stringToNode
 * @description Convert string to DOM node
 * @param {String} string - String to convert
 * @returns {Element}
 */
function stringToNode(string) {
	const nodeDOM = document.createRange().createContextualFragment(string);

	return nodeDOM;
}



/**
 * @function getFirst4Letters
 * @description Get the first 4 letters of a list words
 * @param {Array} words - List of words
 * @returns 
 */
function getFirst4Letters(words) {
	const wordsFormatted = words.map((item) => item.slice(0, 4));

	return wordsFormatted;
}



export {
	stringToNode,
	getFirst4Letters
}
