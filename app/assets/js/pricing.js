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

var currentPlanName = function() {
  return new Promise(function(resolve, reject) {
    getApiKey().then(function(key) {
      let path = '/NamSorAPIv2/api2/json/apiUsage'
      request({
        url : path,
        headers : {"X-API-KEY" : key}
      }).then( data => resolve((JSON.parse(data))), error => reject(error))
    }, function(error) { reject(error) });
  });
}

var insertData = function() {
  availablePlans.then( data => {
    let html = "";
    data = JSON.parse(data);
    currentPlanName().then(function(current) {
      current = current.subscription.planName;
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
          <li class="list-group-item">`;
          if (plan.planName == current) {
            html += `<button data-name="${plan.planName}" disabled id="current" class="btn btn-success">Current</button>`
          }
          else {
            html += `<button data-name="${plan.planName}"
            data-loading-text="<i class='fa fa-spinner fa-spin'></i> Processing Order"
            class="btn btn-primary">Subscribe!</button>`
          }
          html +=       `</li>
          </ul>
          </div>
          </div>
          `;
        }
      });
      const services = document.getElementById('services')
      services.innerHTML = html;
      //        jQuery('#services').find('button').each(function (index, button) {
        //        button.textContent = 'Sign in';
          //      button.addEventListener('click', function(event){
            //      document.getElementById('signin').click();
      getToken().then(function (token) {
        getUsage().then(function(usage){
          usage = JSON.parse(usage);
          if (usage.subscription.stripeStatus == 'active') {
            jQuery('#services').find('button').not('#current').click(function (event) {
              let p = path +"subscribePlan/" + this.dataset.name + "/" + token;
              var btn = $(this)
              this.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing Order';
              request({url : p}).then (
                function (planInfos) {
                  planInfos = JSON.parse(planInfos)
                  let success = document.createElement('div');
                  success.className = 'col-sm-12 alert alert-success';
                  success.innerHTML = 'You have successfuly register to ' + planInfos.planName;
                  services.prepend(success);
                  btn.text(() => 'Success');
                  btn.toggleClass('btn-info');
                  setTimeout(function() {
                     insertData();
                  }, 3000);
                }, function (error) {
                  console.log(error)
                });
            });
          }
          else {
            let error = document.createElement('div');
            error.className = 'col-sm-12 alert alert-warning';
            error.innerHTML = 'You have to register <a href="payments.html">here</a> your credit card before doing that';
            services.prepend(error);
          }
        });
      }, function (error) {console.log(error)});
    });
  });
}
