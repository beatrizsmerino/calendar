function copyright(){
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();

	document.querySelector("#currentYear").innerHTML = currentYear;
}


document.addEventListener("DOMContentLoaded", function () {
	copyright();
});