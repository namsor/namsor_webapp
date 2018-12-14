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

apiKeyRequest('apiUsageHistoryAggregate')
  .then(usage => {
      usage = JSON.parse(usage);
      let ctx = getElem("myChart").getContext('2d');
      let lab, dat, cl, b_clr;
      lab = []
      dat = []
      clr = []
      b_clr = []
      let r_clr = (alpha) => {
        let o = () => Math.round(Math.random() * 255);
        return 'rgba(' + o() + ',' + o() + ',' + o() + ', ' + alpha + ')';
      }
      let newDataSet = () => {
          let dataSets = [];
          let iter = usage.data;
          let col = usage.colHeaders;
          for (let index = 0; index < col.length; index++) {
              let newLabel = col[index].replace(/_/, ' ')
              let values = [];
              for (let i = 0; i < iter.length; i++) {
                  values.push(iter[i][index]);
              }
              let newData = {
                  label: newLabel,
                  data: values,
                  backgroundColor: r_clr(1.0)
              }
              dataSets.push(newData);
          }
          return (dataSets);
      }
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: usage.rowHeaders,
          datasets: newDataSet()
        },
        options: {
          scales: {
            xAxes: [{ stacked: true }],
            yAxes: [{ stacked: true }]
          }
        }
      });
  })
  .catch(error => console.log(error));
