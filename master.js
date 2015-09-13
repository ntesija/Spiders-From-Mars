
//1) Extracting data from the Facebook Event Page DOM
var startDate = new Date(), endDate = new Date();
$( document ).ready(function() {
	console.log( 'ready!' );
	//var startDate = $("span[itemprop = 'startDate']").attr("content");
	var dateString = $('._3slj ._6a ._5xhp').text();
	var locationString = $('._3xd0 ._6a ._5xhp').text();
	console.log(locationString);
	console.log(dateString);

	var now = new Date();
	if (dateString.includes("to")) {
        console.log("this");
		var splitDateStrings = dateString.split("to");
		startDate = new Date(splitDateStrings[0].substring(0, splitDateStrings[0].indexOf('at')) + startDate.getFullYear());
		endDate = new Date(splitDateStrings[1].substring(0, splitDateStrings[1].indexOf('at')) + endDate.getFullYear());
	} else {
                console.log("that");

		startDate = $("span[itemprop = 'startDate']").attr("content");
		startDate = new Date(startDate);
		//endDate = startDate;
        endDate.setDate(startDate.getDate());
	}
	console.log(startDate);
	console.log(endDate);
  });

//2) Expedia API calls

//3) Parse API call results
var jsonResponse = '{}';
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


