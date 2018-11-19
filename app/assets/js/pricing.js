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

let path = "/NamSorAPIv2/api2/json/"
var billingCurrencies = request({url : path + "billingCurrencies"})
var availablePlans = request({url : path + "availablePlans"})

billingCurrencies.then( data => {
    console.log(data)
});

availablePlans.then( data => {
  let html = "";
  data = JSON.parse(data);
  data.plans.forEach( plan => {
    if (plan.planName != "ENTERPRISE") {
        html += `
            <div class="col-md-3 mb-3">
                <div class="card h-100">
                    <h3 class="card-header">${plan.planName}</h3>
                    <div class="card-body">
                    <div class="display-4">${plan.price}</div>
                    <div class="font-italic"></div>
                    </div>
                    <ul class="list-group list-group-flush">
                    <li class="list-group-item">Plan quota : ${plan.planQuota}</li>
                    <li class="list-group-item">Price overage : ${plan.priceOverage} </li>
                    <li class="list-group-item">
                        <button data-name="${plan.planName}" class="btn btn-primary">Subscribe!</button>
                    </li>
                    </ul>
                </div>
            </div>
        `;
    }
  });
  var service = document.getElementById("services");
  service.innerHTML = html;
  let getToken = function() {
    return new Promise(function(resolve, reject) {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          user.getIdToken().then(function (accessToken) {
            resolve(accessToken);
          }, function (error) { console.log('Error in getID') });
        } else {
          jQuery('#services').find('button').each(function (index, button) {
              button.textContent = 'Sign in';
              button.addEventListener('click', function(event){
                  document.getElementById('signin').click();
              });
          });
        }
      });
    });
  };
  getToken().then(function (token) {
    jQuery('#services').find('button').click(function (event) {

        let p = path +"subscribePlan/" + this.dataset.name + "/" + token;
        request({url : p}).then(
          function(planInfos) {
            planInfos = JSON.parse(planInfos)
            let success = document.createElement('div');
            success.className = 'alert alert-success';
            success.innerHTML = 'You have successfuly register to ' + planInfos.planName;
            services.appendChild(success);
          }, function (error) {
            console.log(error)
        });
      });
    }, function(error) {
        console.log(error)
    });
});
