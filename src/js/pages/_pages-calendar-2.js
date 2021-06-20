"use strict";

document.addEventListener("DOMContentLoaded", function () {
	if (document.querySelector("html").classList.contains("page-calendar-2")) {
		const settings = {
			months: [
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
			weeks: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
		};

		var date = new Date();

		function calendarCreate(year, month) {
			var now = new Date(year, month - 1, 1);
			var last = new Date(year, month, 0);
			var firstDayOfWeek = now.getDay() == 0 ? 7 : now.getDay();
			var lastDayOfMonth = last.getDate();
			var day = 0;
			var result = '<tr class="calendar__row">';
			var lastCell = firstDayOfWeek + lastDayOfMonth;

			// hacemos un bucle hasta 42, que es el máximo de valores que puede
			// haber... 6 columnas de 7 dias
			for (var i = 1; i <= 42; i++) {
				if (i == firstDayOfWeek) {
					// determinamos en que dia empieza
					day = 1;
				}
				if (i < firstDayOfWeek || i >= lastCell) {
					// celda vacia
					result += `
						<td class="calendar__cell calendar__day">
							<span>
								&nbsp;
							</span>
						</td>
					`;
				} else {
					// mostramos el dia
					if (
						day == date.getDate() &&
						month == date.getMonth() + 1 &&
						year == date.getFullYear()
					)
						result += `
							<td class="calendar__cell calendar__day calendar__today">
								<span>
									${day}
								</span>
							</td>
						`;
					else
						result += `
							<td class="calendar__cell calendar__day">
								<span>
									${day}
								</span>
							</td>
						`;
					day++;
				}
				if (i % 7 == 0) {
					if (day > lastDayOfMonth) break;
					result += '</tr><tr class="calendar__row">';
				}
			}
			result += "</tr>";

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

			document
				.getElementById("calendar")
				.getElementsByTagName("caption")[0].innerHTML = `
					<div>
						<div class="calendar__title">
							<span class='calendar__month'>
								${settings.months[month - 1]}
							</span>
							<span class='calendar__year'>
								${year}
							</span>
						</div>
						<div class="button__list button__list--center">
							<a class="button button--line-black" onclick='calendarCreate(${prevYear},${prevMonth})'>
								&lt;
							</a>
							<a class="button button--line-black" onclick='calendarCreate(${nextYear},${nextMonth})'>
								&gt;
							</a>
						</div>
					</div>
				`;
			document
				.getElementById("calendar")
				.getElementsByTagName("tbody")[0].innerHTML = result;
		}

		calendarCreate(date.getFullYear(), date.getMonth() + 1);

		let buttonToday = document.getElementById("goToday");
		let buttonNextYear = document.getElementById("goNextYear");
		let buttonLastYear = document.getElementById("goLastYear");

		buttonToday.addEventListener("click", function () {
			calendarCreate(date.getFullYear(), date.getMonth() + 1);
		});

		buttonNextYear.addEventListener("click", function () {
			calendarCreate(date.getFullYear() + 1, date.getMonth() + 1);
		});

		buttonLastYear.addEventListener("click", function () {
			calendarCreate(date.getFullYear() - 1, date.getMonth() + 1);
		});
	}
});
