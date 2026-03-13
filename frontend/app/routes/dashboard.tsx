import {
  ShieldCheck,
  ScanLine,
  AlertTriangle,
  FileText,
  ArrowRight,
  TrendingUp,
  Clock,
  ExternalLink,
  FileWarning,
} from "lucide-react";
import { useNavigate, Link } from "react-router";
import Navbar from "../components/Navbar";
import type { Route } from "./+types/dashboard";

// ── Types ────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  sub?: string;
  accent: "blue" | "red" | "emerald" | "cyan";
}

interface ScanRow {
  product: string;
  type: "product" | "website";
  result: "safe" | "unsafe" | "warning";
  date: string;
  score: number;
}

interface AlertItem {
  severity: "warning" | "danger";
  message: string;
  source: string;
}

// ── Static data ──────────────────────────────────────────────────

const RECENT_SCANS: ScanRow[] = [
  { product: "Maggi Noodles 70g",   type: "product", result: "safe",    date: "12 Feb", score: 91 },
  { product: "Phone Charger (USB)", type: "product", result: "unsafe",  date: "10 Feb", score: 14 },
  { product: "flipkart.com",        type: "website", result: "safe",    date: "9 Feb",  score: 94 },
  { product: "Tata Salt 1kg",       type: "product", result: "safe",    date: "8 Feb",  score: 88 },
  { product: "cheapgadgets.net",    type: "website", result: "unsafe",  date: "6 Feb",  score: 9  },
];

const ALERTS: AlertItem[] = [
  {
    severity: "danger",
    message: "Adulterated mustard oil batch detected in Assam markets.",
    source: "FSSAI · Feb 2025",
  },
  {
    severity: "warning",
    message: "Lithium Battery Model XJ-204 recalled due to overheating risk.",
    source: "BIS · Jan 2025",
  },
];

// ── Helpers ──────────────────────────────────────────────────────

