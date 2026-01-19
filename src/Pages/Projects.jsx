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
      <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
        {/* First Card */}
        <Card
          sx={{
            minWidth: 260,
            backgroundColor: '#222222',
            color: '#ffffff',
            borderRadius: 3,
          }}
        >
          <CardContent>
            <Stack direction="row" spacing={0} alignItems="center" justifyContent="center" padding={0.5}>
              <Avatar
                alt="Trieu Truong"
                src="Laplace.png"
                sx={{ width: 50, height: 50, border: '2px solid #ffffff', zIndex: 1 }}
              />
              <Box sx={{ height: '2px', width: '40px', backgroundColor: '#ffffff', zIndex: 0 }} />
              <Avatar
                alt="UBC Open Robotics"
                src="open-robotics.jpg"
                sx={{ width: 50, height: 50, border: '2px solid #ffffff', zIndex: 0 }}
              />
            </Stack>
            <Typography gutterBottom sx={{ color: '#b5b4b4', fontSize: 14 }}>
              UBC Open Robotics Design Team
            </Typography>
            <Typography variant="h5" component="div">
              Haptic Knob Project
            </Typography>
            <Typography variant="body2">
              BLDC-driven haptic feedback system <br />
              simulating electronic components (R, L, C Diodes)
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" sx={{ color: '#b5b5b5' }}>Learn More</Button>
          </CardActions>
        </Card>

        {/* Second Card */}
        <Card
          sx={{
            minWidth: 260,
            backgroundColor: '#222222',
            color: '#ffffff',
            borderRadius: 3,
          }}
        >
          <CardContent>
            <Stack direction="row" spacing={0} alignItems="center" justifyContent="center" padding={0.5}>
              <Avatar
                alt="Tron"
                src="Tron.png"
                sx={{ width: 50, height: 50, border: '2px solid #ffffff', zIndex: 1 }}
              />

            </Stack>
            <Typography gutterBottom sx={{ color: '#b5b4b4', fontSize: 14 }}>
            <Typography gutterBottom sx={{ color: '#b5b4b4', fontSize: 14 }}>
              University Of British Columbia
            </Typography>
            </Typography>
            <Typography variant="h5" component="div">
              Tron light cycle game
            </Typography>
            <Typography variant="body2">
              A game built in embedded C, <br />
              using timers and interrupts for real-time gameplay
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" sx={{ color: '#b5b5b5' }}>Learn More</Button>
          </CardActions>
        </Card>
      </Stack>
    </div>
  );
}

export default Projects;
