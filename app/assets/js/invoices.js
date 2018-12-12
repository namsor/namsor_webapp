const invoicesContent = document.getElementById('invoicesContent');

let createRowInvoice = (item) => {
    let tr = document.createElement('tr');
    let price = parseFloat(item.amount) / 100;
    let total = price * parseInt(item.quantity);
    tr.innerHTML = `<td>${item.invoiceItemType}</td>
                    <td>${item.description}</td>
                    <td>${item.quantity}</td>
                    <td>${price} ${item.currency}</td>
                    <td class="text-right">${total}</td>`;
    return (tr);
}

// Insert in the table details of all invoices
let createRowInvoices = (item, isStriped, index) => {
    let tr = document.createElement('tr');
    let date = new Date(parseInt(item['invoiceDate'])).toDateString();
    let name = item['invoiceId'];
    let url = item['invoicePdf'];
    let currency = item['currency'];
    let price = parseFloat(item['total']) / 100;
    tr.innerHTML =
        '<td>' + index + '</td>' +
        '<td>' + date + '</td>' +
        '<td>' + name + '</td>' +
        '<td>' + price + ' ' + currency + '</td>';
    let link = document.createElement('td');
    if (isStriped) {
        link.innerHTML = '<a target="blank" href="' + url + '">Download here</a>'
    } else {
        let btn = document.createElement('button');
        btn.innerHTML = "View Details";
        btn.className = 'btn-link border-0 p-0';
        btn.addEventListener('click', function () {
            insertInvoice(item);
        });
        link.appendChild(btn);
    }
    tr.appendChild(link);
    return (tr);
}

// Insert all informatio into the iframe
let insertInfos = function (datas) {
    let invoiceInfo = document.getElementById('invoiceInfo');
    let innerDoc;
    if (invoiceInfo)
        innerDoc = invoiceInfo.contentDocument || invoiceInfo.contentWindow.document;
    else {
        console.log('error');
        return ('');
    }
    // Insert email
    getInfo().then(function (data) {
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
                // Insert address
                for (info in infos)
                    fill(info, infos);
                // Insert invoice information
                for (data in datas)
                    fill(data, datas)
                // Insert date
                let date = new Date(parseInt(datas['invoiceDate'])).toDateString();
                fill('invoiceDate', {
                    invoiceDate: date
                });
                for (var i = 0; i < items.length; i++) {
                    let tr = createRowInvoice(items[i]);
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

// Motion when view details is triggered
let insertInvoice = function (data) {
    if (document.getElementById('back') == null) {
        insertInfos(data);
        $('#invoicesTable').slideUp('slow', function (callback) {
            $('#invoiceInfo').toggleClass('d-none');
        });
        insertBack();
    }
};

// Insert back button from one invoice to overview
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
const tableInvoice = `
<table class="table table-hover" id ='invoicesTable'>
    <thead>
    <tr>
        <th scope="col">#</th>
        <th scope="col">Date</th>
        <th scope="col">Invoice Id</th>
        <th scope="col">Total</th>
        <th scope="col">Details</th>
        </tr>
    </thead>
    <tbody>
    </tbody>
</table>`;

// Retrieve billing history and create a table overview
let insertData = function () {
    initApp().then(billingHistory().then(
        data => {
            data = JSON.parse(data);
            invoicesContent.innerHTML = tableInvoice;
            invoices = data.stripeInvoices.concat(data.corporateInvoices);
            invoices.sort((a, b) => a['invoiceDate'] - b['invoiceDate']);
            invoices.forEach((invoice, index) => {
                let tr = createRowInvoices(invoice, invoice.isStriped, index);
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
