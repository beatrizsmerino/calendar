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
 * @functions modalCreateTemplate
 * @description Create template of modal al insert on the html
 * @param {String} content 
 * @returns 
 */
function modalCreateTemplate(content) {
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
 * @functions modalOpen
 * @description Show modal adding a class
 */
function modalOpen() {
	const modal = document.querySelector('.modal');

	setTimeout(function () {
		modal.classList.add('is-show');
	}, 100);
}



/**
 * @functions modalClose
 * @description Hide modal removing a class and his html
 */
function modalClose() {
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
 * @functions modalAddEvents
 * @description Add events for show and hide the modal 
 */
function modalAddEvents() {
	modalOpen();
	modalClose();
}



/**
 * @functions modalCreate
 * @description Create modal with the content and add events
 * @param {String} content - Content of modal
 */
function modalCreate(content) {
	modalCreateTemplate(content);
	modalAddEvents();
}



export { modalCreate }