import { NavBar } from "./components/landing-page";

export default function LandingLayout({ children }) {
  return (
    <>
      <NavBar />
      <main>
        {children}
      </main>
    </>
  )
}
