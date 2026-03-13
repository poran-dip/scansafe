import { Link, useLocation } from "react-router";
import { ShieldCheck, ScanLine, LayoutDashboard, FileWarning, Menu, X } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { to: "/check",     label: "Check Trust Score", dot: true  },
  { to: "/dashboard", label: "Dashboard",          dot: false },
  { to: "/fir",       label: "File Complaint",     dot: false },
];

// Pages where the user is already "in-app" — hide sign in/up
const APP_ROUTES = ["/dashboard", "/fir", "/check"];

export default function Navbar() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAppRoute = APP_ROUTES.some((r) => pathname.startsWith(r));
  const isActive   = (to: string) => pathname === to || pathname.startsWith(to);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/85 backdrop-blur-lg border-b border-white/6">
      <div className="max-w-6xl mx-auto px-5 h-15 flex items-center justify-between gap-4" style={{ height: "60px" }}>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/35 transition-shadow">
            <ShieldCheck className="w-4.5 h-4.5 text-white" style={{ width: "18px", height: "18px" }} />
          </div>
          <span className="text-white font-bold text-[15px] tracking-tight">ScanSafe</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1 text-sm">
          {NAV_LINKS.map(({ to, label, dot }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all duration-150 ${
                isActive(to)
                  ? "text-white bg-white/8"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {dot && (
                <span className={`w-1.5 h-1.5 rounded-full transition-colors ${isActive(to) ? "bg-emerald-400" : "bg-emerald-500/60"}`} />
              )}
              {label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 shrink-0">
          {isAppRoute ? (
            /* In-app: show contextual actions */
            <div className="hidden md:flex items-center gap-2">
              {!pathname.startsWith("/check") && (
                <Link to="/check"
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/8 border border-white/8 px-3 py-1.5 rounded-lg transition-all"
                >
                  <ScanLine className="w-3.5 h-3.5 text-blue-400" />
                  New Scan
                </Link>
              )}
              {!pathname.startsWith("/dashboard") && (
                <Link to="/dashboard"
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/8 border border-white/8 px-3 py-1.5 rounded-lg transition-all"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-cyan-400" />
                  Dashboard
                </Link>
              )}
              {!pathname.startsWith("/fir") && (
                <Link to="/fir"
                  className="flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-300 bg-red-500/8 hover:bg-red-500/12 border border-red-500/20 px-3 py-1.5 rounded-lg transition-all"
                >
                  <FileWarning className="w-3.5 h-3.5" />
                  File FIR
                </Link>
              )}
            </div>
          ) : (
            /* Landing / auth pages: show sign in / sign up */
            <div className="hidden md:flex items-center gap-1.5">
              <Link to="/auth"
                className="text-sm font-medium text-slate-400 hover:text-white px-3.5 py-1.5 rounded-lg hover:bg-white/6 transition-all duration-150"
              >
                Sign in
              </Link>
              <Link to="/auth"
                className="relative text-sm font-semibold text-white px-4 py-1.5 rounded-lg overflow-hidden transition-all duration-150 hover:-translate-y-px hover:shadow-lg hover:shadow-blue-500/30"
                style={{ background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #1e40af 100%)" }}
              >
                <span className="relative z-10">Sign up</span>
                <span className="absolute inset-0 bg-linear-to-r from-blue-400/0 via-blue-400/10 to-blue-400/0 opacity-0 hover:opacity-100 transition-opacity duration-200" />
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/8 transition-colors"
          >
            {mobileOpen ? <X className="w-4.5 h-4.5" style={{ width: "18px", height: "18px" }} /> : <Menu className="w-4.5 h-4.5" style={{ width: "18px", height: "18px" }} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/6 bg-slate-950/95 px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(to) ? "text-white bg-white/8" : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {label}
            </Link>
          ))}
          {!isAppRoute && (
            <div className="flex gap-2 pt-2 border-t border-white/6 mt-1">
              <Link to="/auth" onClick={() => setMobileOpen(false)}
                className="flex-1 text-center text-sm font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/8 py-2 rounded-lg transition-colors"
              >
                Sign in
              </Link>
              <Link to="/auth" onClick={() => setMobileOpen(false)}
                className="flex-1 text-center text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 py-2 rounded-lg transition-colors"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
