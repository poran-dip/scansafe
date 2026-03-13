import { ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-linear-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-bold">ScanSafe</span>
        </div>
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} ScanSafe. Built for Indian consumers.
        </p>
        <p className="text-slate-500 text-sm">
          Built with ❤️ by Team18
        </p>
      </div>
    </footer>
  );
}
