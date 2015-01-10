getTime();

function getTime() {
    var d = new Date();
    var hours = d.getHours();
    var ampm = hours > 12 ? "pm" : "am";

    hours = hours > 12 ? hours - 12 : hours;

    var minutes = d.getMinutes();

    var seconds = d.getSeconds();

    var mins  = minutes < 10 ? "0" + minutes : minutes;
    var secs = seconds < 10 ? "0" + seconds : seconds;

    var time = "" + hours + ":" + mins + ":" + secs + " " + ampm;
    
    document.getElementById("clock").innerHTML = time; 
    setTimeout(getTime, 1000);
}
