import { Sparkles } from "lucide-react";

function WelcomeScreen() {
  const suggestions = [
    "Explain React Hooks",
    "Write a Python script",
    "Summarize this article",
    "Help me prepare for interviews",
  ];

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6">
      <div className="bg-cyan-500/20 p-5 rounded-full mb-6">
        <Sparkles
          className="text-cyan-400"
          size={42}
        />
      </div>

      <h1 className="text-5xl font-bold mb-3">
        How can I help you today?
      </h1>

      <p className="text-slate-400 mb-10 text-center">
        Ask questions, generate code, solve problems,
        or brainstorm ideas.
      </p>

      <div className="grid grid-cols-2 gap-4 max-w-3xl">

        {suggestions.map((item) => (
          <button
            key={item}
            className="bg-slate-900 hover:bg-slate-800 transition rounded-xl p-5 text-left border border-slate-800"
          >
            {item}
          </button>
        ))}

      </div>
    </div>
  );
}

export default WelcomeScreen;