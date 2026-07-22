import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import WelcomeScreen from "./WelcomeScreen";

function ChatWindow({ messages, isTyping }) {
  const bottomRef = useRef(null);

  // Auto-scroll whenever a new message arrives
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  // Show welcome screen when there are no messages
  if (messages.length === 0) {
    return <WelcomeScreen />;
  }

  return (
    <main className="flex-1 overflow-y-auto bg-slate-950 px-6 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
          />
        ))}

        {isTyping && <TypingIndicator />}

        <div ref={bottomRef} />
      </div>
    </main>
  );
}

export default ChatWindow;