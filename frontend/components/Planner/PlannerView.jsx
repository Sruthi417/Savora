"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { loginWithGoogle } from "@/api/auth.api";

import Sidebar from "./Sidebar";
import MainSection from "./MainSection";

export default function PlannerView({
  conversationId = null,
  initialPrompt = "",
}) {
  const router = useRouter();
  const sidebarRef = useRef(null);

  const { loading, isAuthenticated } = useAuth();

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
        <div className="brand">
          <span className="brand-name">Savora</span>
          <span className="brand-assistant">AI Assistant</span>
        </div>
      </header>

      <Sidebar
        ref={sidebarRef}
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
