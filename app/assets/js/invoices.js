const invoicesContent = document.getElementById('invoicesContent');

let insertInfos = function (datas) {
    let invoiceInfo = document.getElementById('invoiceInfo');
    let innerDoc;
    if (invoiceInfo)
        innerDoc = invoiceInfo.contentDocument || invoiceInfo.contentWindow.document;
    else {
        console.log('error');
        return ('');
    }
    getInfo().then(function(data) {
      data = JSON.parse(data);
      innerDoc.getElementById('email').innerHTML = data.email;
    });
    billingInfo().then(function (address) {
        infos = JSON.parse(address);
        let items = datas.items;
        let tbody = innerDoc.getElementsByTagName('tbody')[0];
        tbody.innerHTML = '';
        let fill = (x, y) => {
            if (innerDoc.getElementById(x) !== null && y[x] !== null)
                innerDoc.getElementById(x).innerHTML = y[x];
        }
        for (info in infos)
            fill(info, infos);
        for (data in datas)
        fill(data, datas)
        let date = new Date(parseInt(datas['invoiceDate'])).toDateString();
        fill('invoiceDate', { invoiceDate: date });
        for (var i = 0; i < items.length; i++) {
            let item = items[i];
            let price = parseFloat(item.amount) / 100;
            let total = price * parseInt(item.quantity);
            let tr = document.createElement('tr');
            tr.innerHTML = `<th>${item.planName}</th>
                            <th>${item.subscription}</th>
                            <th>${item.quantity}</th>
                            <th>${price}</th>
                            <th class="text-right">${total}</th>`;
            tbody.prepend(tr);
        }
    },
    function (error) {
        let errBox = document.createElement('div');
        errBox.className = 'col-sm-12 alert alert-danger';
        errBox.innerHTML = 'You have to specify a billing address <a href="account.html">here</a>';
        invoicesContent.prepend(errBox);
    })
    .catch(error => {
        console.log(error);
    });
}

let insertInvoice = function (data) {
    if (document.getElementById('back') == null) {
        insertInfos(data);
        $('#invoicesTable').slideUp('slow', function (callback) {
            $('#invoiceInfo').toggleClass('d-none');
        });
        insertBack();
    }
};

let insertBack = function () {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = '<i class="ti-angle-left font-size-10"></i>';
    btn.id = 'back';
    btn.addEventListener('click', function () {
        $('#back').remove();
        $('#invoiceInfo').toggleClass('d-none');
        $('#invoicesTable').slideDown('slow');
    });
    invoicesContent.prepend(btn);
};

let insertData = function () {
    initApp().then(billingHistory().then(
        data => {
            data = JSON.parse(data);
            invoicesContent.innerHTML =
                `
                <table class="table table-hover" id ='invoicesTable'>
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Date</th>
                        <th scope="col">Subscription</th>
                        <th scope="col">Price</th>
                        <th scope="col">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>`;
            invoices = data.stripeInvoices.concat(data.corporateInvoices);
            invoices.sort((a, b) => a['invoiceDate'] - b['invoiceDate']);
            invoices.forEach((invoice, index) => {
                let tr = document.createElement('tr');
                let date = new Date(parseInt(invoice['invoiceDate'])).toDateString();
                let name = invoice['invoiceId'];
                let price = parseFloat(invoice['total']) / 100;
                let html =
                    '<td>' + index + '</td>' +
                    '<td>' + date + '</td>' +
                    '<td>' + name + '</td>' +
                    '<td>' + price + ' ' + invoice['currency'] + '</td>';
                tr.innerHTML = html;
                let link = document.createElement('td');
                if (invoice.isStriped) {
                    link.innerHTML = '<a target="blank" href="' + invoice['invoicePdf'] + '">Download here</a>'
                }
                else {
                    let btton = document.createElement('button');
                    btton.innerHTML = "View Details";
                    btton.className = 'btn-link border-0 p-0';
                    btton.addEventListener('click', function () {
                        insertInvoice(invoice);
                    });
                    link.appendChild(btton);
                }
                tr.appendChild(link);
                document.getElementById('invoicesTable').prepend(tr);
            });
        }, error => divError(error)
    ), error => divError(error));
};

window.onload = function () {
    invoicesContent.innerHTML =
        `<div class="artboard">
    <div class="domino">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    </div>`;
    insertData();
}
