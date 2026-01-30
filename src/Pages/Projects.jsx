import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

function Projects() {
  return (
    <div className="flex justify-center items-start min-h-screen mt-12 px-6 pb-12">
      
      <div className="bg-[#111111] border border-white/10 shadow-2xl rounded-[2.5rem] p-8 md:p-16 max-w-6xl w-full">
        
        <div className="mb-12">
            <h2 className="text-white font-extrabold text-4xl tracking-tight mb-2">
            Featured Projects
            </h2>
          
          </div>

        <Stack 
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          justifyContent="flex-start"
          alignItems="stretch"
        >

          <Card 
            sx={{ 
              flex: 1,
              backgroundColor: '#1a1a1a', 
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '2rem',
              transition: 'all 0.4s ease',
              '&:hover': {
                transform: 'translateY(-10px)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
              }
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Stack
                direction="row"
                spacing={0}
                alignItems="center"
                justifyContent="center"   
                mb={3}
                sx={{ width: '100%' }} 
              >
                <Avatar src="/Logo.png" sx={{ width: 56, height: 56, border: '2px solid #222' }} />
                <Box sx={{ height: '2px', width: '30px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
                <Avatar src="/open-robotics.jpg" sx={{ width: 56, height: 56, border: '2px solid #222' }} />
              </Stack>

              <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', mb: 1 }}>
                UBC Open Robotics
              </Typography>
              <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 800, mb: 2, tracking: '-0.02em' }}>
                Haptic Knob Project
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                BLDC-driven haptic feedback system simulating electronic components such as resistors, inductors, capacitors and diodes
              </Typography>
            </CardContent>
            <CardActions sx={{ p: 4, pt: 0 }}>
              <Button 
                disabled
                size="medium" 
                sx={{ 
                  color: 'rgba(255,255,255,0.3) !important', 
                  textTransform: 'none',
                  fontWeight: 600,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  px: 3,
                  borderRadius: '12px',
                  mx: 'auto'
                }}
              >
                Coming Soon
              </Button>
            </CardActions>
          </Card>

          <Card 
            sx={{ 
              flex: 1,
              backgroundColor: '#1a1a1a', 
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '2rem',
              transition: 'all 0.4s ease',
              '&:hover': {
                transform: 'translateY(-10px)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
              }
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box 
                mb={3} 
                display="flex" 
                justifyContent="center" 
              >
                <Avatar 
                  src="/Tron.png" 
                  sx={{ width: 56, height: 56, border: '2px solid #222' }} 
                />
              </Box>

              <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', mb: 1 }}>
                Computing Systems
              </Typography>
              <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 800, mb: 2, tracking: '-0.02em' }}>
                Tron Light Cycle Game
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                A retro game built in embedded C, utilizing hardware timers and interrupts for high-performance and real-time gameplay
              </Typography>
            </CardContent>
            <CardActions sx={{ p: 4, pt: 0 }}>
              <Button 
                href="https://github.com/ttrieu2025/Tron-light-cycle-game"
                target="_blank"
                size="medium" 
                
                sx={{ 
                  color: '#000000', 
                  backgroundColor: '#ffffff',
                  textTransform: 'none',
                  fontWeight: 700,
                  px: 4,
                  borderRadius: '12px',
                  mx: 'auto',  
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.8)',
                  }
                }}
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
          <Card 
            sx={{ 
              flex: 1,
              backgroundColor: '#1a1a1a', 
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '2rem',
              transition: 'all 0.4s ease',
              '&:hover': {
                transform: 'translateY(-10px)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
              }
            }}
                      >
            <CardContent sx={{ p: 4 }}>
              <Box 
                mb={3} 
                display="flex" 
                justifyContent="center"  
              >
                <Avatar 
                  src="/Thermometer.jpg" 
                  sx={{ width: 56, height: 56, border: '2px solid #222' }} 
                />
              </Box>

              <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', mb: 1 }}>
              Design Studio
              </Typography>
              <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 800, mb: 2, tracking: '-0.02em' }}>
              Digital Thermometer
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontSize: '0.95rem' }}>
              A digital thermometer system built using the N76E003 microcontroller and LM335 temperature sensor with Python-based stripchart</Typography>
            </CardContent>
            <CardActions sx={{ p: 4, pt: 0 }}>
              <Button 
                href="https://github.com/ttrieu2025/digital-thermometer.git"
                target="_blank"
                size="medium" 
                sx={{ 
                  color: '#000000', 
                  backgroundColor: '#ffffff',
                  textTransform: 'none',
                  fontWeight: 700,
                  px: 4,
                  borderRadius: '12px',
                  mx: 'auto',  
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.8)',
                  }
                }}
              >
                Learn More
              </Button>
            </CardActions>
          </Card>





        </Stack>
      </div>
    </div>
  );
}

export default Projects;