import { Link } from "react-router";
import { ShieldCheck, ArrowRight, Chrome, ScanLine } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 min-h-screen flex items-center">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-size-[64px_64px]" />

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-28 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-8">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-medium text-blue-200 tracking-wide">India's Consumer Safety Platform</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
          Verify Every Product
          <br />
          <span className="bg-linear-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
            & Website Instantly.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed mb-10">
          ScanSafe empowers Indian consumers to verify product authenticity, check business registrations,
          and report scams — all in seconds.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/check"
            className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
          >
            <ScanLine className="w-4 h-4" />
            Check Trust Score
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="#"
            className="group flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
          >
            <Chrome className="w-4 h-4 text-emerald-400" />
            Install Extension
          </a>
        </div>

        {/* Trust line */}
        <p className="mt-8 text-sm text-slate-500">
          Trusted by <span className="text-slate-300 font-medium">50,000+</span> Indian consumers · BIS & FSSAI verified
        </p>
      </div>
    </section>
  );
}
