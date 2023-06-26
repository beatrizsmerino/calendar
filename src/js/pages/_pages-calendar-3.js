/**
 * @file pagesCalendar3
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2023)
 */



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

		function getCurrentYear() {
			const currentDate = new Date();
			const currentYear = currentDate.getFullYear();

			return currentYear;
		}

		function getCurrentMonth() {
			const currentDate = new Date();
			let currentMonth = currentDate.getMonth();
			currentMonth++; // January is 0!

			return currentMonth;
		}

		function getCurrentDay() {
			const currentDate = new Date();
			const currentDay = currentDate.getDate();

			return currentDay;
		}

		function getDateFormatted(year, month, day) {
			const yyyy = String(year);
			const mm = String(month).padStart(2, "0");
			const dd = String(day).padStart(2, "0");
			const dateFormatted = `${yyyy}-${mm}-${dd}`;

			return dateFormatted;
		}

		function getToday() {
			const currentYear = getCurrentYear();
			const currentMonth = getCurrentMonth();
			const currentDay = getCurrentDay();
			const today = getDateFormatted(currentYear, currentMonth, currentDay);

			return today;
		}

		function getFirstLetters(wordList, numLetters) {
			const wordListFormatted = wordList.map((item) => item.slice(0, numLetters));

			return wordListFormatted;
		}

		function calendarInnerCreate() {
			const calendar = document.querySelector("#calendar");
			const calendarInner = document.createElement("DIV");
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
			const calendarMonthList = document.querySelectorAll(".calendar__month");
			const calendarTable = document.createElement("TABLE");
			calendarTable.className = "calendar__table";
			[...calendarMonthList].map((item) => item.appendChild(calendarTable));
		}

		function calendarHeaderCreate() {
			const calendarTableList = document.querySelectorAll(".calendar__table");
			const calendarHeader = document.createElement("THEAD");
			calendarHeader.className = "calendar__header";
			[...calendarTableList].map((item) => item.appendChild(calendarHeader));
		}

		function calendarCaptionCreate() {
			const calendarTableList = document.querySelectorAll(".calendar__table");
			const calendarCaption = document.createElement("CAPTION");
			calendarCaption.className = "calendar__caption";
			[...calendarTableList].map((item) => item.appendChild(calendarCaption));
		}

		function calendarRowCreate(containList) {
			const calendarRow = document.createElement("TR");
			calendarRow.className = "calendar__row";
			[...containList].map((item) => item.appendChild(calendarRow));
		}

		function calendarWeekCreate() {
			const weekList = settings.weeks;
			const weekListFormatted = getFirstLetters(weekList, 3);

			for (let week = 0; week < 7; week++) {
				const calendarRowList = document.querySelectorAll(".calendar__header .calendar__row");
				const calendarWeek = document.createElement("TH");
				calendarWeek.className = "calendar__cell calendar__week";
				calendarWeek.innerText = weekListFormatted[week];
				[...calendarRowList].map((item) => item.appendChild(calendarWeek));
			}
		}

		function calendarBodyCreate() {
			const calendarTableList = document.querySelectorAll(".calendar__table");
			const calendarBody = document.createElement("TBODY");
			calendarBody.className = "calendar__body";
			[...calendarTableList].map((item) => item.appendChild(calendarBody));
		}

		function calendarDayCreate(year, month, day) {
			const calendarDay = document.createElement("TD");
			const today = getToday();
			const dateFormatted = getDateFormatted(year, month, day);

			if (today === dateFormatted) {
				calendarDay.className = "calendar__cell calendar__day calendar__today";
			} else {
				calendarDay.className = "calendar__cell calendar__day";
			}

			if (day != 0) {
				calendarDay.innerHTML = `
						<button class="calendar__button-day button button--icon" data-time="${dateFormatted}">
							${day}
						</button>
					`;
			}

			const calendarDayContent = calendarDay.outerHTML

			return calendarDayContent;
		}

		function calendarDayListCreate(year, month) {
			const now = new Date(year, month - 1, 1);
			const last = new Date(year, month, 0);
			const firstDayOfWeek = now.getDay() == 0 ? 7 : now.getDay();
			const lastDayOfMonth = last.getDate();
			let day = 0;
			let result = `<tr class="calendar__row">`;
			const cellLast = firstDayOfWeek + lastDayOfMonth;
			const cellTotal = 42;

			// Created loop up to 42, which is the maximum number of values that can be present.
			// 6 columns of 7 days
			for (let cellIndex = 1; cellIndex <= cellTotal; cellIndex++) {
				if (cellIndex == firstDayOfWeek) {
					// Determine on which day it starts
					day = 1;
				}

				if (cellIndex < firstDayOfWeek || cellIndex >= cellLast) {
					const cellEmpty = calendarDayCreate("00", "00", "00");
					result += cellEmpty;
				} else {
					// Show the day
					if (day == getCurrentDay() && month == getCurrentMonth() && year == getCurrentYear()) {
						const cellToday = calendarDayCreate(year, month, day);
						result += cellToday;
					} else {
						const cellDay = calendarDayCreate(year, month, day);
						result += cellDay;
					}
					day++;
				}
				if (cellIndex % 7 == 0) {
					if (day > lastDayOfMonth) break;
					result += `</tr><tr class="calendar__row">`;
				}
			}
			result += "</tr>";

			const calendarBody = document.querySelector(".calendar__body");
			calendarBody.innerHTML = result;
		}

		function calendarSetWeekend() {
			const calendarSaturdayList = document.querySelectorAll(".calendar__body .calendar__row .calendar__cell:nth-child(6)");
			const calendarSundayList = document.querySelectorAll(".calendar__body .calendar__row .calendar__cell:nth-child(7)");
			const calendarWeekendList = [...calendarSaturdayList, ...calendarSundayList];

			calendarWeekendList.map((item) => {
				if (item.childNodes.length) {
					item.classList.add("calendar__weekend");
				}
			});
		}

		function calendarSetHeight() {
			const calendar = document.querySelector("#calendar");
			const calendarCaption = document.querySelector(".calendar__caption");
			const calendarHeader = document.querySelector(".calendar__header");
			const calendarRow = document.querySelector(".calendar__body .calendar__row");
			// the table has margins between each row -> (2 * 7)
			const calendarHeight = calendarCaption.clientHeight + calendarHeader.clientHeight + (2 * 7) + calendarRow.clientHeight * 6;
			calendar.style.height = `${calendarHeight}px`;
		}

		function calendarRemoveStructure() {
			const calendar = document.querySelector("#calendar");
			calendar.innerHTML = "";
		}

		function calendarCreateStructure() {
			const calendarHeaderList = document.querySelectorAll(".calendar__header");
			calendarInnerCreate();
			calendarMonthCreate();
			calendarTableCreate();
			calendarCaptionCreate();
			calendarHeaderCreate();
			calendarRowCreate(calendarHeaderList);
			calendarWeekCreate();
			calendarBodyCreate();
		}

		function calendarSelectDay() {
			const calendarButtonDayList = document.querySelectorAll(".calendar__button-day");
			[...calendarButtonDayList].map(item => item.addEventListener("click", function () {
				const theDataTime = {
					dateTime: this.getAttribute("data-time")
				};

				calendarModalCreate(theDataTime);
			}));
		}

		function calendarButtonsPrevAndNext(year, month) {
			year = parseInt(year);
			month = parseInt(month);

			// Calculate the next month and year
			const nextMonth = (month + 1 > 12) ? 1 : month + 1;
			const nextYear = (month + 1 > 12) ? year + 1 : year;

			// Calculate the previous month and year
			const prevMonth = (month - 1 < 1) ? 12 : month - 1;
			const prevYear = (month - 1 < 1) ? year - 1 : year;

			const captionTemplate = `
					<nav class="calendar__navigation">
						<ul class="list">
							<li class="list__item">
								<a class="calendar__button-prev button button--line-black" date-year="${prevYear}" date-month="${prevMonth}">
									<i class="icon">
										<svg class="icon__svg">
											<use class="icon__use" href="#icon-chevron-left" />
										</svg>
									</i>
								</a>
							</li>
							<li class="list__item">
								<div class="calendar__title">
									<span class="calendar__month-name">
										${settings.months[month - 1]}
									</span>
									<span class="calendar__year-name">
										${year}
									</span>
								</div>
							</li>
							<li class="list__item">
								<a class="calendar__button-next button button--line-black" date-year="${nextYear}" date-month="${nextMonth}">
									<i class="icon">
										<svg class="icon__svg">
											<use class="icon__use" href="#icon-chevron-right" />
										</svg>
									</i>
								</a>
							</li>
						</ul>
					</nav>
				`;

			const calendarCaption = document.querySelector(".calendar__caption");
			calendarCaption.innerHTML = captionTemplate;

			const calendarButtonPrevList = document.querySelectorAll(".calendar__button-prev");
			const calendarButtonNextList = document.querySelectorAll(".calendar__button-next");

			[...calendarButtonPrevList, ...calendarButtonNextList].map((item) =>
				item.addEventListener("click", function () {
					const year = this.getAttribute("date-year");
					const month = this.getAttribute("date-month");
					calendarCreate(year, month);
				})
			);
		}

		function calendarCreate(year, month) {
			calendarRemoveStructure();
			calendarCreateStructure();
			calendarButtonsPrevAndNext(year, month);
			calendarDayListCreate(year, month);
			calendarSetHeight();
			calendarSetWeekend();
			calendarSelectDay();
		}

		function calendarModalCreate(data) {
			const calendarTemplate = `
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
								${data.dateTime}
							</div>
						</div>
					</div>
				</div>
				`;

			const modalTemplate = document.createRange().createContextualFragment(calendarTemplate);
			const pageBody = document.querySelector("body");
			pageBody.appendChild(modalTemplate);

			const modal = document.querySelector(".modal");
			const modalButtonClose = document.querySelector(".modal__button-close");

			setTimeout(function () {
				modal.classList.add("is-show");
			}, 100);

			modalButtonClose.addEventListener("click", function () {
				modal.classList.remove("is-show");

				setTimeout(function () {
					modal.remove();
				}, 1000);
			});
		}

		calendarCreate(getCurrentYear(), getCurrentMonth());
	}
});
