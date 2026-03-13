import { useState } from "react";
import { Link } from "react-router";
import { ShieldCheck } from "lucide-react";
import SignInForm from "~/components/auth/SignInForm";
import SignUpForm from "~/components/auth/SignUpForm";

export default function Auth() {
  const [tab, setTab] = useState("signin");

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-16">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-125 h-125 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/30 transition-shadow">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">ScanSafe</span>
          </Link>
          <p className="text-slate-400 text-sm mt-3">
            {tab === "signin" ? "Welcome back. Stay safe." : "Join 50,000+ protected consumers."}
          </p>
        </div>

        {/* Card */}
        <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden">
          {/* Tab bar */}
          <div className="flex border-b border-slate-700/50">
            {[
              { key: "signin", label: "Sign In" },
              { key: "signup", label: "Sign Up" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex-1 py-4 text-sm font-semibold transition-all duration-200 ${
                  tab === key
                    ? "text-white border-b-2 border-blue-500 bg-blue-500/5"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Form body */}
          <div className="p-7">
            {tab === "signin" ? <SignInForm /> : <SignUpForm />}
          </div>
        </div>

        {/* Toggle hint */}
        <p className="text-center text-sm text-slate-500 mt-6">
          {tab === "signin" ? (
            <>Don't have an account?{" "}
              <button onClick={() => setTab("signup")} className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                Sign up
              </button>
            </>
          ) : (
            <>Already have an account?{" "}
              <button onClick={() => setTab("signin")} className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
