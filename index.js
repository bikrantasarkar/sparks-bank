document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAll')
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));

});

document.querySelector('table tbody').addEventListener('click', function (event) {
    if (event.target.className === "delete-row-btn") {
        deleteRowById(event.target.dataset.id);
    }
    if (event.target.className === "edit-row-btn") {
        handleEditRow(event.target.dataset.id);
    }
    if (event.target.className === "transfer-row-btn") {
        handleTransferById(event.target.dataset.id);
        console.log("TF DONE");


    }
});

const updateBtn = document.querySelector('#update-row-btn');
const searchBtn = document.querySelector('#search-btn');
const transferBtn = document.querySelector('#transfer-btn');

function handleTransferById(id) {
    const transferSection = document.querySelector('#transfer');
    transferSection.hidden = false;
    document.querySelector('#transfer').dataset.id = id;

}

searchBtn.onclick = function () {
    const searchValue = document.querySelector('#search-input').value;

    fetch('http://localhost:5000/search/' + searchValue)
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));
}

function deleteRowById(id) {
    fetch('http://localhost:5000/delete/' + id, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload();
            }
        });
}

function handleEditRow(id) {
    const updateSection = document.querySelector('#update-row');
    updateSection.hidden = false;
    document.querySelector('#update-name-input').dataset.id = id;

}

transferBtn.onclick = function () {
    const payer = document.querySelector('#transfer');
    const transferId = document.querySelector('#transfer-id');
    const amt = document.querySelector('#transfer-amount');



    fetch('http://localhost:5000/transfer',
        {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id1: payer.dataset.id,
                id2: transferId.value,
                amt: amt.value
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload();
            }
        })
}

updateBtn.onclick = function () {
    const updateNameInput = document.querySelector('#update-name-input');
    const updateNameBalance = document.querySelector('#update-balance-input');

    console.log(updateNameInput, updateNameBalance);

    fetch('http://localhost:5000/update', {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id: updateNameInput.dataset.id,
            name: updateNameInput.value,
            newbalance: updateNameBalance.value
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload();
            }
        })
}


const addBtn = document.querySelector('#add-name-btn');

addBtn.onclick = function () {
    const nameInput = document.querySelector('#name-input');
    const name = nameInput.value;
    nameInput.value = "";

    const initialBalanceInput = document.querySelector('#initial-balance-input');
    const initialBalance = initialBalanceInput.value;
    initialBalanceInput.value = "";


    fetch('http://localhost:5000/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ name: name, initialBalance: initialBalance })
    })
        .then(response => response.json())
        .then(data => insertRowIntoTable(data['data']));
}

function insertRowIntoTable(data) {
    console.log(data);
    const table = document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');

    let tableHtml = "<tr>";
    var str = "new data";
    tableHtml += `<td>${str}</td>`;
    tableHtml += `<td>${data.id}</td>`;
    tableHtml += `<td>${data.name}</td>`;
    tableHtml += `<td>${data.dateAdded}</td>`;
    tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</td>`;
    tableHtml += `<td>${data.initialBalance}</td>`;
    tableHtml += `<td><button class="transfer-row-btn" data-id=${data.id}>Transfer</td>`;

    tableHtml += "</tr>";

    if (isTableData) {
        table.innerHTML = tableHtml;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }
    location.reload();
}

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";
    console.log(data);
    var count = 0;
    data.forEach(function ({ id, name, date_registered, acc_balance }) {
        count++;
        tableHtml += "<tr>";
        tableHtml += `<td>${count}</td>`;
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${name}</td>`;
        tableHtml += `<td>${new Date(date_registered).toLocaleString()}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</td>`;
        tableHtml += `<td>${acc_balance}</td>`;
        tableHtml += `<td><button class="transfer-row-btn" data-id=${id}>Transfer</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}