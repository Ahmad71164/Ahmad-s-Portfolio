"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, ExternalLink, Bot } from "lucide-react";
import styles from "./Chatbot.module.css";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

// Simple custom markdown renderer to parse links, bold text, and lists safely
function renderMessageContent(content: string) {
  const lines = content.split("\n");
  
  return lines.map((line, lineIdx) => {
    let text = line;
    
    // 1. Parse Links: [text](url) -> <a> tag
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    text = text.replace(linkRegex, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #06b6d4; text-decoration: underline;">$1</a>');
    
    // 2. Parse Bold: **text** -> <strong> tag
    const boldRegex = /\*\*([^*]+)\*\*/g;
    text = text.replace(boldRegex, "<strong>$1</strong>");

    // 3. Render lists
    if (text.trim().startsWith("- ")) {
      const cleanText = text.replace(/^\s*-\s+/, "");
      return (
        <li 
          key={lineIdx} 
          dangerouslySetInnerHTML={{ __html: cleanText }} 
          style={{ marginLeft: "1.2rem", marginBottom: "0.25rem", listStyleType: "disc" }} 
        />
      );
    }

    if (text.trim() === "") {
      return <div key={lineIdx} style={{ height: "0.5rem" }} />;
    }

    return (
      <p 
        key={lineIdx} 
        dangerouslySetInnerHTML={{ __html: text }} 
        style={{ marginBottom: "0.5rem" }} 
      />
    );
  });
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm Muhammad's AI representative. Ask me about his projects (like SatyFinder or the Text Extraction system), skills, education, or how to get in touch. How can I help you today?"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string>("");

  // Initialize unique user chat session ID
  useEffect(() => {
    let id = localStorage.getItem("chat-session-id");
    if (!id) {
      id = typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      localStorage.setItem("chat-session-id", id);
    }
    setUserId(id);
  }, []);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = [
    "Tell me about SatyFinder",
    "What are your technical skills?",
    "Where do you study?",
    "How can I contact you?"
  ];

  // Auto scroll to bottom when messages list changes or panel opens
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // Focus input on panel open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const chatHistory = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId, messages: chatHistory })
      });

      if (!response.ok) {
        throw new Error("Failed to connect to assistant API");
      }

      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.message || "I'm sorry, I encountered a communication error. Please try again."
        }
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Sorry, my server connection timed out. Please check your internet connection and try asking again!"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.widget}>
      {/* Floating Toggle Button */}
      <button 
        id="chat-trigger-btn"
        className={styles.toggleBtn} 
        onClick={handleToggle}
        aria-label={isOpen ? "Close AI chat assistant" : "Chat with AI representative"}
      >
        {isOpen ? <X size={26} /> : <MessageSquare size={26} />}
      </button>

      {/* Expanded Chat Board Panel */}
      <div className={`${styles.chatPanel} ${isOpen ? styles.panelOpen : ""}`}>
        {/* Header bar */}
        <div className={styles.header}>
          <div className={styles.headerInfo}>
            <div className={styles.avatar}>
              <Bot size={18} />
            </div>
            <div className={styles.titleArea}>
              <span className={styles.title}>Ahmad's Assistant</span>
              <div className={styles.status}>
                <span className={styles.statusDot} />
                <span>AI active</span>
              </div>
            </div>
          </div>
          
          <div className={styles.headerActions}>
            {/* Link to Fastfol Chatbot */}
            <a 
              href="https://www.fastfol.io/p233054" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.headerLink}
              title="Open full Fastfol assistant in new tab"
            >
              <ExternalLink size={16} />
            </a>
            
            <button 
              className={styles.closeBtn} 
              onClick={handleToggle}
              title="Close panel"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Messages list scroll viewport */}
        <div className={styles.messageArea}>
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`${styles.message} ${
                msg.role === "user" ? styles.userMessage : styles.assistantMessage
              }`}
            >
              {msg.role === "assistant" ? (
                <div className={styles.messageMarkdown}>{renderMessageContent(msg.content)}</div>
              ) : (
                <p>{msg.content}</p>
              )}
            </div>
          ))}

          {/* Typing Indicator bubbles */}
          {isLoading && (
            <div className={`${styles.message} ${styles.assistantMessage}`}>
              <div className={styles.typing}>
                <span className={styles.typingDot} />
                <span className={styles.typingDot} />
                <span className={styles.typingDot} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Quick Chips */}
        <div className={styles.quickRepliesContainer}>
          <div className={styles.quickReplies}>
            {suggestions.map((text, idx) => (
              <button
                key={idx}
                className={styles.quickReplyChip}
                onClick={() => handleSend(text)}
                disabled={isLoading}
              >
                {text}
              </button>
            ))}
          </div>
        </div>

        {/* TextInput controls */}
        <form 
          className={styles.inputArea}
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
        >
          <input
            ref={inputRef}
            type="text"
            className={styles.chatInput}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a question..."
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className={styles.sendBtn}
            disabled={isLoading || !input.trim()}
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
