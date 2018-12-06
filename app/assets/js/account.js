window.onload = function () {
  initApp().then(function (success) {
    getInfo().then(data => {
      data = JSON.parse(data);
      document.getElementById("user_name").value = data.displayName;
      document.getElementById("user_email").value = data.email;
      document.getElementById("preferredCurrency").value = data.preferredCurrency;
    }, function (error) {
      alertBox(
        'There is an error retrieving your informations, please try again \
         later or contact an adminisatrator',
        'warning',
        document.getElementsByTagName('body')[0]
      );
    });
    billingInfo().then(data => {
      if (data) {
        let infos = JSON.parse(data);
        let fill = x => document.getElementById(x) !== null ?
         document.getElementById(x).value = (infos[x] !== null ? infos[x] : '') : 0;
        for (info in infos)
          fill(info);
      } else {
        alertBox(
          'You have to fill your billing informations',
          'info',
          document.getElementsByTagName('body')[0]
        );
      }
    });
    document.getElementById('updateBillingInfo').addEventListener('click',
      function (event) {
        document.getElementById('updateBillingInfo').innerHTML = '\
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
              document.getElementById('billingInfo');
            );
            document.getElementById('updateBillingInfo').innerHTML = 'Update';
          }, function (error) {
            alertBox(
              'Please verify that all fields are not empty',
              'warning',
              document.getElementById('billingInfo');
            );
          });
        }, error => divError(error));
      });
  }, error => divError(error));
};
