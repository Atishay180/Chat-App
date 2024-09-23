import React from 'react'
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const UserAccountLogo = () => {
    const { authUser } = useAuthContext();
    const navigate = useNavigate();

    const handleOnClick = () => {
        if(authUser){
            navigate('/account');
        }
        else{
            toast.error("Please login to view your account");
        }
    }

    return (
        <div className='absolute top-0 flex w-full justify-end p-5'>
            <span onClick={handleOnClick} className='bg-black p-3 rounded-full cursor-pointer hover:bg-sky-500'>
                <FaUser className='text-2xl text-white' />
            </span>
        </div>
    )
}

export default UserAccountLogo
