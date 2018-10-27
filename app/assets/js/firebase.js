var config = {
    apiKey: "AIzaSyBO-97crBWy9w_olF5qKIy2GmntKm8jkl8",
    authDomain: "namsoridentities.firebaseapp.com",
    databaseURL: "https://namsoridentities.firebaseio.com",
    projectId: "namsoridentities",
    storageBucket: "namsoridentities.appspot.com",
    messagingSenderId: "578244426610"
};

firebase.initializeApp(config);

var request = obj => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(obj.method || "GET", obj.url, true);
        if (obj.headers) {
            Object.keys(obj.headers).forEach(key => {
                xhr.setRequestHeader(key, obj.headers[key]);
            });
        }
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(obj.body);
    });
};

var accSettings = function(idToken)
{
    var html;
    request({url: "/NamSorAPIv2/api2/json/userInfo/" + idToken}).then(data => {
    data = JSON.parse(data);
    console.log(data)
    html = `
        <li class="user-profile dropdown">
        <a href="" class="dropdown-toggle" data-toggle="dropdown">
            <img class="profile-img img-fluid" src="assets/images/user.jpg" alt="">
            <div class="user-info">
                <span class="name pdd-right-5">${data.displayName}</span>
                <i class="ti-angle-down font-size-10"></i>
            </div>
        </a>
        <ul class="dropdown-menu">
            <li>
                <a href="">
                    <i class="ti-settings pdd-right-10"></i>
                    <span>Settings</span>
                </a>
            </li>
            <li>
                <a href="account.html">
                    <i class="ti-user pdd-right-10"></i>
                    <span>Profile</span>
                </a>
            </li>
            <li role="separator" class="divider"></li>
            <li>
                <a href="" onclick='signOut();'>
                    <i class="ti-power-off pdd-right-10"></i>
                    <span>Logout</span>
                </a>
            </li>
        </ul>
        </li>`;
        document.getElementById("boxSign").innerHTML = html;
    });
}

var signOutButton = '';
var signOut = function () {
    firebase.auth().signOut().then(
        function (success)
        {
            window.location.replace("index.html");
        }
    );
};

initApp = function () {
    var deferred = new Promise(function(resolve, reject){
      firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
              // User is signed in.
              user.getIdToken().then(function (accessToken) {
                // Create a request variable and assign a new XMLHttpRequest object to it.
                let request = new XMLHttpRequest();
                // Open a new connection, using the GET request on the URL endpoint
                request.open('GET', '/NamSorAPIv2/api2/json/procureKey/' + accessToken, true);
                request.onload = function () {
                    var data = JSON.parse(this.response);
                    if (document.getElementById('namsor_api_key_input') != null)
                        document.getElementById('namsor_api_key_input').value = data.api_key;
                    accSettings(accessToken)
                    window.api_key = data.api_key;
                }
                request.send();
                resolve("okay");
            });
          } else {
                let box = document.getElementById("signin");
                if (box)
                    box.style.display = "inherit";
                window.api_key = null;
                resolve("okay");
          }
      }, function (error) {
          console.log(error);
      });
    });
    return deferred;
};

var getInfo = () => {
    return new Promise((resolve, reject) => {
        // Identify from firebase
        firebase.auth().currentUser.getIdToken().then(function(idToken) {
            // Request info from API
            request({url: "/NamSorAPIv2/api2/json/userInfo/" + idToken}).then(data => {
                // Send info
                resolve(data)
            })
            .catch(error => {
                reject(error);
            });
        });
    });
}