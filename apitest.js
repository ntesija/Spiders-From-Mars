var Expedia{}(
	var hotelApiUrl = "http://terminal2.expedia.com/x/hotels";
	var packageApiUrl = "http://terminal2.expedia.com/x/packages";
	var pubKey = "37bjvD22imdEkcidS2Uc6bZ6Qe2uGimr";
	var xmlhttp = new XMLHttpRequest();
	var airportResp; //To get the closest (largest) airports to arrv and org
	var packageResp; //Get the best package deals between t
	)(Expedia);
/*
	@param location
		This is a facebook location object passed in JSON format
		This function parses the actual loction of the event and 
		generates a URL request to the expedia framework
	@param date
		A date in YYYY-MM-DD
*/
function generateHotelApiRequest(destLocation, date) {
	var lat = destLocation.latitude;
	var lon = destLocation.longitude;
	Expedia.hotelApiUrl = Expedia.hotelApiUrl + '?location=' + lat.toString() + ','
		+ lon.toString() + '&radius=10km' + 'dates=' + date.toString()
		+ '&apikey=' + Expedia.pubKey.toString();
}
function generatePackageApiRequest(destLocation, date){
	var lat = destLocation.latitude;
	var lon = destLocation.longitude;

}
function getXMLResp() {
	if(Expedia.xmlhttp.readyState == 4 && Expedia.xmlhttp.status == 200){
		var myArr = JSON.parse(Expedia.xmlhttp.responseText);
		parseAndDisp(myArr);
	}
}
function parseAndDisp(myArr) {
	//Finish this display when the HTML layout is complete
}
function exepdiaApi(location, startDate, endDate) {
	generatePackageApiRequest(location, date)
	generateApiRequest(location, date);
	Expedia.xmlhttp.onreadystatechange = getXMLResp();
	Expedia.xmlhttp.open("GET", Expedia.hotelApiUrl, true);
	Expedia.xmlhttp.send();
}

function 