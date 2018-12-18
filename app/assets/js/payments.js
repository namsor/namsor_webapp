window.onload = function () {
    Promise.all([initApp(), getInfo()])
        .then(data => {
            appendStripeButton(JSON.parse(data[1]));
            appendTable();
        })
        .catch(error => {
            console.log(error)
        })
}

let cTd = (x) => {
    td = document.createElement('td');
    td.innerHTML = x;
    return (td)
}

let tbody = document.getElementById('cardInfo');

let appendStripeButton = (userInfo) => {
    var box = document.createElement("script");
    box.src = "https://checkout.stripe.com/checkout.js";
    box.type = "text/javascript";
    box.dataset.email = userInfo.email;
    box.dataset.key = userInfo.stripePerishableKey;
    box.dataset.name = "NamSor";
    box.className = "stripe-button"
    box.dataset.amount = 0;
    box.dataset.description = "Namsor API Setup";
    document.getElementById("stripeForm").appendChild(box);
}

let appendTable = () => {
    tokenRequest('paymentInfo').then(datas => {
        if (datas === "")
        {
            let message = "If you need to purchase a better subscription, make sure to register your credit card down below"
            alertBox(
                message,
                'info',
                document.getElementsByClassName('main-content')[0],
                null,
                false
            )
            return;
        }
        cards = JSON.parse(datas).stripedCards;
        for (var i = 0; i < cards.length; i++) {
            let card = cards[i];
            let tr = document.createElement('tr')
            if (card.defaultCard)
            {
                let td = (cTd('Default'));
                td.classList.add('bg-info', 'text-white');
                tr.append(td);
            }
            else {
                let change = cTd('Change')
                change.addEventListener('click', function (event) {
                    tokenRequest(`/api2/json/updatePaymentDefault/${card.sourceId}`)
                        .then(success => {
                            tbody.innerHTML = '';
                            appendTable();
                        })
                });
                tr.append(change);
            }
            tr.append(cTd(card.brand));
            tr.append(cTd('**** '.repeat(3) + card.last4));
            tr.append(cTd(card.expMonth + "/" + card.expYear));
            if (card.defaultCard)
                tr.classList.add('border', 'border-primary')
            tbody.append(tr);
        }
    })
}