import { useParams, useNavigate } from "react-router-dom"
import { customers } from "../data/customers"
import Navbar from "../components/Navbar"

export default function CustomerDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const customer = customers.find(c => c.id === Number(id))

  if (!customer) {
    return (
      <div className="p-6">
        <p className="text-gray-600">Customer not found</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-blue-600 underline"
        >
          Back to dashboard
        </button>
      </div>
    )
  }

  const stages = [
    "Contract Signed",
    "Kickoff",
    "Deployment",
    "Training",
    "Go Live",
    "Billing"
  ]

  const currentIndex = stages.indexOf(customer.stage)

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="text-sm text-blue-600"
        >
          ← Back
        </button>

        {/* Header */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">
            {customer.name}
          </h1>

          <p className="text-gray-500 mt-1">
            Current stage: {customer.stage}
          </p>

          <div className="mt-3 flex gap-4 text-sm">
            <span>
              Risk:{" "}
              <b className={
                customer.risk === "High"
                  ? "text-red-600"
                  : customer.risk === "Medium"
                  ? "text-yellow-600"
                  : "text-green-600"
              }>
                {customer.risk}
              </b>
            </span>

            <span>
              Owner: <b>{customer.owner}</b>
            </span>

            <span>
              Days in stage: <b>{customer.daysInStage}</b>
            </span>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h2 className="font-semibold mb-4">Delivery Timeline</h2>

          <div className="space-y-2">
            {stages.map((stage, index) => (
              <div key={stage} className="flex items-center gap-3">

                <div
                  className={`w-3 h-3 rounded-full ${
                    index <= currentIndex
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                />

                <span
                  className={
                    index === currentIndex
                      ? "font-semibold text-gray-900"
                      : "text-gray-500"
                  }
                >
                  {stage}
                </span>

              </div>
            ))}
          </div>
        </div>

        {/* Blocker */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h2 className="font-semibold mb-2">Current Blocker</h2>

          {customer.blocked ? (
            <p className="text-red-600 font-medium">
              ⚠ {customer.blocker || "No details provided"}
            </p>
          ) : (
            <p className="text-green-600">
              No blockers 🎉
            </p>
          )}
        </div>

        {/* Next action */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h2 className="font-semibold mb-2">Next Action</h2>
          <p className="text-gray-700">
            {customer.nextAction || "No next action defined"}
          </p>
        </div>

      </div>
    </div>
  )
}