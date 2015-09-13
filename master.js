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

//1) Extracting data from the Facebook Event Page DOM
var startDate = new Date(), endDate = new Date(), locationString = "";
$( document ).ready(function() {
	console.log( 'ready!' );
	//var startDate = $("span[itemprop = 'startDate']").attr("content");
	var dateString = $('._3slj ._6a ._5xhp').text();
	locationString = $('._3xd0 ._6a ._5xhp').text();
	console.log(locationString);
	console.log(dateString);

	var now = new Date();
	if (dateString.includes("to")) {
        console.log("this");
		var splitDateStrings = dateString.split("to");
		startDate = new Date(splitDateStrings[0].substring(0, splitDateStrings[0].indexOf('at')) + startDate.getFullYear());
		endDate = new Date(splitDateStrings[1].substring(0, splitDateStrings[1].indexOf('at')) + endDate.getFullYear());
	} else {
		startDate = $("span[itemprop = 'startDate']").attr("content");
		startDate = new Date(startDate);
		//endDate = startDate;
    endDate.setDate(startDate.getDate());
	}
	console.log(startDate);
	console.log(endDate);
  });

//2) Expedia API calls
var airports = getAirports(locationString);
var jsonResponse = getBestPackageData(airports, startDate, endDate);
//3) Parse API call results
var jsonObj = JSON.parse(jsonResponse);

//Package data
var totalPrice = jsonObj.PackageSearchResultList.PackageSearchResult.PackagePrice.TotalPrice.Value;
var packageDetailsURL = jsonObj.PackageSearchResultList.PackageSearchResult.DetailsUrl;

//Flight data
var departureAirportCode = jsonObj.FlightList.Flight.FlightItinerary.FlightLeg[0].FlightSegment[0].DepartureAirportCode;
var departureDateTime =  jsonObj.FlightList.Flight.FlightItinerary.FlightLeg[0].FlightSegment[0].DepartureDateTime;
var numberOfLayovers = jsonObj.FlightList.Flight.FlightItinerary.FlightLeg[0].FlightSegment.length - 1;
var arrivalAirportCode = jsonObj.FlightList.Flight.FlightItinerary.FlightLeg[0].FlightSegment[numberOfLayovers].ArrivalAirportCode;
var arrivalDateTime =  jsonObj.FlightList.Flight.FlightItinerary.FlightLeg[0].FlightSegment[numberOfLayovers].ArrivalDateTime;
var flightPrice = jsonObj.FlightList.Flight.FlightPrice.TotalRate.Value;

//Hotel data
var checkInDate = new Date(jsonObj.HotelList.CheckInDate);
var checkOutDate = new Date(jsonObj.HotelList.CheckOutDate);
var nightsInHotel = checkOutDate - checkInDate; //TODO: revise
var nameOfHotel = jsonObj.HotelList.Hotel.Name;
var hotelStarRating = jsonObj.HotelList.Hotel.StarRating;
var hotelPrice = jsonObj.HotelList.Hotel.HotelPrice.TotalRate.Value;

//4) Insert Expedia Data into DOM

//removing toReturn array
//var toReturn = ["bliiiiing", "", ""];
//toReturn = [startDate, endDate, locationString];

console.log("injecting"); 
isLoaded = false;

//var expediaResult = getExpediaResults(location, startDate, endDate);

var city = toReturn[2];

//toReturn[0].setDate(toReturn[0].getDate()-1);
//toReturn[1].setDate(toReturn[1].getDate()+1);
//var start = toReturn[0].getMonth() + "-" + toReturn[0].getDate() + '-' + toReturn[0].getFullYear();
//var end = toReturn[1].getMonth() + "-" + toReturn[1].getDate() + '-' + toReturn[1].getFullYear();
var price = ['$', '$$', '$$$'];
var url = ['https://www.google.com', 'https://www.google.com', 'https://www.google.com'];

var codeIn = "<li class='expander'><p><center><table style='width:85%' class='titleInfo'><tr><td>Travel to " + city + " from " + departureDateTime + " to " + arrivalDateTime + "</td></tr></table><table style='width:85%' class='info hide'><tr><td> Price: " + totalPrice + " </td><td><div align='right'><form action = '" + packageDetailsURL +"'><input type='submit' value = 'Book Now!'></form></div></td></tr><tr><td> Price: " + price[1] + " </td><td><div align='right'><form action = '" + url[1] + "'><input type='submit' value = 'Book Now!'></form></div></td></tr><tr><td> Price: " + price[2] + " </td><td><div align='right'><form action = '" + url[2] + "'><input type='submit' value = 'Book Now!'></form></div></td></tr></table></p></center><script>var clickArea=document.getElementsByClassName('titleInfo')[0];clickArea.addEventListener('click', function(){var dropDown=document.getElementsByClassName('info')[0];dropDown.classList.toggle('hide');})</script></li>"
if (!isLoaded) {
    var x = $("#event_summary").find("div");
    x.find("ul").append(codeIn);
    console.log("Appeneded li");
    isLoaded = true;
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
function getBestPackageData(airports, startDate, endDate){

	var startSplit = startDate.split("-");
	var eventStart = new Date(parseInt(startSplit[0]), parseInt(startSplit[1]), parseInt(startSplit[2]), 0,0,0,0);
	
	var endSplit = endDate.split("-");
	var eventEnd = new Date(parseInt(endSplit[0]), parseInt(endSplit[1]), parseInt(endSplit[2]), 0,0,0,0);

	var departureDate = eventStart.getDate() - 1;
	var returnDate = eventEnd.getDate() + 1;

	//Formats the day before and the day after as YYYY-MM-DD, as the API expects
	var departString = departureDate.toISOString().split("T",1);
	var returnString = returnDate.toISOString().split("T",1);

	var packageLimit = 3;
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
			currentPairRequestUrl += "&limit=" + packageLimit + "&apikey=" + Expedia.expPubKey;

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