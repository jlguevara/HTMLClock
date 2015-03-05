var client_id;
var type;
var callback_function;

function init(obj) {
    client_id = obj["client_id"];
    type = obj["type"];
    callback_function = obj["callback_function"];
}

function login() {
    var url = "https://api.imgur.com/oauth2/authorize?client_id=" 
        + client_id + "&response_type=" + type;
    window.open(url);
}

