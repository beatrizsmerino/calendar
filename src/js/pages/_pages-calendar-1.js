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
					value: "de",
					text: "German",
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
				de: [
					"Januar",
					"Februar",
					"März",
					"April",
					"Mai",
					"Juni",
					"Juli",
					"August",
					"September",
					"Oktober",
					"November",
					"Dezember",
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
						text: "Monday",
						selected: false
					},
					{
						value: 2,
						text: "Tuesday",
						selected: false
					},
					{
						value: 3,
						text: "Wednesday",
						selected: false
					},
					{
						value: 4,
						text: "Thursday",
						selected: false
					},
					{
						value: 5,
						text: "Friday",
						selected: false
					},
					{
						value: 6,
						text: "Saturday",
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
						value: 2,
						text: "Mardi",
						selected: false
					},
					{
						value: 3,
						text: "Mercredi",
						selected: false
					},
					{
						value: 4,
						text: "Jeudi",
						selected: false
					},
					{
						value: 5,
						text: "Vendredi",
						selected: false
					},
					{
						value: 6,
						text: "Samedi",
						selected: false
					},
					{
						value: 7,
						text: "Dimanche",
						selected: true
					}
				],
				de: [
					{
						value: 1,
						text: "Montag",
						selected: false
					},
					{
						value: 2,
						text: "Dienstag",
						selected: false
					},
					{
						value: 3,
						text: "Mittwoch",
						selected: false
					},
					{
						value: 4,
						text: "Donnerstag",
						selected: false
					},
					{
						value: 5,
						text: "Freitag",
						selected: false
					},
					{
						value: 6,
						text: "Samstag",
						selected: false
					},
					{
						value: 7,
						text: "Sonntag",
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
						value: 2,
						text: "Martes",
						selected: false
					},
					{
						value: 3,
						text: "Miércoles",
						selected: false
					},
					{
						value: 4,
						text: "Jueves",
						selected: false
					},
					{
						value: 5,
						text: "Viernes",
						selected: false
					},
					{
						value: 6,
						text: "Sábado",
						selected: false
					},
					{
						value: 7,
						text: "Domingo",
						selected: true
					}
				]
			},
			firstDayOfWeek: () =>
				Object.entries(settings.weeks).reduce((filteredWeeks, [language, weeks]) => ({
					...filteredWeeks,
					[language]: weeks.filter(week => [1, 7].includes(week.value))
				}), {})
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

		function getShortText(string, length) {
			const substring = string.slice(0, length);
			return substring;
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
				day.abbreviation = getShortText(day.text, 3);
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
				calendarWeek.innerText = weeksList[week].abbreviation;
				calendarWeek.title = weeksList[week].text;
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

		function calendarSetDays(startDay) {
			const thisYear = getThisYear();
			let week = 0;
			let firstDayOfWeek = startDay === 7 ? 0 : startDay === 1 ? 1 : 0;

			for (let i = 1; i < 366; i++) {
				const dayOfYear = getDayOfYear(thisYear, i);
				const dateDay = dayOfYear.getDate();
				const dateMonth = dayOfYear.getMonth();
				let dateWeek = dayOfYear.getDay();
				const isWeekend = (dateWeek === 6) || (dateWeek === 0); // 6 = Saturday, 0 = Sunday

				if (dateDay == 1) {
					week = 0;
				}

				// Adjust day of week if needed
				if (startDay === 1) {
					dateWeek = (dateWeek + 6) % 7; // Shift Sunday from 0 to 6
				}

				// Insert days in the calendar
				const tableDays = document.querySelectorAll(".calendar__table")[dateMonth].children[2].children[week].children[dateWeek];
				tableDays.innerHTML = `<span class="calendar__number">${dateDay}</span><span class="calendar__circle"></span>`;

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

		function calendarCreatePDF() {
			document.title = `Calendar-${getToday()}`
			window.print();
		}

		function calendarEmpty() {
			const calendar = document.querySelector("#calendar");
			calendar.innerHTML = "";
		}

		function calendarGetFirstDayOfWeekSelected() {
			const languageSelected = calendarGetLanguageSelected();
			const current = settings.firstDayOfWeek()[languageSelected.value].filter((item) => item.selected)[0];
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

			settings.firstDayOfWeek()[languageSelected.value].map((item) => {
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
			const current = settings.firstDayOfWeek()[languageSelected.value].filter((item) => item.value === parseInt(firstDayOfWeekChanged.value))[0];
			settings.firstDayOfWeek()[languageSelected.value].map((item) => item.selected === true ? item.selected = false : item.selected = false);
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
			const firstDayOfWeekSelected = calendarGetFirstDayOfWeekSelected();
			calendarEmpty();
			calendarCreateStructure(
				settings.months[languageSelected.value],
				calendarGetWeeks()
			);
			calendarSetDays(firstDayOfWeekSelected.value);
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
				.querySelector("#buttonPrint")
				.addEventListener("click", function () {
					calendarCreatePDF();
				});

			document
				.querySelector("#selectLanguage")
				.addEventListener("change", function () {
					calendarLanguageChange(this);
					calendarFirstDayOfWeekChange(document.querySelector("#selectFirstDayOfWeek"))
				});

			document
				.querySelector("#selectFirstDayOfWeek")
				.addEventListener("change", function () {
					calendarFirstDayOfWeekChange(this);
				});

			window.addEventListener("resize", function () {
				calendarSetWidth()
			});
		}

		function calendarInit() {
			calendarCreate();
			calendarEvents();
		}

		calendarInit();
	}
});
