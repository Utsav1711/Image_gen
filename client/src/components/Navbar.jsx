import React, { useContext }  from 'react'
import {assets} from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'


const Navbar = () => {

    const {user,setShowLogin , logout , credit} = useContext(AppContext)

    const navigate = useNavigate()
  return (
    <div className='flex items-center justify-between py-4'>
        
    <Link to='/'>
    <img src={assets.logo} alt="logo"  className='w-28 sm:w-32 lg:w-40'/>    
    </Link>

    <div>
        {
            user
            ? 
            <div className='flex items-center gap-2 sm:gap-3'>
                <button onClick={()=>navigate('/buy')} className='flex items-center gap-2 bg-gradient-to-r from-orange-100 to-teal-100 px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-full hover:scale-105 transition-all duration-300 border border-orange-200'>
                    <img src={assets.credit_star} className='w-5' alt="" />
                    <p className='text-xs sm:text-sm font-medium text-gray-700'>Credits: {credit}</p>
                </button>

                <p className='text-gray-600 max-sm:hidden pl-4 text-sm'>Hi, {user.name}</p>
                <div className='relative group'>
                    <img src={assets.profile_icon} className='w-10 drop-shadow cursor-pointer'  alt="" />
                    <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                        <ul className='list-none m-0 p-2 bg-white rounded-lg border border-orange-200 shadow-lg text-sm'>
                            <li onClick={logout} className='py-2 px-4 cursor-pointer hover:bg-orange-50 rounded transition-colors'>Logout</li>
                        </ul>
                    </div>
                </div>   
            </div>
            :
            <div className='flex items-center gap-2 sm:gap-5'>
                <p onClick={()=>navigate('/buy')} className='cursor-pointer text-gray-700 hover:text-orange-500 transition-colors text-sm font-medium'>Pricing</p>
                <button onClick={()=>setShowLogin(true)} className='bg-gradient-to-r from-orange-400 to-teal-400 text-white px-6 py-2 sm:px-8 text-sm rounded-full hover:shadow-md hover:scale-105 transition-all duration-300 font-medium'>Login</button>
            </div>
        }
    </div> 

    </div>
  )
}

export default Navbar
