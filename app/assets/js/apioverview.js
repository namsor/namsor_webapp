let prependBox = document.getElementsByClassName('main-content')[0];
let getElem = (x) => document.getElementById(x);
let lHard = getElem('limitHard');
let lSoft = getElem('limitSoft');
let uBtn = getElem('updateBtn');

window.onload = function () {
    Promise.all([initApp(), getUsage()]).then(values => {
        usage = JSON.parse(values[1]);
        lHard.value = usage.billingPeriod.hardLimit;
        lSoft.value = usage.billingPeriod.softLimit;
        getElem('usage').innerHTML = usage.billingPeriod.usage;
    }, error => divError(error));
};

// Update triggers
uBtn.addEventListener('click', function (event) {
    uBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing..';
    updateLimit(lSoft.value, lHard.value);
});

let updateLimit = (vSoft, vHard) => {
    getToken()
        .then(token => {
            Promise.all[
                    ApiKeyRequest(`updateLimit/${vSoft}/false/${token}`),
                    ApiKeyRequest(`updateLimit/${vHard}/true/${token}`)
                ]
                .then(() => {
                    alertBox(
                        'Limits have been updated',
                        'success',
                        prependBox
                    );
                    uBtn.innerHTML = 'Update'
                })
                .catch(error => {
                    alertBox(
                        'An error has occured, please try again later or contact an admin',
                        'warning',
                        prependBox
                    );
                    uBtn.innerHTML = 'Update'
                })
        })
        .catch(error => {
            alertBox(
                'An error has occured, try again later or contact an admin',
                'warning',
                prependBox
            );
            uBtn.innerHTML = 'Update';
        });
}

apiKeyRequest('apiUsageHistoryAggregate')
    .then(usage => {
        usage = JSON.parse(usage);
        let ctx = getElem("myChart").getContext('2d');
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
                let color = r_clr(0.3);
                let newData = {
                    label: newLabel,
                    data: values,
                    backgroundColor: color
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
                    xAxes: [{
                        stacked: true
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                }
            }
        });
    })
    .catch(error => console.log(error));