import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

function About() {
  const profileImages = [
    "/me.jpg",
    "/me1.jpg", 
  ];

  const skills = [
    'Altium Designer', 'Prototyping', 'Circuit Design', 
    'Python', 'MATLAB', 'C/C++', 'Javascript', 'TailwindCSS'
  ];

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

      {/* --- Experience Section --- */}
      <div className="w-full text-left">
        <h3 className="text-white text-3xl font-bold mb-8">Highlighted Experience</h3>
        
        <div className="space-y-4 w-full">
          {/* Accordion 1: UBC Sauder */}
          <Accordion 
            sx={{ 
              backgroundColor: '#111111', 
              color: 'white', 
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '1.5rem !important',
              '&:before': { display: 'none' },
              backgroundImage: 'none',
              overflow: 'hidden'
            }}
          >
            <AccordionSummary
           expandIcon={<ExpandMoreIcon />}
            sx={{
              padding: '1rem 2rem',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.02)'
              },
              '& .MuiTouchRipple-root': {
                display: 'none'
              },
              '& .MuiButtonBase-root': {
                border: 'none',
                outline: 'none',
              },
              '&:focus': {
                outline: 'none',
              },
              '&:focus-visible': {
                outline: 'none',
              },
            }}
          >
              <div className="flex flex-col md:flex-row justify-between w-full pr-4 md:items-center gap-2">
                <span className="font-bold text-lg text-gray-200">IT/AV Support Student Rover | UBC Sauder School of Business</span>
                <span className="text-gray-500 font-medium text-sm whitespace-nowrap">Jan. 2026 - Present</span>
              </div>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '0 2rem 2rem 2rem', color: '#9ca3af', textAlign: 'left' }}>
              <ul className="list-disc ml-5 space-y-2">
                <li>Diagnosed and resolved hardware and software issues in electronic devices.</li>
                <li>Assisted in setting up and maintaining AV equipment for events and presentations.</li>
              </ul>
            </AccordionDetails>
          </Accordion>

          {/* Accordion 2: Open Robotics */}
            <Accordion 
              sx={{ 
                backgroundColor: '#111111', 
                color: 'white', 
                border: '1px solid rgba(255,255,255,0.1)', // This is your subtle main border
                borderRadius: '1.5rem !important',
                boxShadow: 'none', // Remove default shadow
                '&:before': { display: 'none' }, // Hides the default Mui top-border/divider
                '&:not(:last-child)': {
                  borderBottom: '1px solid rgba(255,255,255,0.1)', // Keeps only your custom border
                },
                backgroundImage: 'none',
                overflow: 'hidden'
              }}
            >
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              padding: '1rem 2rem',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.02)'
              },
              '& .MuiTouchRipple-root': {
                display: 'none'
              },
              '& .MuiButtonBase-root': {
                border: 'none',
                outline: 'none',
              },
              '&:focus': {
                outline: 'none',
              },
              '&:focus-visible': {
                outline: 'none',
              },
            }}
          >
              <div className="flex flex-col md:flex-row justify-between w-full pr-4 md:items-center gap-2">
                <span className="font-bold text-lg text-gray-200">Hardware Team Member | UBC Open Robotics</span>
                <span className="text-gray-500 font-medium text-sm whitespace-nowrap">Sept. 2025 - Present</span>
              </div>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '0 2rem 2rem 2rem', color: '#9ca3af', textAlign: 'left' }}>
                <ul className="list-disc ml-5 space-y-2">
                    <li>Developed block diagrams to model system interconnections.</li>
                    <li>Soldered and assembled custom PCBs with wiring systems.</li>
                </ul>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default About;