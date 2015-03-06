function redirect_init() {
    if (window.location.hash) {
        // parse the query string
        var params = {}; 
        var queryString = location.hash.substring(1);
        var regex = /([^&=]+)=([^&]*)/g; 
        var m;

        while (m = regex.exec(queryString)) {
            params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }

        if (typeof(Storage) != "undefined") {
            localStorage.setItem("access_token", params['access_token']);
        }
        else {
            console.log("no local storage");
        }
    }

    try {
        window.opener.callback_function();
    }
    finally {
        window.close();
    }
}

