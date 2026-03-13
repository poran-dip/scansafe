import Navbar from "~/components/Navbar";
import Hero from "~/components/home/Hero";
import type { Route } from "./+types/home";
import Features from "~/components/home/Features";
import TrustFlow from "~/components/home/TrustFlow";
import Footer from "~/components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ScanSafe - Verify Products & Websites Instantly" },
    { name: "description", content: "Check if websites or products are genuine and safe with ScanSafe." },
    { name: "keywords", content: "ScanSafe, BIS, FSSAI, trust score, safety" },
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
