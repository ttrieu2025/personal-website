import GradientText from '../components/GradientText'

function Projects() {
  return (
        <h1><GradientText
          colors={["#3aafa9", "#2b7a78", "#3aafa9", "#2b7a78", "#40ffaa"]}
          animationSpeed={3}
          showBorder={false}
          className="custom-class"
        >In Progress </GradientText></h1>
  )
}

export default Projects