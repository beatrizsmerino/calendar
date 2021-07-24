/**
 * @file Main file
 * @file script.js
 * @description Main file
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2021)
 */





/**
 * @requires tools
 * @requires layoutHeader
 * @requires layoutFooter
 * @requires pagesCalendar1
 * @requires pagesCalendar2
 * @requires pagesCalendar3
 */
import * as sprite from './modules/components/_components-sprite.js';
import * as layoutHeader from './modules/layouts/_layouts-header.js';
import * as layoutFooter from './modules/layouts/_layouts-footer.js';
import * as pagesCalendar1 from './modules/pages/_pages-calendar-1.js';
import * as pagesCalendar2 from './modules/pages/_pages-calendar-2.js';
import * as pagesCalendar3 from './modules/pages/_pages-calendar-3.js';


document.addEventListener("DOMContentLoaded", function () {
	sprite.printSprites();
	layoutHeader.openCloseHeaderNav();
	layoutFooter.copyright();
	pagesCalendar1.calendarInit();
	pagesCalendar2.calendarInit();
	pagesCalendar3.calendarInit();
});