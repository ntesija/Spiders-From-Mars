var hotelApiUrl = "";
var autoApiUrl = "";

var xmlhttp = new XMLHttpRequest();

function generateApiRequest(locationJson) {

}
function getXMLResp() {
	if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
		var myArr = JSON.parse(xmlhttp.responseText);
		parseXML(myArr);
	}
}
function parseAndDisp(myArr) {

}

xmlhttp.onreadystatechange = getXMLResp();
xmlhttp.open("GET", hotelApiUrl, true);
xmlhttp.send();