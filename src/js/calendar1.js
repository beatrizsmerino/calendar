let months = [
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
	"December"
];

let weeks = [
	"Sund",
	"Mond",
	"Tues",
	"Wedn",
	"Thur",
	"Frid",
	"Satu"
];

let calendar1 = document.getElementById("calendar1");


function calendarCreateStructure() {
	// YEAR
	let year = document.createElement("DIV");
	year.className = "calendar__year";
	year.innerText = getThisYear();
	calendar1.appendChild(year);

	// INNER
	let calendarInner = document.createElement("DIV");
	calendarInner.className = "calendar__inner";
	calendar1.appendChild(calendarInner);

	for (let m = 0; m <= 11; m++) {
		// MONTHS 
		let month = document.createElement("DIV");
		month.className = "calendar-month";
		calendarInner.appendChild(month);

		// TABLE
		let tableMonth = document.createElement("TABLE");
		tableMonth.className = "calendar-table";
		month.appendChild(tableMonth);

		// TABLE - MONTHS
		let monthTitle = document.createElement("CAPTION");
		monthTitle.className = "calendar-table__caption";
		monthTitle.innerText = months[m];
		tableMonth.appendChild(monthTitle);

		// TABLE HEADER - WEEKS
		let tableHeader = document.createElement("THEAD");
		tableHeader.className = "calendar-table__head";
		tableMonth.appendChild(tableHeader);

		let tableRow = document.createElement("TR");
		tableRow.className = "calendar-table__row";
		tableHeader.appendChild(tableRow);

		for (let w = 0; w < 7; w++) {
			let tableWeek = document.createElement("TH");
			tableWeek.className = "calendar-table__cell calendar-month__week";
			tableWeek.innerText = weeks[w];
			tableRow.appendChild(tableWeek);
		}

		// TABLE BODY - DAYS
		let tableBody = document.createElement("TBODY");
		tableBody.className = "calendar-table__body";
		tableMonth.appendChild(tableBody);

		for (let f = 0; f < 6; f++) {
			let tableRow = document.createElement("TR");
			tableRow.className = "calendar-table__row";
			tableBody.appendChild(tableRow);

			for (let d = 0; d < 7; d++) {
				let tableTd = document.createElement("TD");
				tableTd.className = "calendar-table__cell";

				let tableDay = document.createElement("DIV");
				tableDay.className = "calendar-month__day";

				tableTd.appendChild(tableDay);
				tableRow.appendChild(tableTd);
			}
		}
	}
}

function calendarSetDays() {
	var week = 0;
	let thisYear = getThisYear();

	for (let i = 1; i < 366; i++) {
		let dayOfYear = getDayOfYear(thisYear, i);
		let dateDay = dayOfYear.getDate();
		let dateMonth = dayOfYear.getMonth();
		let dateWeek = dayOfYear.getDay();
		let calendarMonth = document.getElementsByClassName("calendar-table")[dateMonth];

		if (dateDay == 1) {
			week = 0;
		}

		// insert days in the calendar
		calendarMonth.children[2].children[week].children[dateWeek].children[0].innerText = dateDay;

		if (dateWeek == 6) {
			week = week + 1;
		}
	}
}

function getToday() {
	let monthToday = document.getElementsByClassName("calendar-table")[getThisMonth()].getElementsByClassName("calendar-month__day")[getThisDay()];
	monthToday.classList.add("calendar-month__today");
}

function getThisYear() {
	let date = new Date();
	return date.getFullYear();
}

function getThisMonth() {
	let date = new Date();
	return date.getMonth();
}

function getThisDay() {
	let date = new Date();
	return date.getDate();
}

function getDayOfYear(year, day) {
	let dateDay = new Date(year, 0);
	return new Date(dateDay.setDate(day));
}


function initCalendar() {
	calendarCreateStructure();
	calendarSetDays();
	getToday();
}


window.addEventListener('load', function () {
	if (calendar1 != null) {
		console.log("There is a calendar1");
		initCalendar();
	} else {
		console.log("There isn`t a calendar1");
	}
});