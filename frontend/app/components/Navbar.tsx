import { Link } from "react-router";
import { ShieldCheck } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">ScanSafe</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
          <a href="#" className="hover:text-white transition-colors">Extension</a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/auth"
            className="text-sm text-slate-300 hover:text-white transition-colors px-3 py-1.5"
          >
            Sign in
          </Link>
          <Link
            to="/auth"
            className="text-sm bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20"
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}
