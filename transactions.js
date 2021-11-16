document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAlltransactions')
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));

});





function insertRowIntoTable(data) {
    console.log(data);
    const table = document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');

    let tableHtml = "<tr>";


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
}

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";
    console.log(data);

    data.forEach(function ({ tid, tname1, tname2, tdate, tamount }) {
        tableHtml += "<tr>";
        tableHtml += `<td>${tid}</td>`;
        tableHtml += `<td>${tname1}</td>`;
        tableHtml += `<td>${tname2}</td>`;
        tableHtml += `<td>${tamount}</td>`;
        tableHtml += `<td>${tdate}</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}