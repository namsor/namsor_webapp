var billingCurrencies = request({
  url: "billingCurrencies"
})
var availablePlans = request({
  url: "availablePlans"
})

var currentPlanName = function () {
  return new Promise((resolve, reject) => {
    getUsage().then(usage => {
      resolve(JSON.parse(usage).subscription.planName);
    })
  });
}

function dataServicesToHTML(data, current, signedIn, currency) {
  let html = '';
  let numberWithCommas = (x) => {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
  data.plans.forEach(plan => {
    if (plan.planName != "ENTERPRISE") {
      plan.planQuota = numberWithCommas(plan.planQuota);
      html += `
      <div class="col-lg-3 col-sm-6 mb-3">
      <div class="card h-100">
      <h3 class="card-header">${plan.planName}</h3>
      <div class="card-body">
      <div class="display-4">${plan.price} <span class="xsmall"> ${currency}</span></div>
      <div class="font-italic"></div>
      </div>
      <ul class="list-group list-group-flush">
      <li class="list-group-item">Plan quota : ${plan.planQuota}</li>
      <li class="list-group-item">Price overage : ${plan.priceOverage} ${currency}</li>
      <li class="list-group-item">`;
      if (!signedIn) {
        html += `<button class="btn btn-primary">Sign in !</button>`;
      } else if (plan.planName == current) {
        html += `<button data-name="${plan.planName}" disabled id="current" class="btn btn-success">Current</button>`
      } else {
        html += `<button data-name="${plan.planName}"
        data-loading-text="<i class='fa fa-spinner fa-spin'></i> Processing Order"
        class="btn btn-primary" data-toggle="confirmation">Subscribe!</button>`
      }
      html += `</li>
      </ul>
      </div>
      </div>
      `;
    }
  });
  return (html);
}

var insertServices = function (data, current, signedIn, currency) {
  return dataServicesToHTML(data, current, signedIn, currency);
}

var logicData = (btnQ, btn, name, prep) => {
  btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing..';
  tokenRequest('subscribePlan/' + name).then(
    planInfos => {
      planInfos = JSON.parse(planInfos)
      if (prep) {
        alertBox(
          'You have successfuly register to ' + planInfos.planName,
          'success',
          services
        );
        btnQ.text(() => 'Success');
        btnQ.toggleClass('btn-info');
      }
      setTimeout(function () {
        insertData(true);
      }, 3000);
    },
    function (error) {
      console.log(error)
    });
}

var insertData = function (prep) {
  availablePlans.then(data => {
    const services = document.getElementById('services')
    data = JSON.parse(data);
    Promise.all([currentPlanName(), getUsage()])
      .then(values => {
        current = values[0]
        usage = JSON.parse(values[1]);
        services.innerHTML = insertServices(data, current, true, usage.subscription.currency);
        if (usage.subscription.stripeStatus == 'active') {
          jQuery('[data-toggle=confirmation]').each( (index, element) => {
            let btnQ = $(element)
            let btn = element;
            let name = element.dataset.name;
            addConfirm(btnQ, logicData, [btnQ, btn, name, prep]);
          });
        } else if (prep) {
          alertBox(
            'Register your payment card <a href="payments.html">here</a> before purchasing a plan',
            'warning',
            services,
            'append',
            false
          );
        }
      })
      .catch(error => {
        services.innerHTML = insertServices(data, '', false, 'USD');
        jQuery('#services').find('button').each(function (index, button) {
          button.textContent = 'Sign in !';
          button.addEventListener('click', function (event) {
            document.getElementById('signin').click();
          });
        });
      });
  });
}