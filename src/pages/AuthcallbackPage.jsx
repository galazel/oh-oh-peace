import React from "react"
import { useAuth } from "react-oidc-context"
import { Spinner } from "@/components/ui/spinner"
import { useNavigate } from "react-router-dom"

function AuthcallbackPage() {
  const auth = useAuth()
  const nav = useNavigate()

  if (auth.isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>
  }

  if (!auth.isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return nav("/dashboard")
}

export default AuthcallbackPage
