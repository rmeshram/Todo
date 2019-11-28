import { setFilters, getState, setCurrentPage } from "./state.js";
import dataTable from "./tableData.js";
import { renderTable, renderButtons } from "./views.js"

const state = getState();
const buttonNo = dataTable.length / state.noOfRecordsToShown;

const init = () => {
  setCurrentPage(1);
  const data = getPaginationData(1);
  document.querySelector("#search-box").addEventListener("change", onSearch);
  document.querySelector("#search-box").addEventListener("keyup", onSearch);
  renderTable(data);
  renderButtons(buttonNo);
};

document.addEventListener("DOMContentLoaded", init);

const onSearch = event => {
  const searchTerm = event.target.value;
  setFilters(searchTerm);
  const { currentPageNo } = getState();
  const data = getPaginationData(currentPageNo);
  renderTable(data, state.searchTerm);
};

const findMatches = (dataTable, searchTerm) => {
  if (!searchTerm) return dataTable;
  const matchedData = dataTable.filter(data => {
    return (
      data.id.toString().toLowerCase() === searchTerm.toLowerCase() ||
      data.empName.toLowerCase() === searchTerm.toLowerCase() ||
      data.designation.toLowerCase() === searchTerm.toLowerCase()
    );
  });
  return matchedData;
};

const getPaginationData = pageNo => {
  let lastRecord = state.noOfRecordsToShown * pageNo;
  let firstRecord = lastRecord - state.noOfRecordsToShown;
  return dataTable.slice(firstRecord, lastRecord + 1);
};

const removeRow = (dataTable, id) => {
  const index = dataTable.findIndex(data => data.id === id);
  dataTable.splice(index, 1);
  renderTable(dataTable);
};

export {
  removeRow,
  getPaginationData,
  findMatches,
  setCurrentPage
}

