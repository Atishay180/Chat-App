import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';

import { toast } from 'react-hot-toast';

const useEditProfile = () => {

    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const editProfile = async ({ fullName, username, gender }) => {
        const success = handleInputError({ fullName, username, gender })
        if (!success) return;
        setLoading(true)
        try {
            const res = await fetch("/api/auth/edit-profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ fullName, username, gender })
            })

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message)
                return;
            }

            localStorage.setItem("chat-user", JSON.stringify(data))
            setAuthUser(data)
            toast.success("Profile updated successfully")
        } catch (error) {
            toast.error(error.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return { editProfile, loading }

}

export default useEditProfile


function handleInputError({ fullName, username, gender }) {
    if (!fullName && !username && !gender) {
        toast.error("Please choose atleast one fields to change")
        return false;
    }

    return true;
}