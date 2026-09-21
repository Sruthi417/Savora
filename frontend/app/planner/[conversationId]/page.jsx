import PlannerView from "../../../components/Planner/PlannerView";

import "../planner.scss";

export default async function PlannerConversation({ params }) {
  const { conversationId } = await params;

  return <PlannerView conversationId={conversationId} />;
}
