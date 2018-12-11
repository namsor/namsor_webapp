let getElem = (x) => document.getElementById(x);
let divUpdateBillingInfo = getElem('updateBillingInfo');
let divBillingInfo = getElem('billingInfo');
let body = document.getElementsByTagName('body')[0];

let insertInfos = () => {
  const alertMessage = alertBox(
    'There is an error retrieving your informations, please try again \
    later or contact an adminisatrator',
    'warning',
    body
  ); 
  getUsage()
  .then(data => {
    data = JSON.parse(data);
    getElem("preferredCurrency").innerHTML = data.preferredCurrency;
  })
  .catch(error => {
    alertMessage;
  });
  getInfo()
  .then(data => {
    data = JSON.parse(data);
    getElem("user_name").innerHTML = data.displayName;
    getElem("user_email").innerHTML = data.email;
  })
  .catch(error => {
    alertMessage;
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
        'You have to fill your billing informations',
        'info',
        body
      );
    }
  });
}

let updateBI = () => {
  divUpdateBillingInfo.innerHTML = '\
  <i class="fa fa-spinner fa-spin"></i> Processing..';
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
        'You have successfuly updated your billing informations',
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
    });
  }, error => divError(error));
}

window.onload = () => {
  initApp().then(
    () => {
      insertInfos();
      fillInfo();
      divUpdateBillingInfo.addEventListener('click', () => { updateBI() } );
    }, error => divError(error));
}
