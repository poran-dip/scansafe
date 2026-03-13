import { Info, AlertTriangle, AlertOctagon } from "lucide-react";
import type { TrustAlert } from "~/types/trust";

interface AlertCardProps {
  alert: TrustAlert;
}

const severityConfig = {
  info: {
    icon: Info,
    color: "text-blue-400",
    bg: "bg-blue-500/8 border-blue-500/20",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-amber-400",
    bg: "bg-amber-500/8 border-amber-500/20",
  },
  danger: {
    icon: AlertOctagon,
    color: "text-red-400",
    bg: "bg-red-500/8 border-red-500/20",
  },
};

export default function AlertCard({ alert }: AlertCardProps) {
  const { icon: Icon, color, bg } = severityConfig[alert.severity];

  return (
    <div className={`flex items-start gap-3 rounded-xl px-4 py-3 border ${bg}`}>
      <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${color}`} />
      <p className="text-sm text-slate-300 leading-relaxed">{alert.message}</p>
    </div>
  );
}
