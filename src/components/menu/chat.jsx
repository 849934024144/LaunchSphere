import React, { useEffect, useRef, useState } from 'react';
import {ScrollShadow} from "@heroui/react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socketRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ?.id; // Get user ID from localStorage or context

  useEffect(() => {

    fetch('http://localhost:5000/api/messages')
    .then(res => res.json())
    .then(data => {
      setMessages(data); // just show text   
    })
    .catch(err => console.error('Failed to fetch messages:', err));

    // Initialize WebSocket connection
    socketRef.current = new WebSocket('ws://localhost:5000');
    
    socketRef.current.onopen = () => {
      console.log('✅ Connected to WebSocket');
    };
    
    socketRef.current.onerror = (error) => {
      console.error('❌ WebSocket error:', error);
    };
    
    socketRef.current.onmessage = (event) => {
      console.log('📥 Message received:', event.data);
      const newMessage = JSON.parse(event.data);
      setMessages((prev) => [...prev, newMessage]);
    };
    
    
    socketRef.current.onclose = () => {
      console.log('🔌 WebSocket connection closed');
    };

    // Cleanup WebSocket connection on component unmount
    return () => {
      socketRef.current.close();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() && socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const messageData = {       
          id: userId, 
          name:user.name,
          photo:user.photo,     
          content: input,
      };
  
      socketRef.current.send(JSON.stringify(messageData));  // Send as JSON
      setInput(''); // Clear input field
    } else {
      console.warn('Socket not ready or empty input');
    }
  };
  
  return (
    <div className="max-w-md mx-auto m-2 p-4 border-2 border-fuchsia-800  rounded-2xl shadow-2xl shadow-fuchsia-950 bg-[#3b073b]">
      <h2 className="text-xl font-bold mb-2">Global Chat</h2>
      <div className="h-[400px] overflow-y-scroll hide-scrollbar mb-4 border-2 border-fuchsia-800 rounded-2xl p-2 bg-[#450639]" >
    
       {messages.map((msg, index) => (
          <div key={index} className="text-sm text-gray-100 mb-1">
              <div className='flex '>
              {msg.sender?.photo && <img src={`http://localhost:5000${msg.sender?.photo}`} alt="User Avatar" className="w-6 h-6 rounded-full inline-block mr-2" />}
              {msg.sender?.name && <span className="font-semibold">{msg.sender?.name}</span>}
              </div >     
              <div className='ml-6 pl-2 w-[200px] border-2 border-fuchsia-800 rounded-2xl  bg-[#450639] text-gray-100'>
              {msg.content}
              </div>       
              
          </div>
        ))}
   
       
      </div>
      <div className="flex gap-2">
        <input
          className="flex border p-2 rounded"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()} // Send message on Enter key
          placeholder="Type a message..."
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
