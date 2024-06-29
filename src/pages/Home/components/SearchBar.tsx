import SearchIcon from "../../../components/icons/SearchIcon";

const SearchBar = () => {
  return (
    <div className="mt-2 rounded-full p-2 relative sm:h-12 max-w-sm sm:max-w-lg w-5/6 h-10 bg-gray-200">
      <button className="absolute text-white p-3 flex items-center justify-center bg-neutral-950 h-11 sm:h-12 w-11 sm:w-12 shadow-md shadow-neutral-700 rounded-full -right-1 -top-0.5">
        <SearchIcon />
      </button>
      <input
        autoFocus
        type="text"
        placeholder="Type something..."
        className="sm:py-1 w-5/6 -ml-10 p-0 px-1 outline-none bg-gray-200"
      />
    </div>
  );
};

export default SearchBar;
