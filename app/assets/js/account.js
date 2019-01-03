let getElem = (x) => document.getElementById(x);
let divUpdateBillingInfo = getElem('updateBillingInfo');
let divBillingInfo = getElem('billingInfo');
let body = document.getElementsByClassName('main-content')[0];

let insertInfos = () => {
  const alertMessage = () => {
    alertBox(
     'There is an error retrieving your informations, please try again \
     later or contact an admin',
     'warning',
     body
   );
  }
  getUsage()
    .then(data => {
      data = JSON.parse(data);
      getElem("preferredCurrency").innerHTML = data.subscription.currency;
    })
    .catch(error => {
      alertMessage();
      console.log(error);
    });
  getInfo()
    .then(data => {
      data = JSON.parse(data);
      getElem("user_name").innerHTML = data.displayName;
      getElem("user_email").innerHTML = data.email;
    })
    .catch(error => {
      alertMessage();
      console.log(error);
    });
}

let fillInfo = () => {
  billingInfo().then(data => {
    if (data) {
      let infos = JSON.parse(data);
      let fill = x => getElem(x) !== null ?
        getElem(x).value = (infos[x] !== null ? infos[x] : '') : 0;
      for (info in infos)
        fill(info);
    } else {
      alertBox(
        'Please, fill in your billing info',
        'info',
        body
      );
    }
  });
}

let suppressInfo = () => {
  var confirm = prompt("Please, confirm ? This action is irreversible. Alternatively, you can cancel subscriptions and keep an inactive free BASIC account instead. Please, enter your email address to receive a confirmation link to suppress your account", "");
  if (confirm != null)
  {
    getInfo().then(data => {
      data = JSON.parse(data);
      if (data.email === confirm)
        tokenRequest("removeUserAccount").then(signOut("Check your email to finalize account removal"));
    })
  }
}

let updateBI = () => {
  divUpdateBillingInfo.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing..';
  getToken().then(function (token) {
    let info = {};
    jQuery('#billingInfo').find('input').each(function () {
      info[this.id] = this.value;
    });
    request({
      url: "updateBillingInfo/" + token,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    }).then(function (requested) {
      alertBox(
        'You have successfuly updated your billing info',
        'success',
        divBillingInfo
      );
      divUpdateBillingInfo.innerHTML = 'Update';
    }, function (error) {
      alertBox(
        'Please verify that all fields are not empty',
        'warning',
        divBillingInfo
      );
      divUpdateBillingInfo.innerHTML = 'Update';
    });
  }, error => divError(error));
}

window.onload = () => {
  initApp().then(
    () => {
      insertInfos();
      fillInfo();
      divUpdateBillingInfo.addEventListener('click', () => {
        updateBI()
      });
    }, error => divError(error));
}
