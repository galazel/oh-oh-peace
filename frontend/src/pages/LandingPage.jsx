import React from "react"
import { Button } from "../components/ui/button"
import { useAuth } from "react-oidc-context"

function LandingPage() {
  const auth = useAuth()

  const handleGetStarted = () => {
    auth.signinRedirect()
  }
  return (
    <div className="relative flex h-screen flex-col items-center justify-center bg-[url(https://images.pexels.com/photos/8872641/pexels-photo-8872641.jpeg?_gl=1*u1mky9*_ga*NjI3ODYwNjQ4LjE3NzY2ODY4MjE.*_ga_8JE65Q40S6*czE3NzY2ODY4MjAkbzEkZzEkdDE3NzY2ODY4NTYkajI0JGwwJGgw)] bg-cover">
      <div className="absolute h-screen w-screen bg-black/70 backdrop-opacity-10"></div>
      <main className="absolute z-0 flex flex-col items-center justify-center gap-5">
        <h1 className="text-center text-white">
          Sit down, Open the computer, and use <span>OH-OH-PEACE</span>
        </h1>
        <p className="text-white">
          Improve your oop skills by solving real application problems, not just
          memorizing patterns like in leetcode.
        </p>
        <Button
          onClick={handleGetStarted}
          className="h-13 w-44 cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black"
        >
          Get Started Now
        </Button>
      </main>
      <footer className="absolute bottom-0 left-0 pl-1 text-2xl text-white">
        Galagar, 2026
      </footer>
    </div>
  )
}

export default LandingPage
