import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";


function Home() {
  const [messages, setMessages] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  function sendMessage(text) {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);

    // Show typing indicator
    setIsTyping(true);

    // Fake AI response
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: `You asked: "${text}"`,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  }

  return (
    <div className="h-screen bg-slate-950 text-white flex flex-col">
      <Navbar
    isSidebarOpen={isSidebarOpen}
    setIsSidebarOpen={setIsSidebarOpen}
/>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
    isSidebarOpen={isSidebarOpen}
/>

        <div className="flex flex-col flex-1">
          <ChatWindow messages={messages} isTyping={isTyping} />
          <ChatInput sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
}

export default Home;