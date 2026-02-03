import './App.css'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

import Home from './Pages/Home'
import Resources from './Pages/Resources'
import Projects from './Pages/Projects'
import About from './Pages/About'


function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => setIsMenuOpen(prev => !prev)
  const closeMenu = () => setIsMenuOpen(false)

  // Helper to check if a link is active
  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 h-20">
        <div className="container mx-auto px-6 h-full flex justify-between items-center">

          {/* 1. Hamburger (Left side as per your code) */}
          <button
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* 2. Desktop Navigation (Center-ish) */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-semibold tracking-wide transition-all duration-300 relative py-2
                ${isActive('/') ? 'text-white' : 'text-gray-500 hover:text-gray-300'}
              `}
            >
              Home
              {isActive('/') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full"></span>}
            </Link>

            
            <Link 
              to="/about" 
              className={`text-sm font-semibold tracking-wide transition-all duration-300 relative py-2
                ${isActive('/about') ? 'text-white' : 'text-gray-500 hover:text-gray-300'}
              `}
            >
              About
              {isActive('/about') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full"></span>}
            </Link>

            <Link 
              to="/resources" 
              className={`text-sm font-semibold tracking-wide transition-all duration-300 relative py-2
                ${isActive('/resources') ? 'text-white' : 'text-gray-500 hover:text-gray-300'}
              `}
            >
              Resources
              {isActive('/resources') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full"></span>}
            </Link>

            <Link 
              to="/projects" 
              className={`text-sm font-semibold tracking-wide transition-all duration-300 relative py-2
                ${isActive('/projects') ? 'text-white' : 'text-gray-500 hover:text-gray-300'}
              `}
            >
              Projects
              {isActive('/projects') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full"></span>}
            </Link>


          </nav>

          {/* 3. Desktop Resume Button (Right side) */}
          <div className="hidden md:block">
            <a
              href="https://drive.google.com/file/d/1wW6WuvkttrJS7zTCpU7Q4jkoKqghzdFD/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2"
            >
              Resume
            </a>
          </div>

          {/* Mobile Dropdown */}
          <nav
            className={`md:hidden absolute top-20 left-0 w-full bg-[#111111] border-b border-white/10 shadow-2xl transition-all duration-300 overflow-hidden z-15
              ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
            `}
          >
            <div className="flex flex-col p-6 gap-4">
              <Link to="/" onClick={closeMenu} className={`text-xl font-bold ${isActive('/') ? 'text-white' : 'text-gray-600'}`}>
                Home
              </Link>
              <Link to="/about" onClick={closeMenu} className={`text-xl font-bold ${isActive('/about') ? 'text-white' : 'text-gray-600'}`}>
                About
              </Link>
              <Link to="/resources" onClick={closeMenu} className={`text-xl font-bold ${isActive('/resources') ? 'text-white' : 'text-gray-600'}`}>
                Resources
              </Link>
              <Link to="/projects" onClick={closeMenu} className={`text-xl font-bold ${isActive('/projects') ? 'text-white' : 'text-gray-600'}`}>
                Projects
              </Link>              <a
                href="https://drive.google.com/file/d/1wW6WuvkttrJS7zTCpU7Q4jkoKqghzdFD/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="text-xl font-bold text-gray-400 hover:text-white pt-4 border-t border-white/5"
              >
                Resume
              </a>
            </div>
          </nav>

        </div>
      </header>

      {/* ROUTES */}
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </main>
    </div>
  )
}

export default App