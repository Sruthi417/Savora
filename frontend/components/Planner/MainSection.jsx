"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Sparkles,
  Plus,
  Paperclip,
  Send,
} from "lucide-react";

import {
  getConversation,
  createConversation,
} from "../../api/conversation.api";

import {
  sendMessage,
} from "../../api/chat.api";

import {
  getUserLocation,
} from "../../utils/getLocation";

import "./MainSection.scss";

export default function MainSection({
  conversationId,
  initialPrompt = "",
  onTitleGenerated,
  onConversationCreated,
  onNavigateToConversation,
}) {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState(initialPrompt);
  const [loadingConversation, setLoadingConversation] = useState(false);
  const [sending, setSending] = useState(false);

  const messagesEndRef = useRef(null);

  // --------------------------------
  // Get selected conversation
  // --------------------------------
  useEffect(() => {
    const loadConversation = async () => {
      // No conversation selected
      if (!conversationId) {
        setConversation(null);
        setMessages([]);
        return;
      }

      try {
        setLoadingConversation(true);

        const response = await getConversation(conversationId);

        const fetchedConversation = response.data.conversation;

        setConversation(fetchedConversation);
        setMessages(fetchedConversation.messages || []);
      } catch (error) {
        console.error(
          "Failed to load conversation:",
          error
        );

        setConversation(null);
        setMessages([]);
      } finally {
        setLoadingConversation(false);
      }
    };

    loadConversation();
  }, [conversationId]);

  // --------------------------------
  // Scroll to latest message
  // --------------------------------
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, sending]);

  // --------------------------------
  // Send message
  // --------------------------------
  const handleSendMessage = async () => {
    const trimmedMessage = input.trim();

    if (!trimmedMessage || sending) {
      return;
    }

    const startingFreshChat = !conversationId;
    let targetConversationId = conversationId;

    setSending(true);

    try {
      if (startingFreshChat) {
        // No conversation yet — e.g. a prompt typed on the homepage
        // or on the empty planner state. Create one first, same as
        // the sidebar's "New Chat" button.
        const createResponse = await createConversation();

        targetConversationId = createResponse.data.conversation._id;

        // Show it in the sidebar right away, before the AI even replies.
        onConversationCreated?.(createResponse.data.conversation);
      } else {
        // Show user's message immediately
        setMessages((prev) => [
          ...prev,
          { role: "user", content: trimmedMessage },
        ]);
      }

      setInput("");

      // Get user's location
      const location = await getUserLocation();

      // Send message + location to backend
      const response = await sendMessage({
        conversationId: targetConversationId,
        message: trimmedMessage,
        latitude: location?.latitude,
        longitude: location?.longitude,
      });

      if (startingFreshChat) {
        // Hand off to the parent to move to /planner/<id>. That fresh
        // mount fetches the conversation and renders the full exchange.
        onNavigateToConversation?.(targetConversationId);
        return;
      }

      // Backend returns Gemini's answer
      const aiMessage = {
        role: "assistant",
        content: response.data.message,
      };

      setMessages((prev) => [...prev, aiMessage]);

      // Update conversation title if backend generated one
      if (response.data.conversation) {
        const { id, title } = response.data.conversation;

        setConversation((prev) => ({
          ...prev,
          title,
        }));

        // Tell the sidebar right away instead of waiting for a refresh
        onTitleGenerated?.(id, title);
      }
    } catch (error) {
      console.error("Failed to send message:", error);

      if (startingFreshChat) {
        // Nothing rendered yet to show an inline error in — restore
        // what the user typed so they can retry.
        setInput(trimmedMessage);
      } else {
        // Show error as assistant message
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Sorry, I couldn't process that right now. Please try again.",
          },
        ]);
      }
    } finally {
      setSending(false);
    }
  };

  // --------------------------------
  // Enter to send
  // Shift + Enter = new line
  // --------------------------------
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // --------------------------------
  // Initial / Empty State
  // --------------------------------
  const renderEmptyState = () => {
    return (
      <div className="planner-home">
        <div className="home-content">

          <div className="home-icon">
            <Sparkles size={25} />
          </div>

          <h1>What are you craving?</h1>

          <p>
            Start a new conversation with Savora.
          </p>

          <div className="home-prompt">

            <div className="prompt-header">
              <div className="prompt-ai-icon">
                <Sparkles size={13} />
              </div>

              <div>
                <strong>Ask Savora</strong>
                <span>
                  Get personalized meal ideas and recipes
                </span>
              </div>
            </div>

            <div className="prompt-input">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="What would you like to eat?"
                rows={1}
              />

              <div className="prompt-actions">
                {/* <button type="button">
                  <Plus size={16} />
                </button>

                <button type="button">
                  <Paperclip size={16} />
                </button> */}

                <button
                  className="send-button"
                  onClick={handleSendMessage}
                  disabled={!input.trim() || sending}
                >
                  <Send size={15} />
                </button>
              </div>
            </div>
          </div>

          <div className="suggestion-cards">
            <button
              onClick={() =>
                setInput("I need a high protein meal")
              }
            >
              <strong>High Protein</strong>
              <span>
                Find a protein-rich meal for you.
              </span>
            </button>

            <button
              onClick={() =>
                setInput("Give me a healthy meal")
              }
            >
              <strong>Healthy Meals</strong>
              <span>
                Find something balanced and healthy.
              </span>
            </button>

            <button
              onClick={() =>
                setInput("I have ingredients at home")
              }
            >
              <strong>Use What I Have</strong>
              <span>
                Turn your ingredients into a meal.
              </span>
            </button>
          </div>

        </div>
      </div>
    );
  };

  // --------------------------------
  // Chat State
  // --------------------------------
  const renderChat = () => {
    return (
      <div className="chat-layout">

        <div className="messages-container">

          {messages.map((message, index) => (
            <div
              key={index}
              className={`message-row ${message.role}`}
            >
              <div className="message-content">
                {message.role === "assistant" ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </ReactMarkdown>
                ) : (
                  message.content
                )}
              </div>
            </div>
          ))}

          {/* AI generating loader */}
          {sending && (
            <div className="message-row assistant">
              <div className="ai-loading">

                {/* <div className="ai-loading-icon">
                  <Sparkles size={14} />
                </div> */}

                <div className="spiral-loader">
                  <span />
                  <span />
                  <span />
                </div>

                <span className="generating-text">
                  Savora is thinking...
                </span>

              </div>
            </div>
          )}

          <div ref={messagesEndRef} />

        </div>

        {/* Chat input */}
        <div className="chat-input-wrapper">

          <div className="chat-input">

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Savora..."
              rows={1}
            />

            <div className="chat-input-bottom">
{/* 
              <button type="button">
                <Plus size={16} />
              </button>

              <button type="button">
                <Paperclip size={16} />
              </button> */}

              <button
                className="send-button"
                onClick={handleSendMessage}
                disabled={!input.trim() || sending}
              >
                <Send size={15} />
              </button>

            </div>

          </div>

          <span className="input-hint">
            Savora can make mistakes. Check important information.
          </span>

        </div>

      </div>
    );
  };

  // --------------------------------
  // Main render
  // --------------------------------
  return (
    <main className="main-window">

      {loadingConversation ? (
        <div className="conversation-loading">
          <div className="loading-spinner" />
        </div>
      ) : messages.length === 0 ? (
        renderEmptyState()
      ) : (
        renderChat()
      )}

    </main>
  );
}