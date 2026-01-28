import GradientText from '../components/GradientText'
function Home() {
  return (
    <div className="page">
      <div className="intro p-20">
        <div className="intro-text flex flex-col gap-2">
        <h2 className="font-bold"> Hi, I'm Trieu</h2>
          <p className="flex gap-2"> 
          I am a 2nd-year Electrical Engineering student at UBC, focused on building a strong foundation in circuit theory and electromagnetics.
          </p>
        </div>

        <div className="intro-image flex justify-center">
          <img src="/profile.png" alt="Circuit" 
          className="
            shadow-[0_20px_50px_rgba(0,0,0,0.35)]
            transition-all duration-300
            hover:scale-105
            cursor-pointer"
          style={{  width: "70%",
                    height: "auto",
                    maxWidth: "950px",
                    borderRadius: "4%" 
                }} 
          />
        </div>
      </div>
    </div>
  );
}

export default Home;