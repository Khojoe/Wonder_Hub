import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const SAMPLE_ORDERS = [
  {
    id: "ORD-001",
    network: "MTN",
    bundle: "5GB",
    price: "GHS 20.00",
    recipient: "0241234567",
    date: "2025-05-15",
    status: "completed",
  },
  {
    id: "ORD-002",
    network: "Airtel",
    bundle: "4GB",
    price: "GHS 18.00",
    recipient: "0551234567",
    date: "2025-05-14",
    status: "processing",
  },
  {
    id: "ORD-003",
    network: "Telecel",
    bundle: "1GB",
    price: "GHS 5.50",
    recipient: "0201234567",
    date: "2025-05-12",
    status: "completed",
  },
  {
    id: "ORD-004",
    network: "MTN",
    bundle: "2GB",
    price: "GHS 9.00",
    recipient: "0241234567",
    date: "2025-05-10",
    status: "pending",
  },
];

const STATUS_STYLES = {
  completed: "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400",
  processing:
    "bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-400",
  pending: "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400",
  failed: "bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400",
};

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("orders");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const total = SAMPLE_ORDERS.length;
  const completed = SAMPLE_ORDERS.filter(
    (o) => o.status === "completed",
  ).length;
  const processing = SAMPLE_ORDERS.filter(
    (o) => o.status === "processing",
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <Navbar />
      <div className="flex">
        {/* Sidebar */}
        <div className="w-56 min-h-[calc(100vh-60px)] bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 p-4 flex flex-col">
          <div className="w-11 h-11 rounded-full bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 flex items-center justify-center font-display font-extrabold mb-6">
            {user?.initials}
          </div>
          {[
            ["orders", "📋", "My Orders"],
            ["buy", "🛒", "Buy Data"],
            ["profile", "👤", "Profile"],
          ].map(([id, icon, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium mb-1 transition-all text-left
                ${tab === id ? "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400" : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800"}`}
            >
              {icon} {label}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 mt-auto transition-all"
          >
            🚪 Log out
          </button>
        </div>

        {/* Main */}
        <div className="flex-1 p-8">
          {tab === "orders" && (
            <div>
              <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-1">
                My Orders
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Track your data bundle purchases
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  ["Total Orders", total, "text-gray-900 dark:text-white"],
                  [
                    "Completed",
                    completed,
                    "text-green-600 dark:text-green-400",
                  ],
                  [
                    "Processing",
                    processing,
                    "text-yellow-600 dark:text-yellow-400",
                  ],
                ].map(([label, val, color]) => (
                  <div
                    key={label}
                    className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5"
                  >
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                      {label}
                    </div>
                    <div
                      className={`font-display text-3xl font-extrabold ${color}`}
                    >
                      {val}
                    </div>
                  </div>
                ))}
              </div>

              {/* Orders Table */}
              <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-zinc-800">
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    Order History
                  </h3>
                  <button
                    onClick={() => navigate("/bundles")}
                    className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all"
                  >
                    + Buy More
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-zinc-800">
                        {[
                          "Order ID",
                          "Network",
                          "Bundle",
                          "Recipient",
                          "Date",
                          "Amount",
                          "Status",
                        ].map((h) => (
                          <th
                            key={h}
                            className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {SAMPLE_ORDERS.map((o) => (
                        <tr
                          key={o.id}
                          className="border-t border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                        >
                          <td className="px-4 py-3 font-display font-bold text-sm text-gray-900 dark:text-white">
                            {o.id}
                          </td>
                          <td className="px-4 py-3">
                            <span className="bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 text-xs font-semibold px-2 py-1 rounded-lg">
                              {o.network}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white text-sm">
                            {o.bundle}
                          </td>
                          <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-sm">
                            {o.recipient}
                          </td>
                          <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-sm">
                            {o.date}
                          </td>
                          <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white text-sm">
                            {o.price}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[o.status]}`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                              {o.status.charAt(0).toUpperCase() +
                                o.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {tab === "buy" && (
            <div>
              <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-1">
                Buy Data
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Select a bundle to purchase
              </p>
              <button
                onClick={() => navigate("/bundles")}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-all"
              >
                Browse All Bundles →
              </button>
            </div>
          )}

          {tab === "profile" && (
            <div>
              <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-1">
                My Profile
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Manage your account details
              </p>
              <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-8 max-w-md">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-zinc-800">
                  <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 flex items-center justify-center font-display text-xl font-extrabold">
                    {user?.initials}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      {user?.name}
                    </div>
                    <div className="text-sm text-gray-400">{user?.email}</div>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    ["Full Name", user?.name],
                    ["Email", user?.email],
                    ["Phone", user?.phone || "Not set"],
                  ].map(([label, val]) => (
                    <div key={label}>
                      <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                        {label}
                      </label>
                      <input
                        defaultValue={val}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:border-green-500 transition-colors"
                      />
                    </div>
                  ))}
                  <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-all">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
