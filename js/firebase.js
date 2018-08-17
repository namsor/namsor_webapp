var config = {
    apiKey: "AIzaSyBO-97crBWy9w_olF5qKIy2GmntKm8jkl8",
    authDomain: "namsoridentities.firebaseapp.com",
    databaseURL: "https://namsoridentities.firebaseio.com",
    projectId: "namsoridentities",
    storageBucket: "namsoridentities.appspot.com",
    messagingSenderId: "578244426610"
};
firebase.initializeApp(config);
initApp = function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            user.getIdToken().then(function (accessToken) {
                // Create a request variable and assign a new XMLHttpRequest object to it.
                var request = new XMLHttpRequest();
                // Open a new connection, using the GET request on the URL endpoint
                request.open('GET', '/NamSorAPIv2/api2/json/procureKey/' + accessToken, true);
                request.onload = function () {
                    // Begin accessing JSON data here
                    // Begin accessing JSON data here
                    var data = JSON.parse(this.response);
                    document.getElementById('api_key').textContent = data.api_key;
                    document.getElementById('signIn').hidden = true;
                    document.getElementById('signOut').hidden = false;
                    window.api_key = data.api_key;
                    console.log('signedin api_key='+window.api_key)
                }
                // Send request
                request.send();
            });
        } else {
            document.getElementById('signIn').hidden = false;
            document.getElementById('signOut').hidden = true;
            window.api_key = null;
            console.log('signedout api_key='+window.api_key)
        }
    }, function (error) {
        console.log(error);
    });
};

window.addEventListener('load', function () {
    initApp()
});
