import { Bot, User } from "lucide-react";
import { motion } from "framer-motion";

function MessageBubble({ message }) {
  const isUser = message.sender === "user";

  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-4 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="bg-cyan-500 rounded-full p-2 flex-shrink-0">
          <Bot size={20} />
        </div>
      )}

      <div
        className={`max-w-2xl ${
          isUser ? "items-end" : "items-start"
        } flex flex-col`}
      >
        <span className="text-xs text-slate-400 mb-1">
          {isUser ? "You" : "AI Assistant"}
        </span>

        <div
          className={`rounded-2xl px-5 py-4 shadow-lg
          ${
            isUser
              ? "bg-cyan-500 text-white rounded-br-md"
              : "bg-slate-800 border border-slate-700 text-white rounded-bl-md"
          }`}
        >
          {message.text}
        </div>

        <span className="text-[11px] text-slate-500 mt-1">
          {time}
        </span>
      </div>

      {isUser && (
        <div className="bg-slate-700 rounded-full p-2 flex-shrink-0">
          <User size={20} />
        </div>
      )}
    </motion.div>
  );
}

export default MessageBubble;