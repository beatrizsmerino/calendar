/**
 * @file pagesCalendar1
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2023)
 */



import PerfectScrollbar from 'perfect-scrollbar';

document.addEventListener("DOMContentLoaded", async function () {
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
			firstDayOfWeek: async () => {
				const weekList = Object.entries(settings.weeks).reduce(
					(filteredWeekList, [language, weeks]) => ({
						...filteredWeekList,
						[language]: weeks.filter((week) => [1, 7].includes(week.value)),
					}),
					{}
				);

				return weekList;
			},
			scrollbar: null,
			showOneMonth: true,
		};

		async function getCurrentYear() {
			const date = new Date();
			const year = date.getFullYear();

			return year;
		}

		async function getCurrentMonth() {
			const date = new Date();
			const month = date.getMonth();

			return month;
		}

		async function getCurrentDay() {
			const date = new Date();
			const day = date.getDate();

			return day;
		}

		async function getDayOfYear(year, day) {
			const firstDayOfYear = new Date(year, 0);
			const dayOfYear = new Date(firstDayOfYear.setDate(day));

			return dayOfYear;
		}

		async function getFormattedDate(year, month, day) {
			const yyyy = String(year);
			const mm = String(month + 1).padStart(2, "0"); // January is 0!
			const dd = String(day).padStart(2, "0");
			const yearMonthDay = `${yyyy}-${mm}-${dd}`;

			return yearMonthDay;
		}

		async function getToday() {
			const year = await getCurrentYear();
			const month = await getCurrentMonth();
			const day = await getCurrentDay();
			const today = await getFormattedDate(year, month, day);

			return today;
		}

		async function getFirstLetters(string, length) {
			const substring = string.slice(0, length);

			return substring;
		}

		async function scrollbarToggle(action) {
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

		async function scrollbarSmooth(element, targetPosition, duration) {
			const startPosition = element.scrollLeft;
			const distance = targetPosition - startPosition;
			const startTime = performance.now();

			async function scrollAnimation() {
				const currentTime = performance.now();
				const animationDuration = currentTime - startTime;
				const scrollProgress = Math.min(animationDuration / duration, 1);
				element.scrollLeft = startPosition + distance * scrollProgress;

				if (animationDuration < duration) {
					await new Promise((resolve) => requestAnimationFrame(resolve));
					await scrollAnimation();
				}
			}

			await scrollAnimation();
		}

		async function calendarGetWeekList(numLetters) {
			const weekList = await calendarFirstDayOfWeekSort();

			for (let key in weekList) {
				const day = weekList[key];
				day.abbreviation = await getFirstLetters(day.text, numLetters);
			}

			return weekList;
		}

		async function calendarSetDays(startDay) {
			const thisYear = await getCurrentYear();
			let week = 0;

			for (let day = 1; day < 366; day++) {
				const dayOfYear = await getDayOfYear(thisYear, day);
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
				const tableDayList = calendarTableList[dateMonth].children[2].children[week].children[dateWeek];
				tableDayList.innerHTML = `<span class="calendar__number">${dateDay}</span><span class="calendar__circle"></span>`;

				const yearMonthDay = await getFormattedDate(thisYear, dateMonth, dateDay);
				tableDayList.dataset.time = yearMonthDay;

				const today = await getToday();
				if (tableDayList.dataset.time == today) {
					tableDayList.classList.add("calendar__today");
				}

				if (isWeekend) {
					tableDayList.classList.add("calendar__weekend");
				}

				if (dateWeek == 6) {
					week++;
				}
			}
		}

		async function calendarSetWidth() {
			const calendar = document.querySelector("#calendar");
			const calendarMonth = document.querySelector(".calendar__month");
			const calendarMonthWidth = calendarMonth.clientWidth;

			if (calendar.classList.contains("is-show-months")) {
				calendar.style.width = `auto`;
			} else {
				calendar.style.width = `${calendarMonthWidth}px`;
			}
		}

		async function calendarRemoveStructure() {
			const calendar = document.querySelector("#calendar");
			calendar.innerHTML = "";
		}

		async function calendarCreateStructure(monthList, weekList) {
			async function calendarYearCreate() {
				const calendarYear = document.createElement("DIV");
				calendarYear.className = "calendar__year";
				calendarYear.innerText = await getCurrentYear();
				document.getElementById("calendar").appendChild(calendarYear);
			}

			async function calendarInnerCreate() {
				const calendarInner = document.createElement("DIV");
				calendarInner.className = "calendar__inner scrollbar";
				document.getElementById("calendar").appendChild(calendarInner);
			}

			async function calendarMonthCreate() {
				const calendarInner = document.querySelector(".calendar__inner");
				const calendarMonth = document.createElement("DIV");
				calendarMonth.className = "calendar__month";
				calendarInner.appendChild(calendarMonth);
			}

			async function calendarTableCreate() {
				const calendarMonthList = document.querySelectorAll(".calendar__month");
				const calendarTable = document.createElement("TABLE");
				calendarTable.className = "calendar__table";
				[...calendarMonthList].map((item) =>
					item.appendChild(calendarTable)
				);
			}

			async function calendarCaptionCreate() {
				const calendarTableList = document.querySelectorAll(".calendar__table");
				const calendarCaption = document.createElement("CAPTION");
				calendarCaption.className = "calendar__caption";
				[...calendarTableList].map((item) =>
					item.appendChild(calendarCaption)
				);
			}

			async function calendarTitleCreate(monthList, month) {
				const calendarCaptionList = document.querySelectorAll(".calendar__caption");
				const calendarTitle = document.createElement("DIV");
				calendarTitle.className = "calendar__title";
				calendarTitle.innerText = monthList[month];
				[...calendarCaptionList].map((item) =>
					item.appendChild(calendarTitle)
				);
			}

			async function calendarHeaderCreate() {
				const calendarTableList = document.querySelectorAll(".calendar__table");
				const calendarHeader = document.createElement("THEAD");
				calendarHeader.className = "calendar__header";
				[...calendarTableList].map((item) => item.appendChild(calendarHeader));
			}

			async function calendarRowCreate(contain) {
				const calendarRow = document.createElement("TR");
				calendarRow.className = "calendar__row";
				[...contain].map((item) => item.appendChild(calendarRow));
			}

			async function calendarWeekCreate(weekList, week) {
				const calendarRowList = document.querySelectorAll(".calendar__header .calendar__row");

				const calendarWeek = document.createElement("TH");
				calendarWeek.className = "calendar__cell calendar__week";
				calendarWeek.innerText = weekList[week].abbreviation;
				calendarWeek.title = weekList[week].text;
				[...calendarRowList].map((item) => item.appendChild(calendarWeek));
			}

			async function calendarBodyCreate() {
				const calendarTableList = document.querySelectorAll(".calendar__table");
				const calendarBody = document.createElement("TBODY");
				calendarBody.className = "calendar__body";
				[...calendarTableList].map((item) =>
					item.appendChild(calendarBody)
				);
			}

			async function calendarDayCreate() {
				const calendarRowList = document.querySelectorAll(".calendar__row");
				const calendarDay = document.createElement("TD");
				calendarDay.className = "calendar__cell calendar__day";
				calendarDay.innerText = "";
				[...calendarRowList].map((item) => item.appendChild(calendarDay));
			}

			async function calendarMonthListCreate() {
				for (let month = 0; month <= 11; month++) {
					await calendarMonthCreate();
					await calendarTableCreate();
					await calendarCaptionCreate();
					await calendarTitleCreate(monthList, month);
					await calendarHeaderCreate();

					const calendarHeaderList = document.querySelectorAll(".calendar__header");
					await calendarRowCreate(calendarHeaderList);

					for (let week = 0; week < 7; week++) {
						await calendarWeekCreate(weekList, week);
					}

					await calendarBodyCreate();

					for (let row = 0; row < 6; row++) {
						const calendarBodyList = document.querySelectorAll(".calendar__body");
						await calendarRowCreate(calendarBodyList);

						for (let day = 0; day < 7; day++) {
							await calendarDayCreate();
						}
					}
				}
			}

			await calendarYearCreate();
			await calendarInnerCreate();
			await calendarMonthListCreate();
		}

		async function calendarMoveScrollToday() {
			const header = document.querySelector(".header");
			const calendarInner = document.querySelector(".calendar__inner");
			const calendarMonthList = document.querySelectorAll(".calendar__month");
			const currentMonth = await getCurrentMonth();

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

				await scrollbarSmooth(calendarInner, positionScroll, 500);
			} else {
				positionScroll = calendarMonthList[currentMonth].offsetTop - header.offsetHeight;
				window.scrollTo({ top: positionScroll, behavior: 'smooth' });
			}
		}

		async function calendarShowAllMonths() {
			const calendar = document.querySelector("#calendar");
			const buttonShowMonths = document.querySelector("#buttonShowMonths");
			const buttonShowToday = document.querySelector("#buttonShowToday");

			buttonShowMonths.classList.toggle("is-change-text");
			calendar.classList.toggle("is-show-months");
			settings.showOneMonth = !settings.showOneMonth;

			await calendarSetWidth();

			if (calendar.classList.contains("is-show-months")) {
				await scrollbarToggle("remove");
			} else {
				await scrollbarToggle("create");
			}

			await buttonShowToday.click();
		}

		async function calendarGeneratePDF() {
			const originalTitle = document.title;
			const today = await getToday();
			const currentTitle = `Calendar-${today}`;

			async function waitForPrintWindowClosed() {
				while (window.matchMedia('print').matches) {
					await new Promise(resolve => setTimeout(resolve, 1000));
				}
				document.title = originalTitle;
				await calendarCreate();
			}

			document.title = currentTitle;
			await calendarCreate(1);
			window.print();
			await waitForPrintWindowClosed();
		}

		async function calendarFirstDayOfWeekSort() {
			const languageSelected = await calendarLanguageGetSelected();
			const weekList = await settings.weeks[languageSelected.value];
			const firstDayOfWeekSelected = (await calendarFirstDayOfWeekGetSelected()).value;

			await weekList.sort((a, b) => a.value - b.value);

			const weekSelected = weekList.find(week => week.value === firstDayOfWeekSelected);
			const weekStart = weekList.filter(week => week.value > firstDayOfWeekSelected);
			const weekEnd = weekList.filter(week => week.value < firstDayOfWeekSelected);

			const weekListOrdered = [weekSelected, ...weekStart, ...weekEnd];

			return weekListOrdered;
		}

		async function calendarFirstDayOfWeekGetSelected() {
			const languageSelected = await calendarLanguageGetSelected();
			const weekList = await settings.firstDayOfWeek();
			const firstDayOfWeekList = weekList[languageSelected.value];
			const firstDayOfWeekSelected = firstDayOfWeekList.find((item) => item.selected);

			return firstDayOfWeekSelected;
		}

		async function calendarFirstDayOfWeekCreateStructure() {
			const select = document.querySelector("#selectFirstDayOfWeek");
			const optionList = select.querySelectorAll("option");
			const languageSelected = await calendarLanguageGetSelected();
			const weekList = await settings.firstDayOfWeek();
			const firstDayOfWeekList = weekList[languageSelected.value];

			optionList.forEach((item, index) => {
				if (index !== 0) {
					item.remove();
				}
			});

			firstDayOfWeekList.forEach((item) => {
				const option = document.createElement("OPTION");
				option.value = item.value;
				option.innerText = item.text;
				select.appendChild(option);
			});
		}

		async function calendarFirstDayOfWeekUpdateStructure() {
			const select = document.querySelector("#selectFirstDayOfWeek");
			const firstOption = select.querySelectorAll("option")[0];
			const firstDayOfWeekSelected = await calendarFirstDayOfWeekGetSelected();

			firstOption.value = firstDayOfWeekSelected.value;
			firstOption.innerText = `First day of week: ${firstDayOfWeekSelected.text}`;
			select.value = firstDayOfWeekSelected.value;
		}

		async function calendarFirstDayOfWeekChange(firstDayOfWeekChanged) {
			const languageSelected = await calendarLanguageGetSelected();
			const weekList = await settings.firstDayOfWeek();
			const firstDayOfWeek = parseInt(firstDayOfWeekChanged.value);
			const firstDayOfWeekList = weekList[languageSelected.value];

			firstDayOfWeekList.forEach(
				(item) => (item.selected = item.value === firstDayOfWeek)
			);

			await calendarFirstDayOfWeekUpdateStructure();
			await calendarCreate();
		}

		async function calendarLanguageGetSelected() {
			const languageList = settings.languages;
			const languageSelected = languageList.find((item) => item.selected);

			return languageSelected;
		}

		async function calendarLanguageCreateStructure() {
			const select = document.querySelector("#selectLanguage");
			if (select.querySelectorAll("option").length === 1) {
				settings.languages.forEach((item) => {
					const option = document.createElement("OPTION");
					option.value = item.value;
					option.innerText = item.text;
					select.appendChild(option);
				});
			}
		}

		async function calendarLanguageUpdateStructure() {
			const select = document.querySelector("#selectLanguage");
			const firstOption = select.querySelectorAll("option")[0];
			const languageSelected = await calendarLanguageGetSelected();

			firstOption.value = languageSelected.value;
			firstOption.innerText = `Language: ${languageSelected.text}`;
			select.value = languageSelected.value;
		}

		async function calendarLanguageChange(languageChanged) {
			const selectedValue = languageChanged.value;
			const languageList = settings.languages;
			languageList.forEach((item) => (item.selected = item.value === selectedValue));
			await calendarLanguageUpdateStructure();
			await calendarCreate();
		}

		async function calendarCreate(numLetters = 3) {
			const languageSelected = await calendarLanguageGetSelected();
			const firstDayOfWeekSelected = await calendarFirstDayOfWeekGetSelected();
			const monthList = await settings.months[languageSelected.value];
			const weekList = await calendarGetWeekList(numLetters);
			await calendarRemoveStructure();
			await calendarCreateStructure(monthList, weekList);
			await calendarSetDays(firstDayOfWeekSelected.value);
			await calendarSetWidth();
			await scrollbarToggle("create");
			await calendarMoveScrollToday();
			await calendarFirstDayOfWeekCreateStructure();
			await calendarLanguageCreateStructure();
		}

		async function calendarEvents() {
			const buttonShowToday = document.querySelector("#buttonShowToday");
			const buttonShowMonths = document.querySelector("#buttonShowMonths");
			const buttonPrint = document.querySelector("#buttonPrint");
			const selectLanguage = document.querySelector("#selectLanguage");
			const selectFirstDayOfWeek = document.querySelector("#selectFirstDayOfWeek");

			buttonShowToday.addEventListener("click", async function () {
				await calendarMoveScrollToday();
			});

			buttonShowMonths.addEventListener("click", async function () {
				await calendarShowAllMonths();
			});

			buttonPrint.addEventListener("click", async function () {
				await calendarGeneratePDF();
			});

			selectLanguage.addEventListener("change", async function () {
				await calendarLanguageChange(this);
				await calendarFirstDayOfWeekChange(selectFirstDayOfWeek);
			});

			selectFirstDayOfWeek.addEventListener("change", async function () {
				await calendarFirstDayOfWeekChange(this);
			});

			window.addEventListener("resize", async function () {
				await calendarSetWidth();
			});
		}

		async function calendarInit() {
			await calendarCreate();
			await calendarEvents();
		}

		await calendarInit();
	}
});
