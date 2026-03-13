import { Building2, ScanLine, FileWarning } from "lucide-react";

const features = [
  {
    icon: Building2,
    color: "blue",
    title: "Business Verification",
    description:
      "Instantly check if any website or business is registered with BIS, FSSAI, or other Indian regulatory bodies before you buy.",
    badge: "BIS · FSSAI · MCA",
  },
  {
    icon: ScanLine,
    color: "emerald",
    title: "Product Authenticity Scan",
    description:
      "Scan barcodes or QR codes to verify product safety certifications, expiry dates, and authenticity against manufacturer records.",
    badge: "Barcode · QR · ISI Mark",
  },
  {
    icon: FileWarning,
    color: "amber",
    title: "File an FIR Instantly",
    description:
      "Got scammed? ScanSafe guides you through filing an online FIR with the National Cyber Crime portal in under 3 minutes.",
    badge: "Cybercrime · Consumer Forum",
  },
];

const colorMap: Record<string, any> = {
  blue: {
    bg: "bg-blue-500/10",
    icon: "text-blue-400",
    border: "border-blue-500/20",
    badge: "bg-blue-500/10 text-blue-300",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    icon: "text-emerald-400",
    border: "border-emerald-500/20",
    badge: "bg-emerald-500/10 text-emerald-300",
  },
  amber: {
    bg: "bg-amber-500/10",
    icon: "text-amber-400",
    border: "border-amber-500/20",
    badge: "bg-amber-500/10 text-amber-300",
  },
};

export default function Features() {
  return (
    <section id="features" className="bg-slate-950 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Everything you need to stay safe
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Three powerful tools, one platform. ScanSafe has your back from browsing to buying.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, color, title, description, badge }) => {
            const c = colorMap[color];
            return (
              <div
                key={title}
                className={`group relative bg-slate-900/60 border ${c.border} rounded-2xl p-7 hover:bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                <div className={`w-12 h-12 ${c.bg} rounded-xl flex items-center justify-center mb-5`}>
                  <Icon className={`w-6 h-6 ${c.icon}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">{description}</p>
                <span className={`inline-block text-xs font-mono px-3 py-1 rounded-full ${c.badge}`}>
                  {badge}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
