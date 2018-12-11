let prependBox = document.getElementsByClassName('main-content')[0];
window.onload = function () {
    initApp().then(function (success) {
        getUsage().then(usage => {
            usage = JSON.parse(usage);
            document.getElementById('limitHard').value = usage.billingPeriod.hardLimit;
            document.getElementById('limitSoft').value = usage.billingPeriod.softLimit;
            document.getElementById('usage').innerHTML = usage.billingPeriod.usage;
        });
        document.getElementById('updateSoft').addEventListener('click', function (event) {
            updateLimit($('#limitSoft').value, 'true')
                .then(() => {
                    alertBox(
                        'Your soft limit has been succesfully updated',
                        'success',
                        prependBox
                    );
                }, () => {
                    alertBox(
                        'An error has occured, try again later or contact an admin',
                        'warning',
                        prependBox
                    );
                });
        });
        document.getElementById('updateSoft').addEventListener('click', function (event) {
            updateLimit($('#limitHard').value, 'false')
                .then(() => {
                    alertBox(
                        'Your soft limit has been succesfully updated',
                        'success',
                        prependBox
                    );
                }, () => {
                    alertBox(
                        'An error has occured, try again later or contact an admin',
                        'warning',
                        prependBox
                    );
                });
        });
    }, error => divError(error));
};
let updateLimit = (value, isSoft) => {
    return new Promise((resolve, reject) => {
        getToken()
            .then(token => {
                request({
                    url: `updateLimit/${value}/${isSoft}/${token}`
                }).then(success => {
                    resolve(success);
                });
            })
            .catch(error => {
                reject(error)
            });
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