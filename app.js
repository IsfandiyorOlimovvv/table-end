let idCounter = 1;

window.addEventListener("load", loadTableFromLocalStorage);


document.getElementById("submitNameBtn").addEventListener("click", submitName);
document.getElementById("addRowBtn").addEventListener("click", addRow);

function loadTableFromLocalStorage() {
    const storedRows = JSON.parse(localStorage.getItem("tableData"))  [];
    const tableBody = document.getElementById("tableBody");

    storedRows.forEach(row => {
        addRowToTable(row.id, row.name, row.age);
        idCounter = Math.max(idCounter, row.id + 1);
    });
};

function updateLocalStorage() {
    const rows = [];
    document.querySelectorAll("#tableBody tr").forEach(row => {
        rows.push({
            id: parseInt(row.cells[0].textContent),
            name: row.cells[1].textContent,
            age: row.cells[2].textContent
        });
    });
    localStorage.setItem("tableData", JSON.stringify(rows));
};

function submitName() {
    const nameInput = document.getElementById("nameInput");
    alert("Name submitted: " + nameInput.value);
    nameInput.value = "";
};

function addRow() {
    const name = document.getElementById("newName").value;
    const age = document.getElementById("newAge").value;

    if (name.trim() === ""  age.trim() === "") {
        alert("Please enter both name and age.");
        return;
    };

    addRowToTable(idCounter, name, age);
    idCounter++;

    document.getElementById("newName").value = "";
    document.getElementById("newAge").value = "";

    updateLocalStorage();
};

function addRowToTable(id, name, age) {
    const tableBody = document.getElementById("tableBody");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${id}</td>
        <td>${name}</td>
        <td>${age}</td>
        <td>
            <button class="action-button del-button">del</button>
            <button class="action-button edit-button">edit</button>
        </td>
    `;

    tableBody.appendChild(row);


    row.querySelector(".del-button").addEventListener("click", () => deleteRow(row));
    row.querySelector(".edit-button").addEventListener("click", () => editRow(row));
};

function deleteRow(row) {
    row.parentNode.removeChild(row);
    updateLocalStorage();
};

function editRow(row) {
    const nameCell = row.cells[1];
    const ageCell = row.cells[2];

    const newName = prompt("Enter new name:", nameCell.textContent);
    const newAge = prompt("Enter new age:", ageCell.textContent);

    if (newName !== null && newAge !== null) {
        nameCell.textContent = newName;
        ageCell.textContent = newAge;
        updateLocalStorage();
    };
};









let countElement = document.querySelector(".count");
let increButton = document.querySelector(".incre");
let decreButton = document.querySelector(".decre");

let counter = localStorage.getItem("counter") ? parseInt(localStorage.getItem("counter")) : 0;
countElement.textContent = counter;


increButton.addEventListener("click", () => {
    counter++;
    localStorage.setItem("counter", counter);
    countElement.textContent = counter;
});


decreButton.addEventListener("click", () => {
    counter--;
    localStorage.setItem("counter", counter);
    countElement.textContent = counter;
});


let form = document.querySelector("form");
let ulist = document.querySelector(".ulist");


let items = JSON.parse(localStorage.getItem("items")) || [];


function renderItems() {
    ulist.innerHTML = "";
    items.forEach(item => {
        let li = document.createElement("li");
        li.textContent = item;
        ulist.appendChild(li);
    });
}


renderItems();


form.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputText = form.querySelector("input").value;

    if (inputText) {
        items.push(inputText);
        localStorage.setItem("items", JSON.stringify(items));
        renderItems();
        form.reset();
    }
});