import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import chatbg from "../assets/chatbg5.jpg";

interface ChatMessage {
  id: number;
  sender: string;
  text: string;
  timestamp: string;
}

const ChatArea: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const sender = messages.length % 2 === 0 ? "Trafalgar" : "OtherPerson";

    const newChatMessage: ChatMessage = {
      id: messages.length + 1,
      sender: sender,
      text: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newChatMessage]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent pr-2" style={{}}>
      <div className="w-full bg-white flex p-2 rounded-t-md text-xl font-body tracking-wider border-b-2 border-black">
        Username
      </div>
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
            key={message.id}
            className={`flex ${
              message.sender === "Trafalgar" ? "justify-start" : "justify-end"
            } mb-2`}
          >
            <div
              className={`min-w-48 rounded-md p-3 flex justify-between ${
                message.sender === "Trafalgar"
                  ? "bg-white text-gray-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              <div className="text-sm">{message.text}</div>
              <div className="text-xs text-gray-500 mb-1">
                {message.timestamp}
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
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
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
