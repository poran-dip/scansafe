import Navbar from "~/components/Navbar";
import Hero from "~/components/home/Hero";
import type { Route } from "./+types/home";
import Features from "~/components/home/Features";
import TrustFlow from "~/components/home/TrustFlow";
import Footer from "~/components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Team 18 BIS Hackathon" },
    { name: "description", content: "Team 18 BIS Hackathon" },
  ];
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <Features />
        <TrustFlow />
      </main>
      <Footer />
    </div>
  );
}