const resultConfig = {
  safe:    { label: "Safe",    color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", dot: "bg-emerald-400" },
  unsafe:  { label: "Unsafe",  color: "text-red-400",     bg: "bg-red-500/10 border-red-500/20",         dot: "bg-red-400"     },
  warning: { label: "Caution", color: "text-amber-400",   bg: "bg-amber-500/10 border-amber-500/20",     dot: "bg-amber-400"   },
};

const accentConfig = {
  blue:    { icon: "bg-blue-500/10",    text: "text-blue-400",    border: "group-hover:border-blue-500/30"    },
  red:     { icon: "bg-red-500/10",     text: "text-red-400",     border: "group-hover:border-red-500/30"     },
  emerald: { icon: "bg-emerald-500/10", text: "text-emerald-400", border: "group-hover:border-emerald-500/30" },
  cyan:    { icon: "bg-cyan-500/10",    text: "text-cyan-400",    border: "group-hover:border-cyan-500/30"    },
};

// ── Sub-components ───────────────────────────────────────────────

function StatCard({ icon, title, value, sub, accent }: StatCardProps) {
  const a = accentConfig[accent];
  return (
    <div className={`group bg-slate-900/60 border border-slate-700/50 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl ${a.border}`}>
      <div className={`w-10 h-10 ${a.icon} rounded-xl flex items-center justify-center mb-4`}>
        <span className={a.text}>{icon}</span>
      </div>
      <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-1">{title}</p>
      <p className="text-3xl font-black text-white tracking-tight">{value}</p>
      {sub && <p className="text-xs text-slate-600 mt-1">{sub}</p>}
    </div>
  );
}

function ResultPill({ result }: { result: ScanRow["result"] }) {
  const c = resultConfig[result];
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${c.bg} ${c.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}

function ScoreBadge({ score, result }: { score: number; result: ScanRow["result"] }) {
  const colors = { safe: "text-emerald-400", unsafe: "text-red-400", warning: "text-amber-400" };
  return (
    <span className={`text-sm font-bold tabular-nums ${colors[result]}`}>{score}</span>
  );
}

// ── Page ─────────────────────────────────────────────────────────

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - ScanSafe" },
    { name: "description", content: "Manage your profile and FIR/complaint tracking on ScanSafe." },
  ];
}

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden">
      <Navbar />

      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.04)_1px,transparent_1px)] bg-size-[64px_64px] pointer-events-none" />

      {/* Glow blobs */}
      <div className="absolute top-32 left-1/4 w-96 h-96 bg-blue-600/8 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-32 right-1/4 w-80 h-80 bg-emerald-600/8 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-14 space-y-8">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Live Dashboard</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">Overview</h1>
            <p className="text-slate-400 text-sm mt-0.5">Monitor product safety and authenticity checks</p>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={<ScanLine className="w-5 h-5" />}    title="Total Scans"           value="124" sub="↑ 12 this week"  accent="blue"    />
          <StatCard icon={<AlertTriangle className="w-5 h-5" />} title="Unsafe Detected"     value="3"   sub="Last: 10 Feb"    accent="red"     />
          <StatCard icon={<ShieldCheck className="w-5 h-5" />}  title="Verified Businesses"  value="89"  sub="BIS · FSSAI · MCA" accent="emerald" />
          <StatCard icon={<FileText className="w-5 h-5" />}     title="Complaints Filed"     value="2"   sub="Via cybercrime.gov.in" accent="cyan" />
        </div>

        {/* ── Bottom grid ── */}
        <div className="grid lg:grid-cols-5 gap-6">

          {/* Recent Scans — 3 cols */}
          <div className="lg:col-span-3 bg-slate-900/60 border border-slate-700/50 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/40">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500" />
                <h2 className="text-sm font-semibold text-white">Recent Scans</h2>
              </div>
              <button
                onClick={() => navigate("/check")}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
              >
                New scan <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="divide-y divide-slate-700/30">
              {RECENT_SCANS.map((row, i) => (
                <div key={i} className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-800/40 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      row.type === "website" ? "bg-blue-500/10" : "bg-slate-700/60"
                    }`}>
                      {row.type === "website"
                        ? <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                        : <ScanLine className="w-3.5 h-3.5 text-slate-400" />
                      }
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-slate-200 font-medium truncate">{row.product}</p>
                      <p className="text-xs text-slate-600 capitalize">{row.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 ml-3">
                    <ScoreBadge score={row.score} result={row.result} />
                    <ResultPill result={row.result} />
                    <span className="text-xs text-slate-600 hidden sm:block">{row.date}</span>
                    {(row.result === "unsafe" || row.result === "warning") && (
                      <Link
                        to="/fir"
                        className="hidden sm:flex items-center gap-1 text-xs text-red-400 hover:text-red-300 font-medium transition-colors"
                      >
                        <FileWarning className="w-3.5 h-3.5" />
                        File FIR
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Alerts — 2 cols */}
          <div className="lg:col-span-2 bg-slate-900/60 border border-slate-700/50 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-700/40">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-semibold text-white">Safety Alerts</h2>
              <span className="ml-auto text-xs bg-red-500/15 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full font-medium">
                {ALERTS.length} active
              </span>
            </div>

            <div className="p-4 flex flex-col gap-3">
              {ALERTS.map((alert, i) => (
                <div
                  key={i}
                  className={`rounded-xl border p-4 ${
                    alert.severity === "danger"
                      ? "bg-red-500/8 border-red-500/20"
                      : "bg-amber-500/8 border-amber-500/20"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className={`w-4 h-4 mt-0.5 shrink-0 ${
                      alert.severity === "danger" ? "text-red-400" : "text-amber-400"
                    }`} />
                    <div>
                      <p className={`text-sm leading-relaxed ${
                        alert.severity === "danger" ? "text-red-200" : "text-amber-200"
                      }`}>
                        {alert.message}
                      </p>
                      <p className={`text-xs mt-1.5 font-mono ${
                        alert.severity === "danger" ? "text-red-500/70" : "text-amber-500/70"
                      }`}>
                        {alert.source}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <Link
                to="/fir"
                className="mt-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-300 bg-red-500/8 hover:bg-red-500/12 border border-red-500/20 rounded-xl py-2.5 transition-all"
              >
                <FileWarning className="w-3.5 h-3.5" />
                Submit Complaint / FIR
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
