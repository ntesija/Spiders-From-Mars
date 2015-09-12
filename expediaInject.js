console.log("injecting"); 
isLoaded = false;
var btn = document.createElement("BUTTON");
var t = document.createTextNode("CLICK ME");
var node = document.createElement("LI");
var textnode = document.createTextNode("EXPEDIA.... DOT COM!");
node.appendChild(textnode);
btn.appendChild(t);

if (!isLoaded) {
	var x = $("#event_summary").find("div");
	x.find("ul").append("<li> Hi </li>");
	console.log("Appeneded li");
	isLoaded = true;
}
	