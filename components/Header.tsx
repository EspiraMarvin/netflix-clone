import { SearchIcon } from '@heroicons/react/solid'
function Header() {
  return (
    <header>
        {/* left header section */}
        <div className="flex items-center space-x-2 md:space-x-10 ">
            <img
                src="https://rb.gy/ulxxee"
                width={100}
                height={100}
                className="object-contain cursor-pointer"
                alt="Netflix"
              />
              
              <ul className="hidden space-x-4 md:flex">
                <li className="headerLink">Home</li>
                <li className="headerLink">TV Shows</li>
                <li className="headerLink">Movies</li>
                <li className="headerLink">New & Popular</li>
                <li className="headerLink">My List</li>
              </ul>
    
        </div>
        {/* right header section */}
        <div>
            <SearchIcon />
        </div>
    </header>
  )
}

export default Header