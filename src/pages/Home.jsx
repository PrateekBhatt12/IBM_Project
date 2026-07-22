import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";

const API_URL = "http://localhost:5000/api/chat/multi";

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

    const formattedHistory = messages.map((msg) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    try {
      // 3. Request real Gemini response from your Express server
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: formattedHistory,
          message: text,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch response");
      }

      // 4. Append AI response
      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: data.response,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      
      const errorMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: "Sorry, I ran into an issue connecting to the server.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }

    function handleNewChat() {
    setMessages([]);
    }
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