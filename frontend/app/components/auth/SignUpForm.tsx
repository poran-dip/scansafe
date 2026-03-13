import { useState } from "react";
import InputField from "~/components/ui/InputField";
import CheckboxPref from "~/components/ui/CheckboxPref";

const DIETARY = ["Vegetarian", "Vegan", "Gluten-Free", "Halal", "Kosher"];
const NOTIFICATIONS = ["Email alerts", "Push notifications", "Weekly digest"];

type Form = {
  name: string;
  email: string;
  password: string;
};

type Errors = Partial<Record<keyof Form, string>>;

export default function SignUpForm() {
  const [form, setForm] = useState<Form>({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [dietary, setDietary] = useState<string[]>([]);
  const [electronicsAlerts, setElectronicsAlerts] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const toggleArr = (arr: string[], setArr: (v: string[]) => void, val: string) =>
    setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);

  const validate = (f: Form): Errors => {
    const errs: Errors = {};
    if (!f.name) errs.name = "Full name is required.";
    if (!f.email) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) errs.email = "Enter a valid email.";
    if (!f.password) errs.password = "Password is required.";
    else if (f.password.length < 8) errs.password = "Password must be at least 8 characters.";
    return errs;
  };

  const handleChange = (field: keyof Form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setApiError(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, dietary, electronicsAlerts, notifications }),
      });

      const data = await res.json();

      if (!res.ok) {
        setApiError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      setSubmitted(true);
      setLoading(false);
    } catch (err) {
      setApiError("Network error, try again.");
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-14 h-14 bg-emerald-500/15 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24">
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="text-white font-semibold text-lg">Account created!</p>
        <p className="text-slate-400 text-sm mt-1">Welcome to ScanSafe, {form.name.split(" ")[0]}.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <InputField
        label="Full Name"
        value={form.name}
        onChange={handleChange("name")}
        placeholder="Riya Sharma"
        error={errors.name}
      />
      <InputField
        label="Email"
        type="email"
        value={form.email}
        onChange={handleChange("email")}
        placeholder="you@example.com"
        error={errors.email}
      />
      <InputField
        label="Password"
        type="password"
        value={form.password}
        onChange={handleChange("password")}
        placeholder="Min. 8 characters"
        error={errors.password}
      />

      {apiError && <p className="text-red-400 text-sm">{apiError}</p>}

      {/* Profile preferences accordion */}
      <div className="border border-slate-700/60 rounded-xl overflow-hidden">
        <button
          type="button"
          onClick={() => setShowPrefs(!showPrefs)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm text-slate-400 hover:text-slate-300 hover:bg-slate-800/40 transition-colors"
        >
          <span className="font-medium">
            Profile Preferences <span className="text-slate-600 font-normal">(optional)</span>
          </span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${showPrefs ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
          >
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {showPrefs && (
          <div className="px-4 pb-4 flex flex-col gap-5 bg-slate-800/20 border-t border-slate-700/40">
            {/* Dietary */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-4 mb-2.5">
                Dietary restrictions
              </p>
              <div className="flex flex-wrap gap-2">
                {DIETARY.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => toggleArr(dietary, setDietary, d)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 ${
                      dietary.includes(d)
                        ? "bg-blue-600/20 border-blue-500/50 text-blue-300"
                        : "bg-transparent border-slate-700 text-slate-400 hover:border-slate-500"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Electronics */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2.5">
                Safety alerts
              </p>
              <CheckboxPref
                label="Electronics safety & recall alerts"
                checked={electronicsAlerts}
                onChange={() => setElectronicsAlerts(!electronicsAlerts)}
              />
            </div>

            {/* Notifications */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2.5">
                Notifications
              </p>
              <div className="flex flex-col gap-2">
                {NOTIFICATIONS.map((n) => (
                  <CheckboxPref
                    key={n}
                    label={n}
                    checked={notifications.includes(n)}
                    onChange={() => toggleArr(notifications, setNotifications, n)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5 mt-1 ${
          loading ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Creating..." : "Create Account"}
      </button>

      <p className="text-center text-xs text-slate-500">
        By signing up, you agree to our{" "}
        <a href="#" className="text-blue-400 hover:text-blue-300">
          Terms
        </a>{" "}
        &{" "}
        <a href="#" className="text-blue-400 hover:text-blue-300">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
