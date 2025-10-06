import { SearchBoxProps } from "@/libs/types";
import { useRef } from "react";

const SearchBox: React.FC<SearchBoxProps> = ({ searchText, setSearchText }) => {
  const inputRef = useRef(null);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e?.target?.value);
  };
  return (
    <div className="w-64 p-4">
      <label className="block text-md text-primary mb-2">Search</label>
      <div className="relative">
        <input
          type="text"
          value={searchText}
          ref={inputRef}
          onChange={handleSearchChange}
          className="w-full px-3 py-2 text-left bg-white border-2 border-secondary rounded-lg shadow-sm hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
        />
      </div>
    </div>
  );
};

export default SearchBox;
