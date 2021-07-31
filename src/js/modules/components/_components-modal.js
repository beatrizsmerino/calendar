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
 * @description Create template of modal al insert on the html
 * @param {String} content 
 * @returns 
 */
function createTemplate(content) {
	const template = `
		<div class="modal">
			<div class="modal__box">
				<div class="modal__inner">
					<button class="modal__button-close button button--icon">
						<i class="icon">
							<svg class="icon__svg">
								<use class="icon__use" href="#icon-cross" />
							</svg>
						</i>
					</button>
					<div class="modal__content">
						${content}
					</div>
				</div>
			</div>
		</div>
	`;

	const templateNode = tools.stringToNode(template);
	document.querySelector('body').appendChild(templateNode);
}



/**
 * @function open
 * @description Show modal adding a class
 */
function open() {
	const modal = document.querySelector('.modal');

	setTimeout(function () {
		modal.classList.add('is-show');
	}, 100);
}



/**
 * @function close
 * @description Hide modal removing a class and his html
 */
function close() {
	const modal = document.querySelector('.modal');
	const buttonClose = document.querySelector('.modal__button-close');

	buttonClose.addEventListener('click', function () {
		modal.classList.remove('is-show');

		setTimeout(function () {
			modal.remove();
		}, 1000);
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
 * @description Create modal with the content and add events
 * @param {String} content - Content of modal
 */
function init(content) {
	createTemplate(content);
	addEvents();
}



export { init }