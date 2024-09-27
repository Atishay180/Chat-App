import React, { useState } from 'react'
import GenderCheckbox from '../signup/GenderCheckbox'
import { useAuthContext } from '../../context/AuthContext'
import useEditProfile from '../../hooks/useEditProfile';

const UserAccount = () => {

    const { authUser } = useAuthContext();
    const { editProfile, loading } = useEditProfile();

    const [input, setInput] = useState({
        fullName: '',
        username: '',
        gender: '',
    })

    const handleCheckboxChange = (gender) => {
        setInput({ ...input, gender })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await editProfile(input)
        setInput({
            fullName: '',
            username: '',
        })
    }

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto shadow-xl p-6'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-200 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <form onSubmit={handleSubmit}>
                    {/* Profile Picture */}
                    <div className='flex flex-col items-center mb-4'>
                        <div className='avatar'>
                            <div className='w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                                <img src={authUser.profilePic} alt='Profile' />
                            </div>
                        </div>
                        <div className='text-xl font-semibold text-gray-300 pt-3'>{authUser.username}</div>
                    </div>

                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Full Name</span>
                        </label>
                        <input
                            value={input.fullName}
                            onChange={(e) => setInput({ ...input, fullName: e.target.value })}
                            type='text'
                            className='w-full input input-bordered h-10'
                        />
                    </div>

                    <div>
                        <label className='label p-2 '>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input
                            value={input.username}
                            onChange={(e) => setInput({ ...input, username: e.target.value })}
                            type='text'
                            className='w-full input input-bordered h-10'
                        />
                    </div>

                    {/* Gender Selection */}
                    <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={input.gender} />

                    <div>
                        <button
                            disabled={loading}
                            className='btn btn-block btn-sm mt-4 border border-slate-700'
                        >
                            {loading ? <span className='loading loading-spinner'></span> : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserAccount
