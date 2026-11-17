import Contact from './components/Contact'
import Documentation from './components/Documentation'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import Skills from './components/Skills'
import { useReveal } from './hooks/useReveal'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  useReveal()

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main id="main-content" className="site-main">
        <Hero />
        <Skills />
        <Projects />
        <Documentation />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
