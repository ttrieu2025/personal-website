import React from 'react';
import { FaLinkedin, FaInstagram, FaGithub, FaEnvelope, FaSpotify } from 'react-icons/fa';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* INTRO SECTION */}
      <div className="flex justify-center items-center min-h-[80vh] px-6">
        <div className="intro flex flex-col md:flex-row items-center gap-12 
                        bg-[#111111] border border-white/10 shadow-2xl 
                        rounded-[2.5rem] p-8 md:p-16 max-w-5xl w-full">

          {/* Left column: text + social icons */}
          <div className="flex flex-col gap-8 flex-1">
            <div className="intro-text flex flex-col gap-4 text-white">
              <h2 className="font-extrabold text-5xl tracking-tight leading-tight">
                Hi, I'm <span className="text-gray-400">Trieu</span>
              </h2>
              <p className="text-lg md:text-base leading-relaxed text-gray-400">
                As an Electrical Engineering student at the University of British Columbia,
                I am building a strong foundation in circuit theory, electromagnetics and control systems
              </p>
            </div>

            {/* Social links */}
            <div className="social-links flex gap-6 items-center">
              <a href="mailto:cattrieutruongminh@gmail.com" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                <FaEnvelope size={26} className="text-white hover:text-gray-400 transition-colors" />
              </a>
              <a href="https://www.linkedin.com/in/mc-trieu-truong" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                <FaLinkedin size={26} className="text-white hover:text-gray-400 transition-colors" />
              </a>
              <a href="https://github.com/ttrieu2025/" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                <FaGithub size={26} className="text-white hover:text-gray-400 transition-colors" />
              </a>
              <a href="https://www.instagram.com/c.trevort_14/" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                <FaInstagram size={26} className="text-white hover:text-gray-400 transition-colors" />
              </a>
              <a href="https://open.spotify.com/user/314hwlmaom6snyde4jrd2o5h3ski?si=56d50ce5f96d4df7" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                <FaSpotify size={26} className="text-white hover:text-gray-400 transition-colors" />
              </a>
            </div>

            <Button
              component={Link}
              to="/projects"
              size="medium"
              sx={{
                color: '#000000',
                backgroundColor: '#ffffff',
                textTransform: 'none',
                fontWeight: 700,
                px: 4,
                borderRadius: '12px',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.8)',
                }
              }}
            >
              VIEW MY WORK
            </Button>
          </div>

          {/* Right column: image */}
          <div className="intro-image flex justify-center flex-1">
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear from-gray-600 to-gray-900 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <img
                src="/profile.png"
                alt="Profile"
                className="relative rounded-2xl shadow-xl transition-all duration-500 hover:scale-[1.03] cursor-pointer"
                style={{
                  width: "100%",
                  maxWidth: "360px",
                  height: "auto",
                  objectFit: "cover"
                }}
              />
            </div>
          </div>

        </div> {/* END INTRO */}
      </div>   {/* END INTRO WRAPPER */}
{/* Gradient Arrow pointing down */}
<div className="flex justify-center">
  <div className="w-12 h-12">
    <svg viewBox="0 0 24 24" className="w-full h-full animate-bounce">
      <defs>
        <linearGradient id="arrowGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#888888" />
        </linearGradient>
      </defs>
      <path
        d="M12 4v16m0 0l-6-6m6 6l6-6"
        stroke="url(#arrowGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  </div>
</div>

<div className="w-full flex justify-center mt-12 px-6">
  <div className="bg-[#111111] border border-white/10 shadow-2xl rounded-[2rem] p-8 md:p-12 max-w-5xl w-full">

    {/* Wrap title in its own div */}
    <div className="mb-8 text-center">
      <h2 className="text-white text-3xl md:text-4xl font-extrabold">
        Highlighted Project
      </h2>
    </div>

    

    {/* Video Container */}
    <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/20 shadow-lg p-8 mt-12">
      <iframe
        className="w-full h-full"
        src="https://www.youtube.com/embed/zQPqsqj1WKY"
        title="Reflow Oven Controller Project"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>

    <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/20 shadow-lg mt-8">
      <iframe
        className="w-full h-full"
        src="https://www.youtube.com/embed/U5jY5kz8_YE"
        title="Tracking Field Robot Project"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  </div>
</div>
    </>
  );
}

export default Home;