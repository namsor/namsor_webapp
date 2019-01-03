window.onload = function () {
    Promise.all([initApp(), getInfo()])
        .then(data => {
            appendStripeButton(JSON.parse(data[1]));
            appendTable();
        })
        .catch(error => {
            divError(error)
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
            let message = "Please, add your payment card to set-up your account with secure provider Stripe for billing"
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
            let tr = document.createElement('tr');
            let btn = document.createElement('button');
            btn.classList.add('w-100', 'h-100', "border-0");
            if (card.defaultCard) {
                btn.innerHTML = "Default";
                btn.classList.add("btn-info");
                btn.disabled = true;
            }
            else {
                btn.innerHTML = "Change";
                btn.classList.add("btn-warning");
                btn.addEventListener('click', function (event) {
                    tokenRequest(`updatePaymentDefault/${card.sourceId}`)
                        .then(success => {
                            tbody.innerHTML = '';
                            appendTable();
                            alertBox(
                                "Your default card has been updated", 
                                "success", 
                                document.getElementsByClassName('main-content')[0]
                            );
                        })
                });
            }
            let td = cTd('');
            td.append(btn);
            tr.append(td);
            tr.append(change);
            tr.append(cTd(card.brand));
            tr.append(cTd('**** '.repeat(3) + card.last4));
            tr.append(cTd(card.expMonth + "/" + card.expYear));
            if (card.defaultCard)
                tr.classList.add('border', 'border-primary')
            tbody.append(tr);
        }
    })
}