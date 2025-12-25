import './App.css'
import { FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Resources from './pages/resources'
import Blogs from './pages/blogs'
import Projects from './pages/projects'

function App() {
  return (
    <>
      <header className="header">
        <nav className="nav-bar">
          <Link to="/">Home</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/projects">Projects</Link>
        </nav>

        <div className="social-links">
          <a
            href="https://www.linkedin.com/in/mc-trieu-truong"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={30} color="#b5b4b4" />
          </a>

          <a
            href="https://www.instagram.com/c.trevort_14/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={30} color="#b5b4b4" />
          </a>

          <a
            href="https://www.facebook.com/cattrieu.truongminh.3/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook size={30} color="#b5b4b4" />
          </a>
        </div>
      </header>

      {/* Pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<Resources/>}/>
        <Route path="/blogs" element={<Blogs/>}/>
        <Route path="/projects" element={<Projects/>}/>
      </Routes>      
    </>
  )
}

export default App
