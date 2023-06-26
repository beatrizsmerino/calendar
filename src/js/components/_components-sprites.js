/**
 * @file componentsSprites
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */



/**
 * @function getFileContent
 * @description Gets the content of a file as text, through an asynchronous request.
 */

async function getFileContent(fileUrl) {
	const fileData = await fetch(fileUrl);
	const fileContent = await fileData.text();

	return fileContent;
}


/**
 * @function insertSprites
 * @description Insert the svg icons of the `sprite` at the end of the `body` in all html files.
 * This sprite is located in the path `images/icons/sprites.svg` and is created with gulp.
 */

async function insertSprites() {
	const fileUrl = "images/icons/sprites.svg";
	const className = "sprite";
	const pageBody = document.querySelector("body");
	const pageSprites = document.createElement("DIV");

	try {
		const fileData = await getFileContent(fileUrl);
		pageSprites.setAttribute("class", className);
		pageBody.appendChild(pageSprites);
		pageSprites.insertAdjacentHTML("beforeend", fileData);
	} catch (error) {
		console.log("Error:", error);
	}
}

document.addEventListener("DOMContentLoaded", function () {
	insertSprites();
});
