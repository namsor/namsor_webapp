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
                      // Begin accessing JSON data here
                      // Begin accessing JSON data here
                      var data = JSON.parse(this.response);
                      if (document.getElementById('api_key') != null)
                        document.getElementById('api_key').textContent = data.api_key;
                      document.getElementById('signIn').hidden = true;
                      document.getElementById('navbarDropdownPortfolio').hidden = false;
                      window.api_key = data.api_key;
                    }
                  // Send request
                  request.send();
                  resolve("okay");
              });
          } else {
              document.getElementById('signIn').hidden = false;
              document.getElementById('navbarDropdownPortfolio').hidden = true;
              window.api_key = null;
              resolve("okay");
          }
      }, function (error) {
          console.log(error);
      });
    });
    signOut();
    return deferred;
};

var signOut = function () {
  document.getElementById('signOut').addEventListener('click', function (event) {
    firebase.auth().signOut();
    window.api_key = null;
    document.getElementById('api_key').textContent = '';
    document.getElementById('signIn').hidden = false;
    document.getElementById('navbarDropdownPortfolio').hidden = true;
    });
}

var getInfo = function (){
  firebase.auth().currentUser.getIdToken().then(function(idToken) {
    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest();
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', '/NamSorAPIv2/api2/json/userInfo/' + idToken, true);
    request.onload = function () {
        // Begin accessing JSON data here
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        console.log("data " + data);
        return data;
      }
      // Send request
      request.send();
  }).catch(function(error) {
    console.log(error);
  });
}

window.addEventListener('load', function () {
    initApp().then(getInfo());
    console.log(window.api_key);
});
