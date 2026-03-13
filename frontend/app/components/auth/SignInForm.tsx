import { useState } from "react";
import { useNavigate } from "react-router";
import InputField from "~/components/ui/InputField";

type Form = {
  email: string;
  password: string;
};

type Errors = Partial<Record<keyof Form, string>>;

function validate(email: string, password: string): Errors {
  const errors: Errors = {};
  if (!email) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email.";
  if (!password) errors.password = "Password is required.";
  else if (password.length < 8) errors.password = "Password must be at least 8 characters.";
  return errors;
}

export default function SignInForm() {
  const router= useNavigate()
  const [form, setForm] = useState<Form>({ email: "", password: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange =
    (field: keyof Form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/dashboard');

    // client-side validation first
    {/*const errs = validate(form.email, form.password);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }*

    setErrors({});
    setApiError(null);
    setLoading(true);
    
    try {
      const res = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        // example: API returns { error: "Invalid credentials" }
        setApiError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      // success
      setSubmitted(true);
      setLoading(false);
    } catch (err) {
      setApiError("Network error, try again.");
      setLoading(false);
    }*/}
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
        <p className="text-white font-semibold text-lg">Welcome back!</p>
        <p className="text-slate-400 text-sm mt-1">You've been signed in successfully.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
        placeholder="••••••••"
        error={errors.password}
      />

      {apiError && <p className="text-red-400 text-sm">{apiError}</p>}

      <div className="flex justify-end">
        <a href="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        disabled={loading}
        onClick={()=>{
          router("/")
        }}
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 mt-1 ${
          loading ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
