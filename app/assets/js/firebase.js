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

var billingInfo = function() {
    return new Promise((resolve, reject) => {
        // Identify from firebase
        firebase.auth().currentUser.getIdToken().then(function(idToken) {
            // Request info from API
            request({url: "/NamSorAPIv2/api2/json/billingInfo/" + idToken}).then(data => {
                resolve(data)
            })
            .catch(error => {
                reject(error);
            });
        });
    });
};

var billingHistory = function() {
    return new Promise((resolve, reject) => {
        getToken().then(function(idToken) {
            // Request info from API
            request({url: "/NamSorAPIv2/api2/json/billingHistory/" + idToken}).then(data => {
                resolve(data)
            })
            .catch(error => {
                reject(error);
            });
        });
    });
};

var accSettings = function(idToken) {
    var html;
    request({url: "/NamSorAPIv2/api2/json/userInfo/" + idToken}).then(data => {
      data = JSON.parse(data);
    html = `
        <li class="user-profile dropdown">
        <a href="" class="dropdown-toggle" data-toggle="dropdown">
            <div class="d-none d-md-block d-lg-none">
                <i class="ti-settings pdd-right-10"></i>
            </div>
            <div class="user-info">
                <span class="name pdd-right-5">${data.displayName}</span>
                <i class="ti-angle-down font-size-10"></i>
            </div>
        </a>
        <ul class="dropdown-menu">
            <li>
                <a href="apioverview.html">
                    <i class="ti-settings pdd-right-10"></i>
                    <span>Api Overview</span>
                </a>
            </li>
            <li>
                <a href="payements.html">
                    <i class="ti-credit-card pdd-right-10"></i>
                    <span>Payements</span>
                </a>
            </li>
            <li>
                <a href="invoices.html">
                    <i class="ti-file pdd-right-10"></i>
                    <span>Invoices</span>
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

var getToken = function() {
  return new Promise(function(resolve, reject) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        user.getIdToken().then(function (accessToken) {
          resolve(accessToken);
        }, function (error) { reject(Error(error)) });
      } else {
        reject(Error('No user'))
      }
    });
  });
};

var getApiKey = function() {
  return new Promise(function(resolve, reject) {
    getToken()
    .then(function(token) {
      let path = '/NamSorAPIv2/api2/json/procureKey/'
      request({url : path + token})
      .then( data => resolve((JSON.parse(data)).api_key) , error => reject(error))
    }, error => reject(error))
    .catch(error => {
      console.log(error);
      reject(error);
    });
  });
}

var getUsage = function () {
  return new Promise(function(resolve, reject) {
    getApiKey().then(function(key) {
      let path = '/NamSorAPIv2/api2/json/apiUsage';
      let head = {'X-API-KEY' : key}
      request({url : path, headers : head})
      .then( data => resolve(data), error => reject(error))
    }, function(error) { reject(error) });
  });
}

var signOut = function () {
  firebase.auth().signOut().then(function (success) {
          window.location.replace("index.html");
  });
};

var getInfo = () => {
    return new Promise((resolve, reject) => {
        firebase.auth().currentUser.getIdToken()
        .then(function(idToken) {
            request({url: "/NamSorAPIv2/api2/json/userInfo/" + idToken})
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
        });
    });
}

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
