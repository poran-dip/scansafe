import { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import VoiceRecorder from "~/components/fir/VoiceRecorder";
import FIRDisplay from "~/components/fir/FIRDisplay";
import { generateFIRFromVoice } from "~/services/verifyService";
import type { FIR } from "~/types/trust";

type PageState = "input" | "loading" | "preview" | "submitted";

export default function FIRFilingPage() {
  const [pageState, setPageState] = useState<PageState>("input");
  const [transcript, setTranscript] = useState("");
  const [complainantName, setComplainantName] = useState("");
  const [complainantPhone, setComplainantPhone] = useState("");
  const [generatedFIR, setGeneratedFIR] = useState<FIR | null>(null);
  const [error, setError] = useState("");

  async function handleTranscriptComplete(text: string) {
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
    
    if (!complainantPhone.trim() || complainantPhone.length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }

    setPageState("loading");
    try {
      const fir = await generateFIRFromVoice(transcript, complainantName, complainantPhone);
      setGeneratedFIR(fir);
      setPageState("preview");
    } catch (err) {
      setError("Failed to generate FIR. Please try again.");
      setPageState("input");
    }
  }

  async function handleFileFIR() {
    if (!generatedFIR) return;
    
    setPageState("loading");
    try {
      // Simulate submission to backend
      await new Promise((res) => setTimeout(res, 2000));
      
      // Update FIR status
      const submittedFIR = { ...generatedFIR, status: "submitted" as const };
      setGeneratedFIR(submittedFIR);
      setPageState("submitted");
    } catch (err) {
      setError("Failed to file FIR. Please try again.");
      setPageState("preview");
    }
  }

  function handleBackToInput() {
    setPageState("input");
    setTranscript("");
    setGeneratedFIR(null);
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          
          {/* Input State */}
          {pageState === "input" && (
            <div className="space-y-8">
              <VoiceRecorder onTranscriptComplete={handleTranscriptComplete} isLoading={pageState === "loading"} />

              {/* Complainant Form */}
              {transcript && (
                <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">👤 Your Information</h3>
                  
                  {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-300 rounded-lg text-red-800 text-sm">
                      {error}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={complainantName}
                        onChange={(e) => setComplainantName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        value={complainantPhone}
                        onChange={(e) => setComplainantPhone(e.target.value)}
                        placeholder="Enter your 10-digit phone number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </div>

                    <button
                      onClick={handleGenerateFIR}
                      className="w-full mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                    >
                      Review FIR
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Loading State */}
          {pageState === "loading" && (
            <div className="flex flex-col items-center justify-center py-20 max-w-2xl mx-auto">
              <div className="text-center">
                <Loader2 size={64} className="animate-spin text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Processing Your Complaint</h2>
                <p className="text-gray-600">Generating your FIR report...</p>
              </div>
            </div>
          )}

          {/* Preview State */}
          {pageState === "preview" && generatedFIR && (
            <FIRDisplay
              fir={generatedFIR}
              onFileFIR={handleFileFIR}
              onCancel={handleBackToInput}
              isSubmitting={false}
            />
          )}

          {/* Submitted State */}
          {pageState === "submitted" && generatedFIR && (
            <div className="w-full max-w-2xl mx-auto">
              <div className="p-8 bg-white rounded-lg shadow-lg border-2 border-green-500 text-center">
                <CheckCircle size={80} className="mx-auto text-green-500 mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-2">✅ FIR Filed Successfully!</h2>
                <p className="text-gray-600 mb-4">Your complaint has been registered with reference ID:</p>
                <div className="bg-gray-100 p-4 rounded-lg mb-6 font-mono text-lg font-bold text-gray-800">
                  {generatedFIR.id}
                </div>
                <p className="text-gray-600 mb-6">
                  Our team will review your complaint and take appropriate action within 24-48 hours. You will receive updates via SMS on the phone number provided.
                </p>
                <button
                  onClick={() => {
                    setPageState("input");
                    setTranscript("");
                    setComplainantName("");
                    setComplainantPhone("");
                    setGeneratedFIR(null);
                  }}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                >
                  File Another Complaint
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
