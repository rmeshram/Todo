const state = {
  searchTerm: "",
  noOfRecordsToShown: 4,
  currentPageNo: 0
}

const setFilters = (searchTerm) => {
  if (!!searchTerm)
    console.log(searchTerm)
  state.searchTerm = searchTerm;
}

const getState = () => state;

const setCurrentPage = (currentPageNo) => {
  state.currentPageNo = currentPageNo;
}

export { setFilters, getState, setCurrentPage };