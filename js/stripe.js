firebase.auth().currentUser(function (user) {
    if (user) {
        // User is signed in.
        user.getIdToken().then(function (accessToken) {
            // Create a request variable and assign a new XMLHttpRequest object to it.
            var request = new XMLHttpRequest();
            // Open a new connection, using the GET request on the URL endpoint
            request.open('GET', '/NamSorAPIv2/api2/json/userInfo/' + accessToken, true);
            request.onload = function () {
                // Begin accessing JSON data here
                // Begin accessing JSON data here
                var data = JSON.parse(this.response);
                console.log(data);
            }
            // Send request
            request.send();
        });
    }
    }, function (error) {
    console.log(error);
});