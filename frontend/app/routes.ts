import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/auth", "routes/auth.tsx"),
  route("/trust", "routes/trust.tsx"),
  route("/fir", "routes/fir.tsx")
] satisfies RouteConfig;
