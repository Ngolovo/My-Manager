document.addEventListener("DOMContentLoaded", () => {
    loadEmployees();
    loadRecords();
});

function loadEmployees() {
    const employees = loadData("employees") || [];
    const list = document.getElementById("employeeList");
    const select = document.getElementById("recordEmployee");
    list.innerHTML = "";
    select.innerHTML = "<option value=''>Select Employee</option>";
    employees.forEach((emp, index) => {
        list.innerHTML += `<li>${emp.name} - ${emp.role} <button onclick="removeEmployee(${index})" class="btn ml-2 text-red-500">Remove</button></li>`;
        select.innerHTML += `<option value="${index}">${emp.name}</option>`;
    });
}

function addEmployee() {
    const name = document.getElementById("employeeName").value;
    const role = document.getElementById("employeeRole").value;
    if (name && role) {
        const employees = loadData("employees") || [];
        employees.push({ name, role });
        saveData("employees", employees);
        document.getElementById("employeeName").value = "";
        document.getElementById("employeeRole").value = "";
        loadEmployees();
        showAlert("Employee added!");
    } else {
        showAlert("Please fill all fields!");
    }
}

function removeEmployee(index) {
    const employees = loadData("employees") || [];
    employees.splice(index, 1);
    saveData("employees", employees);
    loadEmployees();
    showAlert("Employee removed!");
}

function loadRecords() {
    const records = loadData("dailyRecords") || [];
    const list = document.getElementById("dailyRecords");
    list.innerHTML = records.map(r => `<li>${r.employee} - ${r.record} (${r.date})</li>`).join("");
}

function addDailyRecord() {
    const employeeIndex = document.getElementById("recordEmployee").value;
    const record = document.getElementById("dailyRecord").value;
    if (employeeIndex && record) {
        const employees = loadData("employees") || [];
        const records = loadData("dailyRecords") || [];
        records.push({
            employee: employees[employeeIndex].name,
            record,
            date: new Date().toLocaleDateString()
        });
        saveData("dailyRecords", records);
        document.getElementById("dailyRecord").value = "";
        loadRecords();
        showAlert("Record added!");
    } else {
        showAlert("Please select an employee and add a record!");
    }
}