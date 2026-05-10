import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BlockMath } from 'react-katex';
import WaveSimulation from '../components/WaveSimulation'
import DoubleSlitSimulation from '../components/DoubleSlitSimulation'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'katex/dist/katex.min.css';

const playlists = [
  "28m92FXBUeN1B3NmKHZKjH",
  "7JsX7h2KidnM87kAQ5QChq",
  "0o6iOAQ3V5h7Q3Lp4dZksn",
  "7vbnec2YeR2DQp82bZDsVx",
  "5JgufXX9FsTaW5OX0UWDZS"
];
function About() {
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);

  const profileImages = [
    "/me.jpg",
    "/me1.jpg", 
  ];

  const skills = [
    'Altium Designer', 'Prototyping', 'Circuit Design', 
    'Python', 'MATLAB', 'C/C++', 'JavaScript', 'TailwindCSS'
  ];

  const latexEquations = [
    String.raw`
    \begin{aligned}
    \nabla \cdot \mathbf{E}&= \frac{\rho}{\varepsilon_0} \\
    \nabla \cdot \mathbf{B}&=0 \\
    \nabla \times \mathbf{E}&=-\frac{\partial \mathbf{B}}{\partial t} \\
    \nabla \times \mathbf{B}&=\mu_0\mathbf{J}+\mu_0\varepsilon_0\frac{\partial \mathbf{E}}{\partial t}
    \end{aligned}`,
    String.raw`i \hbar \frac{\partial \psi}{\partial t} =  -\frac{\hbar^2}{2m} \nabla^2 \psi+ V\psi`,
  ];

  const getEquationTextSize = (equation) => {
    const equationLength = equation.replace(/\s/g, '').length;

    if (equationLength > 170) {
      return 'text-xs sm:text-sm md:text-base';
    }

    if (equationLength > 80) {
      return 'text-sm sm:text-base md:text-lg';
    }

    return 'text-base sm:text-lg md:text-xl';
  };

  return (
    <div className="flex flex-col items-start min-h-[80vh] mt-12 px-6 pb-20 gap-12 max-w-5xl mx-auto">
      
      {/* --- Intro Card --- */}
      <div className="intro flex flex-col md:flex-row items-center gap-12 
                      bg-[#111111] border border-white/10 shadow-2xl 
                      rounded-[2.5rem] p-8 md:p-16 w-full">
        
        {/* Left Side: Content */}
        <div className="flex flex-col gap-8 flex-1">
          <div className="intro-text flex flex-col gap-4 text-white">
            <h2 className="font-extrabold text-5xl tracking-tight leading-tight">
              About <span className="text-gray-400">Me</span>
            </h2>
            <p className="text-lg md:text-base leading-relaxed text-gray-400 text-left">
            My engineering journey started with a desire to create practical solutions that could help my family and community solve daily-life problems. Inspired from that, I am passionate about turning theoretical concepts into real-world applications through hands-on projects and teamwork.
            </p>
            <p className="text-lg md:text-base leading-relaxed text-gray-400 text-left">
            Outside of academics, I enjoy listening to music, playing the piano, and composing my own songs. These creative pursuits help me maintain balance in my life and enjoy the process of creating something new.</p>
          </div>

          {/* Skills tags */}
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span 
                key={skill} 
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Right Side: Image Swiper */}
        <div className="intro-image w-full max-w-[320px] group">
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            spaceBetween={0}
            slidesPerView={1}
            effect={'fade'} // Smooth transition
            loop={true}
            autoplay={{ 
              delay: 3500, 
              disableOnInteraction: false 
            }}
            pagination={{ 
              clickable: true,
              dynamicBullets: true 
            }}
            className="rounded-2xl shadow-2xl overflow-hidden border border-white/5"
            style={{
              "--swiper-pagination-color": "#ffffff",
              "--swiper-pagination-bullet-inactive-color": "#4b5563",
              "--swiper-pagination-bullet-inactive-opacity": "0.5",
              "--swiper-pagination-bullet-size": "8px",
            }}
          >
            {profileImages.map((imgSrc, index) => (
              <SwiperSlide key={index}>
                <div className="relative aspect-4/5 w-full">
                  <img 
                    src={imgSrc} 
                    alt={`Slide ${index}`} 
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle overlay to help text/pagination pop */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Add or swap LaTeX strings in the latexEquations array above. */}
      <div className="w-full rounded-[2rem] border border-white/10 bg-[#111111] p-6 md:p-8 shadow-2xl">
        <div className="mb-6 flex flex-col gap-2 text-left">
          <h3 className="text-2xl font-extrabold text-white">
            Equations that I would <span className="text-gray-400">hypothetically</span> get tattooed
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {latexEquations.map((equation, index) => (
            <div
              key={index}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-center shadow-lg"
            >
              <div className={`flex ${index === 1 ? 'min-h-[120px]' : 'min-h-[170px]'} items-center justify-center overflow-x-auto text-center text-gray-100 [&_.katex-display]:text-center ${getEquationTextSize(equation)}`}>
                <BlockMath math={equation} />
              </div>
              <div className={index === 1 ? 'mt-20.5' : 'mt-3'}>
                {index === 0 ? <WaveSimulation /> : <DoubleSlitSimulation />}
              </div>
            </div>
          ))}
        </div>


        
      </div>

      {/* Spotify Section */}
      <div className="w-full rounded-[2rem] border border-green-500/20 bg-gradient-to-br from-[#111111] to-[#0a0a0a] p-8 md:p-12 shadow-2xl overflow-hidden relative group">
        {/* Decorative background element */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-green-500/5 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left: Spotify Content */}
          <div className="flex flex-col gap-6 flex-1">
            <div className="flex items-center gap-3">
            <svg
              className="w-10 h-10 text-grey-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.521 17.34c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.1-10.56-1.14-.42.12-.78-.12-.9-.54-.12-.42.06-.78.48-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.48.66.3 1.02zm1.44-3.3c-.3.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-12.02-1.5-.48.12-1.02-.06-1.14-.54-.12-.48.04-1.1.52-1.24 4.44-1.44 10 .08 13.64 1.92.36.24.66.78.26 1.06zm.18-3.42c-3.9-2.34-10.38-2.52-14.1-1.38-.6.18-1.2-.18-1.38-.78-.18-.6.18-1.2.78-1.38 4.32-1.32 11.52-1.08 15.84 1.5.54.3.72 1.02.42 1.56-.3.48-1.02.66-1.56.48z" />
            </svg>
              <h3 className="text-2xl font-extrabold text-gray-400">
                Music <span className="text-gray-100"> is my Saviour</span>
              </h3>
            </div>
            <div className="relative">
              <iframe
                data-testid="embed-iframe"
                style={{ borderRadius: "12px" }}
                src={`https://open.spotify.com/embed/playlist/${playlists[currentPlaylistIndex]}?utm_source=generator`}
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />

              {/* Change Playlist Button */}
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => setCurrentPlaylistIndex((prev) => (prev + 1) % playlists.length)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white-400 hover:bg-grey-400 text-white font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-grey-500/50"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Change Playlist 
                </button>
              </div>
              
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default About;
