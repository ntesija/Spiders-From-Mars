var Expedia{}(
	var hotelApiUrl = "http://terminal2.expedia.com/x/hotels";
	var packageApiUrl = "http://terminal2.expedia.com/x/packages";
	var airportApiUrl = "http://terminal2.expedia.com/x/geo/features?within=50km&"; //make distance configurable later on
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
	originUrl += userLat.toString() + '/' + userLon.toString() + '/' + 'maxAirports=3' + '&user_key=' + sitaPubKey;
	destinationUrl += destLat.toString() + '/' + destLon.toString() + '/' + 'maxAirports=3' + '&user_key=' + sitaPubKey;

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

//This function will loop through the list of airports and find the 3 cheapeast 
//package deal (if any exists) between two airports
//http://terminal2.expedia.com/x/packages?departureDate={departuredate}&originAirport={origin} &destinationAirport={destination}&returnDate={returndate}&regionid={regionid}&apikey=INSERT_KEY_HERE
//date is formatted as "YYYY-MM-DD"
function getBestPackageData(airports, date){

	var dateSplit = date.split("-");
	var eventDate = new Date(parseInt(dateSplit[0]), parseInt(dateSplit[1]), parseInt(dateSplit[2]), 0,0,0,0);
	
	var departureDate = eventDate.getDate() - 1;
	var returnDate = eventDate.getDate() + 1;

	//Formats the day before and the day after as YYYY-MM-DD, as the API expects
	var departString = departureDate.toISOString().split("T",1);
	var returnString = departureDate.toISOString().split("T",1);

	var packageRequestUrl = "http://terminal2.expedia.com/x/packages?departureDate=";
	var origins = airports.origin;
	var dests = airports.dest;
	var packages = [];
	//For every pair of closeby airports between origin and destination, search for a package deal
	for (var originPort in origins.airports){
		for(var destPort in dests.airports){
			//Put together the package request for each pair of airports. Limit package to top result only
			var currentPairRequestUrl = packageRequestUrl + departString + "&originAirport=" + originPort.code;
			currentPairRequestUrl += "&destinationAirport=" + destPort.code + "&returnDate=" + returnString;
			currentPairRequestUrl += "&apikey=" + Expedia.expPubKey;

			var packageXmlHttp = newXMLHttpRequest(); //This could be an issue if callback isn't executed by the time the inner loop finishes execution
			packageXmlHttp.onreadystatechange = function(){
				if(packageXmlHttp.readyState == 4 && packageXmlHttp.responseText == 200){ //add condition for there actually being a package
					packages.push(JSON.parse(packageXmlHttp.responseText));
				}
			}
			packageXmlHttp.open("GET", currentPairRequestUrl, true);
			packageXmlHttp.send();
		}
	}
	//Sort packages by descending price, return the top three
	packages.sort(function(a, b){
		return parseFloat(a.value) - parseFloat(b.value);
	});
	
	return [packages[0], packages [1], packages[2]];
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