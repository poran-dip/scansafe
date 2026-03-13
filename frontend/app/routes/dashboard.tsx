import { ShieldCheck, ScanLine, AlertTriangle, FileText } from "lucide-react";
import { useNavigate } from "react-router";

export default function Dashboard() {

    const Navigate = useNavigate();
  return (
    <div className="relative min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden">

      {/* grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-size-[64px_64px]" />

      {/* glow */}
      <div className="absolute top-40 left-40 w-96 h-96 bg-blue-600/10 blur-3xl rounded-full" />
      <div className="absolute bottom-40 right-40 w-96 h-96 bg-emerald-600/10 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 space-y-10">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-slate-400 text-sm">
              Monitor product safety and authenticity checks
            </p>
          </div>

          <button onClick={() => {Navigate('/check')}} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-5 py-2.5 rounded-lg font-semibold transition hover:shadow-lg hover:shadow-blue-500/25">
            <ScanLine className="w-4 h-4" />
            Scan Product
          </button>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-4 gap-6">

          <StatCard
            icon={<ScanLine className="text-blue-400 w-5 h-5" />}
            title="Products Scanned"
            value="124"
          />

          <StatCard
            icon={<AlertTriangle className="text-red-400 w-5 h-5" />}
            title="Unsafe Products"
            value="3"
          />

          <StatCard
            icon={<ShieldCheck className="text-emerald-400 w-5 h-5" />}
            title="Verified Businesses"
            value="89"
          />

          <StatCard
            icon={<FileText className="text-cyan-400 w-5 h-5" />}
            title="Complaints Filed"
            value="2"
          />

        </div>

        {/* PRODUCT SCANNER */}

        {/* ALERTS */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-6">

          <h2 className="text-lg font-semibold mb-4">
            Safety Alerts
          </h2>

          <div className="space-y-3 text-sm">

            <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 p-3 rounded-lg">
              ⚠ Lithium Battery Model XJ-204 recalled due to overheating.
            </div>

            <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-3 rounded-lg">
              ⚠ Adulterated mustard oil batch detected in Assam markets.
            </div>

          </div>
        </div>

        {/* SCAN HISTORY */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-6">

          <h2 className="text-lg font-semibold mb-4">
            Recent Scans
          </h2>

          <table className="w-full text-sm">

            <thead className="text-slate-400 border-b border-white/10">
              <tr>
                <th className="text-left py-2">Product</th>
                <th className="text-left">Result</th>
                <th className="text-left">Date</th>
              </tr>
            </thead>

            <tbody>

              <tr className="border-b border-white/5">
                <td className="py-3">Maggi Noodles</td>
                <td className="text-emerald-400 font-medium">SAFE</td>
                <td>12 Feb</td>
              </tr>

              <tr>
                <td className="py-3">Phone Charger</td>
                <td className="text-red-400 font-medium">UNSAFE</td>
                <td>10 Feb</td>
              </tr>

            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-5 hover:border-blue-500/30 transition">

      <div className="flex items-center justify-between mb-3">
        {icon}
      </div>

      <p className="text-sm text-slate-400">{title}</p>

      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}