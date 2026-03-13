import { CheckCircle, AlertCircle, Clock, Download, Printer } from "lucide-react";
import type { FIR } from "~/types/trust";

interface FIRDisplayProps {
  fir: FIR;
  onFileFIR: () => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const severityColors = {
  low: { bg: "bg-blue-50", border: "border-blue-300", text: "text-blue-800", label: "Low" },
  medium: { bg: "bg-yellow-50", border: "border-yellow-300", text: "text-yellow-800", label: "Medium" },
  high: { bg: "bg-orange-50", border: "border-orange-300", text: "text-orange-800", label: "High" },
  critical: { bg: "bg-red-50", border: "border-red-300", text: "text-red-800", label: "Critical" },
};

const incidentTypeLabels: Record<string, string> = {
  general_complaint: "General Complaint",
  fraud: "Fraud",
  financial_fraud: "Financial Fraud",
  counterfeit_product: "Counterfeit Product",
  harassment: "Harassment",
  product_quality: "Product Quality Issue",
};

export default function FIRDisplay({ fir, onFileFIR, onCancel, isSubmitting = false }: FIRDisplayProps) {
  const severityStyle = severityColors[fir.severity];

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const content = `
FIR - FIRST INFORMATION REPORT
════════════════════════════════════════
FIR ID: ${fir.id}
Date: ${fir.incidentDate}
Severity: ${severityStyle.label}

COMPLAINANT DETAILS:
Name: ${fir.complainantName}
Phone: ${fir.complainantPhone}

INCIDENT DETAILS:
Type: ${incidentTypeLabels[fir.incidentType] || fir.incidentType}
${fir.involvedWebsite ? `Website: ${fir.involvedWebsite}\n` : ""}
Description:
${fir.incidentDescription}

════════════════════════════════════════
Status: ${fir.status}
Generated: ${fir.createdAt}
    `;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `FIR-${fir.id}.txt`;
    a.click();
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Header */}
      <div className="mb-6 border-b border-gray-200 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">📋 FIR Preview</h2>
            <p className="text-sm text-gray-500 mt-1">Review your complaint before filing</p>
          </div>
          <div className={`px-4 py-2 rounded-full border-2 font-semibold ${severityStyle.bg} ${severityStyle.border} ${severityStyle.text}`}>
            {severityStyle.label} Severity
          </div>
        </div>
      </div>

      {/* FIR Content */}
      <div className="space-y-6 mb-8">
        {/* FIR ID & Date */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">FIR ID</p>
            <p className="text-lg font-mono text-gray-900 mt-1">{fir.id}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Incident Date</p>
            <p className="text-lg text-gray-900 mt-1">{fir.incidentDate}</p>
          </div>
        </div>

        {/* Complainant Details */}
        <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
          <h3 className="text-sm font-bold text-gray-800 uppercase mb-3 flex items-center gap-2">
            <CheckCircle size={18} className="text-blue-600" />
            Complainant Information
          </h3>
          <div className="space-y-2">
            <p className="text-gray-800">
              <span className="font-semibold">Name:</span> {fir.complainantName}
            </p>
            <p className="text-gray-800">
              <span className="font-semibold">Phone:</span> {fir.complainantPhone}
            </p>
          </div>
        </div>

        {/* Incident Details */}
        <div className="border border-gray-200 rounded-lg p-4 bg-yellow-50">
          <h3 className="text-sm font-bold text-gray-800 uppercase mb-3 flex items-center gap-2">
            <AlertCircle size={18} className="text-yellow-600" />
            Incident Details
          </h3>
          <div className="space-y-3">
            <p className="text-gray-800">
              <span className="font-semibold">Type:</span> {incidentTypeLabels[fir.incidentType] || fir.incidentType}
            </p>
            {fir.involvedWebsite && (
              <p className="text-gray-800">
                <span className="font-semibold">Website:</span> <a href={`https://${fir.involvedWebsite}`} target="_blank" className="text-blue-600 hover:underline">{fir.involvedWebsite}</a>
              </p>
            )}
            <div>
              <p className="font-semibold text-gray-800 mb-2">Description:</p>
              <div className="bg-white border border-gray-300 rounded p-3 text-gray-700 whitespace-pre-wrap">
                {fir.incidentDescription}
              </div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex items-center gap-3">
          <Clock size={20} className="text-gray-600" />
          <div>
            <p className="text-xs font-semibold text-gray-600 uppercase">Status</p>
            <p className="text-gray-800 font-semibold capitalize">{fir.status}</p>
          </div>
        </div>
      </div>

      {/* Warning Message */}
      <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm">
        <p className="font-semibold mb-1">⚠️ Important Information</p>
        <p>
          Please review all information carefully. Once submitted, this FIR will be recorded in the system and escalated to relevant authorities for investigation.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-between">
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-400 text-gray-800 font-semibold rounded-lg transition"
          >
            <Printer size={18} />
            Print
          </button>
          <button
            onClick={handleDownload}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-400 text-gray-800 font-semibold rounded-lg transition"
          >
            <Download size={18} />
            Download
          </button>
        </div>
        <div className="flex gap-4">
          <button
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-6 py-2 bg-gray-400 hover:bg-gray-500 disabled:bg-gray-400 text-white font-semibold rounded-lg transition"
          >
            Back
          </button>
          <button
            onClick={onFileFIR}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2 bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white font-semibold rounded-lg transition"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Filing...
              </>
            ) : (
              <>
                <CheckCircle size={18} />
                File FIR
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
