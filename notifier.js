let date = new Date(); //Date Object to be used elsewhere!

// store the installation time

chrome.runtime.onInstalled.addListener(details => {
    chrome.storage.local.set({"installTime" : date.getTime(), "tMin" : 0, "tSec" : 0});
})

//Background Timer(dynamic)

let sec = 0; let min = 0; let tabId;

function closeTab() {
    min = 0; sec = 0;
    chrome.storage.local.get(["tabId"], function(tab){ 
        chrome.tabs.remove(tab.tabId); 
    })
}

function minuteMaker() {
    sec++; 
    if (sec === 60) {min++; sec = 0}
    if (min === 20 && sec === 0) {
        chrome.tabs.create({url : "countdown.html", index : 0}, ourTab => {
            tabId = ourTab.id;
        });
        setTimeout(closeTab, 21000)    
    };
    chrome.storage.local.set({"tMin" : min, "tSec" : sec, "tabId" : tabId})
}

setInterval(minuteMaker,1000);               

