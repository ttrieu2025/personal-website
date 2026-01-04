import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import GradientText from './components/GradientText'

import Home from './Pages/Home'
import Resources from './Pages/Resources'
import Blogs from './Pages/Blogs'
import Projects from './Pages/Projects'
import Contact from './Pages/Contact'

function App() {
  return (
    <>
      <header className="header">

        <nav className="nav-bar">
          <Link to="/">
          <a> Home </a>
          </Link>

          <Link to="/Resources">
          <a> Resources</a></Link>
          
          <Link to="/Blogs">
  
          <a> Blogs</a></Link>

          
        <Link to="/Projects">

        <a>Projects</a></Link>
        <Link to="/Contact">
        <a>Contact </a> </Link>

        </nav>
         <div className="social-links">

          <a
            href="https://drive.google.com/file/d/1VivIUlGLGPmrLCDAIVx6TRuWQD03-FvR/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="resume-btn"
          >         
          
          Resume </a>
        </div>
      
      </header>

      {/* Pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Resources" element={<Resources/>}/>
        <Route path="/Blogs" element={<Blogs/>}/>
        <Route path="/Projects" element={<Projects/>}/>
        <Route path="/Contact" element={<Contact/>}/>
      </Routes> 

    </>
  )
}

export default App
