const months = [
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

const weeks = [
	"Sund",
	"Mond",
	"Tues",
	"Wedn",
	"Thur",
	"Frid",
	"Satu"
];

function calendarCreateStructure() {
	// YEAR
	let year = document.createElement("div");
	year.className = "calendar__year";
	year.innerText = getThisYear();
	document.getElementById("calendar").appendChild(year);

	// INNER
	let calendarInner = document.createElement("div");
	calendarInner.className = "calendar__inner";
	document.getElementById("calendar").appendChild(calendarInner);

	for (let m = 0; m <= 11; m++) {
		// MONTHS
		let month = document.createElement("DIV");
		month.className = "calendar__month";
		calendarInner.appendChild(month);

		// TABLE
		let tableMonth = document.createElement("TABLE");
		tableMonth.className = "calendar__table";
		month.appendChild(tableMonth);

		// TABLE - MONTHS
		let monthTitle = document.createElement("CAPTION");
		monthTitle.className = "calendar__title";
		monthTitle.innerText = months[m];
		tableMonth.appendChild(monthTitle);

		// TABLE HEADER - WEEKS
		let tableHeader = document.createElement("THEAD");
		tableHeader.className = "calendar__header";
		tableMonth.appendChild(tableHeader);

		let tableRow = document.createElement("TR");
		tableRow.className = "calendar__row";
		tableHeader.appendChild(tableRow);

		for (let w = 0; w < 7; w++) {
			let tableWeek = document.createElement("TH");
			tableWeek.className = "calendar__cell calendar__week";
			tableWeek.innerText = weeks[w];
			tableRow.appendChild(tableWeek);
		}

		// TABLE BODY - DAYS
		let tableBody = document.createElement("TBODY");
		tableBody.className = "calendar__body";
		tableMonth.appendChild(tableBody);

		for (let f = 0; f < 6; f++) {
			let tableRow = document.createElement("TR");
			tableRow.className = "calendar__row";
			tableBody.appendChild(tableRow);

			for (let d = 0; d < 7; d++) {
				let tableDays = document.createElement("TD");
				tableDays.className = "calendar__cell calendar__day";
				tableDays.innerText = "";
				tableRow.appendChild(tableDays);
			}
		}
	}
}

function calendarSetDays() {
	let week = 0;
	let thisYear = getThisYear();

	for (let i = 1; i < 366; i++) {
		let dayOfYear = getDayOfYear(thisYear, i);
		let dateDay = dayOfYear.getDate();
		let dateMonth = dayOfYear.getMonth();
		let dateWeek = dayOfYear.getDay();
		let calendarMonth = document.getElementsByClassName("calendar__table")[dateMonth];

		if (dateDay == 1) {
			week = 0;
		}

		// insert days in the calendar
		let tableDays = calendarMonth.children[2].children[week].children[dateWeek];
		tableDays.innerHTML = `<span>${dateDay}</span>`;

		let yearMonthDay = createYearMonthDay(thisYear, dateMonth, dateDay);
		tableDays.setAttribute("data-time", yearMonthDay);

		if (tableDays.getAttribute("data-time") == getToday()) {
			tableDays.className += " calendar__today";
		}

		if (dateWeek == 6) {
			week = week + 1;
		}
	}
}

function createYearMonthDay(year, month, day) {
	let yyyy = String(year);
	let mm = String(month + 1).padStart(2, "0"); //January is 0!
	let dd = String(day).padStart(2, "0");

	let yearMonthDay = yyyy + "-" + mm + "-" + dd;
	return yearMonthDay;
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

function getToday() {
	let today = createYearMonthDay(getThisYear(), getThisMonth(), getThisDay());
	return today;
}

function calendarMoveScrollToday() {
	document.querySelector("#showToday").addEventListener("click", function () {
		let currentMonth = getThisMonth();
		let month = document.querySelectorAll(".calendar__month");

		let positionScroll = 0;
		for (let index = 0; index < currentMonth; index++) {
			let style =
				month[index].currentStyle ||
				window.getComputedStyle(month[index]);
			positionScroll +=
				parseFloat(month[index].offsetWidth) +
				parseFloat(style.marginRight);
		}

		document.querySelector(".calendar__inner").scrollLeft = positionScroll;
	});
}

function calendarShowAllMonths(){
	document.querySelector("#showMonths").addEventListener("click", function () {
		this.classList.toggle("is-change-text");
		document.querySelector("#calendar").classList.toggle("is-show-months");
		document.querySelector("#showToday").click();
	});
}

function initCalendar() {
	calendarCreateStructure();
	calendarSetDays();

	calendarMoveScrollToday();
	document.querySelector("#showToday").click();

	calendarShowAllMonths();
}

initCalendar();
