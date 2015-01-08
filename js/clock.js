getTime();

function getTime() {
    var d = new Date();
    var hours = d.getHours();
    var ampm = hours > 12 ? "pm" : "am";

    hours = hours > 12 ? hours - 12 : hours;

    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    
    document.getElementById("clock").innerHTML = "" + hours + ":" + minutes + ":" + seconds + " " + ampm;
    setTimeout(getTime, 1000);
}
