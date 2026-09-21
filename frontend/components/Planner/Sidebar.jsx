"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import {
  Search,
  Plus,
  LogOut,
  ChevronDown,
  User,
} from "lucide-react";

import {
  getConversations,
  createConversation,
} from "../../api/conversation.api";

import {
  getUserProfile,
  logoutUser,
} from "@/api/user.api";

import "./Sidebar.scss";

const Sidebar = forwardRef(function Sidebar(
  { onConversationSelect, activeConversationId },
  ref
) {
  const [conversations, setConversations] = useState([]);
  const [user, setUser] = useState(null);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [creatingChat, setCreatingChat] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);

  // --------------------------------
  // Let parent (PlannerView) patch a
  // conversation's title without a refetch
  // --------------------------------

  useImperativeHandle(ref, () => ({
    updateConversationTitle(conversationId, title) {
      setConversations((prev) =>
        prev.map((conversation) =>
          conversation._id === conversationId
            ? { ...conversation, title }
            : conversation
        )
      );
    },
  }));

  // --------------------------------
  // Load user + conversations
  // --------------------------------

  useEffect(() => {
    const loadSidebar = async () => {
      try {
        const [userResponse, conversationsResponse] =
          await Promise.all([
            getUserProfile(),
            getConversations(),
          ]);

        setUser(userResponse.data.user);
        setConversations(
          conversationsResponse.data.conversations
        );
      } catch (error) {
        console.error("Failed to load sidebar:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSidebar();
  }, []);

  // --------------------------------
  // Create new conversation
  // --------------------------------

  const handleNewChat = async () => {
    if (creatingChat) return;

    try {
      setCreatingChat(true);

      const response = await createConversation();

      const newConversation = response.data.conversation;

      // Add new conversation to the top
      setConversations((prev) => [
        newConversation,
        ...prev,
      ]);

      // Tell Planner to open this conversation
      onConversationSelect(newConversation._id);
    } catch (error) {
      console.error("Failed to create conversation:", error);
    } finally {
      setCreatingChat(false);
    }
  };

  // --------------------------------
  // Open existing conversation
  // --------------------------------

  const handleConversationClick = (conversationId) => {
    onConversationSelect(conversationId);
  };

  // --------------------------------
  // Search
  // --------------------------------

  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  // --------------------------------
  // Logout
  // --------------------------------

  const handleLogout = async () => {
    try {
      await logoutUser();

      // Go back to login/home
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // --------------------------------
  // Profile image fallback
  // --------------------------------

  const profileLetter =
    user?.name?.charAt(0)?.toUpperCase() || "S";

  return (
    <aside className="sidebar">

      {/* =========================
          TOP
      ========================= */}

      <div className="sidebar-top">

        {/* Logo */}
        <div className="sidebar-logo">
          {/* <div className="logo-icon">
            S
          </div>

          <span>Savora</span> */}
        </div>

        {/* Search */}
        <div className="sidebar-search">

          <Search size={15} />

          <input
            type="text"
            placeholder="Search chats..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          {search && (
            <button
              className="clear-search"
              onClick={() => setSearch("")}
            >
              ×
            </button>
          )}

        </div>

        {/* New Chat */}
        <button
          className="new-chat"
          onClick={handleNewChat}
          disabled={creatingChat}
        >
          <Plus size={17} />

          <span>
            {creatingChat
              ? "Creating..."
              : "New Chat"}
          </span>
        </button>

      </div>

      {/* =========================
          RECENTS
      ========================= */}

      <section className="recent-section">

        <div className="section-header">
          <span>Recents</span>
        </div>

        <div className="conversation-list">

          {loading ? (
            <div className="sidebar-status">
              Loading...
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="sidebar-status">
              {search
                ? "No chats found"
                : "No conversations yet"}
            </div>
          ) : (
            filteredConversations.map(
              (conversation) => (
                <button
                  key={conversation._id}
                  className={`conversation-item ${
                    activeConversationId ===
                    conversation._id
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    handleConversationClick(
                      conversation._id
                    )
                  }
                  title={conversation.title}
                >
                  <span>
                    {conversation.title}
                  </span>
                </button>
              )
            )
          )}

        </div>

      </section>

      {/* =========================
          PROFILE
      ========================= */}

      <div className="profile-section">

        {/* Profile button */}
        <button
          className="profile-button"
          onClick={() =>
            setProfileOpen((prev) => !prev)
          }
        >

          {user?.image ? (
            <img
              src={user.image}
              alt={user.name}
              className="profile-image"
            />
          ) : (
            <div className="profile-fallback">
              {profileLetter}
            </div>
          )}

          <div className="profile-basic">

            <span className="profile-name">
              {user?.name || "Loading..."}
            </span>

            <span className="profile-label">
              Profile
            </span>

          </div>

          <ChevronDown
            size={15}
            className={`profile-chevron ${
              profileOpen ? "open" : ""
            }`}
          />

        </button>

        {/* Profile dropdown */}
        {profileOpen && (
          <div className="profile-dropdown">

            <div className="dropdown-profile">

              {user?.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="dropdown-image"
                />
              ) : (
                <div className="dropdown-fallback">
                  {profileLetter}
                </div>
              )}

              <div>
                <p className="dropdown-name">
                  {user?.name}
                </p>

                <p className="dropdown-email">
                  {user?.email}
                </p>
              </div>

            </div>

            <div className="dropdown-divider" />

            <button
              className="signout-button"
              onClick={handleLogout}
            >
              <LogOut size={16} />

              <span>Sign out</span>
            </button>

          </div>
        )}

      </div>

    </aside>
  );
});

export default Sidebar;