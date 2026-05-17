import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { dark, setDark } = useTheme();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 px-6 h-16 flex items-center justify-between sticky top-0 z-50">
      <div
        onClick={() => navigate("/")}
        className="font-display text-xl font-extrabold tracking-tight cursor-pointer"
      >
        <span className="text-green-600">Wonder</span>
        <span className="text-gray-900 dark:text-white">Hub</span>
        <span className="ml-2 text-xs bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-lg font-semibold">
          GH
        </span>
      </div>

      <div className="flex items-center gap-1">
        {[
          ["/", "Home"],
          ["/bundles", "Buy Data"],
        ].map(([path, label]) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${isActive(path) ? "bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800"}`}
          >
            {label}
          </button>
        ))}
        {user && (
          <button
            onClick={() => navigate("/dashboard")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${isActive("/dashboard") ? "bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800"}`}
          >
            Dashboard
          </button>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setDark(!dark)}
          className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all"
          aria-label="Toggle theme"
        >
          {dark ? "☀️" : "🌙"}
        </button>

        {user ? (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 flex items-center justify-center font-display font-bold text-sm">
              {user.initials}
            </div>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="border border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-gray-400 text-sm font-medium px-4 py-2 rounded-lg hover:border-gray-300 transition-all"
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/login")}
              className="border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 text-sm font-medium px-4 py-2 rounded-lg hover:border-green-500 hover:text-green-600 transition-all"
            >
              Log in
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all"
            >
              Sign up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
