import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import "./ChatBox.css";
import { AuthContext } from "../../main";
import config from "../../config";

const ChatBox = ({ receiver }) => {
  const { userId } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  const roomId =
    userId && receiver?.id ? [userId, receiver.id].sort().join("-") : null;

  useEffect(() => {
    if (userId && receiver?.id) {
      fetch(`${config.API_URL}/api/msg/history/${userId}/${receiver.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch chat history");
          }
          return response.json();
        })
        .then((data) => {
          setMessages(data);
        })
        .catch((error) => {
          console.error("Error fetching chat history:", error);
        });
    }
  }, [userId, receiver?.id]);

  useEffect(() => {
    if (userId && receiver?.id && roomId) {
      const newSocket = io(`${config.API_URL}`);
      setSocket(newSocket);

      newSocket.emit("joinRoom", roomId);

      newSocket.on("receiveMessage", (msg) => {
        setMessages((prev) => [...prev, msg]);
      });

      return () => {
        newSocket.off("receiveMessage");
        newSocket.disconnect();
      };
    }
  }, [userId, receiver?.id, roomId]);

  const sendMessage = () => {
    if (message.trim() === "" || !roomId) return;

    socket.emit("privateMessage", { roomId, message, sender: userId });
    setMessage("");
  };

  return (
    <div className="container-fluid full-height">
      <div className="row h-100">
        <div className="col-12 row-1 d-flex align-items-center justify-content-center p-0 rounded-top bg-light bg-gradient">
          {receiver ? (
            <h5>{receiver.name}</h5>
          ) : (
            <h5>Select a user to start chatting</h5>
          )}
        </div>

        <div
          className="col-12 row-2 p-0 "
          style={{
            height: "75%",
            overflowY: "auto",
            backgroundColor: "rgb(226, 232, 228)",
          }}
        >
          <div className="p-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`d-flex mb-3 ${
                  msg.sender === userId
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
              >
                <div
                  className={`p-2 rounded ${
                    msg.sender === userId
                      ? "border border-success"
                      : "border border-warning"
                  }`}
                  style={{ maxWidth: "60%" }}
                >
                  <strong>
                    {msg.sender === userId ? "You" : receiver.name}
                  </strong>
                  : {msg.content}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-12 row-3 d-flex p-3">
          <input
            type="text"
            className="form-control me-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                sendMessage();
              }
            }}
          />
          <button className="btn btn-success" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
