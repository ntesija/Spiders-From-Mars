console.log("injecting"); 
isLoaded = false;

//var expediaResult = getExpediaResults(location, startDate, endDate);

if (!isLoaded) {
	var x = $("#event_summary").find("div");
	x.find("ul").append("<li class = 'expander'><p><center><table style='width:85%' class='titleInfo'><tr><td>EXPEDIA</td></tr></table><table style='width:85%' class='info hide'><tr><td> City </td><td> Day In </td><td> Day Out </td><td> Price: $ </td></tr><tr><td> City </td><td> Day In </td><td> Day Out </td><td> Price: $ </td></tr><tr><td> City </td><td> Day In </td><td> Day Out </td><td> Price: $ </td></tr></table></p></center><script>var clickArea=document.getElementsByClassName('titleInfo')[0];clickArea.addEventListener('click', function(){var dropDown=document.getElementsByClassName('info')[0];dropDown.classList.toggle('hide');})</script></li>");
	console.log("Appeneded li");
	isLoaded = true;
}