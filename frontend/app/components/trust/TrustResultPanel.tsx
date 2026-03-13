import { FileWarning, RotateCcw } from "lucide-react";
import type { TrustResult } from "~/types/trust";
import TrustScoreMeter from "./TrustScoreMeter";
import RegistrationBadge from "./RegistrationBadge";
import AlertCard from "./AlertCard";
import ProductDetailsCard from "./ProductDetailsCard";

interface TrustResultPanelProps {
  result: TrustResult;
  onReset: () => void;
}

export default function TrustResultPanel({ result, onReset }: TrustResultPanelProps) {
  const isUnsafe = result.trustLevel === "unsafe";
  const isWarning = result.trustLevel === "warning";

  return (
    <div className="flex flex-col gap-5 animate-[fadeSlideUp_0.4s_ease-out]">
      {/* Input echo */}
      <div className="flex items-center justify-between gap-3 bg-slate-800/50 border border-slate-700/40 rounded-xl px-4 py-3">
        <div className="min-w-0">
          <p className="text-xs text-slate-500 mb-0.5">
            {result.mode === "url" ? "URL Verified" : "QR Code Scanned"}
          </p>
          <p className="text-sm text-slate-300 font-mono truncate">{result.inputValue}</p>
        </div>
        <button
          onClick={onReset}
          className="shrink-0 flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors px-2 py-1.5 rounded-lg hover:bg-slate-700/50"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          New scan
        </button>
      </div>

      {/* Score + Registrations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TrustScoreMeter score={result.trustScore} level={result.trustLevel} />
        <div className="flex flex-col gap-2.5">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
            Registrations
          </p>
          {result.registrations.map((reg) => (
            <RegistrationBadge key={reg.body} status={reg} />
          ))}
        </div>
      </div>

      {/* Alerts */}
      {result.alerts.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
            Alerts & Notices
          </p>
          {result.alerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      )}

      {/* Product details (QR only) */}
      {result.product && <ProductDetailsCard product={result.product} />}

      {/* File complaint CTA */}
      {(isUnsafe || isWarning) && (
        <div
          className={`rounded-2xl border p-5 ${
            isUnsafe
              ? "bg-red-500/8 border-red-500/20"
              : "bg-amber-500/8 border-amber-500/20"
          }`}
        >
          <p className={`text-sm font-semibold mb-1 ${isUnsafe ? "text-red-300" : "text-amber-300"}`}>
            {isUnsafe ? "This looks like a scam." : "Something seems off."}
          </p>
          <p className="text-xs text-slate-400 mb-4">
            {isUnsafe
              ? "We recommend you do not proceed. File a complaint with the National Cyber Crime portal."
              : "Partial registration detected. You may file a complaint if you've been misled."}
          </p>
          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 ${
              isUnsafe
                ? "bg-red-600 hover:bg-red-500 text-white hover:shadow-lg hover:shadow-red-500/25"
                : "bg-amber-600 hover:bg-amber-500 text-white hover:shadow-lg hover:shadow-amber-500/25"
            }`}
          >
            <FileWarning className="w-4 h-4" />
            File Complaint / FIR
          </a>
        </div>
      )}
    </div>
  );
}
