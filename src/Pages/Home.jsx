import { FaLinkedin, FaInstagram, FaFacebook, FaGithub, FaEnvelope } from 'react-icons/fa';

function Home() {
  return (
    /* 1. Main page wrapper - handles top margin and basic centering */
    <div className="flex justify-center mt-12 px-6">
      
      <div className="p-10 max-w-12xl w-5xl">
        
        <div className="intro flex flex-col  rounded-lg md:flex-row gap-12 items-center">
          
          {/* Left column: text + social icons */}
          <div className="flex flex-col gap-6 p-6 rounded-xl max-w-md w-full ">
            <div className="intro-text flex flex-col gap-4 text-white">
              <h2 className="font-bold text-3xl">Hi, I'm Trieu</h2>
              <a className="text-lg leading-relaxed text-gray-300">
                I am a 2nd-year Electrical Engineering student at UBC,
                focused on building a strong foundation in control and systems.
              </a>
            </div>

            {/* Social links */}
           <div className="social-links flex gap-6 mt-2">
              <a href="mailto:cattrieutruongminh@gmail.com" target="_blank" rel="noopener noreferrer">
                <FaEnvelope size={28} color="#ffffff" className="hover:text-white transition-colors" />
              </a>
              <a href="https://www.linkedin.com/in/mc-trieu-truong" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={28} color="#ffffff" className="hover:text-white transition-colors" />
              </a>
              <a href="https://www.instagram.com/c.trevort_14/" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={28} color="#ffffff" className="hover:text-white transition-colors" />
              </a>
              <a href="https://www.facebook.com/cattrieu.truongminh.3/" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={28} color="#ffffff" className="hover:text-white transition-colors" />
              </a>
              <a href="https://github.com/ttrieu2025/" target="_blank" rel="noopener noreferrer">
                <FaGithub size={28} color="#ffffff" className="hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Right column: image */}
          <div className="intro-image flex justify-center flex-1">
            <img
              src="/profile.png"
              alt="Profile"
              className="rounded-lg shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{
                width: "100%",
                maxWidth: "400px", // Constrains the image size to keep the box small
                height: "auto",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;