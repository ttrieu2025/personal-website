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
          <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={3}
          showBorder={false}
          className="custom-class"
          > Home </GradientText></Link>

          <Link to="/Resources">
          <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={3}
          showBorder={false}
          className="custom-class"
          > Resources</GradientText></Link>
          
          <Link to="/Blogs">
  
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={3}
          showBorder={false}
          className="custom-class"
        > Blogs </GradientText></Link>
          
        <Link to="/Projects">

        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={3}
          showBorder={false}
          className="custom-class"
        >Projects </GradientText></Link>
        
        <Link to="/Contact">

        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={3}
          showBorder={false}
          className="custom-class"
        >Contact </GradientText></Link>

        </nav>
         <div className="social-links">

          <a
            href="https://drive.google.com/file/d/1VivIUlGLGPmrLCDAIVx6TRuWQD03-FvR/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >         
          
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={3}
          showBorder={false}
          className="custom-class"
        >Resume </GradientText></a>

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
