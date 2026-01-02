import GradientText from '../components/GradientText'

function Projects() {
  return (
        <h1><GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={3}
          showBorder={false}
          className="custom-class"
        >In Progress </GradientText></h1>
  )
}

export default Projects