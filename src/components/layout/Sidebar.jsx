import { motion } from "framer-motion";
import {
  Search,
  MessageSquarePlus,
  MessageSquare,
  Settings,
  User,
} from "lucide-react";
import { sidebarData } from "../../data/SidebarData";

function Sidebar({
  isSidebarOpen,
  handleNewChat,
  chats = [],
  currentChatId,
  setCurrentChatId,
}) {
  return (
    <motion.aside
      animate={{
        width: isSidebarOpen ? 320 : 90,
      }}
      transition={{ duration: 0.3 }}
      className="bg-slate-950 border-r border-slate-800 flex flex-col overflow-hidden"
    >
      {/* New Chat */}
      <div className="p-5">
        <button
          onClick={handleNewChat}
          className={`w-full flex items-center rounded-xl py-3 font-semibold bg-cyan-500 hover:bg-cyan-600 transition ${
            isSidebarOpen ? "justify-center gap-2" : "justify-center"
          }`}
        >
          <MessageSquarePlus size={20} />

          {isSidebarOpen && <span>New Chat</span>}
        </button>
      </div>

      {/* Search */}
      <div className="px-5 pb-5">
        {isSidebarOpen ? (
          <div className="flex items-center bg-slate-900 rounded-xl px-4 py-3">
            <Search size={18} className="text-slate-500" />

            <input
              type="text"
              placeholder="Search chats..."
              className="bg-transparent outline-none ml-3 flex-1 text-sm placeholder:text-slate-500"
            />
          </div>
        ) : (
          <div className="flex justify-center">
            <button className="p-3 rounded-xl hover:bg-slate-900">
              <Search size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-3">
        {isSidebarOpen && chats.length > 0 && (
          <h2 className="text-xs uppercase text-slate-500 mb-3 px-2">
            Chats
          </h2>
        )}

        <div className="space-y-2">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setCurrentChatId(chat.id)}
              className={`w-full flex items-center rounded-xl p-3 transition ${
                currentChatId === chat.id
                  ? "bg-cyan-500/20 border border-cyan-500 text-cyan-300"
                  : "hover:bg-slate-900"
              } ${isSidebarOpen ? "gap-3" : "justify-center"}`}
            >
              <MessageSquare size={18} />

              {isSidebarOpen && (
                <span className="truncate">
                  {chat.title || "New Chat"}
                </span>
              )}
            </button>
          ))}
        </div>

        {isSidebarOpen && chats.length === 0 && (
          <div className="text-center text-slate-500 text-sm mt-10">
            No conversations yet
          </div>
        )}
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800 p-4">
        <button
          className={`w-full flex items-center rounded-xl hover:bg-slate-900 transition p-3 ${
            isSidebarOpen ? "gap-3" : "justify-center"
          }`}
        >
          <Settings size={20} />

          {isSidebarOpen && <span>Settings</span>}
        </button>

        <div
          className={`mt-4 rounded-xl bg-slate-900 p-3 flex items-center ${
            isSidebarOpen ? "gap-3" : "justify-center"
          }`}
        >
          <div className="bg-cyan-500 h-11 w-11 rounded-full flex items-center justify-center">
            <User />
          </div>

          {isSidebarOpen && (
            <div>
              <p className="font-semibold">
                {sidebarData.user.name}
              </p>

              <p className="text-xs text-slate-400">
                {sidebarData.user.plan}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}

export default Sidebar;