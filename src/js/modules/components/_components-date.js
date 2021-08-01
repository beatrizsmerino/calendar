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
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
			"Sunday",
		],
		fr: [
			"Lundi",
			"Mardi",
			"Mercredi",
			"Jeudi",
			"Vendredi",
			"Samedi",
			"Dimanche"
		],
		es: [

			"Lunes",
			"Martes",
			"Miércoles",
			"Jueves",
			"Viernes",
			"Sábado",
			"Domingo"
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
 * @description Sets the day of the month
 * @param {Number} year - Number of year
 * @param {Number} day - Number of day
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
 * @function getWeeksStartAtWeekend
 * @description The week starts at the weekend (on Sunday)
 * @param {String} language - Language selected
 * @returns
 */
function getWeeksStartAtWeekend(language) {
	const languageSelected = language;
	const weeks = settings.weeks[languageSelected];
	const weeksLast = weeks[weeks.length - 1];

	let weeksFormatted = weeks.slice(0, -1);
	weeksFormatted.unshift(weeksLast);

	return weeksFormatted;
}



/**
 * @function getDateAsYearMonthDay
 * @description Get date as formatt: YYYY-MM-DD
 * @param {Number} year - Number of year
 * @param {Number} month - Number of month
 * @param {Number} day - Number of day
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
 * @param {Number} day - Number of day
 * @param {Number} month - Number of month
 * @param {Number} year - Number of year
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
 * @param {String} date - Date as formatt YYYY-MM-DD
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
	getWeeksStartAtWeekend,
	getDateAsYearMonthDay,
	getDateAsDayMonthYear,
	getDateAsText
}