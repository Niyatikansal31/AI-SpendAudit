import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <header className="no-print border-b border-gray-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        
        <Link
          to="/"
          className="text-xl font-semibold tracking-tight text-black"
        >
          SpendScope
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm text-gray-600 transition hover:text-black"
          >
            Home
          </Link>

          <Link
            to="/audit"
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Start Audit
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Navbar