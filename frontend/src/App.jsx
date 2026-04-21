import { Routes, Route } from "react-router-dom"
import AuthcallbackPage from "./pages/AuthcallbackPage"
import LandingPage from "./pages/LandingPage"
import NotFoundPage from "./pages/NotFoundPage"
import DashboardPage from "./pages/DashboardPage"
import ProfilePage from "./pages/ProfilePage"
import DashboardLayout from "./layouts/DashboardLayout"

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="me" element={<ProfilePage />} />
      </Route>
      <Route path="/auth-callback" element={<AuthcallbackPage/>}/>
      <Route path="/signout" element={<AuthcallbackPage/>}/>
    </Routes>
  )
}

export default App
