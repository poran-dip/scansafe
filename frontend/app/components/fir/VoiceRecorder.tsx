import { useState, useRef } from "react";
import { Mic, Square, Trash2 } from "lucide-react";

interface VoiceRecorderProps {
  onTranscriptComplete: (transcript: string) => void;
  isLoading?: boolean;
}

export default function VoiceRecorder({ onTranscriptComplete, isLoading = false }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [unsupported, setUnsupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  const startRecording = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setUnsupported(true);
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.language = "en-IN";

    recognitionRef.current.onstart = () => setIsRecording(true);

    recognitionRef.current.onresult = (event: any) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          setTranscript((prev) => prev + event.results[i][0].transcript + " ");
        }
      }
    };

    recognitionRef.current.onerror = () => setIsRecording(false);
    recognitionRef.current.onend = () => setIsRecording(false);
    recognitionRef.current.start();
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    setIsRecording(false);
    onTranscriptComplete(transcript);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900/60 border border-slate-700/50 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center">
          <Mic className="w-5 h-5 text-red-400" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-white">Voice Complaint</h2>
          <p className="text-xs text-slate-500">Speak clearly in English or Hindi</p>
        </div>
        {isRecording && (
          <div className="ml-auto flex items-center gap-2 text-red-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            Recording
          </div>
        )}
      </div>

      {/* Unsupported warning */}
      {unsupported && (
        <div className="mb-4 flex items-start gap-2.5 bg-amber-500/8 border border-amber-500/20 rounded-xl p-3">
          <span className="text-amber-400 text-sm mt-0.5">⚠</span>
          <p className="text-xs text-amber-300">
            Speech recognition isn't supported in this browser. Please use Chrome or Edge, or type your complaint below.
          </p>
        </div>
      )}

      {/* Mic button */}
      <div className="flex justify-center mb-6">
        {!isRecording ? (
          <button
            onClick={startRecording}
            disabled={isLoading}
            className="group relative flex flex-col items-center gap-3"
          >
            <div className="w-20 h-20 rounded-full bg-red-500/10 border-2 border-red-500/30 hover:border-red-400 hover:bg-red-500/15 flex items-center justify-center transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:shadow-red-500/20 disabled:opacity-50">
              <Mic className="w-8 h-8 text-red-400" />
            </div>
            <span className="text-xs text-slate-500 font-medium">Tap to record</span>
          </button>
        ) : (
          <button onClick={stopRecording} className="group flex flex-col items-center gap-3">
            <div className="w-20 h-20 rounded-full bg-red-500/20 border-2 border-red-400 flex items-center justify-center animate-pulse">
              <Square className="w-7 h-7 text-red-400" />
            </div>
            <span className="text-xs text-red-400 font-semibold">Tap to stop</span>
          </button>
        )}
      </div>

      {/* Transcript */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
            Complaint Text
          </label>
          {transcript && (
            <button
              onClick={() => { setTranscript(""); onTranscriptComplete(""); }}
              disabled={isLoading}
              className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-400 transition-colors"
            >
              <Trash2 className="w-3 h-3" /> Clear
            </button>
          )}
        </div>
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          onBlur={() => onTranscriptComplete(transcript)}
          placeholder="Your speech will appear here, or type your complaint directly…"
          rows={5}
          className="w-full bg-slate-800/60 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-200 placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 resize-none"
        />
        <p className="text-xs text-slate-600 text-right">{transcript.length} characters</p>
      </div>
    </div>
  );
}
