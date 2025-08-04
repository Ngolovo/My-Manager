let stockRecords = [];
let previousStock = {};

function addStockEntry() {
  const date = document.getElementById("stockDate").value;
  const item = document.getElementById("stockItem").value.trim();
  const addedStock = parseInt(document.getElementById("addedStock").value);
  const closingStock = parseInt(document.getElementById("closingStock").value);
  const price = parseFloat(document.getElementById("price").value);

  if (!date || !item || isNaN(addedStock) || isNaN(closingStock) || isNaN(price)) {
    alert("Please fill in all fields correctly.");
    return;
  }

  const prevStock = previousStock[item] || 0;
  const totalStock = prevStock + addedStock;
  const salesUnits = totalStock - closingStock;
  const sales = salesUnits * price;

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${date}</td>
    <td>${item}</td>
    <td>${addedStock}</td>
    <td>${closingStock}</td>
    <td>${totalStock}</td>
    <td>${price.toFixed(2)}</td>
    <td>${sales.toFixed(2)}</td>
  `;

  document.querySelector("#stockTable tbody").appendChild(row);

  // Update previous stock
  previousStock[item] = closingStock;
}

function addExpenditure() {
  const date = document.getElementById("expenseDate").value;
  const item = document.getElementById("expenseItem").value.trim();
  const cost = parseFloat(document.getElementById("expenseCost").value);

  if (!date || !item || isNaN(cost)) {
    alert("Please fill in all expense fields correctly.");
    return;
  }

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${date}</td>
    <td>${item}</td>
    <td>${cost.toFixed(2)}</td>
  `;

  document.querySelector("#expenseTable tbody").appendChild(row);
}