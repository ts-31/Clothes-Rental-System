import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export default function Chat() {
  const [socket, setSocket] = useState(null );

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if(socket) {
      socket.on('connect', () => {
        console.log("Socket connected", socket.id);
      });

      socket.on('connect_error', (error) => {
        console.log("Connection error", error);
      })
  
      socket.on('disconnect', () => {
        console.log("Socket disconnected");
      });    
      
      return () => {
        socket.off('connect')
        socket.off('disconnect')
        socket.off('connect_error')
      }
    }
  }, [socket]);

  return (
    <div>Chat</div>
  )
}