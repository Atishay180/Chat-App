import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client"

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            // create a socket connection & pass the userId as a query
            const socket = io("http://localhost:5000", {
                query: {
                    userId: authUser._id,
                }
            });

            setSocket(socket);

            // get online users
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            })

            // cleanup
            return () => socket.close();
        }
        else {
            // cleanup
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser])
    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    )
}