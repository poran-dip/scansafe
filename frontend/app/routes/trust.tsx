import { useState } from "react";
import { Globe, Barcode, Search, ShieldCheck } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BarcodeScanner from "../components/trust/BarcodeScanner";
import TrustResultPanel from "../components/trust/TrustResultPanel";
import { verifyInput } from "../services/verifyService";
import type { TrustResult, InputMode } from "../types/trust";
import type { Route } from "./+types/trust";

type PageState = "idle" | "loading" | "result";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Check Website/Product - ScanSafe" },
    { name: "description", content: "Enter a URL or scan a QR code to get the trust score." },
  ];
}

export default function TrustScorePage() {
  const [mode, setMode] = useState<InputMode>("url");
  const [urlInput, setUrlInput] = useState("");
  const [urlError, setUrlError] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [pageState, setPageState] = useState<PageState>("idle");
  const [result, setResult] = useState<TrustResult | null>(null);

  function validateUrl(value: string): string {
    if (!value.trim()) return "Please enter a URL.";
    try {
      const url = new URL(value.startsWith("http") ? value : `https://${value}`);
      if (!url.hostname.includes(".")) return "Enter a valid domain (e.g. flipkart.com).";
      return "";
    } catch {
      return "Enter a valid URL.";
    }
  }

  async function handleVerify() {
    const normalised = urlInput.startsWith("http") ? urlInput : `https://${urlInput}`;
    const err = validateUrl(urlInput);
    if (err) { setUrlError(err); return; }
    setUrlError("");
    await runVerification(normalised, "url");
  }

  async function handleBarcodeDetected(value: string) {
    setShowScanner(false);
    await runVerification(value, "qr");
  }

  async function runVerification(value: string, inputMode: InputMode) {
    setPageState("loading");
    try {
      const res = await verifyInput(value, inputMode);
      setResult(res);
      setPageState("result");
    } catch {
      setPageState("idle");
    }
  }

  function handleReset() {
    setPageState("idle");
    setResult(null);
    setUrlInput("");
    setUrlError("");
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-16">
        {/* Page header */}
        <div className="bg-linear-to-b from-slate-900 to-slate-950 border-b border-white/5 py-12 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-medium text-blue-200 tracking-wide">
                Verification Engine
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
              Check Trust Score
            </h1>
            <p className="text-slate-400 text-sm md:text-base">
              Enter a website URL or scan a product barcode to verify authenticity,
              registrations, and safety.
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-10">
          {/* Input mode toggle */}
          {pageState === "idle" && (
            <div className="flex flex-col gap-6">
              <div className="flex bg-slate-900/80 border border-slate-700/50 rounded-xl p-1 gap-1">
                {(["url", "qr"] as InputMode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => { setMode(m); setUrlError(""); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      mode === m
                        ? "bg-blue-600 text-white shadow"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {m === "url" ? <Globe className="w-4 h-4" /> : <Barcode className="w-4 h-4" />}
                    {m === "url" ? "Website URL" : "Scan Barcode"}
                  </button>
                ))}
              </div>

              {mode === "url" ? (
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                      <input
                        type="text"
                        value={urlInput}
                        onChange={(e) => { setUrlInput(e.target.value); setUrlError(""); }}
                        onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                        placeholder="e.g. flipkart.com or https://somesite.in"
                        className={`w-full bg-slate-900/60 border ${
                          urlError ? "border-red-500/60 focus:border-red-400" : "border-slate-700 focus:border-blue-500"
                        } text-white placeholder-slate-600 rounded-xl pl-10 pr-4 py-3.5 text-sm outline-none transition-all duration-200 focus:ring-2 ${
                          urlError ? "focus:ring-red-500/20" : "focus:ring-blue-500/20"
                        }`}
                      />
                    </div>
                    <button
                      onClick={handleVerify}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 shrink-0"
                    >
                      <Search className="w-4 h-4" />
                      <span className="hidden sm:inline">Verify</span>
                    </button>
                  </div>
                  {urlError && <p className="text-xs text-red-400 pl-1">{urlError}</p>}

                  {/* Demo hints */}
                  <div className="flex flex-wrap gap-2 mt-1">
                    {["flipkart.com", "scam-site.fake", "warn-example.in"].map((hint) => (
                      <button
                        key={hint}
                        onClick={() => setUrlInput(hint)}
                        className="text-xs text-slate-600 hover:text-slate-400 bg-slate-800/50 hover:bg-slate-800 px-3 py-1 rounded-lg transition-colors font-mono"
                      >
                        {hint}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-full border-2 border-dashed border-slate-700 rounded-2xl p-10 flex flex-col items-center gap-4 text-center">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center">
                      <Barcode className="w-8 h-8 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-1">Ready to scan</p>
                      <p className="text-slate-500 text-sm">
                        Opens your device camera to scan the product barcode
                      </p>
                    </div>
                    <button
                      onClick={() => setShowScanner(true)}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
                    >
                      <Barcode className="w-4 h-4" />
                      Open Scanner
                    </button>
                  </div>
                  {/* Demo QR values */}
                  <div className="flex flex-wrap justify-center gap-2">
                    {["BARCODE-SAFE-999", "BARCODE-FAKE-001", "BARCODE-WARN-002"].map((val) => (
                      <button
                        key={val}
                        onClick={() => handleBarcodeDetected(val)}
                        className="text-xs text-slate-600 hover:text-slate-400 bg-slate-800/50 hover:bg-slate-800 px-3 py-1 rounded-lg transition-colors font-mono"
                      >
                        Simulate: {val}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Loading */}
          {pageState === "loading" && (
            <div className="flex flex-col items-center justify-center py-24 gap-5">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-slate-700" />
                <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
              </div>
              <div className="text-center">
                <p className="text-white font-semibold">Verifying...</p>
                <p className="text-slate-500 text-sm mt-1">
                  Checking BIS, FSSAI & cybercrime databases
                </p>
              </div>
            </div>
          )}

          {/* Result */}
          {pageState === "result" && result && (
            <TrustResultPanel result={result} onReset={handleReset} />
          )}
        </div>
      </main>

      <Footer />

      {showScanner && (
        <BarcodeScanner onDetected={handleBarcodeDetected} onClose={() => setShowScanner(false)} />
      )}

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
