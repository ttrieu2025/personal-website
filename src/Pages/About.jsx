import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BlockMath } from 'react-katex';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'katex/dist/katex.min.css';

function About() {
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
            Two equations that I would <span className="text-gray-400">hypothetically</span> get tattooed
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {latexEquations.map((equation, index) => (
            <div
              key={index}
              className={`rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-center shadow-lg ${index === 1 ? 'flex flex-col justify-center' : ''}`}
            >
              <div className={`overflow-x-auto text-center text-gray-100 [&_.katex-display]:text-center ${getEquationTextSize(equation)}`}>
                <BlockMath math={equation} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default About;
