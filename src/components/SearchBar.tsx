import React from "react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
          type="text"
          className="form-control "
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default SearchBar;
