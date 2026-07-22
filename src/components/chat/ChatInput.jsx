import { useEffect, useRef, useState } from "react";
import {
  SendHorizontal,
  Paperclip,
  Mic,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function ChatInput({ sendMessage }) {
  const [input, setInput] = useState("");

  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current.style.height = "0px";
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + "px";
  }, [input]);

  function handleSend() {
    if (!input.trim()) return;

    sendMessage(input);

    setInput("");

    textareaRef.current.style.height = "auto";
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="bg-slate-950 p-6">

      <div className="max-w-4xl mx-auto">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-xl">

          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message AI Assistant..."
            className="w-full bg-transparent resize-none outline-none text-white placeholder:text-slate-500 overflow-hidden"
          />

          <div className="flex items-center justify-between mt-3">

            <div className="flex gap-3">

              <button className="p-2 rounded-lg hover:bg-slate-800 transition">
                <Paperclip size={20} />
              </button>

              <button className="p-2 rounded-lg hover:bg-slate-800 transition">
                <Mic size={20} />
              </button>

            </div>

            <AnimatePresence>

              {input.trim() && (

                <motion.button
                  initial={{
                    opacity: 0,
                    scale: 0.7,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.7,
                  }}
                  onClick={handleSend}
                  className="bg-cyan-500 hover:bg-cyan-600 p-3 rounded-xl"
                >
                  <SendHorizontal size={20} />
                </motion.button>

              )}

            </AnimatePresence>

          </div>

        </div>

        <p className="text-center text-xs text-slate-500 mt-3">
          AI can make mistakes. Verify important information.
        </p>

      </div>

    </div>
  );
}

export default ChatInput;