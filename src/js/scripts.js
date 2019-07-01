
let weeks = [
  "Mond",
  "Tues",
  "Wedn",
  "Thur",
  "Frid",
  "Satu",
  "Sund"
];
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

function calendarStructure() {
  for (m = 0; m <= 11; m++) {
    // MONTHS
    let month = document.createElement("DIV");
    month.className = "calendar__month";
    document.getElementById("calendar").appendChild(month);

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

function calendarDays() {
  for (i = 1; i < 366; i++) {
    let dateInitial = calendarDateInitial(2019, i);
    let date = dateInitial.getDate();
    let dateMonth = dateInitial.getMonth();
    let dateDay = dateInitial.getDay();
    console.log({dateInitial, date, dateMonth, dateDay});
    let calendarTable = document.getElementsByClassName("calendar__table")[dateMonth];

    if (date == 1) {
      var week = 0;
    }
    calendarTable.children[2].children[week].children[dateDay].innerText = date;
    if (dateDay == 6) {
      week = week + 1;
    }
  }
}

function calendarDateInitial(year, day) {
  var date = new Date(year, 0);
  return new Date(date.setDate(day));
}

function initCalendar() {
  calendarStructure();
  calendarDays();
}

initCalendar();