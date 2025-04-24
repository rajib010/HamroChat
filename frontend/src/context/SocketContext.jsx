import { createContext, useContext, useState, useEffect } from 'react';
import { useAuthContext } from './AuthContext.jsx';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        let newSocket;

        if (authUser) {
            // Create a new socket connection
            newSocket = io("http://localhost:8000", {
                query: {
                    userId: authUser?._id,
                },
            });

            setSocket(newSocket);

            // Listen for online users
            newSocket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            return () => {
                newSocket.close(); 
            };
        } else {
            // If user logs out, close socket
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
