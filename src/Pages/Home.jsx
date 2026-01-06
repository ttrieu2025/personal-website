import GradientText from '../components/GradientText'
function Home() {
  return (
    <div className="page">
      <div className="intro">
        <div className="intro-text">
<h2>Hello, I'm Trieu</h2>
          <p>
          I am a second year Electrical Engineering student at UBC. I created this space to share my interests in mathematics and engineering, so I hope you will enjoy and find them helpful.
          </p>
        </div>

        <div className="intro-image">
          <img src="/Circuit.svg" alt="Circuit" 
          width="200%" 
          height="auto" />
        </div>
      </div>
    </div>
  );
}

export default Home;