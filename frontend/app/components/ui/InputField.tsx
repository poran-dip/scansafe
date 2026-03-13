interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function InputField({ label, type = "text", value, onChange, placeholder, error }: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-300">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-slate-800/60 border ${
          error ? "border-red-500/60 focus:border-red-400" : "border-slate-700 focus:border-blue-500"
        } text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 ${
          error ? "focus:ring-red-500/20" : "focus:ring-blue-500/20"
        }`}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
