import React, { useState } from 'react';
import { FaLinkedin, FaInstagram, FaGithub, FaEnvelope, FaSpotify } from 'react-icons/fa';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

function Home() {
  const [activeMedia, setActiveMedia] = useState(null);

  const highlightedProjects = [
    {
      title: "Tracking Field Robot",
      description: "Autonomous motion, sensing, and real-world testing in a mobile robotics workflow.",
      date: "March 2026",
      videoSrc: "https://www.youtube.com/embed/U5jY5kz8_YE",
      schematicSrc: "/schematic-robot.png",
      schematicAlt: "Tracking Field Robot electrical schematic"
    },
    {
      title: "Reflow Oven Controller",
      date:"January 2026",
      description: "Embedded controls, hardware integration, and closed-loop temperature tuning.",
      videoSrc: "https://www.youtube.com/embed/zQPqsqj1WKY",
      schematicSrc: "/schematic-oven.png",
      schematicAlt: "Reflow Oven Controller electrical schematic"
    }

  ];

  return (
    <>
      {/* INTRO SECTION */}
      <div className="flex justify-center items-center min-h-[80vh] px-6">
        <div className="intro flex flex-col md:flex-row items-center gap-12 
                        bg-[#111111] border border-white/10 shadow-2xl 
                        rounded-[2.5rem] p-8 md:p-16 max-w-5xl w-full">

          {/* Left column: text + social icons */}
          <div className="flex flex-col gap-8 flex-1">
            <div className="intro-text flex flex-col gap-4 text-white display">
              <div className="flex flex-wrap justify-center gap-3">
                <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-gray-300">
                  Electrical Engineering
                </span>
                <span className="inline-flex items-center rounded-full border border-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
                  UBC
                </span>
              </div>
              <h2 className="font-extrabold text-5xl tracking-tight  justify-center leading-tight">
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

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-center ">
              <Button
                component={Link}
                to="/projects"
                size="medium"
                sx={{
                  color: '#000000',
                  backgroundColor: '#ffffff',
                  textTransform: 'none',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  px: 4,
                  py: 1.4,
                  borderRadius: '999px',
                  alignSelf: { xs: 'center', sm: 'flex-start' },
                  boxShadow: '0 14px 35px rgba(255,255,255,0.12)',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.86)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 18px 42px rgba(255,255,255,0.18)',
                  }
                }}
              >
                VIEW MY WORK
              </Button>
            </div>
          </div>

          {/* Right column: image */}
          <div className="intro-image flex justify-center flex-1">
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear from-gray-600 to-gray-900 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <img
                src="/Profile.jpg"
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
    <div className="mb-8 text-center flex flex-col items-center gap-4">
      <h2 className="text-white text-3xl md:text-4xl font-extrabold">
        Featured Projects
      </h2>
    </div>

    {highlightedProjects.map((project, index) => (
      <div
        key={project.title}
        className={`rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-4 md:p-6 ${index === 0 ? 'mt-12' : 'mt-8'}`}
      >
        <div className="mb-4 flex flex-col gap-2 text-left">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl md:text-2xl font-bold text-white">{project.title}</h3>
            <span className="text-xs uppercase tracking-[0.24em] text-gray-500">{project.date}</span>
          </div>
          <p className="text-sm md:text-base leading-7 text-gray-400">{project.description}</p>
        </div>

        <div className="mx-auto grid max-w-4xl items-center gap-4 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-white/20 shadow-lg">
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">Demo Video</span>
              <button
                type="button"
                onClick={() => setActiveMedia({ type: 'video', project })}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white transition hover:bg-white/10"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={() => setActiveMedia({ type: 'video', project })}
              className="mx-auto block aspect-video w-full cursor-zoom-in overflow-hidden"
            >
              <iframe
                className="h-full w-full pointer-events-none"
                src={project.videoSrc}
                title={`${project.title} Project`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/20 shadow-lg">
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">Electrical Schematic</span>
            </div>
            <div className="flex h-full min-h-[16rem] items-center justify-center bg-[#0b0b0b] p-4">
              <img
                src={project.schematicSrc}
                alt={project.schematicAlt}
                className="mx-auto max-h-[26rem] max-w-full cursor-zoom-in rounded-xl object-contain transition duration-300 hover:scale-[1.02]"
                onClick={() => setActiveMedia({ type: 'schematic', project })}
              />
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

      {activeMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4 py-8"
          onClick={() => setActiveMedia(null)}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
              setActiveMedia(null);
            }
          }}
        >
          <div
            className="relative w-full max-w-6xl rounded-[2rem] border border-white/10 bg-[#111111] p-4 md:p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveMedia(null)}
              className="absolute right-4 top-4 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Close
            </button>
            <div className="mb-4 pr-16 text-left">
              <h3 className="text-xl font-bold text-white">{activeMedia.project.title}</h3>
              <p className="text-sm text-gray-400">
                {activeMedia.type === 'video' ? 'Project video' : 'Electrical schematic'}
              </p>
            </div>
            <div className="flex max-h-[80vh] items-center justify-center overflow-auto rounded-[1.5rem] bg-black p-4">
              {activeMedia.type === 'video' ? (
                <div className="aspect-video w-full overflow-hidden rounded-xl">
                  <iframe
                    className="h-full w-full"
                    src={activeMedia.project.videoSrc}
                    title={`${activeMedia.project.title} Project enlarged video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <img
                  src={activeMedia.project.schematicSrc}
                  alt={activeMedia.project.schematicAlt}
                  className="h-auto max-h-[72vh] w-full object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
