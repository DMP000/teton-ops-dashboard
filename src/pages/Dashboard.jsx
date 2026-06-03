import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { customers } from "../data/customers"
import Navbar from "../components/Navbar"

export default function Dashboard() {
  const [filter, setFilter] = useState("all")
  const navigate = useNavigate()

  const total = customers.length
  const blocked = customers.filter(c => c.blocked).length
  const delayed = customers.filter(c => c.daysInStage > 10).length
  const active = total - blocked

  const filteredCustomers = customers.filter((c) => {
    if (filter === "all") return true
    if (filter === "blocked") return c.blocked
    if (filter === "high") return c.risk === "High"
    if (filter === "delayed") return c.daysInStage > 10
    return true
  })

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div>
        <h1 className="text-8xl font-black text-purple-600">
          Operations Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Live operational overview of customer deployments
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

          <div className="bg-white p-5 rounded-xl border shadow-sm">
            <p className="text-sm text-gray-500">Total Customers</p>
            <p className="text-3xl font-semibold">{total}</p>
          </div>

          <div className="bg-white p-5 rounded-xl border shadow-sm">
            <p className="text-sm text-gray-500">Blocked</p>
            <p className="text-3xl font-semibold text-red-600">{blocked}</p>
          </div>

          <div className="bg-white p-5 rounded-xl border shadow-sm">
            <p className="text-sm text-gray-500">Delayed</p>
            <p className="text-3xl font-semibold text-yellow-600">{delayed}</p>
          </div>

          <div className="bg-white p-5 rounded-xl border shadow-sm">
            <p className="text-sm text-gray-500">Active</p>
            <p className="text-3xl font-semibold text-green-600">{active}</p>
          </div>

        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">

          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === "all"
                ? "bg-gray-900 text-white"
                : "bg-white border"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("blocked")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === "blocked"
                ? "bg-red-600 text-white"
                : "bg-white border"
            }`}
          >
            Blocked
          </button>

          <button
            onClick={() => setFilter("high")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === "high"
                ? "bg-orange-500 text-white"
                : "bg-white border"
            }`}
          >
            High Risk
          </button>

          <button
            onClick={() => setFilter("delayed")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === "delayed"
                ? "bg-yellow-500 text-white"
                : "bg-white border"
            }`}
          >
            Delayed
          </button>

        </div>

        {/* Table */}
        <div className="bg-white p-5 rounded-xl border shadow-sm">

          <h2 className="text-lg font-semibold mb-4">
            Customers
          </h2>

          <table className="w-full">

            <thead>
              <tr className="text-left text-xs text-gray-400 border-b">
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
                  onClick={() => navigate(`/customer/${c.id}`)}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >

                  <td className="py-3 font-medium text-gray-900">
                    {c.name}
                  </td>

                  <td className="py-3 text-gray-600">
                    {c.stage}
                  </td>

                  <td className={`py-3 font-medium ${
                    c.risk === "High"
                      ? "text-red-600"
                      : c.risk === "Medium"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}>
                    {c.risk}
                  </td>

                  <td className="py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      c.blocked
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}>
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