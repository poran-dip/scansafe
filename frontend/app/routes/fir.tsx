import { useState } from "react";
import { FileWarning, CheckCircle, RotateCcw } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VoiceRecorder from "../components/fir/VoiceRecorder";
import FIRDisplay from "../components/fir/FIRDisplay";
import { generateFIRFromVoice } from "../services/verifyService";
import type { FIR } from "../types/trust";

type PageState = "input" | "loading" | "preview" | "submitted";

export default function FIRFilingPage() {
  const [pageState, setPageState] = useState<PageState>("input");
  const [transcript, setTranscript] = useState("");
  const [complainantName, setComplainantName] = useState("");
  const [complainantPhone, setComplainantPhone] = useState("");
  const [generatedFIR, setGeneratedFIR] = useState<FIR | null>(null);
  const [error, setError] = useState("");

  async function handleGenerateFIR() {
    setError("");
    if (!transcript.trim()) { setError("Please provide a complaint description."); return; }
    if (!complainantName.trim()) { setError("Please enter your full name."); return; }
    if (!complainantPhone.trim() || complainantPhone.length < 10) { setError("Please enter a valid 10-digit phone number."); return; }

    setPageState("loading");
    try {
      const fir = await generateFIRFromVoice(transcript, complainantName, complainantPhone);
      setGeneratedFIR(fir);
      setPageState("preview");
    } catch {
      setError("Failed to generate FIR. Please try again.");
      setPageState("input");
    }
  }

  async function handleFileFIR() {
    if (!generatedFIR) return;
    setPageState("loading");
    try {
      await new Promise((res) => setTimeout(res, 2000));
      setGeneratedFIR({ ...generatedFIR, status: "submitted" });
      setPageState("submitted");
    } catch {
      setError("Failed to file FIR. Please try again.");
      setPageState("preview");
    }
  }

  function handleReset() {
    setPageState("input");
    setTranscript("");
    setComplainantName("");
    setComplainantPhone("");
    setGeneratedFIR(null);
    setError("");
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      {/* Grid + glows */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(59,130,246,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.04)_1px,transparent_1px)] bg-size-[64px_64px] pointer-events-none" />
      <div className="fixed top-32 left-1/4 w-96 h-96 bg-blue-600/6 blur-3xl rounded-full pointer-events-none" />
      <div className="fixed bottom-32 right-1/4 w-80 h-80 bg-red-600/6 blur-3xl rounded-full pointer-events-none" />

      <Navbar />

      <main className="relative z-10 flex-1 pt-16">
        {/* Page header */}
        <div className="bg-linear-to-b from-slate-900 to-slate-950 border-b border-white/5 py-12 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 mb-5">
              <FileWarning className="w-4 h-4 text-red-400" />
              <span className="text-xs font-medium text-red-200 tracking-wide">File a Complaint</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
              Submit FIR / Complaint
            </h1>
            <p className="text-slate-400 text-sm md:text-base">
              Describe what happened using your voice or by typing. We'll generate a formal complaint report for you to review and file.
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">

          {/* ── Input ── */}
          {pageState === "input" && (
            <>
              <VoiceRecorder onTranscriptComplete={setTranscript} isLoading={false} />

              {transcript && (
                <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-6 space-y-4 animate-[fadeSlideUp_0.3s_ease-out]">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <h3 className="text-sm font-semibold text-white">Your Information</h3>
                  </div>

                  {error && (
                    <div className="flex items-start gap-2.5 bg-red-500/8 border border-red-500/20 rounded-xl p-3">
                      <span className="text-red-400 text-sm mt-0.5">✕</span>
                      <p className="text-xs text-red-300">{error}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={complainantName}
                        onChange={(e) => setComplainantName(e.target.value)}
                        placeholder="e.g. Riya Sharma"
                        className="w-full bg-slate-800/60 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                        Phone Number <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        value={complainantPhone}
                        onChange={(e) => setComplainantPhone(e.target.value)}
                        placeholder="10-digit mobile number"
                        className="w-full bg-slate-800/60 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
                      />
                    </div>

                    <button
                      onClick={handleGenerateFIR}
                      className="group w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
                    >
                      <FileWarning className="w-4 h-4" />
                      Review FIR
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ── Loading ── */}
          {pageState === "loading" && (
            <div className="flex flex-col items-center justify-center py-24 gap-5">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-slate-700" />
                <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
              </div>
              <div className="text-center">
                <p className="text-white font-semibold">Processing complaint…</p>
                <p className="text-slate-500 text-sm mt-1">Generating your FIR report</p>
              </div>
            </div>
          )}

          {/* ── Preview ── */}
          {pageState === "preview" && generatedFIR && (
            <FIRDisplay
              fir={generatedFIR}
              onFileFIR={handleFileFIR}
              onCancel={handleReset}
              isSubmitting={false}
            />
          )}

          {/* ── Submitted ── */}
          {pageState === "submitted" && generatedFIR && (
            <div className="bg-slate-900/60 border border-emerald-500/20 rounded-2xl p-8 text-center animate-[fadeSlideUp_0.4s_ease-out]">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-black text-white mb-2 tracking-tight">FIR Filed Successfully</h2>
              <p className="text-slate-400 text-sm mb-6">Your complaint has been registered with reference ID:</p>

              <div className="bg-slate-800/60 border border-slate-700 rounded-xl px-5 py-3 font-mono text-base font-bold text-emerald-400 mb-6 inline-block">
                {generatedFIR.id}
              </div>

              <p className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto mb-8">
                Our team will review your complaint within 24–48 hours. You'll receive updates via SMS on the number provided.
              </p>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 px-5 py-2.5 rounded-xl transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                File Another Complaint
              </button>
            </div>
          )}

        </div>
      </main>

      <Footer />

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
