console.log("injecting"); 
isLoaded = false;

//var expediaResult = getExpediaResults(location, startDate, endDate);

var city = 'city';
var start = 'Day In';
var end = 'Day Out';
var price = ['$', '$$', '$$$'];
var url = ['https://www.google.com', 'https://www.google.com', 'https://www.google.com'];

var codeIn = "<li class='expander'><p><center><table style='width:85%' class='titleInfo'><tr><td>Travel to " + city + " from " + start + " to " + end + "</td></tr></table><table style='width:85%' class='info hide'><tr><td> Price: " + price[0] + " </td><td><div align='right'><form action = '" + url[0] +"'><input type='submit' value = 'Book Now!'></form></div></td></tr><tr><td> Price: " + price[1] + " </td><td><div align='right'><form action = '" + url[1] + "'><input type='submit' value = 'Book Now!'></form></div></td></tr><tr><td> Price: " + price[2] + " </td><td><div align='right'><form action = '" + url[2] + "'><input type='submit' value = 'Book Now!'></form></div></td></tr></table></p></center><script>var clickArea=document.getElementsByClassName('titleInfo')[0];clickArea.addEventListener('click', function(){var dropDown=document.getElementsByClassName('info')[0];dropDown.classList.toggle('hide');})</script></li>"
if (!isLoaded) {
	var x = $("#event_summary").find("div");
	x.find("ul").append(codeIn);
	console.log("Appeneded li");
	isLoaded = true;
}
	