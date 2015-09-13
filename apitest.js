var Expedia{}(
	var hotelApiUrl = "http://terminal2.expedia.com/x/hotels";
	var packageApiUrl = "http://terminal2.expedia.com/x/packages";
	var expPubKey = "37bjvD22imdEkcidS2Uc6bZ6Qe2uGimr";
	var sitaPubKey = "e5d59a09c547bc478101c152c707ea30";
	var xmlhttp = new XMLHttpRequest();
	var airportResp; //To get the closest (largest) airports to arrv and org
	var packageResp; //Get the best package deals
	var userLat;
	var userLon;
	)(Expedia);

//Get user's location after the window loads
window.onload = function() {
	var startPos;
	var geoSuccess = function(position) {
		startPos = position;
		Expedia.userLat = startPos.coords.latitude;
	    Expedia.userLon = startPos.coords.longitude;
	  };
	  navigator.geolocation.getCurrentPosition(geoSuccess);
	}
}
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

function getAirports(destination){
	var originAirports, destAirports;
	var originUrl =  "https://airport.api.aero/airport/nearest/";
	var destinationUrl =  "https://airport.api.aero/airport/nearest/";
	var destLat, destLon;
	destLat = destination.lat;
	destLon = destination.lon;
	originUrl += userLat.toString() + '/' + userLon.toString() + '/' + 'maxAirports=5' + '&user_key=' + sitaPubKey;
	destinationUrl += userLat.toString() + '/' + userLon.toString() + '/' + 'maxAirports=5' + '&user_key=' + sitaPubKey;

}

/*function generatePackageApiRequest(destLocation, date){
	var lat = destLocation.latitude;
	var lon = destLocation.longitude;

}*/

function getXMLResp() {
	if(Expedia.xmlhttp.readyState == 4 && Expedia.xmlhttp.status == 200){
		var myArr = JSON.parse(Expedia.xmlhttp.responseText);
		parseAndDisp(myArr);
	}
}

function exepdiaApi(destination, startDate, endDate) {
	var getDestLocUrl = "";
	generateAirports(location);
	generateApiRequest(location, date);
	Expedia.xmlhttp.onreadystatechange = getXMLResp();
	Expedia.xmlhttp.open("GET", Expedia.hotelApiUrl, true);
	Expedia.xmlhttp.send();
}

function parseAndDisp(myArr) {
	//Finish this display when the HTML layout is complete
}