let prependBox = document.getElementsByClassName('main-content')[0];
let lHard = getElem('limitHard');
let lSoft = getElem('limitSoft');
window.onload = function () {
    initApp().then(function (success) {
        getUsage().then(usage => {
            usage = JSON.parse(usage);
            lHard.value = usage.billingPeriod.hardLimit;
            lSoft.value = usage.billingPeriod.softLimit;
            document.getElementById('usage').innerHTML = usage.billingPeriod.usage;
        });
        document.getElementById('updateSoft').addEventListener('click', function (event) {
            updateLimit(lSoft.value, 'true');
        });
        document.getElementById('updateSoft').addEventListener('click', function (event) {
            updateLimit(lHard.value, 'false');
        });
    }, error => divError(error));
};
let updateLimit = (value, isSoft) => {
    getToken()
        .then(token => {
            request({
                url: `updateLimit/${value}/${isSoft}/${token}`
            }).then(success => {
                alertBox(
                    'Your soft limit has been succesfully updated',
                    'success',
                    prependBox
                );
            }, () => { throw "Update unsuccessful" });
        })
        .catch(error => {
            alertBox(
                'An error has occured, try again later or contact an admin',
                'warning',
                prependBox
            );
        });
}

getApiKey().then(function (key) {
    request({
        url: 'apiUsageHistory',
        headers: {
            'X-API-KEY': key
        }
    }).then(
        function (usage) {
            usage = JSON.parse(usage);
            let ctx = document.getElementById("myChart").getContext('2d');
            let lab = []
            let dat = []
            let clr = []
            let b_clr = []
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
        },
        function (error) {
            console.log(Error(error))
        });
}).catch(error => console.log(error));