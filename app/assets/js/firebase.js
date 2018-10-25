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
    var deferred = new Promise(function(resolve, reject){
      firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
              // User is signed in.
              user.getIdToken().then(function (accessToken) {
                  // Create a request variable and assign a new XMLHttpRequest object to it.
                  var request = new XMLHttpRequest();
                  // Open a new connection, using the GET request on the URL endpoint
                  request.open('GET', '/NamSorAPIv2/api2/json/procureKey/' + accessToken, true);
                  request.onload = function () {
                      var data = JSON.parse(this.response);
                      if (document.getElementById('namsor_api_key_input') != null)
                        document.getElementById('namsor_api_key_input').value = data.api_key;
                      window.api_key = data.api_key;
                    }
                  request.send();
                  resolve("okay");
              });
          } else {
              window.api_key = null;
              resolve("okay");
          }
      }, function (error) {
          console.log(error);
      });
    });
    return deferred;
};

var getInfo = function (){
    var data;
    var promise = new Promise(function(resolve, reject) {
        firebase.auth().currentUser.getIdToken().then(function(idToken) {
        // Create a request 
        var request = new XMLHttpRequest();
        // Open a new connection
        request.open('GET', '/NamSorAPIv2/api2/json/userInfo/' + idToken, true);
        request.onload = function () {
            // Load data
            data = JSON.parse(this.response);
            window.user_data = data;
            if (document.getElementById('user_name') != null)
                document.getElementById('user_name').value = data.userId;
            console.dir(data);
        }
        // Send request
        request.send();
        resolve("Data is in !");
        }).catch(function(error) {
            console.log(error);
            reject(Error("Unvalid Key"));
        });
    });
    return promise;
}

window.addEventListener('load', function () {
    initApp();
});
