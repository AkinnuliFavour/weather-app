import { FaSearch } from "react-icons/fa"

const SearchBar = ({location, setLocation}: {location: string, setLocation: React.Dispatch<React.SetStateAction<string>>}) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        console.log(`User Pressed ${e.key}`)
    }
    return (
      <form action="" className="mt-10 flex justify-center items-center gap-4 relative">
      <input
        type="search"
        name=""
        id=""
        placeholder="Location Search"
        className="p-2 w-full lg:w-1/2 outline-none rounded-3xl shadow-inner bg-[#33C3FF] pl-10 text-placeholder-color"
        onKeyDown={handleKeyDown}
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <FaSearch
        onClick={() => console.log("Clicked")}
        className="absolute top-1/2 transform -translate-y-1/2 left-2 h-5 w-5 text-blue-500 cursor-pointer"
      />
    </form>
    )
}

export default SearchBar
