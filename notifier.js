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
        chrome.windows.getAll({populate : true}, function(windows) {
            for (let i = 0; i < windows.length; i++) {
                if (windows[i].id === tab.tabId) {
                    chrome.windows.remove(tab.tabId); 
                }
            }
        })
    })
}

function minuteMaker() {
    sec++; 
    let currentTab;
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        currentTab = tabs[0].url;
        currentTab = currentTab.match(/examly/i);
    });
    
    if (sec === 60) {min++; sec = 0}
    if (min === 1 && sec === 0 && currentTab !== "examly") {
        chrome.windows.create({url : "countdown.html", type : "popup", state : "fullscreen"}, ourTab => {
            tabId = ourTab.id;
        });
        setTimeout(closeTab, 21000)    
    };
    if (min == 20 && sec == 0) {
        min = 0; sec = 0;
    }
    chrome.storage.local.set({"tMin" : min, "tSec" : sec, "tabId" : tabId})
}

setInterval(minuteMaker,1000);               

