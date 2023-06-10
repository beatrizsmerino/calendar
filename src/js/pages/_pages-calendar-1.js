"use strict";

import PerfectScrollbar from 'perfect-scrollbar';

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
					selected: true,
				},
				{
					value: "fr",
					text: "French",
					selected: false,
				},
				{
					value: "de",
					text: "German",
					selected: false,
				},
				{
					value: "es",
					text: "Spanish",
					selected: false,
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
						selected: false,
					},
					{
						value: 2,
						text: "Tuesday",
						selected: false,
					},
					{
						value: 3,
						text: "Wednesday",
						selected: false,
					},
					{
						value: 4,
						text: "Thursday",
						selected: false,
					},
					{
						value: 5,
						text: "Friday",
						selected: false,
					},
					{
						value: 6,
						text: "Saturday",
						selected: false,
					},
					{
						value: 7,
						text: "Sunday",
						selected: true,
					},
				],
				fr: [
					{
						value: 1,
						text: "Lundi",
						selected: false,
					},
					{
						value: 2,
						text: "Mardi",
						selected: false,
					},
					{
						value: 3,
						text: "Mercredi",
						selected: false,
					},
					{
						value: 4,
						text: "Jeudi",
						selected: false,
					},
					{
						value: 5,
						text: "Vendredi",
						selected: false,
					},
					{
						value: 6,
						text: "Samedi",
						selected: false,
					},
					{
						value: 7,
						text: "Dimanche",
						selected: true,
					},
				],
				de: [
					{
						value: 1,
						text: "Montag",
						selected: false,
					},
					{
						value: 2,
						text: "Dienstag",
						selected: false,
					},
					{
						value: 3,
						text: "Mittwoch",
						selected: false,
					},
					{
						value: 4,
						text: "Donnerstag",
						selected: false,
					},
					{
						value: 5,
						text: "Freitag",
						selected: false,
					},
					{
						value: 6,
						text: "Samstag",
						selected: false,
					},
					{
						value: 7,
						text: "Sonntag",
						selected: true,
					},
				],
				es: [
					{
						value: 1,
						text: "Lunes",
						selected: false,
					},
					{
						value: 2,
						text: "Martes",
						selected: false,
					},
					{
						value: 3,
						text: "Miércoles",
						selected: false,
					},
					{
						value: 4,
						text: "Jueves",
						selected: false,
					},
					{
						value: 5,
						text: "Viernes",
						selected: false,
					},
					{
						value: 6,
						text: "Sábado",
						selected: false,
					},
					{
						value: 7,
						text: "Domingo",
						selected: true,
					},
				],
			},
			firstDayOfWeek: () =>
				Object.entries(settings.weeks).reduce(
					(filteredWeeks, [language, weeks]) => ({
						...filteredWeeks,
						[language]: weeks.filter((week) => [1, 7].includes(week.value)),
					}),
					{}
				),
			scrollbar: null,
			showOneMonth: true,
		};


		function getFormattedDate(year, month, day) {
			const yyyy = String(year);
			const mm = String(month + 1).padStart(2, "0"); // January is 0!
			const dd = String(day).padStart(2, "0");
			const yearMonthDay = `${yyyy}-${mm}-${dd}`;
			return yearMonthDay;
		}

		function getCurrentYear() {
			const date = new Date();
			return date.getFullYear();
		}

		function getCurrentMonth() {
			const date = new Date();
			return date.getMonth();
		}

		function getCurrentDay() {
			const date = new Date();
			return date.getDate();
		}

		function getDayOfYear(year, day) {
			const dateDay = new Date(year, 0);
			return new Date(dateDay.setDate(day));
		}

		function getToday() {
			const today = getFormattedDate(
				getCurrentYear(),
				getCurrentMonth(),
				getCurrentDay()
			);
			return today;
		}

		function getFirstLetters(string, length) {
			const substring = string.slice(0, length);
			return substring;
		}

		function toggleScrollbar(action) {
			const container = document.querySelector('.scrollbar');

			if (container) {
				switch (action) {
					case 'create':
						settings.scrollbar = new PerfectScrollbar(container, {
							wheelSpeed: 2,
							wheelPropagation: true,
							minScrollbarLength: 20,
						});
						break;
					case 'update':
						if (settings.scrollbar !== null) {
							settings.scrollbar.update();
						}
						break;
					case 'remove':
						if (settings.scrollbar !== null) {
							settings.scrollbar.destroy();
							settings.scrollbar = null;
						}
						break;
					default:
						console.log("Invalid action");
				}
			}
		}

		function calendarFirstDayOfWeekSort() {
			const languageSelected = calendarLanguageGetSelected();
			const weeksLanguageSelected = settings.weeks[languageSelected.value];
			const firstDayOfWeekSelected = calendarFirstDayOfWeekGetSelected().value;

			weeksLanguageSelected.sort((a, b) => a.value - b.value);

			const weekSelected = weeksLanguageSelected.find(week => week.value === firstDayOfWeekSelected);
			const weekStart = weeksLanguageSelected.filter(week => week.value > firstDayOfWeekSelected);
			const weekEnd = weeksLanguageSelected.filter(week => week.value < firstDayOfWeekSelected);

			const weeksOrdered = [weekSelected, ...weekStart, ...weekEnd];
			return weeksOrdered;
		}

		function calendarGetWeeks() {
			let weeksList = calendarFirstDayOfWeekSort();

			for (const key in weeksList) {
				const day = weeksList[key];
				day.abbreviation = getFirstLetters(day.text, 3);
			}

			return weeksList;
		}

		function calendarCreateStructure(monthsList, weeksList) {
			function calendarYearCreate() {
				const calendarYear = document.createElement("div");
				calendarYear.className = "calendar__year";
				calendarYear.innerText = getCurrentYear();
				document.getElementById("calendar").appendChild(calendarYear);
			}

			function calendarInnerCreate() {
				const calendarInner = document.createElement("div");
				calendarInner.className = "calendar__inner scrollbar";
				document.getElementById("calendar").appendChild(calendarInner);
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
				[...calendarMonthList].map((item) =>
					item.appendChild(calendarTable)
				);
			}

			function calendarCaptionCreate() {
				const calendarTableList = document.querySelectorAll(".calendar__table");
				const calendarCaption = document.createElement("CAPTION");
				calendarCaption.className = "calendar__caption";
				[...calendarTableList].map((item) =>
					item.appendChild(calendarCaption)
				);
			}

			function calendarTitleCreate(monthsList, month) {
				const calendarCaptionList = document.querySelectorAll(".calendar__caption");
				const calendarTitle = document.createElement("DIV");
				calendarTitle.className = "calendar__title";
				calendarTitle.innerText = monthsList[month];
				[...calendarCaptionList].map((item) =>
					item.appendChild(calendarTitle)
				);
			}

			function calendarHeaderCreate() {
				const calendarTableList = document.querySelectorAll(".calendar__table");
				const calendarHeader = document.createElement("THEAD");
				calendarHeader.className = "calendar__header";
				[...calendarTableList].map((item) => item.appendChild(calendarHeader));
			}

			function calendarRowCreate(contain) {
				const calendarRow = document.createElement("TR");
				calendarRow.className = "calendar__row";
				[...contain].map((item) => item.appendChild(calendarRow));
			}

			function calendarWeekCreate(weeksList, week) {
				const calendarRowList = document.querySelectorAll(".calendar__header .calendar__row");

				const calendarWeek = document.createElement("TH");
				calendarWeek.className = "calendar__cell calendar__week";
				calendarWeek.innerText = weeksList[week].abbreviation;
				calendarWeek.title = weeksList[week].text;
				[...calendarRowList].map((item) => item.appendChild(calendarWeek));
			}

			function calendarBodyCreate() {
				const calendarTableList = document.querySelectorAll(".calendar__table");
				const calendarBody = document.createElement("TBODY");
				calendarBody.className = "calendar__body";
				[...calendarTableList].map((item) =>
					item.appendChild(calendarBody)
				);
			}

			function calendarDayCreate() {
				const calendarRowList = document.querySelectorAll(".calendar__row");
				const calendarDay = document.createElement("TD");
				calendarDay.className = "calendar__cell calendar__day";
				calendarDay.innerText = "";
				[...calendarRowList].map((item) => item.appendChild(calendarDay));
			}

			function calendarAllMonthsCreate() {
				for (let month = 0; month <= 11; month++) {
					calendarMonthCreate();
					calendarTableCreate();
					calendarCaptionCreate();
					calendarTitleCreate(monthsList, month);
					calendarHeaderCreate();

					const calendarHeaderList = document.querySelectorAll(".calendar__header");
					calendarRowCreate(calendarHeaderList);

					for (let week = 0; week < 7; week++) {
						calendarWeekCreate(weeksList, week);
					}

					calendarBodyCreate();

					for (let row = 0; row < 6; row++) {
						const calendarBodyList = document.querySelectorAll(".calendar__body");
						calendarRowCreate(calendarBodyList);

						for (let day = 0; day < 7; day++) {
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
			const thisYear = getCurrentYear();
			let week = 0;

			for (let day = 1; day < 366; day++) {
				const dayOfYear = getDayOfYear(thisYear, day);
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
				const calendarTableList = document.querySelectorAll(".calendar__table");
				const tableDays = calendarTableList[dateMonth].children[2].children[week].children[dateWeek];
				tableDays.innerHTML = `<span class="calendar__number">${dateDay}</span><span class="calendar__circle"></span>`;

				const yearMonthDay = getFormattedDate(thisYear, dateMonth, dateDay);
				tableDays.dataset.time = yearMonthDay;

				if (tableDays.dataset.time == getToday()) {
					tableDays.classList.add("calendar__today");
				}

				if (isWeekend) {
					tableDays.classList.add("calendar__weekend");
				}

				if (dateWeek == 6) {
					week++;
				}
			}
		}

		function calendarSetWidth() {
			const calendar = document.querySelector("#calendar");
			const calendarMonth = document.querySelector(".calendar__month");
			const calendarMonthWidth = calendarMonth.clientWidth;

			if (calendar.classList.contains("is-show-months")) {
				calendar.style.width = `auto`;
			} else {
				calendar.style.width = `${calendarMonthWidth}px`;
			}
		}

		function calendarMoveScrollToday() {
			const header = document.querySelector(".header");
			const calendarInner = document.querySelector(".calendar__inner");
			const calendarMonthList = document.querySelectorAll(".calendar__month");
			const currentMonth = getCurrentMonth();

			let positionScroll = 0;
			if (settings.showOneMonth) {
				for (let month = 0; month < currentMonth; month++) {
					const style =
						calendarMonthList[month].currentStyle ||
						window.getComputedStyle(calendarMonthList[month]);
					positionScroll +=
						parseFloat(calendarMonthList[month].offsetWidth) +
						parseFloat(style.marginRight);
				}

				smoothScrollTo(calendarInner, positionScroll, 500); // Ajusta la duración según tus necesidades
			} else {
				positionScroll = calendarMonthList[currentMonth].offsetTop - header.offsetHeight;
				window.scrollTo({ top: positionScroll, behavior: 'smooth' });
			}
		}

		function smoothScrollTo(element, targetPosition, duration) {
			const startPosition = element.scrollLeft;
			const distance = targetPosition - startPosition;
			const startTime = performance.now();

			(function scrollAnimation() {
				const currentTime = performance.now();
				const animationDuration = currentTime - startTime;
				const scrollProgress = Math.min(animationDuration / duration, 1);
				element.scrollLeft = startPosition + distance * scrollProgress;

				if (animationDuration < duration) {
					setTimeout(scrollAnimation, 0);
				}
			})();
		}

		function calendarShowAllMonths() {
			const calendar = document.querySelector("#calendar");
			const buttonShowMonths = document.querySelector("#buttonShowMonths");
			const buttonShowToday = document.querySelector("#buttonShowToday");

			buttonShowMonths.classList.toggle("is-change-text");
			calendar.classList.toggle("is-show-months");
			settings.showOneMonth = !settings.showOneMonth;

			calendarSetWidth();

			if (calendar.classList.contains("is-show-months")) {
				toggleScrollbar("remove");
			} else {
				toggleScrollbar("create");
			}

			buttonShowToday.click();
		}

		function calendarGeneratePDF() {
			const originalTitle = document.title;
			const currentTitle = `Calendar-${getToday()}`;

			document.title = currentTitle;
			window.print();

			async function waitForPrintWindowClosed() {
				while (window.matchMedia('print').matches) {
					await new Promise(resolve => setTimeout(resolve, 1000));
				}
				document.title = originalTitle;
			}

			waitForPrintWindowClosed();
		}

		function calendarEmpty() {
			const calendar = document.querySelector("#calendar");
			calendar.innerHTML = "";
		}

		function calendarFirstDayOfWeekGetSelected() {
			const languageSelected = calendarLanguageGetSelected();
			return settings.firstDayOfWeek()[languageSelected.value].find(
				(item) => item.selected
			);
		}

		function calendarFirstDayOfWeekCreateStructure() {
			const select = document.querySelector("#selectFirstDayOfWeek");
			const optionsList = select.querySelectorAll("option");
			const languageSelected = calendarLanguageGetSelected();
			const firstDayOfWeekList = settings.firstDayOfWeek()[languageSelected.value];

			optionsList.forEach((item, index) => {
				if (index !== 0) {
					item.remove();
				}
			});

			firstDayOfWeekList.forEach((item) => {
				const option = document.createElement("option");
				option.value = item.value;
				option.innerText = item.text;
				select.appendChild(option);
			});
		}

		function calendarFirstDayOfWeekUpdateStructure() {
			const select = document.querySelector("#selectFirstDayOfWeek");
			const firstOption = select.querySelectorAll("option")[0];
			const firstDayOfWeekSelected = calendarFirstDayOfWeekGetSelected();

			firstOption.value = firstDayOfWeekSelected.value;
			firstOption.innerText = `First day of week: ${firstDayOfWeekSelected.text}`;
			select.value = firstDayOfWeekSelected.value;
		}

		function calendarFirstDayOfWeekChange(firstDayOfWeekChanged) {
			const languageSelected = calendarLanguageGetSelected();
			const firstDayOfWeek = parseInt(firstDayOfWeekChanged.value);
			const firstDayOfWeekList = settings.firstDayOfWeek()[languageSelected.value];

			firstDayOfWeekList.forEach(
				(item) => (item.selected = item.value === firstDayOfWeek)
			);

			calendarFirstDayOfWeekUpdateStructure();
			calendarCreate();
		}

		function calendarLanguageGetSelected() {
			return settings.languages.find((item) => item.selected);
		}

		function calendarLanguageCreateStructure() {
			const select = document.querySelector("#selectLanguage");
			if (select.querySelectorAll("option").length === 1) {
				settings.languages.forEach((item) => {
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
			const languageSelected = calendarLanguageGetSelected();

			firstOption.value = languageSelected.value;
			firstOption.innerText = `Language: ${languageSelected.text}`;
			select.value = languageSelected.value;
		}

		function calendarLanguageChange(languageChanged) {
			const selectedValue = languageChanged.value;
			const languageList = settings.languages;
			languageList.forEach((item) => (item.selected = item.value === selectedValue));
			calendarLanguageUpdateStructure();
			calendarCreate();
		}

		function calendarCreate() {
			const languageSelected = calendarLanguageGetSelected();
			const firstDayOfWeekSelected = calendarFirstDayOfWeekGetSelected();
			calendarEmpty();
			calendarCreateStructure(
				settings.months[languageSelected.value],
				calendarGetWeeks()
			);
			calendarSetDays(firstDayOfWeekSelected.value);
			calendarSetWidth();
			toggleScrollbar("create");
			calendarMoveScrollToday();
			calendarFirstDayOfWeekCreateStructure();
			calendarLanguageCreateStructure();
		}

		function calendarEvents() {
			const buttonShowToday = document.querySelector("#buttonShowToday");
			const buttonShowMonths = document.querySelector("#buttonShowMonths");
			const buttonPrint = document.querySelector("#buttonPrint");
			const selectLanguage = document.querySelector("#selectLanguage");
			const selectFirstDayOfWeek = document.querySelector("#selectFirstDayOfWeek");

			buttonShowToday.addEventListener("click", function () {
				calendarMoveScrollToday();
			});

			buttonShowMonths.addEventListener("click", function () {
				calendarShowAllMonths();
			});

			buttonPrint.addEventListener("click", function () {
				calendarGeneratePDF();
			});

			selectLanguage.addEventListener("change", function () {
				calendarLanguageChange(this);
				calendarFirstDayOfWeekChange(selectFirstDayOfWeek);
			});

			selectFirstDayOfWeek.addEventListener("change", function () {
				calendarFirstDayOfWeekChange(this);
			});

			window.addEventListener("resize", function () {
				calendarSetWidth();
			});
		}

		function calendarInit() {
			calendarCreate();
			calendarEvents();
		}

		calendarInit();
	}
});
