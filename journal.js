document.addEventListener("DOMContentLoaded", () => {
    loadJournal();
});

function loadJournal() {
    const journal = loadData("journal") || [];
    const list = document.getElementById("journalList");
    list.innerHTML = journal.map(e => `<li>${e.entry} (${e.date})</li>`).join("");
}

function addJournalEntry() {
    const entry = document.getElementById("journalEntry").value;
    if (entry) {
        const journal = loadData("journal") || [];
        journal.push({ entry, date: new Date().toLocaleDateString() });
        saveData("journal", journal);
        document.getElementById("journalEntry").value = "";
        loadJournal();
        showAlert("Entry saved!");
    } else {
        showAlert("Please write an entry!");
    }
}