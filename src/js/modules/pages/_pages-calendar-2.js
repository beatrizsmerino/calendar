"use strict";





/**
 * @requires tools
 * @requires date
 */
import * as tools from '../components/_components-tools.js';
import * as date from '../components/_components-date.js';



const pageCalendar2 = document.querySelector("html").classList.contains("page-calendar-2");
const pageContent = document.querySelector("#pageCalendar2Content");



function calendarCreateTemplate() {
	const template = `<div id="calendar" class="calendar no-select"></div>`;
	const templateNode = tools.stringToNode(template);
	pageContent.append(templateNode);
}

function calendarToolsCreateTemplate() {
	const template = `
			<div class="button__list button__list--center no-select">
				<button id="goLastYear" class="button button--bg-black">
					Last Year
				</button>
				<button id="goToday" class="button button--line-black">
					Today
				</button>
				<button id="goNextYear" class="button button--bg-black">
					Next Year
				</button>
			</div>
		`;
	const templateNode = tools.stringToNode(template);
	pageContent.append(templateNode);
}

function calendarInnerCreate() {
	const calendar = document.getElementById("calendar");
	const calendarInner = document.createElement("div");
	calendarInner.className = "calendar__inner";
	calendar.appendChild(calendarInner);
}

function calendarMonthCreate() {
	const calendarInner = document.querySelector(".calendar__inner");
	const calendarMonth = document.createElement("DIV");
	calendarMonth.className = "calendar__month";
	calendarInner.appendChild(calendarMonth);
}

function calendarTableCreate() {
	const calendarMonth = document.querySelectorAll(".calendar__month");
	const calendarTable = document.createElement("TABLE");
	calendarTable.className = "calendar__table";
	[...calendarMonth].map((item) => item.appendChild(calendarTable));
}

function calendarHeaderCreate() {
	const calendarTable = document.querySelectorAll(".calendar__table");
	const calendarHeader = document.createElement("THEAD");
	calendarHeader.className = "calendar__header";
	[...calendarTable].map((item) => item.appendChild(calendarHeader));
}

function calendarCaptionCreate() {
	const calendarTable = document.querySelectorAll(".calendar__table");
	const calendarCaption = document.createElement("CAPTION");
	calendarCaption.className = "calendar__caption";
	[...calendarTable].map((item) => item.appendChild(calendarCaption));
}

function calendarRowCreate(contain) {
	const calendarRow = document.createElement("TR");
	calendarRow.className = "calendar__row";
	[...contain].map((item) => item.appendChild(calendarRow));
}

function calendarWeekCreate() {
	const weeksList = date.settings.weeks.es;
	const weeksListFormatted = tools.getFirst4Letters(weeksList);
	for (let week = 0; week < 7; week++) {
		const calendarRow = document.querySelectorAll(".calendar__header .calendar__row");
		const calendarWeek = document.createElement("TH");
		calendarWeek.className = "calendar__cell calendar__week";
		calendarWeek.innerText = weeksListFormatted[week];
		[...calendarRow].map((item) => item.appendChild(calendarWeek));
	}
}

function calendarBodyCreate() {
	const calendarTable = document.querySelectorAll(".calendar__table");
	const calendarBody = document.createElement("TBODY");
	calendarBody.className = "calendar__body";
	[...calendarTable].map((item) => item.appendChild(calendarBody));
}

function calendarDayCreate(year, month, day) {
	const calendarDay = document.createElement("TD");

	if (date.getToday() === date.getDateAsYearMonthDay(year, month, day)) {
		calendarDay.className = "calendar__cell calendar__day calendar__today";
	} else {
		calendarDay.className = "calendar__cell calendar__day";
	}

	if (day != 0) {
		const yearMonthDay = date.getDateAsYearMonthDay(year, month, day);
		calendarDay.setAttribute("data-time", yearMonthDay);
		calendarDay.innerHTML = `<span>${day}</span>`;
	}

	return calendarDay.outerHTML;
}

function calendarSetWeekend() {
	const weekendSaturdays = document.querySelectorAll(
		".calendar__body .calendar__row .calendar__cell:nth-child(6)"
	);

	const weekendSundays = document.querySelectorAll(
		".calendar__body .calendar__row .calendar__cell:nth-child(7)"
	);

	[...weekendSaturdays, ...weekendSundays].map((item) => {
		if (item.childNodes.length) {
			item.classList.add("calendar__weekend");
		}
	});
}

function calendarEmpty() {
	const calendar = document.querySelector("#calendar");
	calendar.innerHTML = "";
}

