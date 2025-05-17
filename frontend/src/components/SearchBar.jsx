import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible,setVisible] = useState(false)
    const location = useLocation();
    useEffect(() => {
    if(location.pathname.includes('collection')){
      setVisible(true);
    }
    else {
        setVisible(false)
    }
    }, [location]);

    return showSearch && visible ? (
        <div className='flex items-center justify-center my-5'>
            <div className='relative w-3/4 sm:w-1/2'>
                {/* Search Input */}
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='w-full py-2 pl-4 pr-10 border rounded-full outline-none bg-gray-100 text-gray-600'
                    type='text'
                    placeholder='Search'
                />
                {/* Search Icon Inside Input */}
                <img
                    src={assets.search_icon}
                    alt='Search'
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 w-4 cursor-pointer'
                />
            </div>
            {/* Close (X) Icon */}
            <button
                onClick={() => setShowSearch(false)}
                className='ml-3 text-gray-500 hover:text-black text-lg focus:outline-none'
                aria-label='Close search'
            >
                ✖
            </button>
        </div>
    ) : null;
};

export default SearchBar;
