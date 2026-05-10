import { useEffect, useRef } from 'react'

const NUM_POINTS = 900
const WAVE_LENGTH = 4 * Math.PI

const project = (x, y, z, width, height) => {
  const scaleX = width / WAVE_LENGTH
  const scaleY = Math.min(width, height) * 0.22
  const originX = 0
  const originY = height * 0.56

  return {
    x: originX + x * scaleX - z * scaleY * 0.56,
    y: originY - y * scaleY + z * scaleY * 0.28,
  }
}

const drawLine = (ctx, points, color, width = 3) => {
  ctx.beginPath()
  points.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y)
    else ctx.lineTo(point.x, point.y)
  })
  ctx.strokeStyle = color
  ctx.lineWidth = width
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.stroke()
}

const drawArrow = (ctx, from, to, color, label) => {
  const angle = Math.atan2(to.y - from.y, to.x - from.x)
  const head = 10

  ctx.strokeStyle = color
  ctx.fillStyle = color
  ctx.lineWidth = 3.5
  ctx.lineCap = 'round'

  ctx.beginPath()
  ctx.moveTo(from.x, from.y)
  ctx.lineTo(to.x, to.y)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(to.x, to.y)
  ctx.lineTo(to.x - head * Math.cos(angle - Math.PI / 6), to.y - head * Math.sin(angle - Math.PI / 6))
  ctx.lineTo(to.x - head * Math.cos(angle + Math.PI / 6), to.y - head * Math.sin(angle + Math.PI / 6))
  ctx.closePath()
  ctx.fill()

  ctx.font = '700 14px Inter, ui-sans-serif, system-ui'
  ctx.fillText(label, to.x + 10, to.y - 8)
}

const WaveSimulation = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d')
    let frame = 0
    let animationId

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      const pixelRatio = window.devicePixelRatio || 1

      canvas.width = Math.max(1, Math.floor(rect.width * pixelRatio))
      canvas.height = Math.max(1, Math.floor(rect.height * pixelRatio))
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    }

    const render = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      const phase = frame * 0.1
      const axis = []
      const electric = []
      const magnetic = []

      for (let i = 0; i < NUM_POINTS; i += 1) {
        const x = (i / (NUM_POINTS - 1)) * WAVE_LENGTH
        const wave = Math.sin(x - phase)

        axis.push(project(x, 0, 0, width, height))
        electric.push(project(x, wave, 0, width, height))
        magnetic.push(project(x, 0, wave, width, height))
      }

      const idx = Math.floor((frame * 3) % NUM_POINTS)
      const x0 = (idx / (NUM_POINTS - 1)) * WAVE_LENGTH
      const ey = Math.sin(x0 - phase)
      const bz = Math.sin(x0 - phase)
      const sx = ey * bz

      ctx.clearRect(0, 0, width, height)

      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, '#030712')
      gradient.addColorStop(0.55, '#050505')
      gradient.addColorStop(1, '#120816')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      ctx.globalAlpha = 0.55
      for (let i = 0; i < 18; i += 1) {
        const x = (i / 17) * WAVE_LENGTH
        const yTop = project(x, 1.15, 0, width, height)
        const yBottom = project(x, -1.15, 0, width, height)
        const zFront = project(x, 0, -1.15, width, height)
        const zBack = project(x, 0, 1.15, width, height)

        drawLine(ctx, [yBottom, yTop], 'rgba(62,231,255,0.18)', 2)
        drawLine(ctx, [zFront, zBack], 'rgba(232,93,255,0.16)', 2)
      }
      ctx.globalAlpha = 1

      drawLine(ctx, axis, 'rgba(255,255,255,0.22)', 1.5)
      drawLine(ctx, magnetic, '#e85dff', 3)
      drawLine(ctx, electric, '#3ee7ff', 3)

      const origin = project(x0, 0, 0, width, height)
      const electricTip = project(x0, ey, 0, width, height)
      const magneticTip = project(x0, 0, bz, width, height)
      const poyntingTip = project(x0 + sx * 0.95, 0, 0, width, height)

      drawArrow(ctx, origin, electricTip, '#3ee7ff', 'E')
      drawArrow(ctx, origin, magneticTip, '#e85dff', 'B')
      drawArrow(ctx, origin, poyntingTip, '#ffd44d', 'S')

      frame = (frame + 1) % 5000
      animationId = requestAnimationFrame(render)
    }

    resizeCanvas()
    render()
    window.addEventListener('resize', resizeCanvas)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <div className="h-[240px] w-full overflow-hidden rounded-2xl border border-white/10 bg-black sm:h-[300px]">
      <canvas ref={canvasRef} className="h-full w-full" aria-label="Electromagnetic wave animation" />
    </div>
  )
}

export default WaveSimulation
