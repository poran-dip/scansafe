import { Package, Factory, Hash, CalendarCheck, CalendarX, Tag } from "lucide-react";
import type { ProductDetails } from "~/types/trust";

interface ProductDetailsCardProps {
  product: ProductDetails;
}

interface DetailRowProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}

function DetailRow({ icon: Icon, label, value }: DetailRowProps) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-slate-700/40 last:border-0">
      <Icon className="w-4 h-4 text-slate-500 shrink-0" />
      <span className="text-xs text-slate-500 w-28 shrink-0">{label}</span>
      <span className="text-sm text-slate-200 font-medium">{value}</span>
    </div>
  );
}

export default function ProductDetailsCard({ product }: ProductDetailsCardProps) {
  return (
    <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Package className="w-4 h-4 text-blue-400" />
        <h3 className="text-sm font-semibold text-white">Product Details</h3>
      </div>
      <div>
        <DetailRow icon={Tag} label="Product Name" value={product.name} />
        <DetailRow icon={Factory} label="Manufacturer" value={product.manufacturer} />
        <DetailRow icon={Hash} label="Batch Number" value={product.batchNumber} />
        <DetailRow icon={CalendarCheck} label="Manufactured" value={product.manufacturedDate} />
        <DetailRow icon={CalendarX} label="Expiry Date" value={product.expiryDate} />
        <DetailRow icon={Package} label="Category" value={product.category} />
      </div>
    </div>
  );
}
