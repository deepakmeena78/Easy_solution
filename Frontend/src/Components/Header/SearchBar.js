
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchBar() {
  return (
    <div className="relative hidden md:flex flex-1 justify-center">
      <div className="relative w-1/2 max-w-xs">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-3 py-3 border rounded-[50px] outline-none focus:ring-1 focus:ring-darkColor text-black"
        />

        <button
          // onClick={clearSearch}
          disabled
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
        >
          <AiOutlineSearch size={20} />
        </button>
      </div>
    </div>
  );
}
