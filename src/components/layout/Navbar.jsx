import { Menu, Bot } from "lucide-react";

function Navbar({ isSidebarOpen, setIsSidebarOpen }) {
  return (
    <nav className="h-16 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-6">

      <div className="flex items-center gap-4">

        <button
          onClick={() =>
            setIsSidebarOpen(!isSidebarOpen)
          }
          className="hover:bg-slate-800 rounded-lg p-2 transition"
        >
          <Menu size={22} />
        </button>

        <div className="flex items-center gap-3">

          <div className="bg-cyan-500 p-2 rounded-lg">
            <Bot size={20} />
          </div>

          <div>
            <h1 className="font-bold">
              AI Assistant
            </h1>

            <p className="text-xs text-slate-400">
              Powered by AI
            </p>
          </div>

        </div>

      </div>

      <div className="h-10 w-10 rounded-full bg-cyan-500 flex items-center justify-center">
        M
      </div>

    </nav>
  );
}

export default Navbar;