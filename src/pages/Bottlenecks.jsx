import { customers } from "../data/customers"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"

export default function Bottlenecks() {
  const navigate = useNavigate()

  const delayed = customers.filter(c => c.daysInStage > 10)
  const blocked = customers.filter(c => c.blocked)

  const highRisk = customers.filter(c => c.risk === "High")

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 text-sm"
          >
            ← Back
          </button>

          <h1 className="text-3xl font-bold mt-2">
            Bottlenecks Center
          </h1>

          <p className="text-gray-500">
            Operational risks and delayed customers overview
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="bg-white p-5 rounded-xl border shadow-sm">
            <p className="text-sm text-gray-500">Blocked Customers</p>
            <p className="text-3xl font-bold text-red-600">
              {blocked.length}
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border shadow-sm">
            <p className="text-sm text-gray-500">Delayed Customers</p>
            <p className="text-3xl font-bold text-yellow-600">
              {delayed.length}
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border shadow-sm">
            <p className="text-sm text-gray-500">High Risk Accounts</p>
            <p className="text-3xl font-bold text-orange-600">
              {highRisk.length}
            </p>
          </div>

        </div>

        {/* Blocked Table */}
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <h2 className="font-semibold mb-3 text-red-600">
            Blocked Customers
          </h2>

          <table className="w-full text-left">
            <thead>
              <tr className="text-xs text-gray-400 border-b">
                <th className="py-2">Customer</th>
                <th>Stage</th>
                <th>Blocker</th>
              </tr>
            </thead>

            <tbody>
              {blocked.map(c => (
                <tr
                  key={c.id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/customer/${c.id}`)}
                >
                  <td className="py-2 font-medium">{c.name}</td>
                  <td>{c.stage}</td>
                  <td className="text-red-600">
                    {c.blocker || "Unknown"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Delayed Table */}
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <h2 className="font-semibold mb-3 text-yellow-600">
            Delayed Customers
          </h2>

          <table className="w-full text-left">
            <thead>
              <tr className="text-xs text-gray-400 border-b">
                <th className="py-2">Customer</th>
                <th>Stage</th>
                <th>Days in Stage</th>
              </tr>
            </thead>

            <tbody>
              {delayed.map(c => (
                <tr
                  key={c.id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/customer/${c.id}`)}
                >
                  <td className="py-2 font-medium">{c.name}</td>
                  <td>{c.stage}</td>
                  <td className="text-yellow-600 font-medium">
                    {c.daysInStage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* High Risk Table */}
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <h2 className="font-semibold mb-3 text-orange-600">
            High Risk Accounts
          </h2>

          <table className="w-full text-left">
            <thead>
              <tr className="text-xs text-gray-400 border-b">
                <th className="py-2">Customer</th>
                <th>Risk</th>
                <th>Stage</th>
              </tr>
            </thead>

            <tbody>
              {highRisk.map(c => (
                <tr
                  key={c.id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/customer/${c.id}`)}
                >
                  <td className="py-2 font-medium">{c.name}</td>
                  <td className="text-orange-600">{c.risk}</td>
                  <td>{c.stage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}