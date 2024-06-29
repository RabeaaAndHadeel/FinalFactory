import React from "react";
const SearchBar = ({ searchVal, setSearchVal }) => {
  const handleChangeInput = (e) => {
    const value = e.target.value;
    setSearchVal(value);
  };
  return (
    <div className="coverInput">
      <input
        onChange={(e) => {
          handleChangeInput(e);
        }}
        type="number"
        placeholder="חפש"
        value={searchVal}
      />
      <button type="button" onClick={() => setSearchVal(searchVal)}>
        חפש
      </button>
    </div>
  );
};
export default SearchBar;
