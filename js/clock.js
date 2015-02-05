$(document).ready(function() {
        getTime();
        getTemp();
        });

function showAlarmPopup() {
    $("#mask").removeClass("hide");
    $("#popup").removeClass("hide");
}

function hideAlarmPopup() {
    $("#mask").addClass("hide");
    $("#popup").addClass("hide");
}

function insertAlarm(hours, mins, ampm, alarmName) {
    var listing = $("<div>").addClass("flexable");
    listing.append($("<div>").addClass("name").html(alarmName));

    var time = "" + hours + ":" + mins + ampm;
    listing.append($("<div>").addClass("time").html(time));
    $("#alarms").append(listing); 
}

function addAlarm() {
    var hours = $("#hours option:selected").text();
    var mins = $("#mins option:selected").text();
    var ampm = $("#ampm option:selected").text();
    var alarmName = $("#alarmName").val(); 
    insertAlarm(hours, mins, ampm, alarmName);
    hideAlarmPopup();
}

function getTime() {
    var d = new Date();
    var hours = d.getHours();
    var ampm = hours > 12 ? "pm" : "am";

    hours = hours > 12 ? hours - 12 : hours;
    if (hours == 0)
        hours = 12;

    var minutes = d.getMinutes();

    var seconds = d.getSeconds();

    var mins  = minutes < 10 ? "0" + minutes : minutes;
    var secs = seconds < 10 ? "0" + seconds : seconds;

    var time = "" + hours + ":" + mins + ":" + secs + " " + ampm;
    
    document.getElementById("clock").innerHTML = time; 
    setTimeout(getTime, 1000);
}

function getTemp() {
    $.getJSON("https://api.forecast.io/forecast/946a91a7ec0e59c41c392a71c9a934b0/35.300399,-120.662362?callback=?", 
            function(results) {
            var temp = results["daily"]["data"][0]["temperatureMax"];
            var className;

            $("#forecastIcon").attr("src", "img/" + results["daily"]["data"][0]["icon"] + ".png");
            $("#forecastLabel").html(results["daily"]["data"][0]["summary"]);

            if (temp >= 90) {
            className = "hot";
            }
            else if (temp >= 80) {
            className = "warm";
            }
            else if (temp >= 70) {
            className = "nice";
            }
            else if (temp >= 60) {
            className = "chilly";
            }
            else {
                className = "cold";
            }
            $("body").addClass(className);
            }
            );

}
