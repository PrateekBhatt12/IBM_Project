function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-slate-800 rounded-2xl px-5 py-3">
        <div className="flex gap-2">
          <span className="animate-bounce">•</span>
          <span
            className="animate-bounce"
            style={{ animationDelay: "0.2s" }}
          >
            •
          </span>
          <span
            className="animate-bounce"
            style={{ animationDelay: "0.4s" }}
          >
            •
          </span>
        </div>
      </div>
    </div>
  );
}

export default TypingIndicator;