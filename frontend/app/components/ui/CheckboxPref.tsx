interface CheckboxPrefProps {
  label: string;
  checked: boolean;
  onChange: React.MouseEventHandler<HTMLDivElement>;
}

export default function CheckboxPref({ label, checked, onChange }: CheckboxPrefProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div
        onClick={onChange}
        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-150 ${
          checked
            ? "bg-blue-600 border-blue-600"
            : "bg-transparent border-slate-600 group-hover:border-slate-400"
        }`}
      >
        {checked && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">{label}</span>
    </label>
  );
}
