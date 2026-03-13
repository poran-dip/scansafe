import { CheckCircle2, XCircle } from "lucide-react";
import type { RegistrationStatus } from "~/types/trust";

interface RegistrationBadgeProps {
  status: RegistrationStatus;
}

export default function RegistrationBadge({ status }: RegistrationBadgeProps) {
  const { body, registered, registrationNumber, expiresAt } = status;

  return (
    <div
      className={`flex items-start gap-3 rounded-xl px-4 py-3 border ${
        registered
          ? "bg-emerald-500/8 border-emerald-500/20"
          : "bg-red-500/8 border-red-500/20"
      }`}
    >
      {registered ? (
        <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
      ) : (
        <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
      )}
      <div className="min-w-0">
        <p className={`text-sm font-semibold ${registered ? "text-emerald-300" : "text-red-300"}`}>
          {body}
          <span className={`ml-2 text-xs font-normal ${registered ? "text-emerald-500" : "text-red-500"}`}>
            {registered ? "Registered" : "Not Registered"}
          </span>
        </p>
        {registrationNumber && (
          <p className="text-xs text-slate-500 font-mono mt-0.5 truncate">{registrationNumber}</p>
        )}
        {expiresAt && (
          <p className="text-xs text-slate-600 mt-0.5">Expires {expiresAt}</p>
        )}
      </div>
    </div>
  );
}