function calendarCreateStructure() {
	calendarInnerCreate();
	calendarMonthCreate();
	calendarTableCreate();
	calendarCaptionCreate();
	calendarHeaderCreate();
	calendarRowCreate(document.querySelectorAll(".calendar__header"));
	calendarWeekCreate();
	calendarBodyCreate();
}

function calendarAllDaysCreate(year, month) {
	var now = new Date(year, month - 1, 1);
	var last = new Date(year, month, 0);
	var firstDayOfWeek = now.getDay() == 0 ? 7 : now.getDay();
	var lastDayOfMonth = last.getDate();
	var day = 0;
	var result = '<tr class="calendar__row">';
	var lastCell = firstDayOfWeek + lastDayOfMonth;

	// Created loop up to 42, which is the maximum number of values that can be present.
	// 6 columns of 7 days
	for (var i = 1; i <= 42; i++) {
		if (i == firstDayOfWeek) {
			// Determine on which day it starts
			day = 1;
		}

		if (i < firstDayOfWeek || i >= lastCell) {
			let emptyCell = calendarDayCreate("00", "00", "00");
			result += emptyCell;
		} else {
			// Show the day
			if (
				day == date.getThisDay() &&
				month == date.getThisMonth() &&
				year == date.getThisYear()
			) {
				let todayCell = calendarDayCreate(year, month, day);
				result += todayCell;
			} else {
				let dayCell = calendarDayCreate(year, month, day);
				result += dayCell;
			}
			day++;
		}
		if (i % 7 == 0) {
			if (day > lastDayOfMonth) break;
			result += '</tr><tr class="calendar__row">';
		}
	}
	result += "</tr>";

	document.querySelector(".calendar__body").innerHTML = result;
}

function calendarButtonsPrevAndNext(year, month) {
	year = parseInt(year);
	month = parseInt(month);

	// Calculate the next month and year
	let nextMonth = (month + 1 > 12) ? 1 : month + 1;
	let nextYear = (month + 1 > 12) ? year + 1 : year;

	// Calculate the previous month and year
	let prevMonth = (month - 1 < 1) ? 12 : month - 1;
	let prevYear = (month - 1 < 1) ? year - 1 : year;

	let captionTemplate = `
		<div>
			<div class="calendar__title">
				<span class='calendar__year-name'>
					${year}
				</span>
				<span class='calendar__month-name'>
					${date.settings.months.es[month - 1]}
				</span>
			</div>
			<div class="button__list button__list--center">
				<a class="calendar__button-prev button button--line-black" date-year="${prevYear}" date-month="${prevMonth}"'>
					<i class="icon">
						<svg class="icon__svg">
							<use class="icon__use" href="#icon-chevron-left" />
						</svg>
					</i>
				</a>
				<a class="calendar__button-next button button--line-black" date-year="${nextYear}" date-month="${nextMonth}"'>
					<i class="icon">
						<svg class="icon__svg">
							<use class="icon__use" href="#icon-chevron-right" />
						</svg>
					</i>
				</a>
			</div>
		</div>
		`;

	document.querySelector(".calendar__caption").innerHTML = captionTemplate;

	let buttonPrev = document.querySelectorAll(".calendar__button-prev");
	let buttonNext = document.querySelectorAll(".calendar__button-next");

	[...buttonPrev, ...buttonNext].map((item) =>
		item.addEventListener("click", function () {
			let year = this.getAttribute("date-year");
			let month = this.getAttribute("date-month");
			calendarSet(year, month);
		})
	);
}

function calendarSet(year, month) {
	calendarEmpty();
	calendarCreateStructure();
	calendarButtonsPrevAndNext(year, month);
	calendarAllDaysCreate(year, month);
	calendarSetWeekend();
}

function calendarEvents() {
	let buttonToday = document.getElementById("goToday");
	let buttonNextYear = document.getElementById("goNextYear");
	let buttonLastYear = document.getElementById("goLastYear");

	buttonToday.addEventListener("click", function () {
		calendarSet(date.getThisYear(), date.getThisMonth());
	});

	buttonNextYear.addEventListener("click", function () {
		calendarSet(date.getThisYear() + 1, date.getThisMonth());
	});

	buttonLastYear.addEventListener("click", function () {
		calendarSet(date.getThisYear() - 1, date.getThisMonth());
	});
}

function calendarInit() {
	if (pageCalendar2) {
		calendarCreateTemplate();
		calendarToolsCreateTemplate();

		calendarSet(date.getThisYear(), date.getThisMonth());
		calendarEvents();
	}
}

export { calendarInit }
