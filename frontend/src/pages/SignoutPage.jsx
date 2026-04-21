import React from "react"
import { useAuth } from "react-oidc-context"

function SignoutPage() {
  const auth = useAuth()

  if (auth.isLoading) {
    return <div>Loading...</div>
  }
  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>
  }
 
}

export default SignoutPage
