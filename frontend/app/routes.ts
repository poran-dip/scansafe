import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/auth", "routes/auth.tsx"),
  route("/check", "routes/trust.tsx"),
  route("/fir", "routes/fir.tsx"),
  route("/dashboard", "routes/dashboard.tsx")
] satisfies RouteConfig;
