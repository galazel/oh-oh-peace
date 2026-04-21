import React from "react"
import { Link, Outlet, Navigate } from "react-router-dom"
import NotFoundPage from "../pages/NotFoundPage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "react-oidc-context"

function DashboardLayout() {
  const token = localStorage.getItem("token")
  const auth = useAuth()

  if (!token) {
    return <NotFoundPage />
  }
  const signOutRedirect = () => {
    localStorage.removeItem("token")
    const clientId = "45gnjr6eg1i885q7fh59k2c2sa"
    const logoutUri = "http://localhost:5173"
    const cognitoDomain =
      "https://us-east-1ascmklcmw.auth.us-east-1.amazoncognito.com"
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`
  }
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="flex items-center justify-between border-b bg-white px-6 py-4">
        <p className="font-bold tracking-wide">OH-OH-PEACE</p>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full p-2 transition hover:bg-gray-100">
              <FontAwesomeIcon icon={faUser} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel> My Account</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link to="me">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-500"
                onClick={signOutRedirect}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>

      <footer className="border-t bg-white px-6 py-3 text-sm text-gray-500">
        Galagar, 2026
      </footer>
    </div>
  )
}

export default DashboardLayout
