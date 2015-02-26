$(document).ready(function() {
        getTime();
        getTemp();
        fillDropdowns();
        });

// used to hold userid
var USERID;

function deleteAlarm() {
    var id = $("#deleteAlarm").val();
   if (!USERID || !id)
      return;

    var AlarmObject = Parse.Object.extend("Alarm");
    var query = new Parse.Query(AlarmObject); 
    query.get(id, {
success: function(object) {
object.destroy( {
success: function(myobject) {
$("#deleteAlarm").empty();
$("#deleteAlarm").append("<option></option>");
getAllAlarms(USERID);
}
});
},
error: function(object, error) {
document.write("error");
}
});
}

function fillDropdowns() {
    var dropdown = $("#hours");

    for (var i = 1; i <= 12; i++)
        dropdown.append("<option>" + i + "</option>");

    dropdown = $("#mins");
    for (var i = 0; i <= 59; i++) {
        dropdown.append("<option>" + (i < 10 ? "0" + i : i) + "</option>"); 
    }

}

function getAllAlarms(userid) {
    Parse.initialize("vSvlrhH9RNAxhGK4Y6tJ8AsCT6tFWOQd3QLwhcdM", "TRxPNlxUTmAt5rQUHIvot46RwYNFp4CqW4VHEPcG");
    var AlarmObject = Parse.Object.extend("Alarm");
    var query = new Parse.Query(AlarmObject);
    query.equalTo('userid', userid);
    $("#alarms").empty();
    query.find({
success: function(results) {
for (var i = 0; i < results.length; i++) {
insertAlarm(results[i].get("time"), results[i].get("alarmName"));

// add to list of alarms to delete
$("#deleteAlarm").append("<option value=\"" + results[i].id + "\">" 
    + results[i].get("alarmName") + "</option>");
}
}
});
}

function showAlarmPopup() {
   if (!USERID) {
      alert("You ain't logged in...");
      return;
   }
    $("#mask").removeClass("hide");
    $("#popup").removeClass("hide");
}

function hideAlarmPopup() {
    $("#mask").addClass("hide");
    $("#popup").addClass("hide");
}

function insertAlarm(time, alarmName) {
    var listing = $("<div>").addClass("flexable");
    listing.append($("<div>").addClass("name").html(alarmName));

    listing.append($("<div>").addClass("time").html(time));
    $("#alarms").append(listing); 


}

function addAlarm() {
    var hours = $("#hours option:selected").text();
    var mins = $("#mins option:selected").text();
    var ampm = $("#ampm option:selected").text();
    var time = "" + hours + ":" + mins + ampm;

    var alarmName = $("#alarmName").val(); 

    var AlarmObject = Parse.Object.extend("Alarm");
    var alarmObject = new AlarmObject();
    alarmObject.save({"userid": USERID, "time": time, "alarmName": alarmName}, {
success: function(object) {
insertAlarm(time, alarmName);
hideAlarmPopup();

// add to list of alarms to delete
$("#deleteAlarm").append("<option value=\"" + alarmObject.id + "\">" 
    + alarmName + "</option>");
}
});

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

function signinCallback(authResult) {
    if (authResult['status']['signed_in']) {
        document.getElementById('signinButton').setAttribute('style', 'display: none');
        gapi.client.load('plus','v1', function(){
                var request = gapi.client.plus.people.get({
                    'userId': 'me'
                    });
                request.execute(function(resp) {
                    $("body").append('Welcome ' + resp.displayName);
                    USERID = resp.id
                    getAllAlarms(resp.id);
                    });
                });
    } else {
        console.log('Sign-in state: ' + authResult['error']);
    }
}
