"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "./Sidebar";
import MainSection from "./MainSection";

export default function PlannerView({ conversationId = null }) {
  const router = useRouter();
  const sidebarRef = useRef(null);

  // --------------------------------
  // Select / create conversation
  // --------------------------------
  const handleConversationSelect = (newConversationId) => {
    router.push(
      newConversationId ? `/planner/${newConversationId}` : "/planner",
    );
  };

  // --------------------------------
  // Sync sidebar title once the AI
  // generates it for the first message
  // --------------------------------
  const handleTitleGenerated = (id, title) => {
    sidebarRef.current?.updateConversationTitle(id, title);
  };

  return (
    <main className="planner">

      
   

      <Sidebar
        ref={sidebarRef}
        activeConversationId={conversationId}
        onConversationSelect={handleConversationSelect}
      />

      <MainSection
        conversationId={conversationId}
        onTitleGenerated={handleTitleGenerated}
      />
    </main>
  );
}
