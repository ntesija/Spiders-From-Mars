console.log("injecting"); 
isLoaded = false;

//var expediaResult = getExpediaResults(location, startDate, endDate);

var city = 'city';
var start = 'Day In';
var end = 'Day Out';
var price = ['$', '$$', '$$$'];
var url = ['https://www.google.com', 'https://www.google.com', 'https://www.google.com'];

var codeIn = "<li class='expander'><p><center><table style='width:85%' class='titleInfo'><tr><td>Travel to " + city + " from " + start + " to " + end + "</td></tr></table><table style='width:85%' class='info hide'><tr><td> Price: " + price[0] + " </td><td><form action = 'http://google.com'><input type='submit' value = 'Book!'></form></td></tr><tr><td> Price: " + price[1] + " </td><td><form action = 'http://google.com'><input type='submit' value = 'Book!'></form></td></tr><tr><td> Price: " + price[2] + " </td><td><form action = 'http://google.com'><input type='submit' value = 'Book!'></form></td></tr></table></p></center><script>var clickArea=document.getElementsByClassName('titleInfo')[0];clickArea.addEventListener('click', function(){var dropDown=document.getElementsByClassName('info')[0];dropDown.classList.toggle('hide');})</script></li>"
if (!isLoaded) {
	var x = $("#event_summary").find("div");
	x.find("ul").append(codeIn);
	console.log("Appeneded li");
	isLoaded = true;
}
	