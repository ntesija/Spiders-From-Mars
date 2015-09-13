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
		generates a URL request to the expedia framework for 
		hotels at and around a certain latitude and longitude
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

/*
	@param destination
		This is the destination of the facebook event,
		as a string address

	This function is meant to return two JSON objects
	fromatted according to the SITA API. This contains
	The IATA codenames of the 5 closest airports to the
	origin and destination. These code names are necessary
	to retrieve package deal information from the Expedia
	API.
*/
function getAirports(destination){
	var originAirports, destAirports;
	var originUrl =  "https://airport.api.aero/airport/nearest/";
	var destinationUrl =  "https://airport.api.aero/airport/nearest/";
	var destLat, destLon;
	
	var originIsDone = false;
	var destIsDone = false;

	var latlng = getGeocode(destination);
	destLat = latlng.lat;
	destLon = latlng.lng;
	//Specify the request to the SITA API
	originUrl += userLat.toString() + '/' + userLon.toString() + '/' + 'maxAirports=5' + '&user_key=' + sitaPubKey;
	destinationUrl += destLat.toString() + '/' + destLon.toString() + '/' + 'maxAirports=5' + '&user_key=' + sitaPubKey;

	var originXmlHttp = new XMLHttpRequest();
	var destXmlHttp = new XMLHttpRequest();

	//Declare arrays to hold the data for the closest airports to the origin and destination
	var originArr;
	var destArr;
	originXmlHttp.onreadystatechange = function(){
		if(originXmlHttp.readyState == 4 && originXmlHttp.status == 200){
			originArr = JSON.parse(originXmlHttp.responseText);
		}
		originIsDone = true;
	}
	destXmlHttp.onreadystatechange = function(){
		if(destXmlHttp.readyState == 4 && destXmlHttp.status == 200){
			destArr = JSON.parse(destXmlHttp.responseText);
		}
		destIsDone = true;
	}

	originXmlHttp.open("GET", originUrl, true);
	originXmlHttp.send();
	destXmlHttp.open("GET", destinationUrl, true);
	destXmlHttp.send();

	//Wait until both requests are served (TODO: ADD TIMEOUT)
	while(!originIsDone || !destIsDone){
		continue;
	}
	return {origin: originArr, dest: destArr};
}

function getGeocode(destination) {
	var latlng;
	var doneReading = false;
	geocoder.geocode({'address': destination}, function(results, status) {
	if (status === google.maps.GeocoderStatus.OK) {
		latlng = results[0].geometry.location;
		doneReading = true;
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
	});
	while(!doneReading){ //TODO: add timeout for async wait code
		continue;
	}
	return latlng;
}

//This function will loop through the list of airports and find the cheapeast 
//package deal (if any exists) between two airports
function getPackageData(airports){
	var origin = airports.origin;
	var dest = airports.dest;

	
}

/*
function getXMLResp() {
	if(Expedia.xmlhttp.readyState == 4 && Expedia.xmlhttp.status == 200){
		var myArr = JSON.parse(Expedia.xmlhttp.responseText);
	}
}

function exepdiaApi(destination, startDate, endDate) {
	var getDestLocUrl = "";
	getAirports(location);
	
	Expedia.xmlhttp.onreadystatechange = getXMLResp();
	Expedia.xmlhttp.open("GET", Expedia.hotelApiUrl, true);
	Expedia.xmlhttp.send();
}
*/