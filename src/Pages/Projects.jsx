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
    <div className="page">
      <Stack 
        direction={{ xs: 'column', sm: 'column', md: 'row' }}
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ 
          padding: { xs: 2, sm: 2, md: 0 },
          width: '100%'
        }}
      >
        {/* First Card */}
        <Card className="
            shadow-[0_20px_50px_rgba(0,0,0,0.35)]
            transition-all duration-300
            hover:scale-105
            cursor-pointer"

          sx={{ 
            minWidth: { xs: '100%', sm: 300, md: 260 },
            maxWidth: { xs: '100%', sm: 400, md: 400 },
            color: '#b5b4b4',
            borderRadius: 3,
            
          }}
        >
          <CardContent>
            <Stack 
              direction="row" 
              spacing={0} 
              alignItems="center" 
              justifyContent="center" 
              padding={0.5}
            >
              <Avatar 
                alt="Trieu Truong" 
                src="/Laplace.png" 
                sx={{ 
                  width: 50, 
                  height: 50, 
                  zIndex: 1 
                }} 
              />
              <Box 
                sx={{ 
                  height: '2px', 
                  width: '40px', 
                  backgroundColor: '#b5b4b4', 
                  zIndex: 0 
                }} 
              />
              <Avatar 
                alt="UBC Open Robotics" 
                src="/open-robotics.jpg" 
                sx={{ 
                  width: 50, 
                  height: 50, 
                  border: '2px solid #ffffff', 
                  zIndex: 0 
                }} 
              />
            </Stack>
            <Typography 
                gutterBottom 
                sx={{ 
                  color: '#000000', // Indigo accent for the "category" text
                  fontSize: 12, 
                  fontWeight: 700, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.1em',
                  mt: 2 
                }}
              >
                UBC Open Robotics
              </Typography>
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                fontWeight: 800,           // Extra bold for impact
                letterSpacing: '-0.02em',  // Tighter tracking for a modern feel
                color: '#1a1a1a',          // Deep charcoal instead of pure black
                fontFamily: '"Inter", "Roboto", sans-serif' 
              }}
            >
              Haptic Knob Project
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                mt: 1.5, 
                color: '#4b5563',          // Tailwind-style Gray-600 for better hierarchy
                lineHeight: 1.6,           // More breathing room between lines
                fontSize: '0.95rem',
                fontWeight: 400
              }}
            >
              BLDC-driven haptic feedback system <br />
              simulating electronic components (R, L, C, Diodes)
            </Typography>
          </CardContent>
          <CardActions>
            <Button 
              size="small" 
              sx={{ color: '#000000' ,

              '&:hover': {
              backgroundColor: '#000000', // Changes background to black
              color: '#ffffff'
            }
            }}
            >
              Coming Soon
            </Button>
          </CardActions>
        </Card>

        {/* Second Card */}
        <Card className="
            shadow-[0_20px_50px_rgba(0,0,0,0.35)]
            transition-all duration-300
            hover:scale-105
            cursor-pointer"
          sx={{ 
            minWidth: { xs: '100%', sm: 300, md: 260 },
            maxWidth: { xs: '100%', sm: 400, md: 400 },
            color: '#b5b4b4',
            borderRadius: 3,
          }}
        >
          <CardContent>
            <Stack 
              direction="row" 
              spacing={0} 
              alignItems="center" 
              justifyContent="center" 
              padding={0.5}
            >
              <Avatar 
                alt="Tron" 
                src="/Tron.png" 
                sx={{ 
                  width: 50, 
                  height: 50, 
                  border: '2px solid #ffffff', 
                  zIndex: 1 
                }} 
              />
            </Stack>
            <Typography 
                gutterBottom 
                sx={{ 
                  color: '#000000', // Indigo accent for the "category" text
                  fontSize: 12, 
                  fontWeight: 700, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.1em',
                  mt: 2 
                }}
              >
                Computing Systems
              </Typography>
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                fontWeight: 800,           // Extra bold for impact
                letterSpacing: '-0.02em',  // Tighter tracking for a modern feel
                color: '#1a1a1a',          // Deep charcoal instead of pure black
                fontFamily: '"Inter", "Roboto", sans-serif' 
              }}
            >
                Tron Light Cycle Game
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                mt: 1.5, 
                color: '#4b5563',          // Tailwind-style Gray-600 for better hierarchy
                lineHeight: 1.6,           // More breathing room between lines
                fontSize: '0.95rem',
                fontWeight: 400
              }}
            >
                A game built in embedded C,
                using timers and interrupts for real-time gameplay
            </Typography>
          </CardContent>
          <CardActions>
            <Button 
              size="small" 
              sx={{ color: '#000000' ,

              '&:hover': {
              backgroundColor: '#000000', // Changes background to black
              color: '#ffffff'
            }
            }}

              href="https://github.com/ttrieu2025/Tron-light-cycle-game"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-btn"
            >
              Learn More
            </Button>
          </CardActions>
        </Card>
      </Stack>
    </div>
  );
}

export default Projects;