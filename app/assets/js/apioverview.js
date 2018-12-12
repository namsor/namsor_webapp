let prependBox = document.getElementsByClassName('main-content')[0];
let getElem = (x) => document.getElementById(x);
let lHard = getElem('limitHard');
let lSoft = getElem('limitSoft');
let uSoft = getElem('updateSoft');
let uHard = getElem('updateHard');

window.onload = function () {
    Promise.all([initApp(), getUsage()]).then(values => {
        usage = JSON.parse(values[1]);
        lHard.value = usage.billingPeriod.hardLimit;
        lSoft.value = usage.billingPeriod.softLimit;
        getElem('usage').innerHTML = usage.billingPeriod.usage;
    }, error => divError(error));
};

// Update triggers
uSoft.addEventListener('click', function (event) {
    uSoft.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing..';
    updateLimit(lSoft.value, 'false', uSoft);
});
uHard.addEventListener('click', function (event) {
    uHard.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing..';
    updateLimit(lHard.value, 'true', uHard);
});

let updateLimit = (value, isHard, btn) => {
    getToken()
        .then(token => {
            request({
                    url: `updateLimit/${value}/${isHard}/${token}`
                })
                .then(success => {
                    alertBox(
                        'Your soft limit has been succesfully updated',
                        'success',
                        prependBox
                    );
                    btn.innerHTML = 'Update';
                })
                .catch(error => {
                    alertBox(
                        'An error has occured, please make sure limits are correctly set',
                        'warning',
                        prependBox
                    );
                    btn.innerHTML = 'Update';
                });
        })
        .catch(error => {
            alertBox(
                'An error has occured, try again later or contact an admin',
                'warning',
                prependBox
            );
            btn.innerHTML = 'Update';
        });
}

apiKeyRequest('apiUsageHistory')
  .then(usage => {
      usage = JSON.parse(usage);
      let ctx = getElem("myChart").getContext('2d');
      let lab, dat, cl, b_clr;
      lab = []
      dat = []
      clr = []
      b_clr = []
      r_clr = (alpha) => {
        let o = () => Math.round(Math.random() * 255);
        return 'rgba(' + o() + ',' + o() + ',' + o() + ', ' + alpha + ')';
      }
      for (var i = 0; i < usage.length; i++) {
        let info = usage[i]
        if (info.totalUsage > 0) {
          lab.push(info.apiService.split('_').join(' ').replace("basic->", ''))
          dat.push(info.totalUsage)
          let color = r_clr('0.2');
          clr.push(color);
          b_clr.push(color.replace('0.2', '1.0'));
        }
      }
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: lab,
          datasets: [{
            label: 'frequency',
            data: dat,
            backgroundColor: clr,
            borderColor: b_clr,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }],
            xAxes: [{
              ticks: {
                display: false
              }
            }]
          }
        }
      });
  })
  .catch(error => console.log(error));
