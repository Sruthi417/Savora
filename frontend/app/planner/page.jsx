import PlannerView from "../../components/Planner/PlannerView";

import "./planner.scss";

export default async function Planner({ searchParams }) {
  const { prompt } = await searchParams;

  return <PlannerView initialPrompt={prompt} />;
}
