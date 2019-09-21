function formDataObj(formArray) {
    //serialize data function
    var returnObj = {};
    for (var i = 0; i < formArray.length; i++){
        returnObj[formArray[i].name] = formArray[i].value;
    }
    return returnObj;
}

function formDataJson(form) {
    var jsonArray = [],
        formData = form.serializeArray(),
        convertFormDataToJson = formDataObj(formData),
        jsonData = JSON.stringify(convertFormDataToJson, undefined, 2);
    
    jsonArray.push(jsonData);

    console.group("Form - Save days");
    console.log(jsonArray);
    console.log(typeof jsonArray);
    console.log(jsonArray[0]);
    console.groupEnd();

    return jsonArray;
}

var datesSavedCalendar = [];
$(function () {
    //$("#datepicker").datepicker();
    $("#calendar3Save").submit(function (e) {
        e.preventDefault();
        datesSavedCalendar = formDataJson($(this));
    });
});


////////////////////////////////


// CALENDAR
let months3 = [
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

let weeks3 = ["Mond", "Tues", "Wedn", "Thur", "Frid", "Satu", "Sund"];

let calendar = document.getElementById("calendar3");
let dateNow = new Date();

function calendar3__createStructure() {
    // TABLE
    let tableMonth = document.createElement("TABLE");
    tableMonth.className = "calendar-table";
    calendar.appendChild(tableMonth);

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
        tableWeek.innerText = weeks3[w];
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

function calendar3__setDate(year, month) {
    calendar3__setDays(year, month);
    calendar3__setCaption(year, month);
    calendar3__setNav(year, month);
}

function calendar3__setDays(year, month) {
    let now = new Date(year, month - 1, 1);
    let last = new Date(year, month, 0);
    let firstDayWeek = now.getDay() == 0 ? 7 : now.getDay();
    let lastDayMonth = last.getDate();
    let day = 0;
    let result = "<tr class='calendar-table__row'>";
    let last_cell = firstDayWeek + lastDayMonth;

    // hacemos un bucle hasta 42, que es el máximo de valores que puede
    // haber... 6 columnas de 7 dias
    var calendarDaysDateArray = [];

    for (let i = 1; i <= 42; i++) {
        if (i == firstDayWeek) {
            // determinamos en que dia empieza
            day = 1;
        }
        if (i < firstDayWeek || i >= last_cell) {
            // celda vacia
            result +=
                "<td class='calendar-table__cell'><div class='calendar-month__day' data-date='0'>&nbsp;</td>";
        } else {
            // mostramos el dia
            if (
                day == dateNow.getDate() &&
                month == dateNow.getMonth() + 1 &&
                year == dateNow.getFullYear()
            ) {
                result +=
                    "<td class='calendar-table__cell'><div class='calendar-month__today calendar-month__day'>" +
                    day +
                    "</td>";
            } else {
                var zeroMonth = "";
                var zeroDay = "";

                if (day.toString().length == 1) {
                    zeroDay = parseInt("0" + day.toString());
                } else {
                    zeroDay = day;
                }

                if (month.toString().length == 1) {
                    zeroMonth = parseInt("0" + month.toString());
                } else {
                    zeroMonth = month;
                }

                calendarDaysDateArray.push({ date: { year: year, month: zeroMonth, day: zeroDay } });

                result += "<td class='calendar-table__cell'>";
                result += "<div class='calendar-month__day' data-date=" + year + "-" + zeroMonth + "-" + zeroDay + ">";
                result += day;
                result += "</div>";
                result += "</td>";
            }
            day++;
        }
        
        if (i % 7 == 0) {
            if (day > lastDayMonth) break;
            result += "</tr><tr class='calendar-table__row'>\n";
        }
    }
    result += "</tr>";

    console.group("Calendar - Month's days");
    console.log(calendarDaysDateArray);
    console.log(typeof calendarDaysDateArray);
    console.groupEnd();

    let tableBody = calendar.getElementsByTagName("tbody")[0];
    tableBody.innerHTML = result;

    var tableRowNum = tableBody.getElementsByClassName("calendar-table__row").length;

    if (tableRowNum < 6) {
        for (let count = tableRowNum; count < 6; count++) {
            let tableRow = document.createElement("TR");
            tableRow.className = "calendar-table__row";

            for (let d = 0; d < 7; d++) {
                let tableTd = document.createElement("TD");
                tableTd.className = "calendar-table__cell";

                let tableDay = document.createElement("DIV");
                tableDay.className = "calendar-month__day";
                tableTd.appendChild(tableDay);

                tableRow.appendChild(tableTd);
            }

            tableBody.appendChild(tableRow);
        }
    }
}

function calendar3__setCaption(year, month) {
    // CALENDAR - MONTH YEAR
    let monthCaption = calendar.getElementsByClassName("calendar-table__caption");
    monthCaption[0].innerHTML = `
        <span class='calendar-month__name'>
            ${months3[month - 1]}
        </span>
        <span class='calendar__year'>
            ${year}
        </span>`;
}

function calendar3__setNav(year, month) {
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
    let tableFoot = calendar.getElementsByClassName("calendar-table__foot");
    tableFoot[0].innerHTML = `
              <div class='calendar-nav'>
                  <a class='calendar-nav__button calendar-nav__prev'
                      onclick='calendar3__setDate(${prevYear},${prevMonth})'></a>
                  <a class='calendar-nav__button calendar-nav__next'
                      onclick='calendar3__setDate(${nextYear},${nextMonth})'></a>
          </div>`;
}

window.addEventListener("load", function () {
    calendar3__createStructure();
    calendar3__setDate(dateNow.getFullYear(), dateNow.getMonth() + 1);
});