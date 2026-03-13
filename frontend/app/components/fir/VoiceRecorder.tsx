import { useState, useRef } from "react";
import { Mic, Square } from "lucide-react";

interface VoiceRecorderProps {
  onTranscriptComplete: (transcript: string) => void;
  isLoading?: boolean;
}

export default function VoiceRecorder({ onTranscriptComplete, isLoading = false }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);

  const startRecording = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Speech Recognition not supported in this browser. Please use Chrome or Edge.");
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.language = "en-IN";

    let interimTranscript = "";

    recognitionRef.current.onstart = () => {
      setIsRecording(true);
    };

    recognitionRef.current.onresult = (event: any) => {
      interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptSegment = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setTranscript((prev) => prev + transcriptSegment + " ");
        } else {
          interimTranscript += transcriptSegment;
        }
      }
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      alert(`Error: ${event.error}`);
      setIsRecording(false);
    };

    recognitionRef.current.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current.start();
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
      onTranscriptComplete(transcript);
    }
  };

  const clearTranscript = () => {
    setTranscript("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-2xl font-bold text-gray-800">📢 File Your Complaint</h2>
        <p className="text-gray-600 text-center">Describe your complaint in your own words. Speak clearly.</p>

        {/* Recording Button */}
        <div className="flex gap-4">
          {!isRecording ? (
            <button
              onClick={startRecording}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition"
            >
              <Mic size={20} />
              Start Recording
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition"
            >
              <Square size={20} />
              Stop Recording
            </button>
          )}

          {transcript && (
            <button
              onClick={clearTranscript}
              disabled={isLoading}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition"
            >
              Clear
            </button>
          )}
        </div>

        {/* Recording Indicator */}
        {isRecording && (
          <div className="flex items-center gap-2 text-red-500 text-sm font-semibold">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            Recording...
          </div>
        )}

        {/* Transcript Display */}
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Your Complaint:</label>
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Your speech will appear here..."
            className="w-full h-40 p-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <p className="text-xs text-gray-500 mt-1">{transcript.length} characters</p>
        </div>
      </div>
    </div>
  );
}
