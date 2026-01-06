import GradientText from '../components/GradientText';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

const experiences = [
  {
    title: 'Haptic Knob Project Member',
    date: 'Sep 2025 - Present · 5 mos',
    description: 'Currently working on developing a haptic knob system powered by a BLDC motor...'
  },
];

function Projects() {
  return (
    <Stack direction="column" spacing={2} alignItems="center">
      {/* Avatars row */}
      <Stack direction="row" spacing={0} alignItems="center" justifyContent="center" className="avatars-row">
        <Avatar
          alt="Trieu Truong"
          src="Laplace.png"
          sx={{ width: 50, height: 50, border: '2px solid #ffffff', zIndex: 1 }}
        />

        <Box sx={{ height: '2px', width: '40px', backgroundColor: '#ffffff', zIndex: 0 }} />

        <Avatar
          alt="UBC Open Robotics"
          src="open-robotics.jpg"
          sx={{ width: 50, height: 50, border: '2px solid #ffffff', zIndex: 1 }}
        />
      </Stack>
        <h2>UBC Open Robotics Design Team</h2>
        <a>Hapic Knob Project Member</a>
        <span>
          Currently designing and implementing a haptic knob, a feedback control system driven by a BLDC motor,<br/>
          to simulate electrical components such as resistors, capacitors, inductors, and diodes.
        </span>
    </Stack>
  );
}

export default Projects;
