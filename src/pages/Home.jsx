import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";
import api from "../services/api";

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  // Store all chats
  const [chats, setChats] = useState([
    {
      id: Date.now(),
      title: "New Chat",
      messages: [],
    },
  ]);

  // Currently opened chat
  const [currentChatId, setCurrentChatId] = useState(chats[0].id);

  const currentChat =
    chats.find((chat) => chat.id === currentChatId) || chats[0];

  async function sendMessage(text) {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text,
    };

    // Add user message
    const updatedMessages = [...currentChat.messages, userMessage];

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,
              title:
                chat.title === "New Chat"
                  ? text.slice(0, 40)
                  : chat.title,
              messages: updatedMessages,
            }
          : chat
      )
    );

    setIsTyping(true);

    try {
      // Only previous conversation
      const history = currentChat.messages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      }));

      const { data } = await api.post("/chat/multi", {
        history,
        message: text,
      });

      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: data.response,
      };

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                messages: [...chat.messages, botMessage],
              }
            : chat
        )
      );
    } catch (error) {
      console.error(error);

      const errorMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: "⚠️ Unable to connect to the AI server.",
      };

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                messages: [...chat.messages, errorMessage],
              }
            : chat
        )
      );
    } finally {
      setIsTyping(false);
    }
  }

  function handleNewChat() {
    const newChat = {
      id: Date.now(),
      title: "New Chat",
      messages: [],
    };

    setChats((prev) => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
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
          handleNewChat={handleNewChat}
          chats={chats}
          currentChatId={currentChatId}
          setCurrentChatId={setCurrentChatId}
        />

        <div className="flex flex-col flex-1">
          <ChatWindow
            messages={currentChat.messages}
            isTyping={isTyping}
          />

          <ChatInput
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;