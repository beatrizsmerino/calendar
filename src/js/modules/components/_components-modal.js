/**
 * @file _components-modal.js
 * @module modal
 * @description Component Modal
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2021)
 */





/**
 * @requires tools
 */
import * as tools from '../components/_components-tools.js';




/**
 * @function createTemplate
 * @description Create template of modal
 * @param {Object} data Data for build the template
 * @returns 
 */
function createTemplate(data) {
	const template = `
		<div class="modal">
			<div class="modal__box">
				<button class="modal__button-close button button--icon button--line-black">
					<i class="icon">
						<svg class="icon__svg">
							<use class="icon__use" href="#icon-cross" />
						</svg>
					</i>
				</button>
				<div class="modal__inner">
					<div class="modal__content">
						${data}
					</div>
				</div>
			</div>
		</div>
	`;

	return template;
}



/**
 * @function create
 * @description Insert the template of modal into the html
 * @param {Object} data Data for build the template
 */
function create(data) {
	const template = createTemplate(data);
	const nodeTemplate = tools.stringToNode(template);

	document.querySelector("body").appendChild(nodeTemplate);
}



/**
 * @function remove
 * @description Remove the modal
 */
function remove() {
	const modal = document.querySelector('.modal');

	if (modal) {
		modal.remove();
	}
}



/**
 * @function show
 * @description Show the modal
 * - Add the class 'is-show'
 * @param {Number} time Time to wait before show the message
 */
function show(time) {
	const modal = document.querySelector('.modal');

	setTimeout(function () {
		modal.classList.add('is-show');
	}, time);
}



/**
 * @function hide
 * @description Hide the modal
 * - Remove the class 'is-show'
 * - Remove the html
 * @param {Number} time Time to wait before remove the message
 */
function hide(time) {
	const modal = document.querySelector('.modal');

	modal.classList.remove('is-show');

	setTimeout(function () {
		remove();
	}, time);
}



/**
 * @function open
 * @description Show modal when click on the open button
 * - Show after a 0.1s
 */
function open() {
	show(100);
}



/**
 * @function close
 * @description Hide the modal when click on the close button
 * - Hide after a 1s
 */
function close() {
	const buttonClose = document.querySelector('.modal__button-close');

	buttonClose.addEventListener('click', function () {
		hide(1000);
	});
}



/**
 * @function addEvents
 * @description Add events for show and hide the modal 
 */
function addEvents() {
	open();
	close();
}



/**
 * @function init
 * @description Initialize modal component
 * @param {Object} data Data for build the template
 */
function init(data) {
	remove();
	create(data);
	addEvents();
}



export { init }