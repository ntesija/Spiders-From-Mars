    var btn = document.createElement("BUTTON")
    var t = document.createTextNode("CLICK ME");
    /*chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            t = document.createTextNode(request.greeting);



        });*/
    btn.appendChild(t);
    //Appending to DOM 
    document.getElementById("headerArea").appendChild(btn);
