import { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";
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

  function handleTranscriptComplete(text: string) {
    setTranscript(text);
  }

  async function handleGenerateFIR() {
    setError("");

    if (!transcript.trim()) {
      setError("Please provide a complaint description.");
      return;
    }

    if (!complainantName.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!/^\d{10}$/.test(complainantPhone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setPageState("loading");

    try {
      const fir = await generateFIRFromVoice(
        transcript,
        complainantName,
        complainantPhone
      );

      setGeneratedFIR(fir);
      setPageState("preview");
    } catch (err) {
      console.error(err);
      setError("Failed to generate FIR. Please try again.");
      setPageState("input");
    }
  }

  async function handleFileFIR() {
    if (!generatedFIR) return;

    setPageState("loading");

    try {
      await new Promise((res) => setTimeout(res, 2000));

      const submittedFIR: FIR = {
        ...generatedFIR,
        status: "submitted",
      };

      setGeneratedFIR(submittedFIR);
      setPageState("submitted");
    } catch (err) {
      console.error(err);
      setError("Failed to file FIR.");
      setPageState("preview");
    }
  }

  function resetForm() {
    setPageState("input");
    setTranscript("");
    setComplainantName("");
    setComplainantPhone("");
    setGeneratedFIR(null);
    setError("");
  }

  function handleBackToInput() {
    setPageState("input");
    setGeneratedFIR(null);
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden">

      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-size-[64px_64px]" />

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl" />

      <Navbar />

      <main className="flex-1 py-20 relative z-10">
        <div className="max-w-3xl mx-auto px-6">

          {/* INPUT */}
          {pageState === "input" && (
            <div className="space-y-10">

              <VoiceRecorder
                onTranscriptComplete={handleTranscriptComplete}
                isLoading={false}
              />

              {transcript && (
                <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-8">

                  <h3 className="text-xl font-bold mb-6">
                    Your Information
                  </h3>

                  {error && (
                    <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 text-sm">
                      {error}
                    </div>
                  )}

                  <div className="space-y-5">

                    <div>
                      <label className="block text-sm text-slate-300 mb-2">
                        Full Name
                      </label>

                      <input
                        type="text"
                        value={complainantName}
                        onChange={(e) => setComplainantName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-slate-300 mb-2">
                        Phone Number
                      </label>

                      <input
                        type="tel"
                        value={complainantPhone}
                        onChange={(e) => setComplainantPhone(e.target.value)}
                        placeholder="10 digit phone number"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <button
                      onClick={handleGenerateFIR}
                      className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/25"
                    >
                      Review FIR
                    </button>

                  </div>
                </div>
              )}

            </div>
          )}

          {/* LOADING */}
          {pageState === "loading" && (
            <div className="flex flex-col items-center justify-center text-center py-32">

              <Loader2 size={60} className="animate-spin text-blue-400 mb-6" />

              <h2 className="text-2xl font-bold mb-2">
                Processing Complaint
              </h2>

              <p className="text-slate-400">
                Generating your FIR report...
              </p>

            </div>
          )}

          {/* PREVIEW */}
          {pageState === "preview" && generatedFIR && (
            <FIRDisplay
              fir={generatedFIR}
              onFileFIR={handleFileFIR}
              onCancel={handleBackToInput}
              isSubmitting={false}
            />
          )}

          {/* SUBMITTED */}
          {pageState === "submitted" && generatedFIR && (
            <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-10 text-center">

              <CheckCircle size={80} className="mx-auto text-emerald-400 mb-6" />

              <h2 className="text-3xl font-bold mb-2">
                FIR Filed Successfully
              </h2>

              <p className="text-slate-400 mb-4">
                Your complaint reference ID:
              </p>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6 font-mono text-lg">
                {generatedFIR.id}
              </div>

              <p className="text-slate-400 mb-8">
                Our team will review your complaint within 24-48 hours.
              </p>

              <button
                onClick={resetForm}
                className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-semibold transition hover:shadow-lg hover:shadow-blue-500/25"
              >
                File Another Complaint
              </button>

            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}