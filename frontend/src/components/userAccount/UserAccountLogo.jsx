import React from 'react'

import { FaUser } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";

import { useNavigate, useLocation } from 'react-router-dom';

import { useAuthContext } from '../../context/AuthContext';

import toast from 'react-hot-toast';

const UserAccountLogo = () => {
    const { authUser } = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();

    const handleAccount = () => {
        if (authUser) {
            navigate('/account');
        }
        else {
            toast.error("Please login to view your account");
        }
    }

    const handleBackBtn = () => {
        navigate('/');
    }

    const isAccountPage = location.pathname === '/account';

    return (
        <div className={`absolute top-0 flex w-full ${isAccountPage ? "justify-between" : "justify-end"} items-center p-5`}>
            {
                isAccountPage &&
                <IoMdArrowRoundBack onClick={handleBackBtn} className="w-6 h-6 text-white cursor-pointer" />
            }

            <span onClick={handleAccount} className='bg-black p-3 rounded-full cursor-pointer hover:bg-sky-500'>
                <FaUser className='text-2xl text-white' />
            </span>
        </div>
    )
}

export default UserAccountLogo
