import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "react-oidc-context"

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_AsCMkLCmW",
  client_id: "45gnjr6eg1i885q7fh59k2c2sa",
  redirect_uri: "http://localhost:5173/auth-callback",
  response_type: "code",
  scope: "email openid phone",
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider {...cognitoAuthConfig}>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)
