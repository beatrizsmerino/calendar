"use strict";

const settings = {
	languages: [
		{
			value: "en",
			text: "English",
		},
		{
			value: "fr",
			text: "French",
		},
		{
			value: "es",
			text: "Spanish",
		},
	],
	languageSelected: "en",
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
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		],
		fr: [
			"Dimanche",
			"Lundi",
			"Mardi",
			"Mercredi",
			"Jeudi",
			"Vendredi",
			"Samedi",
		],
		es: [
			"Domingo",
			"Lunes",
			"Martes",
			"Miércoles",
			"Jueves",
			"Viernes",
			"Sábado",
		],
	},
};

function createYearMonthDay(year, month, day) {
	const yyyy = String(year);
	const mm = String(month + 1).padStart(2, "0"); //January is 0!
	const dd = String(day).padStart(2, "0");
	const yearMonthDay = yyyy + "-" + mm + "-" + dd;
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

function get4Letters(words) {
	const wordsFormatted = words.map((item) => item.slice(0, 4));

	return wordsFormatted;
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

	function calendarTitleCreate(monthsList, month) {
		const calendarTable = document.querySelectorAll(".calendar__table");
		const calendarTitle = document.createElement("CAPTION");
		calendarTitle.className = "calendar__title";
		calendarTitle.innerText = monthsList[month];
		[...calendarTable].map((item) => item.appendChild(calendarTitle));
	}

	calendarYearCreate();
	calendarInnerCreate();


	for (let m = 0; m <= 11; m++) {
		// MONTHS
		const calendarInner = document.querySelector(".calendar__inner");
		const month = document.createElement("DIV");
		month.className = "calendar__month";
		calendarInner.appendChild(month);

		// TABLE
		const tableMonth = document.createElement("TABLE");
		tableMonth.className = "calendar__table";
		month.appendChild(tableMonth);

		calendarTitleCreate(monthsList, m);

		// TABLE HEADER - WEEKS
		const tableHeader = document.createElement("THEAD");
		tableHeader.className = "calendar__header";
		tableMonth.appendChild(tableHeader);

		const tableRow = document.createElement("TR");
		tableRow.className = "calendar__row";
		tableHeader.appendChild(tableRow);

		for (let w = 0; w < 7; w++) {
			const tableWeek = document.createElement("TH");
			tableWeek.className = "calendar__cell calendar__week";
			tableWeek.innerText = weeksList[w];
			tableRow.appendChild(tableWeek);
		}

		// TABLE BODY - DAYS
		const tableBody = document.createElement("TBODY");
		tableBody.className = "calendar__body";
		tableMonth.appendChild(tableBody);

		for (let f = 0; f < 6; f++) {
			const tableRow = document.createElement("TR");
			tableRow.className = "calendar__row";
			tableBody.appendChild(tableRow);

			for (let d = 0; d < 7; d++) {
				const tableDays = document.createElement("TD");
				tableDays.className = "calendar__cell calendar__day";
				tableDays.innerText = "";
				tableRow.appendChild(tableDays);
			}
		}
	}
}

function calendarSetDays() {
	const thisYear = getThisYear();
	let week = 0;

	for (let i = 1; i < 366; i++) {
		const dayOfYear = getDayOfYear(thisYear, i);
		const dateDay = dayOfYear.getDate();
		const dateMonth = dayOfYear.getMonth();
		const dateWeek = dayOfYear.getDay();
		const calendarMonth =
			document.querySelectorAll(".calendar__table")[dateMonth];

		if (dateDay == 1) {
			week = 0;
		}

		// insert days in the calendar
		const tableDays =
			calendarMonth.children[2].children[week].children[dateWeek];
		tableDays.innerHTML = `<span>${dateDay}</span>`;

		const yearMonthDay = createYearMonthDay(thisYear, dateMonth, dateDay);
		tableDays.setAttribute("data-time", yearMonthDay);

		if (tableDays.getAttribute("data-time") == getToday()) {
			tableDays.className += " calendar__today";
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

function calendarSetWeekend() {
	const weekendSaturdays = document.querySelectorAll(
		".calendar__body .calendar__row .calendar__cell:last-child"
	);

	const weekendSundays = document.querySelectorAll(
		".calendar__body .calendar__row .calendar__cell:first-child"
	);

	[...weekendSaturdays, ...weekendSundays].map((item) => {
		if (item.childNodes.length) {
			item.classList.add("calendar__weekend");
		}
	});
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

function calendarTranslate() {
	const select = document.querySelector("#selectTranslate");

	if (document.querySelectorAll("#selectTranslate option").length === 1) {
		settings.languages.map((item) => {
			const option = document.createElement("option");
			option.value = item.value;
			option.innerText = item.text;
			select.appendChild(option);
		});
	}

	select.addEventListener("change", function () {
		settings.languageSelected = this.value;
		calendarCreate(settings.languageSelected);
	});
}

function calendarCreate(language) {
	calendarEmpty();
	calendarCreateStructure(
		settings.months[language],
		get4Letters(settings.weeks[language])
	);
	calendarSetDays();
	calendarSetWeekend();
	calendarSetWidth();
	calendarMoveScrollToday();
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

	calendarTranslate();
}

function calendarInit() {
	calendarCreate(settings.languageSelected);
	calendarEvents();
}

document.addEventListener("DOMContentLoaded", function () {
	if (document.querySelector("html").classList.contains("page-calendar-1")) {
		calendarInit();
	}
});
