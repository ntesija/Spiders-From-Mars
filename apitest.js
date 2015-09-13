var hotelApiUrl = "http://terminal2.expedia.com/x/hotels";
var packageApiUrl = "http://terminal2.expedia.com/x/packages";
var pubKey = "37bjvD22imdEkcidS2Uc6bZ6Qe2uGimr";
var xmlhttp = new XMLHttpRequest();
var airportResp; //To get the closest (largest) airports to arrv and org
var packageResp; //Get the best package deals between t
/*
	@param location
		This is a facebook location object passed in JSON format
		This function parses the actual loction of the event and 
		generates a URL request to the expedia framework
	@param date
		A date in YYYY-MM-DD
*/
function generateHotelApiRequest(location, date) {
	var lat = location.latitude;
	var lon = location.longitude;
	hotelApiUrl = hotelApiUrl + '?location=' + lat.toString() + ','
		+ lon.toString() + '&radius=10km' + 'dates=' + date.toString()
		+ '&apikey=' + pubKey.toString();
}
function generatePackageApiRequest(location, date){
	var lat = location.latitude;
	var lon = location.longitude;

}
function getXMLResp() {
	if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
		var myArr = JSON.parse(xmlhttp.responseText);
		parseAndDisp(myArr);
	}
}
function parseAndDisp(myArr) {
	//Finish this display when the HTML layout is complete
}
function exepdiaApi(location, date) {
	generatePackageApiRequest(location, date)
	generateApiRequest(location, date);
	xmlhttp.onreadystatechange = getXMLResp();
	xmlhttp.open("GET", hotelApiUrl, true);
	xmlhttp.send();
}

function 