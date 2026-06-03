import { useState } from "react"
import { customers } from "./data/customers"

export default function App() {
  const [filter, setFilter] = useState("all")

  // 🔢 Derived data
  const total = customers.length
  const blocked = customers.filter(c => c.blocked).length
  const delayed = customers.filter(c => c.daysInStage > 10).length
  const active = total - blocked

  // 🔍 Filter logic
  const filteredCustomers = customers.filter((c) => {
    if (filter === "all") return true
    if (filter === "blocked") return c.blocked
    if (filter === "high") return c.risk === "High"
    if (filter === "delayed") return c.daysInStage > 10
    return true
  })

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Operations Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Live operational overview of customer deployments
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <p className="text-sm text-gray-500">Total Customers</p>
            <p className="text-3xl font-semibold mt-2">{total}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <p className="text-sm text-gray-500">Blocked</p>
            <p className="text-3xl font-semibold text-red-600 mt-2">{blocked}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <p className="text-sm text-gray-500">Delayed</p>
            <p className="text-3xl font-semibold text-yellow-600 mt-2">{delayed}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <p className="text-sm text-gray-500">Active Projects</p>
            <p className="text-3xl font-semibold text-green-600 mt-2">{active}</p>
          </div>

        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">

          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === "all"
                ? "bg-gray-900 text-white"
                : "bg-white border text-gray-700"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("blocked")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === "blocked"
                ? "bg-red-600 text-white"
                : "bg-white border text-gray-700"
            }`}
          >
            Blocked
          </button>

          <button
            onClick={() => setFilter("high")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === "high"
                ? "bg-orange-500 text-white"
                : "bg-white border text-gray-700"
            }`}
          >
            High Risk
          </button>

          <button
            onClick={() => setFilter("delayed")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === "delayed"
                ? "bg-yellow-500 text-white"
                : "bg-white border text-gray-700"
            }`}
          >
            Delayed
          </button>

        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">

          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            Customers
          </h2>

          <table className="w-full text-left">

            <thead>
              <tr className="text-xs uppercase text-gray-400 border-b">
                <th className="py-3">Customer</th>
                <th className="py-3">Stage</th>
                <th className="py-3">Risk</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((c) => (
                <tr
                  key={c.id}
                  className="border-b hover:bg-gray-50 transition cursor-pointer"
                >

                  <td className="py-3 font-medium text-gray-900">
                    {c.name}
                  </td>

                  <td className="py-3 text-gray-600">
                    {c.stage}
                  </td>

                  <td
                    className={`py-3 font-medium ${
                      c.risk === "High"
                        ? "text-red-600"
                        : c.risk === "Medium"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {c.risk}
                  </td>

                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        c.blocked
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {c.blocked ? "Blocked" : "OK"}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  )
}