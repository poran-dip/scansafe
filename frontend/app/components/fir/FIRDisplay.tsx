import { CheckCircle, AlertCircle, Clock, Download, Printer, FileWarning } from "lucide-react";
import type { FIR } from "../../types/trust";

interface FIRDisplayProps {
  fir: FIR;
  onFileFIR: () => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const severityConfig = {
  low:      { bg: "bg-blue-500/10",   border: "border-blue-500/20",   text: "text-blue-300",   label: "Low"      },
  medium:   { bg: "bg-amber-500/10",  border: "border-amber-500/20",  text: "text-amber-300",  label: "Medium"   },
  high:     { bg: "bg-orange-500/10", border: "border-orange-500/20", text: "text-orange-300", label: "High"     },
  critical: { bg: "bg-red-500/10",    border: "border-red-500/20",    text: "text-red-300",    label: "Critical" },
};

const incidentTypeLabels: Record<string, string> = {
  general_complaint: "General Complaint",
  fraud: "Fraud",
  financial_fraud: "Financial Fraud",
  counterfeit_product: "Counterfeit Product",
  harassment: "Harassment",
  product_quality: "Product Quality Issue",
};

interface FieldRowProps { label: string; value: React.ReactNode; mono?: boolean; }
function FieldRow({ label, value, mono }: FieldRowProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{label}</p>
      <p className={`text-sm text-slate-200 ${mono ? "font-mono" : ""}`}>{value}</p>
    </div>
  );
}

export default function FIRDisplay({ fir, onFileFIR, onCancel, isSubmitting = false }: FIRDisplayProps) {
  const sev = severityConfig[fir.severity];

  const handleDownload = () => {
    const content = `FIR — FIRST INFORMATION REPORT\n${"═".repeat(40)}\nFIR ID: ${fir.id}\nDate: ${fir.incidentDate}\nSeverity: ${sev.label}\n\nCOMPLAINANT DETAILS:\nName: ${fir.complainantName}\nPhone: ${fir.complainantPhone}\n\nINCIDENT DETAILS:\nType: ${incidentTypeLabels[fir.incidentType] || fir.incidentType}\n${fir.involvedWebsite ? `Website: ${fir.involvedWebsite}\n` : ""}Description:\n${fir.incidentDescription}\n\n${"═".repeat(40)}\nStatus: ${fir.status}\nGenerated: ${fir.createdAt}`;
    const a = Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(new Blob([content], { type: "text/plain" })),
      download: `FIR-${fir.id}.txt`,
    });
    a.click();
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-slate-900/60 border border-slate-700/50 rounded-2xl overflow-hidden">

      {/* Header */}
      <div className="flex items-start justify-between px-6 py-5 border-b border-slate-700/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
            <FileWarning className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">FIR Preview</h2>
            <p className="text-xs text-slate-500">Review carefully before filing</p>
          </div>
        </div>
        <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border ${sev.bg} ${sev.border} ${sev.text}`}>
          {sev.label} Severity
        </span>
      </div>

      <div className="p-6 space-y-5">

        {/* ID + Date */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800/50 border border-slate-700/40 rounded-xl p-4">
            <FieldRow label="FIR ID" value={fir.id} mono />
          </div>
          <div className="bg-slate-800/50 border border-slate-700/40 rounded-xl p-4">
            <FieldRow label="Incident Date" value={fir.incidentDate} />
          </div>
        </div>

        {/* Complainant */}
        <div className="bg-blue-500/8 border border-blue-500/20 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-blue-400" />
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest">Complainant</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FieldRow label="Full Name" value={fir.complainantName} />
            <FieldRow label="Phone" value={fir.complainantPhone} mono />
          </div>
        </div>

        {/* Incident */}
        <div className="bg-amber-500/8 border border-amber-500/20 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest">Incident Details</p>
          </div>
          <FieldRow label="Type" value={incidentTypeLabels[fir.incidentType] || fir.incidentType} />
          {fir.involvedWebsite && (
            <FieldRow
              label="Involved Website"
              value={
                <a href={`https://${fir.involvedWebsite}`} target="_blank" rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors">
                  {fir.involvedWebsite}
                </a>
              }
            />
          )}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Description</p>
            <div className="bg-slate-800/60 border border-slate-700/40 rounded-xl px-4 py-3 text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
              {fir.incidentDescription}
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-3 bg-slate-800/50 border border-slate-700/40 rounded-xl px-4 py-3">
          <Clock className="w-4 h-4 text-slate-500" />
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Status</p>
            <p className="text-sm text-slate-300 font-medium capitalize">{fir.status}</p>
          </div>
        </div>

        {/* Warning */}
        <div className="flex items-start gap-2.5 bg-amber-500/8 border border-amber-500/20 rounded-xl p-4">
          <span className="text-amber-400 mt-0.5">⚠</span>
          <p className="text-xs text-amber-300 leading-relaxed">
            Please review all information carefully. Once submitted, this FIR will be recorded and escalated to relevant authorities for investigation.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex gap-2">
            <button onClick={() => window.print()} disabled={isSubmitting}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-2 rounded-lg transition-colors disabled:opacity-50">
              <Printer className="w-3.5 h-3.5" /> Print
            </button>
            <button onClick={handleDownload} disabled={isSubmitting}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-2 rounded-lg transition-colors disabled:opacity-50">
              <Download className="w-3.5 h-3.5" /> Download
            </button>
          </div>
          <div className="flex gap-3">
            <button onClick={onCancel} disabled={isSubmitting}
              className="text-sm text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2 rounded-xl transition-colors disabled:opacity-50">
              Back
            </button>
            <button onClick={onFileFIR} disabled={isSubmitting}
              className="flex items-center gap-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-xl transition-all hover:shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5 disabled:opacity-60 disabled:translate-y-0">
              {isSubmitting ? (
                <><div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Filing…</>
              ) : (
                <><CheckCircle className="w-4 h-4" /> File FIR</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
