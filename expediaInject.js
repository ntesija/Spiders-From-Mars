console.log("injecting"); 
isLoaded = false;
var btn = document.createElement("BUTTON");
var t = document.createTextNode("CLICK ME");
var node = document.createElement("LI");
var textnode = document.createTextNode("EXPEDIA.... DOT COM!");
node.appendChild(textnode);
btn.appendChild(t);

//var expediaResult = getExpediaResults(location, startDate, endDate);

if (!isLoaded) {
	var x = $("#event_summary").find("div");
	x.find("ul").append("<li><font-size='12px' face='helvtica''>EXPEDIA</font><p><center><table style = 'width:100%; text-align:center'><tr><td> City </td><td> Day In </td><td> Day Out </td><td> Price: $ </td></tr><tr><td> City </td><td> Day In </td><td> Day Out </td><td> Price: $ </td></tr><tr><td> City </td><td> Day In </td><td> Day Out </td><td> Price: $ </td></tr></table></p></center></li>");
	console.log("Appeneded li");
	isLoaded = true;
}
	