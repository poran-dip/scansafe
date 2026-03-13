import type { TrustLevel } from "~/types/trust";

interface TrustScoreMeterProps {
  score: number;
  level: TrustLevel;
}

const levelConfig: Record<TrustLevel, { label: string; color: string; ring: string; bg: string }> = {
  safe: {
    label: "Trusted",
    color: "text-emerald-400",
    ring: "stroke-emerald-500",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  warning: {
    label: "Caution",
    color: "text-amber-400",
    ring: "stroke-amber-500",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  unsafe: {
    label: "Unsafe",
    color: "text-red-400",
    ring: "stroke-red-500",
    bg: "bg-red-500/10 border-red-500/20",
  },
};

export default function TrustScoreMeter({ score, level }: TrustScoreMeterProps) {
  const config = levelConfig[level];
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className={`flex flex-col items-center justify-center border rounded-2xl p-6 ${config.bg}`}>
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          {/* Track */}
          <circle
            cx="60" cy="60" r={radius}
            fill="none"
            strokeWidth="10"
            className="stroke-slate-700/60"
          />
          {/* Progress */}
          <circle
            cx="60" cy="60" r={radius}
            fill="none"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={`${config.ring} transition-all duration-700 ease-out`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-black ${config.color}`}>{score}</span>
          <span className="text-xs text-slate-500 font-medium">/ 100</span>
        </div>
      </div>
      <p className={`mt-3 text-sm font-semibold tracking-wide ${config.color}`}>
        {config.label}
      </p>
      <p className="text-xs text-slate-500 mt-0.5">Trust Score</p>
    </div>
  );
}
