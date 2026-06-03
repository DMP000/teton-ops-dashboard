import { useNavigate } from "react-router-dom"

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <div
          className="font-bold text-lg text-gray-900 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Ops Dashboard
        </div>

        {/* Links */}
        <div className="flex gap-6 text-sm text-gray-600">

          <button
            onClick={() => navigate("/")}
            className="hover:text-black"
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/bottlenecks")}
            className="hover:text-black"
          >
            Bottlenecks
          </button>

        </div>

      </div>
    </div>
  )
}