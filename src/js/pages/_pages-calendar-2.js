"use strict";

document.addEventListener("DOMContentLoaded", function () {
	if (document.querySelector("html").classList.contains("page-calendar-2")) {
		var meses = Array(
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
			"Diciembre"
		);

		let weeks = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];

		var actual = new Date();

		function mostrarCalendario(year, month) {
			var now = new Date(year, month - 1, 1);
			var last = new Date(year, month, 0);
			var primerDiaSemana = now.getDay() == 0 ? 7 : now.getDay();
			var ultimoDiaMes = last.getDate();
			var dia = 0;
			var resultado = '<tr class="calendar__row">';
			var diaActual = 0;
			var last_cell = primerDiaSemana + ultimoDiaMes;

			// hacemos un bucle hasta 42, que es el máximo de valores que puede
			// haber... 6 columnas de 7 dias
			for (var i = 1; i <= 42; i++) {
				if (i == primerDiaSemana) {
					// determinamos en que dia empieza
					dia = 1;
				}
				if (i < primerDiaSemana || i >= last_cell) {
					// celda vacia
					resultado += `
					<td class="calendar__cell calendar__day">
						<span>
							&nbsp;
						</span>
					</td>
				`;
				} else {
					// mostramos el dia
					if (
						dia == actual.getDate() &&
						month == actual.getMonth() + 1 &&
						year == actual.getFullYear()
					)
						resultado += `
						<td class="calendar__cell calendar__day calendar__today">
							<span>
								${dia}
							</span>
						</td>
					`;
					else
						resultado += `
					<td class="calendar__cell calendar__day">
						<span>
							${dia}
						</span>
					</td>
				`;
					dia++;
				}
				if (i % 7 == 0) {
					if (dia > ultimoDiaMes) break;
					resultado += '</tr><tr class="calendar__row">';
				}
			}
			resultado += "</tr>";

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
							${meses[month - 1]}
						</span>
						<span class='calendar__year'>
							${year}
						</span>
					</div>
					<div class="button__list button__list--center">
						<a class="button button--line-black" onclick='mostrarCalendario(${prevYear},${prevMonth})'>
							&lt;
						</a>
						<a class="button button--line-black" onclick='mostrarCalendario(${nextYear},${nextMonth})'>
							&gt;
						</a>
					</div>
				</div>
			`;
			document
				.getElementById("calendar")
				.getElementsByTagName("tbody")[0].innerHTML = resultado;
		}

		mostrarCalendario(actual.getFullYear(), actual.getMonth() + 1);

		let buttonToday = document.getElementById("goToday");
		let buttonNextYear = document.getElementById("goNextYear");
		let buttonLastYear = document.getElementById("goLastYear");

		buttonToday.addEventListener("click", function () {
			mostrarCalendario(actual.getFullYear(), actual.getMonth() + 1);
		});

		buttonNextYear.addEventListener("click", function () {
			mostrarCalendario(actual.getFullYear() + 1, actual.getMonth() + 1);
		});

		buttonLastYear.addEventListener("click", function () {
			mostrarCalendario(actual.getFullYear() - 1, actual.getMonth() + 1);
		});
	}
});
