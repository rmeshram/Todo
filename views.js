
import {
  removeRow,
  getPaginationData,
  findMatches,
  setCurrentPage
} from "./main.js";

 const renderButtons = n => {
  const container = document.querySelector(".container");
  const buttonContainer = document.createElement("div");
  buttonContainer.setAttribute("id", "pagination");
  for (let i = 0; i < n; i++) {
    const btn = document.createElement("button");
    btn.textContent = i + 1;
    btn.addEventListener("click", event => {
      const pageNo = event.target.textContent;
      setCurrentPage(pageNo)

      const data = getPaginationData(pageNo);
      renderTable(data);
    });
    buttonContainer.appendChild(btn);
    container.after(buttonContainer);
  }
};

const renderTable = (dataTable, searchTerm) => {
  const matches = findMatches(dataTable, searchTerm);
  const table = document.createElement("table");
  const container = document.querySelector(".container");
  const tableHeader = getTableHeader(matches);
  table.appendChild(tableHeader);
  container.innerHTML = "";
  matches.forEach(element => {
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    td.textContent = element.id;
    tr.appendChild(td);
    var td = document.createElement("td");
    td.textContent = element.empName;
    tr.appendChild(td);
    var td = document.createElement("td");
    td.textContent = element.designation;
    tr.appendChild(td);
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () =>
      removeRow(dataTable, element.id)
    );
    tr.appendChild(removeBtn);
    table.appendChild(tr);
    container.appendChild(table);
  });
};

const getTableHeader = dataTable => {
  const obj = dataTable.length > 0 ? Object.values(dataTable)[0] : {};
  var tr = document.createElement("tr");
  const keys = Object.keys(obj);
  const ths = keys
    .map(key => {
      return `<th><button data-key="${key}" class="heading-button"> ${key} </button></th>`;
    })
    .join("");
  tr.innerHTML = dataTable.length < 1 ? `<div/>` : ths;
  const headerButtons = tr.querySelectorAll(".heading-button");
  headerButtons.forEach(element => {
    element.addEventListener("click", event => {
      const key = event.target.dataset.key;
      const sortBy = key => {
        return function (a, b) {
          return a[key] > a[key] ? 1 : -1;
        };
      };
      dataTable.sort(sortBy(key));
      renderTable(dataTable);
    });
  });
  return tr;
};

export {
  getTableHeader,
  renderTable,
  renderButtons
}