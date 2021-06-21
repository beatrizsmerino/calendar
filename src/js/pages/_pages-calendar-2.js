"use strict";

document.addEventListener("DOMContentLoaded", function () {
	if (document.querySelector("html").classList.contains("page-calendar-2")) {
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
			return date.getMonth();
		}

		function getThisDay() {
			const date = new Date();
			return date.getDate();
		}

		function get4Letters(words) {
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

		function calendarTitleCreate() {
			const monthsList = settings.months;
			for (let month = 0; month <= 11; month++) {
				const calendarCaption = document.querySelectorAll(".calendar__caption");
				const calendarTitle = document.createElement("DIV");
				calendarTitle.className = "calendar__title";
				calendarTitle.innerText = monthsList[month];
				[...calendarCaption].map((item) =>
					item.appendChild(calendarTitle)
				);
			}
		}

		function calendarRowCreate(contain) {
			const calendarRow = document.createElement("TR");
			calendarRow.className = "calendar__row";
			[...contain].map((item) => item.appendChild(calendarRow));
		}

		function calendarWeekCreate() {
			const weeksList = settings.weeks;
			const weeksListFormatted = get4Letters(weeksList);
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

		function calendarDayCreate(day) {
			const calendarDay = document.createElement("TD");
			calendarDay.className = "calendar__cell calendar__day";
			calendarDay.innerHTML = day;
			return calendarDay.outerHTML;
		}

		function calendarTodayCreate(day) {
			const calendarDay = document.createElement("TD");
			calendarDay.className = "calendar__cell calendar__day calendar__today";
			calendarDay.innerHTML = day;
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

		function calendarCreateStructure() {
			calendarInnerCreate();
			calendarMonthCreate();
			calendarTableCreate();
			calendarCaptionCreate();
			calendarTitleCreate();
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

			// hacemos un bucle hasta 42, que es el máximo de valores que puede
			// haber... 6 columnas de 7 dias
			for (var i = 1; i <= 42; i++) {
				if (i == firstDayOfWeek) {
					// determinamos en que dia empieza
					day = 1;
				}

				if (i < firstDayOfWeek || i >= lastCell) {
					let emptyCell = calendarDayCreate('');
					result += emptyCell;
				} else {
					// mostramos el dia
					if (
						day == getThisDay() &&
						month == getThisMonth() + 1 &&
						year == getThisYear()
					) {
						let todayCell = calendarTodayCreate(`<span>${day}</span>`);
						result += todayCell;
					} else {
						let dayCell = calendarDayCreate(`<span>${day}</span>`);
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

			// Calculamos el siguiente mes y año
			let nextMonth = month + 1;
			let nextYear = year;
			if (month + 1 > 12) {
				nextMonth = 1;
				nextYear = year + 1;
			}

			// Calculamos el anterior mes y año
			let prevMonth = month - 1;
			let prevYear = year;
			if (month - 1 < 1) {
				prevMonth = 12;
				prevYear = year - 1;
			}

			let captionTemplate = `
					<div>
						<div class="calendar__title">
							<span class='calendar__year-name'>
								${year}
							</span>
							<span class='calendar__month-name'>
								${settings.months[month - 1]}
							</span>
						</div>
						<div class="button__list button__list--center">
							<a class="button__prev button button--line-black" date-year="${prevYear}" date-month="${prevMonth}"'>
								&lt;
							</a>
							<a class="button__next button button--line-black" date-year="${nextYear}" date-month="${nextMonth}"'>
								&gt;
							</a>
						</div>
					</div>
				`;

			document.querySelector(".calendar__caption").innerHTML = captionTemplate;

			let buttonPrev = document.querySelectorAll('.button__prev');
			let buttonNext = document.querySelectorAll('.button__next');

			[...buttonPrev, ...buttonNext].map((item) =>
				item.addEventListener("click", function () {
					let year = this.getAttribute("date-year");
					let month = this.getAttribute("date-month");
					calendarCreate(year, month);
				})
			);
		}

		function calendarCreate(year, month) {
			calendarButtonsPrevAndNext(year, month);
			calendarAllDaysCreate(year, month);
			calendarSetWeekend();
		}

		function calendarEvents() {
			let buttonToday = document.getElementById("goToday");
			let buttonNextYear = document.getElementById("goNextYear");
			let buttonLastYear = document.getElementById("goLastYear");

			buttonToday.addEventListener("click", function () {
				calendarCreate(getThisYear(), getThisMonth() + 1);
			});

			buttonNextYear.addEventListener("click", function () {
				calendarCreate(getThisYear() + 1, getThisMonth() + 1);
			});

			buttonLastYear.addEventListener("click", function () {
				calendarCreate(getThisYear() - 1, getThisMonth() + 1);
			});
		}

		calendarCreateStructure();
		calendarCreate(getThisYear(), getThisMonth() + 1);
		calendarEvents();
	}
});
