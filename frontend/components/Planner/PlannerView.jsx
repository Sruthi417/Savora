"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { PanelLeft } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { loginWithGoogle } from "@/api/auth.api";

import Sidebar from "./Sidebar";
import MainSection from "./MainSection";

const MOBILE_BREAKPOINT = "(max-width: 800px)";

export default function PlannerView({
  conversationId = null,
  initialPrompt = "",
}) {
  const router = useRouter();
  const sidebarRef = useRef(null);

  const { loading, isAuthenticated } = useAuth();

  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Below 800px the sidebar starts closed and behaves as an
  // overlay; above it, it's always open and part of the layout.
  useEffect(() => {
    const mql = window.matchMedia(MOBILE_BREAKPOINT);

    const applyMode = (matches) => {
      setIsMobile(matches);
      setSidebarOpen(!matches);
    };

    applyMode(mql.matches);

    const handleChange = (e) => applyMode(e.matches);

    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  const closeSidebarOnMobile = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  // Only authenticated users may be here — send anyone else
  // through Google login first.
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      loginWithGoogle();
    }
  }, [loading, isAuthenticated]);

  // --------------------------------
  // Select an existing conversation
  // --------------------------------
  const handleConversationSelect = (newConversationId) => {
    router.push(
      newConversationId
        ? `/planner/${newConversationId}`
        : "/planner"
    );

    closeSidebarOnMobile();
  };

  // --------------------------------
  // A brand-new conversation was just
  // created (e.g. sending the first
  // message from the empty state) —
  // show it in the sidebar right away.
  // --------------------------------
  const handleConversationCreated = (conversation) => {
    sidebarRef.current?.addConversation(conversation);
  };

  // --------------------------------
  // Once that new conversation's first
  // exchange is saved, move to its URL.
  // --------------------------------
  const handleNavigateToConversation = (id) => {
    router.push(`/planner/${id}`);
    closeSidebarOnMobile();
  };

  // --------------------------------
  // Sync sidebar title once the AI
  // generates it for the first message
  // --------------------------------
  const handleTitleGenerated = (id, title) => {
    sidebarRef.current?.updateConversationTitle(id, title);
  };

  // Not authenticated (still redirecting) or still checking —
  // don't flash the sidebar/chat UI.
  if (loading || !isAuthenticated) {
    return (
      <main className="planner planner--loading">
        <div className="planner-loading-spinner" />
      </main>
    );
  }

  return (
    <main className="planner">

      <header className="planner-header">
        <button
          type="button"
          className="sidebar-toggle"
          onClick={() => setSidebarOpen((prev) => !prev)}
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          aria-expanded={sidebarOpen}
        >
          <PanelLeft size={18} />
        </button>

        <div className="brand">
          <span className="brand-name">Savora</span>
          <span className="brand-assistant">AI Assistant</span>
        </div>
      </header>

      {isMobile && (
        <div
          className={`sidebar-backdrop ${sidebarOpen ? "visible" : ""}`}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        ref={sidebarRef}
        open={sidebarOpen}
        activeConversationId={conversationId}
        onConversationSelect={handleConversationSelect}
      />

      <MainSection
        conversationId={conversationId}
        initialPrompt={initialPrompt}
        onTitleGenerated={handleTitleGenerated}
        onConversationCreated={handleConversationCreated}
        onNavigateToConversation={handleNavigateToConversation}
      />
    </main>
  );
}
