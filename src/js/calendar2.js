let months2 = [
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

let weeks2 = [
    "Mond",
    "Tues",
    "Wedn",
    "Thur",
    "Frid",
    "Satu",
    "Sund"
];

let calendar2 = document.getElementById("calendar2");
let dateNow = new Date();


function calendar2__createStructure() {
    // TABLE
    let tableMonth = document.createElement("TABLE");
    tableMonth.className = "calendar-table";
    calendar2.appendChild(tableMonth);

    let monthCaption = document.createElement("CAPTION");
    monthCaption.className = "calendar-table__caption";
    tableMonth.appendChild(monthCaption);

    // TABLE HEADER - WEEKS
    let tableHead = document.createElement("THEAD");
    tableHead.className = "calendar-table__head";
    tableMonth.appendChild(tableHead);

    let tableRow = document.createElement("TR");
    tableRow.className = "calendar-table__row";
    tableHead.appendChild(tableRow);

    for (let w = 0; w < 7; w++) {
        let tableWeek = document.createElement("TH");
        tableWeek.className = "calendar-table__cell calendar__week";
        tableWeek.innerText = weeks2[w];
        tableRow.appendChild(tableWeek);
    }

    // TABLE BODY - DAYS
    let tableBody = document.createElement("TBODY");
    tableBody.className = "calendar-table__body";
    tableMonth.appendChild(tableBody);

    // TABLE FOOTER - NAV
    let tableFoot = document.createElement("TFOOT");
    tableFoot.className = "calendar-table__foot";
    tableMonth.appendChild(tableFoot);
}

function calendar2__setDate(year, month) {
    let tableCaption = calendar2.getElementsByClassName("calendar-table__caption")[0];
    let tableBody = calendar2.getElementsByClassName("calendar-table__body")[0];

    // CALENDAR
    /*     if (tableCaption != "" && tableBody != "") {
            calendar2__setDays(year, month);
            calendar2__setCaption(year, month);
            calendar2__setNav(year, month);
        } else {
            calendar2__reset(tableCaption, tableBody);
        } */
    calendar2__setDays(year, month);
    calendar2__setCaption(year, month);
    calendar2__setNav(year, month);
}


function calendar2__setDays(year, month) {
    let now = new Date(year, month - 1, 1);
    let last = new Date(year, month, 0);
    let firstDayWeek = now.getDay() == 0 ? 7 : now.getDay();
    let lastDayMonth = last.getDate();
    let day = 0;
    let result = "<tr class='calendar-table__row'>";
    let last_cell = firstDayWeek + lastDayMonth;

    // hacemos un bucle hasta 42, que es el máximo de valores que puede
    // haber... 6 columnas de 7 dias
    for (let i = 1; i <= 42; i++) {
        if (i == firstDayWeek) {
            // determinamos en que dia empieza
            day = 1;
        }
        if (i < firstDayWeek || i >= last_cell) {
            // celda vacia
            result += "<td class='calendar-table__cell'><div class='calendar-month__day'>&nbsp;</td>";
        } else {
            // mostramos el dia
            if (
                day == dateNow.getDate() &&
                month == dateNow.getMonth() + 1 &&
                year == dateNow.getFullYear()
            )
                result += "<td class='calendar-table__cell'><div class='calendar-month__today calendar-month__day'>" + day + "</td>";
            else result += "<td class='calendar-table__cell'><div class='calendar-month__day'>" + day + "</div></td>";
            day++;
        }
        if (i % 7 == 0) {
            if (day > lastDayMonth) break;
            result += "</tr><tr class='calendar-table__row'>\n";
        }
    }
    result += "</tr>";

    calendar2.getElementsByTagName("tbody")[0].innerHTML = result;
}

function calendar2__setCaption(year, month) {
    // CALENDAR - MONTH YEAR
    let monthCaption = calendar2.getElementsByClassName("calendar-table__caption");
    monthCaption[0].innerHTML = `
        <span class='calendar-month__name'>
            ${months2[month - 1]}
        </span>
        <span class='calendar__year'>
            ${year}
        </span>`;
}

function calendar2__setNav(year, month) {
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

    // CALENDAR - FOOT
    let tableFoot = calendar2.getElementsByClassName("calendar-table__foot");
    tableFoot[0].innerHTML = `
        <div class='calendar-nav'>
            <a class='calendar-nav__button calendar-nav__prev'
               onclick='calendar2__setDate(${prevYear},${prevMonth})'>&lt;</a>
            <a class='calendar-nav__button calendar-nav__next'
               onclick='calendar2__setDate(${nextYear},${nextMonth})'>&gt;</a>
        </div>`;

    document.addEventListener('click', function () {
        calendar2__reset();
    });
}


function calendar2__reset(tableCaption, tableBody) {
    tableCaption[0].innerHTML = "";
    tableBody[0].innerHTML = "";
}


window.addEventListener('load', function () {
    if (calendar2 != null) {
        console.log("There is a calendar2");
        calendar2__createStructure();
        calendar2__setDate(dateNow.getFullYear(), dateNow.getMonth() + 1);

    } else {
        console.log("There isn`t a calendar2");
    }
});