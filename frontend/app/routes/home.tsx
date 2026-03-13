import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Team 18 BIS Hackathon" },
    { name: "description", content: "Team 18 BIS Hackathon" },
  ];
}

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center">
      <h1 className="text-7xl tracking-widest">Hello</h1>
    </div>
  );
}
