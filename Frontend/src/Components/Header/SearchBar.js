import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
    } else if (value.trim().length > 2) {
      const response = await axios.get(
        `http://localhost:3200/dashboard/global-search?search=${value}`
      );
      console.log("Server Response:", response);

      if (response.status === 200) {
        setResults(response.data.data || []); // Ensure result exists
        toast.success("Categories fetched successfully!");
      } else {
        toast.error("Failed to fetch categories!");
      }
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
  };

  const handleItemClick = (item) => {
    setQuery("");
    setResults([]);
    navigate(`/help`);
  };

  return (
    <div className="relative hidden md:flex flex-1 justify-center">
      <div className="relative w-1/2 max-w-xs">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-3 py-3 border rounded-[50px] outline-none focus:ring-1 focus:ring-darkColor text-black"
          value={query}
          onChange={handleSearch}
        />
        {query ? (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
          >
            <AiOutlineClose size={20} />
          </button>
        ) : (
          <button
            onClick={clearSearch}
            disabled
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
          >
            <AiOutlineSearch size={20} />
          </button>
        )}

        {results.length > 0
          ? results.map((result, index) => (
              <div key={index} className="relative">
                <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-50  max-h-80 overflow-y-auto no-scrollbar">
                  {result?.data?.length ? (
                    <div>
                      <div className="px-3 py-2 font-semibold border-b">
                        {result?.type} ({result?.data?.length})
                      </div>

                      <ul className="w-full bg-white">
                        {result?.data &&
                          result?.data.length > 0 &&
                          result.data.map((item, innerIndex) => (
                            <li
                              key={innerIndex}
                              className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b"
                              onClick={() => handleItemClick(result)}
                            >
                              <div>{item?.name || item?.title}</div>
                              <div className="text-gray-500 text-sm ">
                                {item?.description}
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
