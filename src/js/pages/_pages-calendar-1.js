"use strict";

document.addEventListener("DOMContentLoaded", function () {
	const pageCalendar1 = document
		.querySelector("html")
		.classList.contains("page-calendar-1");

	if (pageCalendar1) {
		const settings = {
			languages: [
				{
					value: "en",
					text: "English",
					selected: true
				},
				{
					value: "fr",
					text: "French",
					selected: false
				},
				{
					value: "es",
					text: "Spanish",
					selected: false
				},
			],
			months: {
				en: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
					"August",
					"September",
					"October",
					"November",
					"December",
				],
				fr: [
					"Janvier",
					"Février",
					"Mars",
					"Avril",
					"Mai",
					"Juin",
					"Juillet",
					"Août",
					"Septembre",
					"Octobre",
					"Novembre",
					"Décembre",
				],
				es: [
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
			},
			weeks: {
				en: [
					{
						value: 1,
						text: "Monday"
					},
					{
						value: 2,
						text: "Tuesday"
					},
					{
						value: 3,
						text: "Wednesday"
					},
					{
						value: 4,
						text: "Thursday"
					},
					{
						value: 5,
						text: "Friday"
					},
					{
						value: 6,
						text: "Saturday"
					},
					{
						value: 7,
						text: "Sunday"
					}
				],
				fr: [
					{
						value: 1,
						text: "Lundi"
					},
					{
						value: 2,
						text: "Mardi"
					},
					{
						value: 3,
						text: "Mercredi"
					},
					{
						value: 4,
						text: "Jeudi"
					},
					{
						value: 5,
						text: "Vendredi"
					},
					{
						value: 6,
						text: "Samedi"
					},
					{
						value: 7,
						text: "Dimanche"
					}
				],
				es: [
					{
						value: 1,
						text: "Lunes"
					},
					{
						value: 2,
						text: "Martes"
					},
					{
						value: 3,
						text: "Miércoles"
					},
					{
						value: 4,
						text: "Jueves"
					},
					{
						value: 5,
						text: "Viernes"
					},
					{
						value: 6,
						text: "Sábado"
					},
					{
						value: 7,
						text: "Domingo"
					}
				],
			},
			firstDayOfWeek: {
				en: [
					{
						value: 1,
						text: "Monday",
						selected: false
					},
					{
						value: 7,
						text: "Sunday",
						selected: true
					}
				],
				fr: [
					{
						value: 1,
						text: "Lundi",
						selected: false
					},
					{
						value: 7,
						text: "Dimanche",
						selected: true
					}
				],
				es: [
					{
						value: 1,
						text: "Lunes",
						selected: false
					},
					{
						value: 7,
						text: "Domingo",
						selected: true
					}
				]
			},
		};

		function createYearMonthDay(year, month, day) {
			const yyyy = String(year);
			const mm = String(month + 1).padStart(2, "0"); // January is 0!
			const dd = String(day).padStart(2, "0");
			const yearMonthDay = `${yyyy}-${mm}-${dd}`;
			return yearMonthDay;
		}

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

		function getDayOfYear(year, day) {
			const dateDay = new Date(year, 0);
			return new Date(dateDay.setDate(day));
		}

		function getToday() {
			const today = createYearMonthDay(
				getThisYear(),
				getThisMonth(),
				getThisDay()
			);
			return today;
		}

		function getFirst4Letters(word) {
			const wordFormatted = word.slice(0, 4);

			return wordFormatted;
		}

		function calendarOrderWeeksByFirstDayOfWeekSelected() {
			const languageSelected = calendarGetLanguageSelected();
			const weeksLanguageSelected = settings.weeks[languageSelected.value];
			const firstDayOfWeekSelected = calendarGetFirstDayOfWeekSelected();
			const firstDayOfWeekSelectedValue = firstDayOfWeekSelected.value;

			weeksLanguageSelected.sort((a, b) => a.value - b.value);

			let weeksOrdered = [];
			let week1 = weeksLanguageSelected.filter(week => week.value === firstDayOfWeekSelectedValue)[0];
			let weekStart = weeksLanguageSelected.filter(week => week.value > firstDayOfWeekSelectedValue);
			let weekEnd = weeksLanguageSelected.filter(week => week.value < firstDayOfWeekSelectedValue);

			weeksOrdered.push(week1);
			weekStart.map(week => weeksOrdered.push(week));
			weekEnd.map(week => weeksOrdered.push(week));

			return weeksOrdered;
		}

		function calendarGetWeeks() {
			let weeks = calendarOrderWeeksByFirstDayOfWeekSelected();

			for (const key in weeks) {
				const day = weeks[key];
				day.text = getFirst4Letters(day.text);
			}

			return weeks;
		}

		function calendarCreateStructure(monthsList, weeksList) {
			function calendarYearCreate() {
				const calendarYear = document.createElement("div");
				calendarYear.className = "calendar__year";
				calendarYear.innerText = getThisYear();
				document.getElementById("calendar").appendChild(calendarYear);
			}

			function calendarInnerCreate() {
				const calendarInner = document.createElement("div");
				calendarInner.className = "calendar__inner";
				document.getElementById("calendar").appendChild(calendarInner);
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
				[...calendarMonth].map((item) =>
					item.appendChild(calendarTable)
				);
			}

			function calendarCaptionCreate() {
				const calendarTable = document.querySelectorAll(".calendar__table");
				const calendarCaption = document.createElement("CAPTION");
				calendarCaption.className = "calendar__caption";
				[...calendarTable].map((item) =>
					item.appendChild(calendarCaption)
				);
			}

			function calendarTitleCreate(monthsList, month) {
				const calendarCaption = document.querySelectorAll(".calendar__caption");
				const calendarTitle = document.createElement("DIV");
				calendarTitle.className = "calendar__title";
				calendarTitle.innerText = monthsList[month];
				[...calendarCaption].map((item) =>
					item.appendChild(calendarTitle)
				);
			}

			function calendarHeaderCreate() {
				const calendarTable = document.querySelectorAll(".calendar__table");
				const calendarHeader = document.createElement("THEAD");
				calendarHeader.className = "calendar__header";
				[...calendarTable].map((item) =>
					item.appendChild(calendarHeader)
				);
			}

			function calendarRowCreate(contain) {
				const calendarRow = document.createElement("TR");
				calendarRow.className = "calendar__row";
				[...contain].map((item) => item.appendChild(calendarRow));
			}

			function calendarWeekCreate(weeksList, week) {
				const calendarRow = document.querySelectorAll(
					".calendar__header .calendar__row"
				);

				const calendarWeek = document.createElement("TH");
				calendarWeek.className = "calendar__cell calendar__week";
				calendarWeek.innerText = weeksList[week].text;
				[...calendarRow].map((item) => item.appendChild(calendarWeek));
			}

			function calendarBodyCreate() {
				const calendarTable = document.querySelectorAll(".calendar__table");
				const calendarBody = document.createElement("TBODY");
				calendarBody.className = "calendar__body";
				[...calendarTable].map((item) =>
					item.appendChild(calendarBody)
				);
			}

			function calendarDayCreate() {
				const calendarRow = document.querySelectorAll(".calendar__row");
				const calendarDay = document.createElement("TD");
				calendarDay.className = "calendar__cell calendar__day";
				calendarDay.innerText = "";
				[...calendarRow].map((item) => item.appendChild(calendarDay));
			}

			function calendarAllMonthsCreate() {
				for (let m = 0; m <= 11; m++) {
					calendarMonthCreate();
					calendarTableCreate();
					calendarCaptionCreate();
					calendarTitleCreate(monthsList, m);
					calendarHeaderCreate();

					const calendarHeader = document.querySelectorAll(".calendar__header");
					calendarRowCreate(calendarHeader);

					for (let w = 0; w < 7; w++) {
						calendarWeekCreate(weeksList, w);
					}

					calendarBodyCreate();

					for (let f = 0; f < 6; f++) {
						const calendarBody = document.querySelectorAll(".calendar__body");
						calendarRowCreate(calendarBody);

						for (let d = 0; d < 7; d++) {
							calendarDayCreate();
						}
					}
				}
			}

			calendarYearCreate();
			calendarInnerCreate();
			calendarAllMonthsCreate();
		}

		function calendarSetDays() {
			const thisYear = getThisYear();
			let week = 0;

			for (let i = 1; i < 366; i++) {
				const dayOfYear = getDayOfYear(thisYear, i);
				const dateDay = dayOfYear.getDate();
				const dateMonth = dayOfYear.getMonth();
				const dateWeek = dayOfYear.getDay();
				const isWeekend = (dateWeek === 6) || (dateWeek === 0); // 6 = Saturday, 0 = Sunday

				if (dateDay == 1) {
					week = 0;
				}

				// Insert days in the calendar
				const tableDays = document.querySelectorAll(".calendar__table")[dateMonth].children[2].children[week].children[dateWeek];
				tableDays.innerHTML = `<span>${dateDay}</span>`;

				const yearMonthDay = createYearMonthDay(thisYear, dateMonth, dateDay);
				tableDays.setAttribute("data-time", yearMonthDay);

				if (tableDays.getAttribute("data-time") == getToday()) {
					tableDays.className += " calendar__today";
				}

				if(isWeekend) {
					tableDays.className += " calendar__weekend";
				}

				if (dateWeek == 6) {
					week = week + 1;
				}
			}
		}

		function calendarSetWidth() {
			const calendar = document.querySelector("#calendar");
			const calendarMonth = document.querySelector(".calendar__month");
			const calendarMonthWidth = calendarMonth.clientWidth;
			const buttonShowToday = document.querySelector("#buttonShowToday");

			if (calendar.classList.contains("is-show-months")) {
				calendar.style.width = `auto`;
			} else {
				calendar.style.width = `${calendarMonthWidth}px`;
				buttonShowToday.click();
			}
		}

		function calendarMoveScrollToday() {
			const calendarInner = document.querySelector(".calendar__inner");
			const calendarMonth = document.querySelectorAll(".calendar__month");
			const currentMonth = getThisMonth();

			let positionScroll = 0;
			for (let index = 0; index < currentMonth; index++) {
				const style =
					calendarMonth[index].currentStyle ||
					window.getComputedStyle(calendarMonth[index]);
				positionScroll +=
					parseFloat(calendarMonth[index].offsetWidth) +
					parseFloat(style.marginRight);
			}

			calendarInner.scrollLeft = positionScroll;
		}

		function calendarShowAllMonths() {
			const calendar = document.querySelector("#calendar");
			const buttonShowMonths = document.querySelector("#buttonShowMonths");

			buttonShowMonths.classList.toggle("is-change-text");
			calendar.classList.toggle("is-show-months");

			calendarSetWidth();
		}

		function calendarEmpty() {
			const calendar = document.querySelector("#calendar");
			calendar.innerHTML = "";
		}

		function calendarGetFirstDayOfWeekSelected() {
			const languageSelected = calendarGetLanguageSelected();
			const current = settings.firstDayOfWeek[languageSelected.value].filter((item) => item.selected)[0];
			return current;
		}

		function calendarFirstDayOfWeekCreateStructure() {
			const select = document.querySelector("#selectFirstDayOfWeek");
			const options = select.querySelectorAll("option");
			const languageSelected = calendarGetLanguageSelected();

			Array.from(options).map((item, index) => {
				if(index !== 0) {
					item.remove();
				}
			});
			
			settings.firstDayOfWeek[languageSelected.value].map((item) => {
				const option = document.createElement("option");
				option.value = item.value;
				option.innerText = item.text;
				select.appendChild(option);
			});
		}

		function calendarFirstDayOfWeekUpdateStructure() {
			const select = document.querySelector("#selectFirstDayOfWeek");
			const firstOption = select.querySelectorAll("option")[0];
			const firstDayOfWeekSelected = calendarGetFirstDayOfWeekSelected();

			firstOption.value = firstDayOfWeekSelected.value;
			firstOption.innerText = `First day of week: ${firstDayOfWeekSelected.text}`;
			select.value = firstDayOfWeekSelected.value;
		}

		function calendarFirstDayOfWeekChange(firstDayOfWeekChanged) {
			const languageSelected = calendarGetLanguageSelected();
			const current = settings.firstDayOfWeek[languageSelected.value].filter((item) => item.value === parseInt(firstDayOfWeekChanged.value))[0];
			settings.firstDayOfWeek[languageSelected.value].map((item) => item.selected === true ? item.selected = false : item.selected = false);
			// Reset first day of week of all languages
			// for (const key in settings.firstDayOfWeek) {
			// 	const language = settings.firstDayOfWeek[key];
			// 	language.map((item) => item.selected === true ? item.selected = false : item.selected = false)
			// }
			current.selected = true;
			calendarFirstDayOfWeekUpdateStructure();
			calendarCreate();
		}

		function calendarGetLanguageSelected() {
			const current = settings.languages.filter((item) => item.selected)[0];
			return current;
		}

		function calendarLanguageCreateStructure() {
			const select = document.querySelector("#selectLanguage");

			if (select.querySelectorAll("option").length === 1) {
				settings.languages.map((item) => {
					const option = document.createElement("option");
					option.value = item.value;
					option.innerText = item.text;
					select.appendChild(option);
				});
			}
		}

		function calendarLanguageUpdateStructure() {
			const select = document.querySelector("#selectLanguage");
			const firstOption = select.querySelectorAll("option")[0];
			const languageSelected = calendarGetLanguageSelected();

			firstOption.value = languageSelected.value;
			firstOption.innerText = `Language: ${languageSelected.text}`;
			select.value = languageSelected.value;
		}

		function calendarLanguageChange(languageChanged) {
			const current = settings.languages.filter((item) => item.value === languageChanged.value)[0];
			settings.languages.map((item) => item.selected === true ? item.selected = false : item.selected = false);
			current.selected = true;
			calendarLanguageUpdateStructure();
			calendarCreate();
		}

		function calendarCreate() {
			const languageSelected = calendarGetLanguageSelected();
			calendarEmpty();
			calendarCreateStructure(
				settings.months[languageSelected.value],
				calendarGetWeeks()
			);
			calendarSetDays();
			calendarSetWidth();
			calendarMoveScrollToday();
			calendarFirstDayOfWeekCreateStructure();
			calendarLanguageCreateStructure();
		}

		function calendarEvents() {
			document
				.querySelector("#buttonShowToday")
				.addEventListener("click", function () {
					calendarMoveScrollToday();
				});

			document
				.querySelector("#buttonShowMonths")
				.addEventListener("click", function () {
					calendarShowAllMonths();
				});

			document
				.querySelector("#selectLanguage")
				.addEventListener("change", function () {
					calendarLanguageChange(this);
					calendarFirstDayOfWeekCreateStructure();
					calendarFirstDayOfWeekUpdateStructure();
				});

			document
				.querySelector("#selectFirstDayOfWeek")
				.addEventListener("change", function () {
					calendarFirstDayOfWeekChange(this);
				});
		}

		function calendarInit() {
			calendarCreate();
			calendarEvents();
		}

		calendarInit();
	}
});
