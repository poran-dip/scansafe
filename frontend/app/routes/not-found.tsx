import { Link, useNavigate } from "react-router";
import { ShieldCheck, Home, LayoutDashboard, ArrowLeft } from "lucide-react";
import type { Route } from "./+types/not-found";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Page Not Found - ScanSafe" },
    { name: "description", content: "Sorry, we couldn't find that page." },
  ];
}

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      {/* Grid bg */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(59,130,246,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.04)_1px,transparent_1px)] bg-size-[64px_64px] pointer-events-none" />
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 w-125 h-125 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center max-w-md">
        {/* Logo */}
        <Link to="/" className="inline-flex items-center gap-2 mb-12 group">
          <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-md shadow-blue-500/20">
            <ShieldCheck style={{ width: 18, height: 18 }} className="text-white" />
          </div>
          <span className="text-white font-bold text-[15px] tracking-tight">ScanSafe</span>
        </Link>

        {/* 404 */}
        <p className="text-[120px] font-black leading-none tracking-tighter bg-linear-to-b from-slate-600 to-slate-800 bg-clip-text text-transparent select-none mb-2">
          404
        </p>

        <h1 className="text-xl font-bold text-white mb-2">Page not found</h1>
        <p className="text-slate-500 text-sm mb-10">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white bg-white/5 hover:bg-white/8 border border-white/8 px-4 py-2.5 rounded-xl transition-all w-full sm:w-auto justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            Go back
          </button>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/8 border border-white/8 px-4 py-2.5 rounded-xl transition-all w-full sm:w-auto justify-center"
          >
            <Home className="w-4 h-4 text-blue-400" />
            Home
          </Link>
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 px-4 py-2.5 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-px w-full sm:w-auto justify-center"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
