import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/notes/$noteId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { noteId } = Route.useParams();
  return <div>Hello "/notes/$noteId"! {noteId}</div>;
}
