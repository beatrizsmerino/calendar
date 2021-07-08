"use strict";

document.addEventListener("DOMContentLoaded", function () {
	const pageCalendar2 = document
		.querySelector("html")
		.classList.contains("page-calendar-3");

	if (pageCalendar2) {
		const settings = {
			months: [
				"Enero",
				"Febrero",
				"Marzo",
				"Abril",
				"Mayo",
				"Junio",
				"Julio",
				"Agosto",
				"Septiembre",
				"Octubre",
				"Noviembre",
				"Diciembre",
			],
			weeks: [
				"Lunes",
				"Martes",
				"Miércoles",
				"Jueves",
				"Viernes",
				"Sábado",
				"Domingo",
			],
		};

		function getThisYear() {
			const date = new Date();
			return date.getFullYear();
		}

		function getThisMonth() {
			const date = new Date();

			// January is 0!
			return date.getMonth() + 1;
		}

		function getThisDay() {
			const date = new Date();
			return date.getDate();
		}

		function createYearMonthDay(year, month, day) {
			const yyyy = String(year);
			const mm = String(month).padStart(2, "0");
			const dd = String(day).padStart(2, "0");
			const yearMonthDay = `${yyyy}-${mm}-${dd}`;
			return yearMonthDay;
		}

		function getToday() {
			const today = createYearMonthDay(
				getThisYear(),
				getThisMonth(),
				getThisDay()
			);
			return today;
		}

		function getFirst4Letters(words) {
			const wordsFormatted = words.map((item) => item.slice(0, 4));
			return wordsFormatted;
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
			const weeksList = settings.weeks;
			const weeksListFormatted = getFirst4Letters(weeksList);
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

			if (getToday() === createYearMonthDay(year, month, day)) {
				calendarDay.className = "calendar__cell calendar__day calendar__today";
			} else {
				calendarDay.className = "calendar__cell calendar__day";
			}

			if (day != 0) {
				const yearMonthDay = createYearMonthDay(year, month, day);
				calendarDay.innerHTML = `
						<button class="calendar__day-button button button--icon" data-time="${yearMonthDay}">
							${day}
						</button>
					`;
			}

			return calendarDay.outerHTML;
		}

		function calendarSetHeight() {
			const calendar = document.querySelector(".calendar");
			const calendarCaption = document.querySelector(".calendar__caption");
			const calendarHeader = document.querySelector(".calendar__header");
			const calendarRow = document.querySelector(".calendar__body .calendar__row");
			// the table has margins between each row -> (2 * 7)
			const calendarHeight = calendarCaption.clientHeight + calendarHeader.clientHeight + (2 * 7) + calendarRow.clientHeight * 6;
			calendar.style.height = `${calendarHeight}px`;
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
						day == getThisDay() &&
						month == getThisMonth() &&
						year == getThisYear()
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

		function calendarSelectDay() {
			const calendarDayButton = document.querySelectorAll('.calendar__day-button');
			[...calendarDayButton].map(item => item.addEventListener('click', function () {
				let theDataTime = this.getAttribute('data-time');

				console.log(theDataTime);
			}));
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
					<div class="button__list button__list--center">
						<a class="calendar__button-prev button button--line-black" date-year="${prevYear}" date-month="${prevMonth}"'>
							<i class="icon">
								<svg class="icon__svg">
									<use class="icon__use" href="#icon-chevron-left" />
								</svg>
							</i>
						</a>
						<div class="calendar__title">
							<span class='calendar__month-name'>
								${settings.months[month - 1]}
							</span>
							<span class='calendar__year-name'>
								${year}
							</span>
						</div>
						<a class="calendar__button-next button button--line-black" date-year="${nextYear}" date-month="${nextMonth}"'>
							<i class="icon">
								<svg class="icon__svg">
									<use class="icon__use" href="#icon-chevron-right" />
								</svg>
							</i>
						</a>
					</div>
				`;

			document.querySelector(".calendar__caption").innerHTML = captionTemplate;

			let buttonPrev = document.querySelectorAll(".calendar__button-prev");
			let buttonNext = document.querySelectorAll(".calendar__button-next");

			[...buttonPrev, ...buttonNext].map((item) =>
				item.addEventListener("click", function () {
					let year = this.getAttribute("date-year");
					let month = this.getAttribute("date-month");
					calendarCreate(year, month);
				})
			);
		}

		function calendarCreate(year, month) {
			calendarEmpty();
			calendarCreateStructure();
			calendarButtonsPrevAndNext(year, month);
			calendarAllDaysCreate(year, month);
			calendarSetHeight();
			calendarSetWeekend();
			calendarSelectDay();
		}

		calendarCreate(getThisYear(), getThisMonth());
	}
});
