import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    if (!socket.current) {
      socket.current = io("http://localhost:3200", { 
        transports: ["websocket", "polling"],
        reconnectionAttempts: 5,
        reconnectionDelay: 2000,
        timeout: 10000
      });

      socket.current.on("connect", () => {
        console.log("Connected to server:", socket.current.id);
      });

      socket.current.on("receiveMessage", (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });

      socket.current.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
      });
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
      }
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.current.emit("sendMessage", { user: "Deepak", text: message });
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <h2>Real-time Chat</h2>
      <div className="messages">
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.user}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatBox;
