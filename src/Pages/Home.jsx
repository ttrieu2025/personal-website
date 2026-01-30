import React from 'react';
import { FaLinkedin, FaInstagram, FaFacebook, FaGithub, FaEnvelope } from 'react-icons/fa';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex justify-center items-center min-h-[80vh] mt-12 px-6">
      
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
              I am building a strong foundation in circuit theory, electromagnetics and control systems         </p>
          </div>

          {/* Social links */}
          <div className="social-links flex gap-6 items-center">
            <a href="mailto:cattrieutruongminh@gmail.com" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
              <FaEnvelope size={26} className="text-white hover:text-gray-400 transition-colors" />
            </a>
            <a href="https://www.linkedin.com/in/mc-trieu-truong" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
              <FaLinkedin size={26} className="text-white hover:text-gray-400 transition-colors" />
            </a>
            <a href="https://www.instagram.com/c.trevort_14/" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
              <FaInstagram size={26} className="text-white hover:text-gray-400 transition-colors" />
            </a>
            <a href="https://www.facebook.com/cattrieu.truongminh.3/" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
              <FaFacebook size={26} className="text-white hover:text-gray-400 transition-colors" />
            </a>
            <a href="https://github.com/ttrieu2025/" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
              <FaGithub size={26} className="text-white hover:text-gray-400 transition-colors" />
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
            {/* Subtle glow effect behind image */}
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
      </div>
    </div>
  );
}

export default Home;