import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';


function App() {

const [count, setCount] = useState(0)

  return (
    <>
        <header className="social-links">
        <nav className="nav-bar">
          <a href="#Trieu">Trieu </a>
          <a href="#home">Home</a>
          <a href="#resources">Resources</a>
          <a href="#blogs">Blogs</a>
          <a href="#projects">Projects</a>
        </nav>
        <div className="social-links">

      <a 
          href="https://www.linkedin.com/in/mc-trieu-truong" 
          target="_blank" 
          rel="noopener noreferrer"
          >
          <FaLinkedin size={30} color="#b5b4b4" />
      </a>

      <a href="https://www.instagram.com/c.trevort_14/" 
         target="_blank" 
         rel="noopener noreferrer">
        <FaInstagram size={30} color="#b5b4b4" />
      </a>

      <a href="https://www.facebook.com/cattrieu.truongminh.3/" 
         target="_blank" 
         rel="noopener noreferrer">
        <FaFacebook size={30} color="#b5b4b4" />
      </a>
      </div>
      </header>


      <div>
      <p> My name is Trieu, but you can call me Trevor. <br />
      I currently study Electrical Engineering at the University of British Columbia. <br />
      I created this space to share knowledge and my personal journey, <br />
      I hope you will enjoy the content and find something helpful.</p>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

      </div>

    </>
  )
}

export default App
