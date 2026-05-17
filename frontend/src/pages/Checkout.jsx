import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

const MOMO_NETWORKS = ["MTN MoMo", "Airtel Money", "Telecel Cash"];

export default function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bundle, setBundle] = useState(null);
  const [form, setForm] = useState({
    recipient: "",
    momoNetwork: "MTN MoMo",
    momoNumber: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("selectedBundle");
    if (saved) setBundle(JSON.parse(saved));
    else navigate("/bundles");
  }, [navigate]);

  const handlePay = () => {
    if (!user) {
      toast.error("Please log in to complete your purchase");
      navigate("/login");
      return;
    }
    if (!form.recipient || !form.momoNumber) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success(`Payment initiated! MoMo prompt sent to ${form.momoNumber}`);
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  if (!bundle) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <button
          onClick={() => navigate("/bundles")}
          className="flex items-center gap-2 text-gray-500 hover:text-green-600 text-sm font-medium mb-8 transition-colors"
        >
          ← Back to bundles
        </button>

        <div className="grid md:grid-cols-5 gap-6 items-start">
          {/* Form */}
          <div className="md:col-span-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-8">
            <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Delivery Details
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  Recipient Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 0241234567"
                  value={form.recipient}
                  onChange={(e) =>
                    setForm({ ...form, recipient: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:border-green-500 transition-colors"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Number that will receive the data bundle
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  MoMo Network
                </label>
                <div className="flex gap-2 flex-wrap">
                  {MOMO_NETWORKS.map((net) => (
                    <button
                      key={net}
                      onClick={() => setForm({ ...form, momoNetwork: net })}
                      className={`px-4 py-2 rounded-xl border-2 text-sm font-semibold transition-all
                        ${form.momoNetwork === net ? "border-green-500 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400" : "border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-zinc-900"}`}
                    >
                      {net}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  MoMo Number
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 0241234567"
                  value={form.momoNumber}
                  onChange={(e) =>
                    setForm({ ...form, momoNumber: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>

              {!user && (
                <div className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 rounded-xl p-4 text-sm">
                  ℹ️ You need to{" "}
                  <span
                    className="font-bold cursor-pointer underline"
                    onClick={() => navigate("/login")}
                  >
                    log in
                  </span>{" "}
                  to complete your purchase.
                </div>
              )}

              <button
                onClick={handlePay}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 rounded-xl transition-all hover:-translate-y-0.5 text-lg"
              >
                🔒 Proceed to Pay
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                Order Summary
              </h3>
              <div className="space-y-3">
                {[
                  ["Network", bundle.network],
                  ["Bundle", bundle.size],
                  ["Validity", bundle.validity],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      {k}
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {v}
                    </span>
                  </div>
                ))}
                <div className="border-t border-gray-200 dark:border-zinc-700 pt-3 flex justify-between">
                  <span className="font-bold text-gray-900 dark:text-white">
                    Total
                  </span>
                  <span className="font-extrabold text-green-600 dark:text-green-400 text-lg">
                    {bundle.price}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-950 rounded-xl p-4 text-sm text-green-700 dark:text-green-400">
              🛡️ <strong>Secured by Paystack.</strong> MoMo prompt sent directly
              to your phone.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
