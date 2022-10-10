let i = 1;
function seconds() {
    document.getElementById("count").innerHTML = (i < 10) ? "0" + i : i;
    i++; 
}
setInterval(seconds, 1000);
