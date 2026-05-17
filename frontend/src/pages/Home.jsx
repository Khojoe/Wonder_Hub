import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const NETWORKS = [
  {
    name: "MTN",
    color: "bg-yellow-50 text-yellow-800 border-yellow-200",
    dot: "bg-yellow-400",
    from: "GHS 5.00",
  },
  {
    name: "Airtel",
    color: "bg-red-50 text-red-800 border-red-200",
    dot: "bg-red-500",
    from: "GHS 6.00",
  },
  {
    name: "Telecel",
    color: "bg-blue-50 text-blue-800 border-blue-200",
    dot: "bg-blue-500",
    from: "GHS 5.50",
  },
];

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <Navbar />
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
          ⚡ Ghana's Fastest Data Platform
        </div>
        <h1 className="font-display text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
          Buy Data Bundles.
          <br />
          <span className="text-green-600 dark:text-green-400">
            Instantly Delivered.
          </span>
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-10">
          Top up MTN, Airtel, and Telecel data in seconds. Pay with Mobile Money
          — secure, fast, and always available.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate("/bundles")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all hover:-translate-y-0.5"
          >
            🛒 Buy Data Now
          </button>
          <button
            onClick={() => navigate("/register")}
            className="border-2 border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-gray-300 font-semibold px-8 py-4 rounded-xl text-lg transition-all hover:border-green-500 hover:text-green-600"
          >
            Create Account
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-md mx-auto mt-16">
          {[
            ["50K+", "Happy Customers"],
            ["3", "Networks Covered"],
            ["24/7", "Instant Delivery"],
          ].map(([val, label]) => (
            <div key={label}>
              <div className="font-display text-3xl font-extrabold text-green-600 dark:text-green-400">
                {val}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Networks */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Supported Networks
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          We cover all major Ghanaian mobile networks
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {NETWORKS.map((net) => (
            <div
              key={net.name}
              onClick={() => navigate("/bundles")}
              className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 flex items-center gap-4 cursor-pointer hover:border-green-500 transition-all hover:-translate-y-1"
            >
              <div
                className={`w-12 h-12 rounded-xl border flex items-center justify-center font-display font-extrabold text-sm ${net.color}`}
              >
                {net.name}
              </div>
              <div>
                <div className="font-bold text-gray-900 dark:text-white">
                  {net.name} Ghana
                </div>
                <div className="text-sm text-gray-400">
                  Plans from {net.from}
                </div>
              </div>
              <span className="ml-auto text-gray-300">→</span>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="bg-white dark:bg-zinc-900 border-y border-gray-200 dark:border-zinc-800 py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-2">
            How It Works
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-12">
            Three steps to your data bundle
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              [
                "1",
                "Choose Network",
                "Select MTN, Airtel, or Telecel and pick a bundle size",
              ],
              [
                "2",
                "Pay via MoMo",
                "Approve the Paystack MoMo prompt on your phone",
              ],
              [
                "3",
                "Instant Delivery",
                "Your data is loaded instantly. Track in your dashboard",
              ],
            ].map(([num, title, desc]) => (
              <div key={num}>
                <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400 flex items-center justify-center font-display text-xl font-extrabold mx-auto mb-4">
                  {num}
                </div>
                <div className="font-bold text-gray-900 dark:text-white mb-2">
                  {title}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-sm text-gray-400">
        © 2025 Wonder Hub · Built for Ghana · Powered by Paystack
      </div>
    </div>
  );
}
