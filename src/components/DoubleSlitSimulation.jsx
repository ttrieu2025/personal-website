import { useEffect, useRef } from 'react'

const GRID_X = 140
const GRID_Y = 90
const X_MIN = -4
const X_MAX = 4
const Y_MIN = -2.4
const Y_MAX = 2.4
const BARRIER_X = -2.2

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const probabilityColor = (probability, phase) => {
  const p = clamp(probability, 0, 1)
  const glow = Math.floor(255 * Math.sqrt(p))
  const realTint = Math.sin(phase) * 0.5 + 0.5

  return `rgba(${Math.floor(30 + glow * realTint)}, ${Math.floor(60 + glow * 0.65)}, ${Math.floor(110 + glow)}, ${0.12 + p * 0.82})`
}

const DoubleSlitSimulation = () => {
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

    const drawBarrier = (width, height) => {
      const slitX = width * 0.23
      const centerY = height * 0.5
      const gap = height * 0.16
      const slitHeight = height * 0.09

      ctx.fillStyle = 'rgba(255,255,255,0.28)'
      ctx.fillRect(slitX - 2, 0, 4, centerY - gap - slitHeight)
      ctx.fillRect(slitX - 2, centerY - gap + slitHeight, 4, gap * 2 - slitHeight * 2)
      ctx.fillRect(slitX - 2, centerY + gap + slitHeight, 4, height - centerY - gap - slitHeight)

      ctx.fillStyle = 'rgba(255,255,255,0.8)'
      ctx.fillRect(slitX - 4, centerY - gap - slitHeight, 8, slitHeight * 2)
      ctx.fillRect(slitX - 4, centerY + gap - slitHeight, 8, slitHeight * 2)
    }

    const render = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      const cellW = width / GRID_X
      const cellH = height / GRID_Y
      const time = frame * 0.065
      const sourceY1 = -0.82
      const sourceY2 = 0.82
      const k = 8.5
      const spread = 0.13

      ctx.clearRect(0, 0, width, height)
      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, '#030712')
      gradient.addColorStop(0.52, '#050505')
      gradient.addColorStop(1, '#07131d')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      const verticalPadding = height * 0.15
      ctx.save()
      ctx.beginPath()
      ctx.rect(0, verticalPadding, width, height - verticalPadding * 2)
      ctx.clip()

      for (let row = 0; row < GRID_Y; row += 1) {
        for (let col = 0; col < GRID_X; col += 1) {
          const x = X_MIN + (col / (GRID_X - 1)) * (X_MAX - X_MIN)
          const y = Y_MIN + (row / (GRID_Y - 1)) * (Y_MAX - Y_MIN)
          let psiReal
          let psiImag
          let probability

          if (x < BARRIER_X) {
            const inlet = Math.cos(k * (x - X_MIN) - time)
            const verticalEnvelope = Math.exp(-0.08 * y ** 2)

            psiReal = inlet * verticalEnvelope
            psiImag = Math.sin(k * (x - X_MIN) - time) * verticalEnvelope
            probability = 0.12 + 0.3 * verticalEnvelope * (0.5 + 0.5 * inlet)
          } else {
            const r1 = Math.hypot(x - BARRIER_X, y - sourceY1)
            const r2 = Math.hypot(x - BARRIER_X, y - sourceY2)
            const envelope = Math.exp(-spread * (x + 1.8) ** 2)

            psiReal = envelope * (Math.cos(k * r1 - time) / Math.sqrt(r1 + 0.25) + Math.cos(k * r2 - time) / Math.sqrt(r2 + 0.25))
            psiImag = envelope * (Math.sin(k * r1 - time) / Math.sqrt(r1 + 0.25) + Math.sin(k * r2 - time) / Math.sqrt(r2 + 0.25))
            probability = clamp((psiReal ** 2 + psiImag ** 2) * 0.26, 0, 1)
          }

          ctx.fillStyle = probabilityColor(probability, Math.atan2(psiImag, psiReal))
          ctx.fillRect(col * cellW, row * cellH, cellW + 1, cellH + 1)
        }
      }

      drawBarrier(width, height)

      const screenX = width * 0.91
      ctx.fillStyle = 'rgba(255,255,255,0.16)'
      ctx.fillRect(screenX, 0, 3, height)

      for (let row = 0; row < GRID_Y; row += 1) {
        const y = Y_MIN + (row / (GRID_Y - 1)) * (Y_MAX - Y_MIN)
        const x = 3.3
        const r1 = Math.hypot(x - BARRIER_X, y - sourceY1)
        const r2 = Math.hypot(x - BARRIER_X, y - sourceY2)
        const intensity = 0.5 + 0.5 * Math.cos(k * (r1 - r2))
        const bandWidth = 5 + intensity * 28

        ctx.fillStyle = `rgba(255, 215, 120, ${0.16 + intensity * 0.58})`
        ctx.fillRect(screenX, row * cellH, bandWidth, cellH + 1)
      }
      ctx.restore()

      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, width, verticalPadding)
      ctx.fillRect(0, height - verticalPadding, width, verticalPadding)

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
      <canvas ref={canvasRef} className="h-full w-full" aria-label="Double-slit wavefunction probability animation" />
    </div>
  )
}

export default DoubleSlitSimulation
