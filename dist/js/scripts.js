
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
  "Satu",
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

  for (m = 0; m <= 11; m++) {
    // MONTHS 
    let month = document.createElement("DIV");
    month.className = "calendar__month swiper-slide";
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

    for (w = 0; w < 7; w++) {
      let tableWeek = document.createElement("TH");
      tableWeek.className = "calendar__cell calendar__week";
      tableWeek.innerText = weeks[w];
      tableRow.appendChild(tableWeek);
    }

    // TABLE BODY - DAYS
    let tableBody = document.createElement("TBODY");
    tableBody.className = "calendar__body";
    tableMonth.appendChild(tableBody);

    for (f = 0; f < 6; f++) {
      let tableRow = document.createElement("TR");
      tableRow.className = "calendar__row";
      tableBody.appendChild(tableRow);

      for (d = 0; d < 7; d++) {
        let tableDays = document.createElement("TD");
        tableDays.className = "calendar__cell calendar__day";
        tableDays.innerText = "";
        tableRow.appendChild(tableDays);
      }
    }
  }
}

function calendarSetDays() {
  var week = 0;
  let thisYear = getThisYear();

  for (i = 1; i < 366; i++) {
    let dayOfYear = getDayOfYear(thisYear, i);
    let dateDay = dayOfYear.getDate();
    let dateMonth = dayOfYear.getMonth();
    let dateWeek = dayOfYear.getDay();
    let calendarMonth = document.getElementsByClassName("calendar__table")[dateMonth];


    if (dateDay == 1) {
      week = 0;
    }

    console.log({ dayOfYear, dateDay, dateMonth, dateWeek, week });
    console.log(calendarMonth.children[2]);
    console.log(calendarMonth.children[2].children[0]);
    console.log(calendarMonth.children[2].children[0].children[0]);


    // insert days in the calendar
    calendarMonth.children[2].children[week].children[dateWeek].innerText = dateDay;

    if (dateWeek == 6) {
      week = week + 1;
    }

  }
}


function getThisYear() {
  var date = new Date();
  return date.getFullYear();
}

function getDayOfYear(year, day) {
  var dateDay = new Date(year, 0);
  return new Date(dateDay.setDate(day));
}

var dateDay = new Date(2019, 0);
console.log(dateDay, new Date(dateDay.setDate(1)));

function initCalendar() {
  calendarCreateStructure();
  calendarSetDays();
}

initCalendar();