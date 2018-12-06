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
        xhr.open(obj.method || "GET", "/NamSorAPIv2/api2/json/" + obj.url, true);
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

var getToken = function() {
    return new Promise(function(resolve, reject) {
        firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            user.getIdToken().then(function (accessToken) {
            resolve(accessToken);
            }, function (error) { reject(Error(error)) });
        } else {
            reject('no user')
        }
        });
    });
};

var tokenRequest = function (path){
    return new Promise((resolve, reject) => {
        // Get token from firebase
        getToken()
        .then(function(token) {
            // Request info from API
            request({url: path + "/" + token}).then(data => {
                // Send Data via promise
                resolve(data)
            })
            .catch(error => {
                reject(error);
            });
        })
        .catch(error => {
            reject(error);
        });
    });
};

var billingInfo = function () {
   return tokenRequest("billingInfo");
};

var billingHistory = function () {
    return tokenRequest("billingHistory")
};

var getInfo = () => {
    return tokenRequest("userInfo");
};

var accSettings = function(idToken) {
    var html;
    request({url: "userInfo/" + idToken}).then(data => {
      data = JSON.parse(data);
    html = `
        <li class="user-profile dropdown">
        <a href="" class="dropdown-toggle" data-toggle="dropdown">
            <div class="d-block d-lg-none">
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
                    <span>API Overview</span>
                </a>
            </li>
            <li>
                <a href="payments.html">
                    <i class="ti-credit-card pdd-right-10"></i>
                    <span>Payments</span>
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


var getApiKey = function() {
  return new Promise(function(resolve, reject) {
    getToken()
    .then(function(token) {
      request({url : 'procureKey/' + token})
      .then( data => resolve((JSON.parse(data)).api_key) , error => reject(error))
    }, error => reject(error))
    .catch(error => {
      reject(error);
    });
  });
}

var getUsage = function () {
  return new Promise(function(resolve, reject) {
    getApiKey().then(function(key) {
      request({url : 'apiUsage', headers : {'X-API-KEY' : key}})
      .then( data => resolve(data), error => reject(error))
    }, function(error) { reject(error) });
  });
}

var signOut = function () {
  firebase.auth().signOut().then(function (success) {
          window.location.replace("index.html");
  });
};

var divError = error => {
    $('.container-fluid').html('\
        <div class="alert alert-warning" role="alert"> \
        You need to be logged in to access theses functionalities. \
        </div>');
}

var alertBox = (message, alertClass, boxToPrepend) => {
    let box = document.createElement('div');
    box.className = 'col-sm-12 alert alert-' + alertClass;
    box.innerHTML = message;
    boxToPrepend.prepend(box);
}

initApp = function() {
    return new Promise(function(resolve, reject){
        getToken().then(function(token){
            accSettings(token);
            resolve(token)
        },
        function (error) {
            let box = document.getElementById("signin");
            if (box)
                box.style.display = "inline";
            reject('No user');
        });
    });
};
