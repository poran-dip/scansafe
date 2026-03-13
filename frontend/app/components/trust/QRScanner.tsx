import { useEffect, useRef, useState } from "react";
import { X, Camera } from "lucide-react";

interface QRScannerProps {
  onDetected: (value: string) => void;
  onClose: () => void;
}

export default function QRScanner({ onDetected, onClose }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setScanning(true);
        scheduleFrame();
      }
    } catch {
      setError("Camera access denied. Please allow camera permission and try again.");
    }
  }

  function stopCamera() {
    cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
  }

  function scheduleFrame() {
    rafRef.current = requestAnimationFrame(scanFrame);
  }

  async function scanFrame() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA) {
      scheduleFrame();
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) { scheduleFrame(); return; }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Dynamically import jsQR to keep bundle lean
    const { default: jsQR } = await import("jsqr");
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code?.data) {
      stopCamera();
      onDetected(code.data);
      return;
    }

    scheduleFrame();
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden w-full max-w-sm shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700/50">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-white">Scan QR Code</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Camera view */}
        <div className="relative aspect-square bg-black">
          {error ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
              <Camera className="w-10 h-10 text-slate-600" />
              <p className="text-sm text-slate-400">{error}</p>
            </div>
          ) : (
            <>
              <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
              <canvas ref={canvasRef} className="hidden" />
              {/* Scan overlay */}
              {scanning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-52 h-52 relative">
                    <div className="absolute inset-0 border-2 border-white/20 rounded-xl" />
                    {/* Corners */}
                    {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map(
                      (pos) => (
                        <div
                          key={pos}
                          className={`absolute w-6 h-6 border-blue-400 ${pos} ${
                            pos.includes("top") ? "border-t-2" : "border-b-2"
                          } ${pos.includes("left") ? "border-l-2" : "border-r-2"} ${
                            pos.includes("top-0 left-0") ? "rounded-tl-lg" :
                            pos.includes("top-0 right-0") ? "rounded-tr-lg" :
                            pos.includes("bottom-0 left-0") ? "rounded-bl-lg" : "rounded-br-lg"
                          }`}
                        />
                      )
                    )}
                    {/* Scanning line */}
                    <div className="absolute inset-x-0 top-0 h-0.5 bg-blue-400/70 blur-sm animate-[scan_2s_ease-in-out_infinite]" />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <p className="text-center text-xs text-slate-500 py-3 px-4">
          Point your camera at a product QR code to scan
        </p>
      </div>

      <style>{`
        @keyframes scan {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(200px); }
        }
      `}</style>
    </div>
  );
}
