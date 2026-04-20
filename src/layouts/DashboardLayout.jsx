import React from "react"
import { Outlet } from "react-router-dom"

function DashboardLayout() {
  return (
    <div className="flex h-screen w-screen flex-col">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <p className="font-bold">OH-OH-PEACE</p>
        <p>profile</p>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>

      <footer className="border-t px-6 py-3  text-sm">
        Galagar, 2026
      </footer>
    </div>
  )
}

export default DashboardLayout
