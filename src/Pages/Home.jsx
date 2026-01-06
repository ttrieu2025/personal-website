import GradientText from '../components/GradientText'
function Home() {
  return (
    <div className="page">
      <div className="intro">
        <div className="intro-text">
        <h2>Hi, I'm Trieu</h2>
          <p>
          I am a 2nd-year Electrical Engineering student at UBC, focused on building a strong foundation in circuit theory, electromagnetics, and control systems.
          </p>
        </div>

        <div className="intro-image">
          <img src="/Circuit.svg" alt="Circuit"/>
        </div>
      </div>
      {/* <div className="intro">
        <div className="centered-section">
        <h2>About Me</h2>
          <p>My passion for mathematics and electricalmagnetism
          have become my driving forces in both my academic and personal life since high school. While excelling in 
          these field has opened many door for me, I believe that they are important for me to support my family and
          community in daily life with practical technology solutions. </p>
          </div>
      </div> */}
    </div>
  );
}

export default Home;