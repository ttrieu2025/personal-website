import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

import Home from './Pages/Home'
import Resources from './Pages/Resources'
import Projects from './Pages/Projects'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(prev => !prev)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <>
      {/* HEADER */}
      <header className="header z-10 shadow-md ">
        <div className="container mx-auto flex justify-between items-center ">

          {/* Hamburger (Mobile only) */}
          <button
            className="md:hidden p-2 border rounded"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            <Link to="/" className="px-4 py-2">Home</Link>
            <Link to="/resources" className="px-4 py-2">Resources</Link>
            <Link to="/projects" className="px-4 py-2">Projects</Link>
          </nav>

          {/* Desktop Resume Button */}
          <div className="hidden md:block">
            <a
              href="https://drive.google.com/file/d/1wW6WuvkttrJS7zTCpU7Q4jkoKqghzdFD/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-black hover:text-white transition-colors"
            >
              Resume
            </a>
          </div>

          {/* Mobile Dropdown */}
          <nav
            className={`md:hidden absolute top-full left-0 w-full shadow-md transition-all duration-300 overflow-hidden z-15 bg-black
              ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
            `}
          >
            <div className="flex flex-col">
              <Link to="/" onClick={closeMenu} className="px-4 py-3 border-b">
                Home
              </Link>
              <Link to="/resources" onClick={closeMenu} className="px-4 py-3 border-b">
                Resources
              </Link>
              <Link to="/projects" onClick={closeMenu} className="px-4 py-3 border-b">
                Projects
              </Link>
              <a
                href="https://drive.google.com/file/d/1wW6WuvkttrJS7zTCpU7Q4jkoKqghzdFD/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="px-4 py-3  hover:text-white transition-colors"
              >
                Resume
              </a>
            </div>
          </nav>

        </div>
      </header>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>

      {/* FOOTER */}
      <footer className="footer text-center py-4">
        <small>© 2026 Trieu Truong. All rights reserved.</small>
      </footer>
    </>
  )
}

export default App
