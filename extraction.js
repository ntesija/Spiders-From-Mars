//alert("extraction");



//Sep 12 at 9:00am to Sep 13 at 5:00pm
//Sep 19 at 9:00am to Sep 20 at 5:00pm
//new Date(year, month, day, hours, minutes, seconds, milliseconds)
/*function parseDates (locationString) {
	var now = new Date();
	var splitDateStrings = locationString.split("to");
	var startDate = new Date(splitDateStrings[0].substring(0, splitDateStrings[0].indexOf('at')) + now.getFullYear());
	var endDate = new Date(splitDateStrings[1].substring(0, splitDateStrings[1].indexOf('at')) + now.getFullYear());
	console.log(startDate);
	console.log(endDate);
}*/

//parseDates ("Sep 12 at 9:00am to Sep 13 at 5:00pm");

var toReturn = ["bliiiiing", "", ""];

$( document ).ready(function() {
	var startDate = new Date(), endDate = new Date();
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
		endDate = startDate;
	}
	console.log(startDate);
	console.log(endDate);

    toReturn = [startDate, endDate, locationString];




    console.log("injecting"); 
    isLoaded = false;

    //var expediaResult = getExpediaResults(location, startDate, endDate);

    var city = toReturn[2];
    
    var start = toReturn[0].getMonth() + "-" + toReturn[0].getDate() + '-' + toReturn[0].getFullYear();
    var end = toReturn[1].getMonth() + "-" + toReturn[1].getDate() + '-' + toReturn[1].getFullYear();
    var price = ['$', '$$', '$$$'];
    var url = ['https://www.google.com', 'https://www.google.com', 'https://www.google.com'];

    var codeIn = "<li class='expander'><p><center><table style='width:85%' class='titleInfo'><tr><td>Travel to " + city + " from " + start + " to " + end + "</td></tr></table><table style='width:85%' class='info hide'><tr><td> Price: " + price[0] + " </td><td><div align='right'><form action = '" + url[0] +"'><input type='submit' value = 'Book Now!'></form></div></td></tr><tr><td> Price: " + price[1] + " </td><td><div align='right'><form action = '" + url[1] + "'><input type='submit' value = 'Book Now!'></form></div></td></tr><tr><td> Price: " + price[2] + " </td><td><div align='right'><form action = '" + url[2] + "'><input type='submit' value = 'Book Now!'></form></div></td></tr></table></p></center><script>var clickArea=document.getElementsByClassName('titleInfo')[0];clickArea.addEventListener('click', function(){var dropDown=document.getElementsByClassName('info')[0];dropDown.classList.toggle('hide');})</script></li>"
    if (!isLoaded) {
        var x = $("#event_summary").find("div");
        x.find("ul").append(codeIn);
        console.log("Appeneded li");
        isLoaded = true;
}


});







/*//xpath
//attripudes equal selector
window.onload = function(){ // this could be done faster with the livequery() plugin for jquery
	elt = document.createElement('iframe');
	elt.id = 'facebook_load_frame';
	elt.src = 'https://<YOUR_FACEBOOK_APP_URL>/iframe.html';
	document.getElementsByTagName('body')[0].appendChild(elt);
};
// Message passing API from David Walsh at http://davidwalsh.name/window-iframe
// Create IE + others compatible event handler
var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
// Listen to message from child window
eventer(messageEvent,function(e) {
	console.log("Connection status: "+e.data.connectStatus+"; UserID: "+e.data.userID+"; AccessToken: "+e.data.accessToken);
	 //This is the data from the Facebook SDK
},false);



//"my" code
 FB.init({
    appId      : '1465388573767982',
    status     : true,
    version    : 'v2.4' // or v2.0, v2.1, v2.0
 });

console.log(FB);
FB.getLoginStatus(function(response) {
  alert("getLoginStatus() has been called.")
  if (response.status === 'connected') {
    // the user is logged in and has authenticated your
    // app, and response.authResponse supplies
    // the user's ID, a valid access token, a signed
    // request, and the time the access token 
    // and signed request each expire
    alert("Login status is connected");
    var uid = response.authResponse.userID;
    var accessToken = response.authResponse.accessToken;
  } else if (response.status === 'not_authorized') {
    // the user is logged in to Facebook, 
    // but has not authenticated your app
    alert("User is logged in, but not authenticated in app");
  } else {
    // the user isn't logged in to Facebook.
    alert("User is not connected to Facebook");
  }
 });
/*
var eventID = '/879765798737885';

FB.getLoginStatus(function(response) {
   var token = response.authResponse.accessToken;
});

FB.api(
  eventID,
  'GET',
  {"fields": "start_time, end_time, location, access_token: token"},
  function(response) {
      // This function is called after GET data is retrieved. Need to parse response here
	if (!response || response.error) {
	  alert('Error occured');
	} else {
	  alert("Good Response");
	}
  }
);*/