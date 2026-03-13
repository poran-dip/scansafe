import { Globe, ShieldCheck, BellRing, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Globe,
    label: "Website / Product",
    sub: "Enter URL or scan barcode",
    color: "blue",
  },
  {
    icon: ShieldCheck,
    label: "Verification Engine",
    sub: "Cross-checks BIS, FSSAI, MCA",
    color: "cyan",
  },
  {
    icon: BellRing,
    label: "Safety Alert",
    sub: "Trusted · Flagged · Scam",
    color: "emerald",
  },
];

const colorMap: Record<string, string> = {
  blue: "from-blue-600 to-blue-500",
  cyan: "from-cyan-600 to-cyan-400",
  emerald: "from-emerald-600 to-emerald-400",
};

export default function TrustFlow() {
  return (
    <section id="how-it-works" className="bg-linear-to-b from-slate-950 to-blue-950/30 py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-3 block">
          How it works
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Trust Score Flow</h2>
        <p className="text-slate-400 mb-16">From input to insight in under 3 seconds.</p>

        {/* Flow diagram */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
          {steps.map(({ icon: Icon, label, sub, color }, i) => (
            <div key={label} className="flex flex-col md:flex-row items-center">
              {/* Card */}
              <div className="flex flex-col items-center bg-slate-900/80 border border-slate-700/50 rounded-2xl p-6 w-52 hover:border-blue-500/30 transition-colors duration-300">
                <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${colorMap[color]} flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <p className="font-semibold text-white text-sm mb-1">{label}</p>
                <p className="text-xs text-slate-500 text-center">{sub}</p>
              </div>

              {/* Arrow connector */}
              {i < steps.length - 1 && (
                <div className="my-3 md:my-0 md:mx-4 flex items-center">
                  <ArrowRight className="w-6 h-6 text-slate-600 rotate-90 md:rotate-0" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Score badges */}
        <div className="flex items-center justify-center gap-4 mt-12 flex-wrap">
          {[
            { label: "Trusted", color: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20" },
            { label: "Flagged", color: "bg-amber-500/15 text-amber-300 border-amber-500/20" },
            { label: "Scam", color: "bg-red-500/15 text-red-300 border-red-500/20" },
          ].map(({ label, color }) => (
            <span key={label} className={`inline-flex items-center gap-1.5 border px-4 py-1.5 rounded-full text-sm font-medium ${color}`}>
              <span className="w-2 h-2 rounded-full bg-current opacity-70" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
