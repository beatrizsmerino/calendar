/**
 * @file _components-message.js
 * @module message
 * @description Component Message
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2021)
 */





/**
 * @requires tools
 */
import * as tools from './_components-tools.js';



/**
 * @function createTemplate
 * @description Create template of the 'message' component
 * @param {Object} data - Data for build the template
 * @returns
 */
function createTemplate(data) {
	const template = `
		<div id="message" class="message ${data.className}">
			<div id="messageButtonClose" class="message__inner">
				<button class="message__close button button--icon">
					<i class="icon">
						<svg class="icon__svg">
							<use class="icon__use" href="#icon-cross" />
						</svg>
					</i>
				</button>
				<h6 class="message__title">
					${data.title}
				</h6>
				<p class="message__description">
					${data.description}
				</p>
			</div>
		</div>
		`;

	return template;
}



/**
 * @function create
 * @description Insert the template of the 'message' component into the html
 * @param {Object} data - Data for build the template
 */
function create(data) {
	const template = createTemplate(data);
	const nodeTemplate = tools.stringToNode(template);

	document.querySelector("body").appendChild(nodeTemplate);
}



/**
 * @function remove
 * @description Remove the html of the 'message' component
 */
function remove() {
	const message = document.getElementById("message");

	if (message) {
		message.remove();
	}
}



/**
 * @function show
 * @description Show the 'message' component
 * - Add the class 'is-show'
 * - Remove the html
 * @param {Number} time - Time to wait before show the message
 */
function show(time) {
	const message = document.getElementById("message");

	setTimeout(function () {
		message.classList.add("is-show");
	}, time);
}



/**
 * @function hide
 * @description Hide the 'message' component
 * - Remove the class 'is-show'
 * - Remove the html
 * @param {Number} time - Time to wait before remove the message
 */
function hide(time) {
	const message = document.getElementById("message");

	message.classList.remove("is-show");

	setTimeout(function () {
		remove();
	}, time);
}



/**
 * @function open
 * @description Show and hide the 'message' component when click on the open button
 * - Show after a 0.1s
 * - Hide after a 10.5s
 */
function open() {
	show(100);
	hide(10500);
}



/**
 * @function close
 * @description Hide the 'message' component when click on the close button
 * - Hide after a 0.1s
 */
function close() {
	const buttonClose = document.getElementById("messageButtonClose");

	buttonClose.addEventListener("click", function () {
		hide(100);
	});
}



/**
 * @function addEvents
 * @description Add events for show and hide the 'message' component
 */
function addEvents() {
	open();
	close();
}



/**
 * @function init
 * @description Initialize 'message' component
 * @param {Object} data - Data for build the template of 'message'
 */
function init(data) {
	remove();
	create(data);
	addEvents();
}



export { init }