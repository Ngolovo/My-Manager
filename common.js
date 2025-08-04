// Load data from localStorage
function loadData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Save data to localStorage
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Display alert
function showAlert(message) {
    alert(message);
}