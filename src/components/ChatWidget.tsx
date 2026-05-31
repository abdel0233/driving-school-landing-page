import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, MessageCircle, Bot } from "lucide-react";

/* ─── Types ─────────────────────────────────────────────── */
interface Message {
  id: number;
  role: "user" | "bot";
  content: string; // may contain HTML for bot messages
}

/* ─── Helpers ─────────────────────────────────────────────── */
/** Strip only <script> tags – keep all other HTML intact */
function sanitize(raw: string): string {
  return raw.replace(/<script[\s\S]*?<\/script>/gi, "");
}

/* ─── Typing indicator sub-component ─────────────────────── */
function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3">
      {/* Bot avatar */}
      <div className="shrink-0 w-7 h-7 rounded-full bg-[hsl(var(--forest))] text-[hsl(var(--forest-foreground))] flex items-center justify-center shadow">
        <Bot className="w-3.5 h-3.5" />
      </div>
      {/* Bubble */}
      <div className="bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))] rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm max-w-[75%]">
        <span className="flex items-center gap-1.5 h-5">
          {[0, 150, 300].map((delay) => (
            <span
              key={delay}
              className="w-2 h-2 rounded-full bg-[hsl(var(--muted-foreground))] animate-bounce"
              style={{ animationDelay: `${delay}ms`, animationDuration: "1.1s" }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}

/* ─── Main widget ─────────────────────────────────────────── */
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "bot",
      content:
        "👋 Salam / Bonjour / Hello!<br/>I'm your Flomark assistant. Ask me anything about growing your driving school — in Darija, French, or English.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const nextId = useRef(1);

  /* Auto-scroll to latest message */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  /* Focus input when chat opens */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  /* Send a message */
  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Message = { id: nextId.current++, role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const webhookUrl = "https://n8n.lokatis.tech/webhook/5c35fb94-55d0-400b-8742-3e8aed240ff8";
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatInput: text }),
      });

      let reply = "Sorry, something went wrong. Please try again.";

      if (res.ok) {
        try {
          const data = await res.json();
          console.log('n8n response:', JSON.stringify(data));
          
          if (typeof data === 'string') {
            reply = data;
          } else if (Array.isArray(data)) {
            reply = data[0]?.output || data[0]?.text || JSON.stringify(data[0]);
          } else if (data.output) {
            reply = data.output;
          } else if (data.text) {
            reply = data.text;
          } else if (data.message) {
            reply = data.message;
          } else {
            reply = JSON.stringify(data);
          }
        } catch {
          reply = await res.text();
        }
      }

      const botMsg: Message = {
        id: nextId.current++,
        role: "bot",
        content: sanitize(reply),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: nextId.current++,
          role: "bot",
          content: "⚠️ Network error. Please check your connection and try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading]);

  /* Submit on Enter (Shift+Enter = newline) */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  /* Auto-resize textarea */
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  return (
    <>
      {/* ── Chat popup ────────────────────────────────────── */}
      <div
        aria-label="Chat with Flomark AI"
        aria-live="polite"
        className={[
          "fixed bottom-24 right-4 sm:right-6 z-50",
          "w-[calc(100vw-2rem)] sm:w-[380px]",
          "flex flex-col",
          "bg-[hsl(var(--background))] border border-[hsl(var(--border))]",
          "rounded-2xl shadow-2xl overflow-hidden",
          "transition-all duration-300 ease-in-out origin-bottom-right",
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-90 pointer-events-none",
        ].join(" ")}
        style={{ height: isOpen ? "min(520px, calc(100dvh - 7rem))" : "0" }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 bg-[hsl(var(--forest))] text-[hsl(var(--forest-foreground))] px-4 py-3.5 shrink-0">
          <div className="w-9 h-9 rounded-full bg-[hsl(var(--forest-foreground)/0.15)] flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm leading-tight">Flomark Assistant</div>
            <div className="text-xs opacity-70 leading-tight mt-0.5 flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Online
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
            className="w-8 h-8 rounded-full hover:bg-[hsl(var(--forest-foreground)/0.12)] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5 bg-[hsl(var(--background))]">
          {messages.map((msg) =>
            msg.role === "user" ? (
              /* User bubble — right side, forest color */
              <div key={msg.id} className="flex justify-end mb-3">
                <div className="bg-[hsl(var(--forest))] text-[hsl(var(--forest-foreground))] rounded-2xl rounded-br-sm px-4 py-2.5 shadow-sm max-w-[78%] text-sm leading-relaxed whitespace-pre-wrap break-words">
                  {msg.content}
                </div>
              </div>
            ) : (
              /* Bot bubble — left side, secondary bg, HTML allowed */
              <div key={msg.id} className="flex items-end gap-2 mb-3">
                <div className="shrink-0 w-7 h-7 rounded-full bg-[hsl(var(--forest))] text-[hsl(var(--forest-foreground))] flex items-center justify-center shadow">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div
                  className={[
                    "bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))]",
                    "rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-sm",
                    "max-w-[78%] text-sm leading-relaxed break-words",
                    // Style any links/buttons inside the HTML
                    "[&_a]:text-[hsl(var(--forest))] [&_a]:underline [&_a]:font-medium",
                    "[&_a[href*='wa.me']]:inline-flex [&_a[href*='wa.me']]:items-center",
                    "[&_a[href*='wa.me']]:gap-1.5 [&_a[href*='wa.me']]:bg-[#25D366]",
                    "[&_a[href*='wa.me']]:text-white [&_a[href*='wa.me']]:no-underline",
                    "[&_a[href*='wa.me']]:px-3 [&_a[href*='wa.me']]:py-1.5",
                    "[&_a[href*='wa.me']]:rounded-full [&_a[href*='wa.me']]:text-xs",
                    "[&_a[href*='wa.me']]:font-medium [&_a[href*='wa.me']]:mt-2",
                    "[&_strong]:font-semibold [&_em]:italic",
                    "[&_ul]:list-disc [&_ul]:pl-4 [&_ul]:mt-1",
                    "[&_ol]:list-decimal [&_ol]:pl-4 [&_ol]:mt-1",
                    "[&_li]:mt-0.5",
                    "[&_br]:block [&_br]:content-[''] [&_br]:mb-1",
                    "[&_p]:mb-1.5 last:[&_p]:mb-0",
                  ].join(" ")}
                  dangerouslySetInnerHTML={{ __html: msg.content }}
                />
              </div>
            )
          )}

          {isLoading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <div className="shrink-0 border-t border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-3">
          <div className="flex items-end gap-2 bg-[hsl(var(--secondary))] rounded-xl px-3 py-2">
            <textarea
              ref={inputRef}
              id="chat-input"
              rows={1}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder="Type a message…"
              className="flex-1 bg-transparent resize-none text-sm leading-relaxed focus:outline-none placeholder:text-[hsl(var(--muted-foreground))] disabled:opacity-50 max-h-[120px] py-0.5"
              aria-label="Chat message input"
            />
            <button
              id="chat-send-btn"
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              className={[
                "shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all",
                input.trim() && !isLoading
                  ? "bg-[hsl(var(--forest))] text-[hsl(var(--forest-foreground))] hover:opacity-90 hover:scale-105"
                  : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] cursor-not-allowed",
              ].join(" ")}
            >
              <Send className="w-4 h-4" style={{ transform: "translateX(1px)" }} />
            </button>
          </div>
          <p className="text-[10px] text-center text-[hsl(var(--muted-foreground))] mt-2 opacity-60">
            Powered by Flomark AI · Darija · Français · English
          </p>
        </div>
      </div>

      {/* ── Floating toggle button ─────────────────────────── */}
      <button
        id="chat-toggle-btn"
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className={[
          "fixed bottom-5 right-4 sm:right-6 z-50",
          "w-14 h-14 rounded-full shadow-xl",
          "flex items-center justify-center",
          "bg-[hsl(var(--forest))] text-[hsl(var(--forest-foreground))]",
          "transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95",
          isOpen ? "rotate-0" : "rotate-0",
        ].join(" ")}
      >
        {/* Morphs between chat icon and X */}
        <span
          className={`absolute transition-all duration-300 ${isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-75"}`}
        >
          <X className="w-5 h-5" />
        </span>
        <span
          className={`absolute transition-all duration-300 ${!isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"}`}
        >
          <MessageCircle className="w-6 h-6" />
        </span>
      </button>
    </>
  );
}
