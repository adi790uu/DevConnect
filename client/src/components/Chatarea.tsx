import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import chatbg from "../assets/chatbg8.jpg";
import io from "socket.io-client";

interface ChatMessage {
  sender: string;
  text: string;
  timestamp: string;
}

//@ts-ignore
const ChatArea: React.FC = ({ sessionId }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<ChatMessage>({
    sender: "",
    text: "",
    timestamp: "",
  });

  const userName = localStorage.getItem("username");

  const socket = io("http://localhost:8000");

  socket.on("message", (data) => {
    console.log(data);
    const date = new Date(data.time);

    // Format the date as per your requirements
    const formattedDate = date.toLocaleString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    const newMessage: ChatMessage = {
      sender: data.sender,
      text: data.message,
      timestamp: formattedDate,
    };

    setMessages([...messages, newMessage]);

    console.log(messages);
  });

  const sendMessage = () => {
    if (newMessage.text.trim() === "") return;

    const data = {
      userId: localStorage.getItem("userid"),
      content: newMessage,
      sessionId: sessionId,
    };

    socket.emit("sendMessage", data);
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent pr-2" style={{}}>
      <div className="w-full bg-white flex p-2 rounded-t-md text-xl font-body tracking-wider border-b-2 border-black"></div>
      <div
        className="flex-1 overflow-y-scroll p-4"
        style={{
          maxHeight: "calc(100vh)",
          backgroundImage: `url(${chatbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {messages.map((message) => (
          <div
            className={`flex ${
              message.sender === userName ? "justify-end" : "justify-start"
            } mb-2`}
          >
            <div
              className={`min-w-48 rounded-md p-3 flex justify-between ${
                message.sender === userName
                  ? "bg-white text-gray-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              <div className="flex flex-col">
                <span className="font-bold">
                  {message.sender === userName ? "You" : userName}
                </span>
                <div className="text-sm mt-1">{message.text}</div>
                <div className="text-xs text-gray-500 mb-1 mt-2">
                  {message.timestamp}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t-2 border-gray-300 bg-white rounded-b-md">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded focus:outline-none"
            value={newMessage.text}
            onChange={(e) =>
              setNewMessage({
                sender: userName as string,
                text: e.target.value,
                timestamp: Date.now().toString(),
              })
            }
          />
          <button
            onClick={sendMessage}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
          >
            <IoMdSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
