function loadTime() {
    chrome.storage.local.get(["installTime", "tMin", "tSec"], time => {
        let counter = `${time.tMin} : ${time.tSec}`;
        if (time.tMin === 20 && time.tSec <= 21) {
            document.getElementById("img").src = "2close.png";
            document.getElementById("min20").innerHTML = "Please stop looking at the screen!"
        }
        else {
            document.getElementById("min20").innerHTML =  "Rest your Eyes in " + counter;
        }
    })
}

loadTime(); 

setInterval(loadTime , 1000)
