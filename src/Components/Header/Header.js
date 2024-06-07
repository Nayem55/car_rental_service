import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='flex justify-between py-6 px-10 bg-[#000] items-center'>
             <h1 className='text-4xl font-bold text-white cursor-pointer'>Rent <spam className="text-[#ff0000]">Wheels</spam></h1>
        </div>
    );
};

export default Header;