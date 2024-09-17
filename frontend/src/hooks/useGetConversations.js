import { useEffect, useState } from "react"
import toast from "react-hot-toast";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/users");
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || "Something went wrong");
                }

                setConversations(data)

            } catch (error) {
                toast.error(error.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        }

        getConversations();
    }, [])

    return { loading, conversations }
}

export default useGetConversations
