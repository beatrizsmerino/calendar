/**
 * @file _components-date.js
 * @module date
 * @description Component Date
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2021)
 */





/**
 * @const settings
 * @description Settings with the languages, months and weeks
 */
const settings = {
	languages: {
		selected: "en",
		list: [
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
		]
	},
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



/**
 * @function getThisYear
 * @description Get this year
 * @returns 
 */
function getThisYear() {
	const date = new Date();
	return date.getFullYear();
}



/**
 * @function getThisMonth
 * @description Get this month
 * @returns
 */
function getThisMonth() {
	const date = new Date();

	// January is 0!
	return date.getMonth() + 1;
}



/**
 * @function getThisDay
 * @description Get this day
 * @returns
 */
function getThisDay() {
	const date = new Date();
	return date.getDate();
}



/**
 * @function getDayOfYear
 * @description 
 * @returns
 */
function getDayOfYear(year, day) {
	const dateDay = new Date(year, 0);
	return new Date(dateDay.setDate(day));
}



/**
 * @function getToday
 * @description Get current day as formatt: YYYY-MM-DD
 * @returns
 */
function getToday() {
	const today = getDateAsYearMonthDay(
		getThisYear(),
		getThisMonth(),
		getThisDay()
	);
	return today;
}



/**
 * @function getDateAsYearMonthDay
 * @description Get date as formatt: YYYY-MM-DD
 * @returns
 */
function getDateAsYearMonthDay(year, month, day) {
	const yyyy = String(year);
	const mm = String(month).padStart(2, "0");
	const dd = String(day).padStart(2, "0");
	const yearMonthDay = `${yyyy}-${mm}-${dd}`;
	return yearMonthDay;
}



/**
 * @function getDateAsDayMonthYear
 * @description Get date as formatt: DD-MM-YYYY
 * @returns
 */
function getDateAsDayMonthYear(day, month, year) {
	const dd = String(day).padStart(2, "0");
	const mm = String(month).padStart(2, "0");
	const yyyy = String(year);
	const dayMonthYear = `${dd}-${mm}-${yyyy}`;
	return dayMonthYear;
}



/**
 * @function getDateAsText
 * @description Get date as formatt: DD de Month de YYYY
 * @returns
 */
function getDateAsText(date) {
	const dateArray = date.split('-');
	const dateMonthText = settings.months.es[parseInt(dateArray[1])];
	const dateFormatted = `${dateArray[2]} de ${dateMonthText} de ${dateArray[0]}`;
	return dateFormatted;
}



export {
	settings,
	getThisYear,
	getThisMonth,
	getThisDay,
	getDayOfYear,
	getToday,
	getDateAsYearMonthDay,
	getDateAsDayMonthYear,
	getDateAsText
}