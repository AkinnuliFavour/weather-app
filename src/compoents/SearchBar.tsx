import { FaMagnifyingGlass } from "react-icons/fa6"

const SearchBar = () => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        console.log(`User Pressed ${e.key}`)
    }
    return (
        <form action="" className='mt-10 flex justify-center items-center gap-4'> 
            <input type="search" name="" id="" placeholder="Location Search" className="p-2 w-full lg:w-1/2 outline-none rounded-3xl shadow-inner bg-[#33C3FF]" onKeyDown={handleKeyDown}/>
            <FaMagnifyingGlass className='text-lg'/>
        </form>
    )
}

export default SearchBar
