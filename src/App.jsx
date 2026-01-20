import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

import Home from './Pages/Home'
import Resources from './Pages/Resources'
import Projects from './Pages/Projects'
import Contact from './Pages/Contact'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    console.log('Toggle clicked, current state:', isMenuOpen)
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    console.log('Close menu called')
    setIsMenuOpen(false)
  }

  console.log('Current menu state:', isMenuOpen)

  return (
    <>
<header className="header z-10 shadow-md bg-white gap ">
  <div className="container mx-auto flex justify-between items-center p-4 border-b">
    
    {/* Hamburger button: visible only on mobile */}
    <button
      className="hamburger md:hidden p-2 border rounded"
      onClick={toggleMenu}
      aria-label="Toggle menu"
    >
      {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
    </button>

    {/* Desktop: Left-side navigation links */}
    <nav className="hidden md:flex md:space-x-4">
      <Link to="/" className="px-4 py-2 ">
        Home
      </Link>
      <Link to="/resources" className="px-4 py-2 ">
        Resources
      </Link>
      <Link to="/projects" className="px-4 py-2 ">
        Projects
      </Link>
      <Link to="/contact" className="px-4 py-2 ">
        Contact
      </Link>
    </nav>

    {/* Desktop: Right-side resume button */}
    <div className="hidden md:block">
      <a
        href="https://drive.google.com/file/d/1wW6WuvkttrJS7zTCpU7Q4jkoKqghzdFD/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-2 text-white rounded"
      >
        Resume
      </a>
    </div>

    {/* Mobile: Dropdown menu */}
    <nav
      className={`nav-bar md:hidden absolute top-full left-0 w-full  transition-all duration-300 overflow-hidden
        ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
      `}
    >
      <div className="flex flex-col">
        <Link to="/" onClick={closeMenu} className="px-4 py-3  border-b">
          Home
        </Link>
        <Link to="/Resources" onClick={closeMenu} className="px-4 py-3 border-b">
          Resources
        </Link>
        <Link to="/Projects" onClick={closeMenu} className="px-4 py-3 border-b">
          Projects
        </Link>
        <Link to="/Contact" onClick={closeMenu} className="px-4 py-3  border-b">
          Contact
        </Link>
        <a
          href="https://drive.google.com/file/d/1wW6WuvkttrJS7zTCpU7Q4jkoKqghzdFD/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMenu}
          className="px-4 py-3 bg-black text-white text-center"
        >
          Resume
        </a>
      </div>
    </nav>
  </div>
</header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<Resources/>}/>
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes> 

      <footer className="footer">
        <small>© 2026 Trieu Truong. All rights reserved.</small>
      </footer>
    </>
  )
}

export default App