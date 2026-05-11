import { useEffect, useRef, useState } from 'react'

const API_URL =
  import.meta.env.VITE_WAVE_API_URL ||
  'https://backend-personal-website.up.railway.app'

const MAX_FRAME = 700

const NUM_POINTS = 900
const WAVE_LENGTH = 4 * Math.PI

// ─── Cached projector (recreated only on resize) ──────────────────────────────

const createProjector = (width, height) => {
  const scaleX = width / WAVE_LENGTH
  const scaleY = Math.min(width, height) * 0.22
  const originX = 0
  const originY = height * 0.56

  return (x, y, z) => ({
    x: originX + x * scaleX - z * scaleY * 0.56,
    y: originY - y * scaleY + z * scaleY * 0.28,
  })
}

// ─── Drawing helpers ──────────────────────────────────────────────────────────

const drawLine = (ctx, points, color, width = 3, alpha = 1) => {
  if (points.length < 2) return

  ctx.save()
  ctx.globalAlpha = alpha
  ctx.beginPath()
  ctx.moveTo(points[0].x, points[0].y)

  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y)
  }

  ctx.strokeStyle = color
  ctx.lineWidth = width
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.stroke()
  ctx.restore()
}

const drawArrow = (ctx, from, to, color, label) => {
  const angle = Math.atan2(to.y - from.y, to.x - from.x)
  const head = 10

  ctx.save()
  ctx.strokeStyle = color
  ctx.fillStyle = color
  ctx.lineWidth = 3
  ctx.lineCap = 'round'

  ctx.beginPath()
  ctx.moveTo(from.x, from.y)
  ctx.lineTo(to.x, to.y)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(to.x, to.y)
  ctx.lineTo(
    to.x - head * Math.cos(angle - Math.PI / 6),
    to.y - head * Math.sin(angle - Math.PI / 6),
  )
  ctx.lineTo(
    to.x - head * Math.cos(angle + Math.PI / 6),
    to.y - head * Math.sin(angle + Math.PI / 6),
  )
  ctx.closePath()
  ctx.fill()

  ctx.font = '700 14px Inter, ui-sans-serif, system-ui'
  ctx.fillText(label, to.x + 10, to.y - 8)
  ctx.restore()
}

// ─── Scene renderer (accepts pre-built projector and pre-allocated buffers) ───

const renderScene = (ctx, canvas, data, project, buffers) => {
  const width = canvas.clientWidth
  const height = canvas.clientHeight

  const { x, electric, magnetic, x0, ey, bz, sx } = data

  // Reuse pre-allocated point arrays
  const { axis, electricPoints, magneticPoints, gradient } = buffers

  axis.length = 0
  electricPoints.length = 0
  magneticPoints.length = 0

  for (let i = 0; i < x.length; i++) {
    axis.push(project(x[i], 0, 0))
    electricPoints.push(project(x[i], electric[i], 0))
    magneticPoints.push(project(x[i], 0, magnetic[i]))
  }

  ctx.clearRect(0, 0, width, height)

  // Background — gradient cached outside
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  // Grid lines
  for (let i = 0; i < 18; i++) {
    const gx = (i / 17) * WAVE_LENGTH
    const yTop = project(gx, 1.15, 0)
    const yBottom = project(gx, -1.15, 0)
    const zFront = project(gx, 0, -1.15)
    const zBack = project(gx, 0, 1.15)

    drawLine(ctx, [yBottom, yTop], 'rgba(62,231,255,0.16)', 1.5, 0.45)
    drawLine(ctx, [zFront, zBack], 'rgba(232,93,255,0.14)', 1.5, 0.42)
  }

  // Main axis
  drawLine(ctx, axis, 'rgba(255,255,255,0.22)', 1.4)

  // Magnetic wave glow
  drawLine(ctx, magneticPoints, 'rgba(232,93,255,0.35)', 5, 0.12)

  // Electric wave glow
  drawLine(ctx, electricPoints, 'rgba(62,231,255,0.35)', 5, 0.12)

  // Magnetic wave
  drawLine(ctx, magneticPoints, '#e85dff', 2.6, 0.95)

  // Electric wave
  drawLine(ctx, electricPoints, '#3ee7ff', 2.6, 0.95)

  const origin = project(x0, 0, 0)
  const electricTip = project(x0, ey, 0)
  const magneticTip = project(x0, 0, bz)
  const poyntingTip = project(x0 + sx * 0.95, 0, 0)

  drawArrow(ctx, origin, electricTip, '#3ee7ff', 'E')
  drawArrow(ctx, origin, magneticTip, '#e85dff', 'B')
  drawArrow(ctx, origin, poyntingTip, '#ffd44d', 'S')
}

// ─── Component ────────────────────────────────────────────────────────────────

const WaveSimulation = () => {
  const canvasRef = useRef(null)
  const latestDataRef = useRef(null)
  const frameBufferRef = useRef([])       // prefetch buffer
  const projectorRef = useRef(null)       // cached projector
  const buffersRef = useRef({             // pre-allocated point arrays + gradient
    axis: [],
    electricPoints: [],
    magneticPoints: [],
    gradient: null,
  })

  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d')

    let frame = 0
    let animationId
    let stopped = false

    const BUFFER_SIZE = 3
    const controller = new AbortController()

    // ── Rebuild projector + gradient only on resize ──
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.max(1, Math.floor(rect.width * pixelRatio))
      canvas.height = Math.max(1, Math.floor(rect.height * pixelRatio))

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

      const w = canvas.clientWidth
      const h = canvas.clientHeight

      // Rebuild cached projector
      projectorRef.current = createProjector(w, h)

      // Rebuild cached gradient
      const grad = ctx.createLinearGradient(0, 0, w, h)
      grad.addColorStop(0, '#030712')
      grad.addColorStop(0.55, '#050505')
      grad.addColorStop(1, '#120816')
      buffersRef.current.gradient = grad

      if (latestDataRef.current) {
        renderScene(ctx, canvas, latestDataRef.current, projectorRef.current, buffersRef.current)
      }
    }

    // ── Fetch loop: runs independently from animation, fills buffer ──
    const fetchLoop = async () => {
      while (!stopped) {
        // Only fetch if buffer has room
        if (frameBufferRef.current.length >= BUFFER_SIZE) {
          await new Promise((r) => setTimeout(r, 16))
          continue
        }

        try {
          const response = await fetch(`${API_URL}/em-wave?frame=${frame}`, {
            signal: controller.signal,
          })

          if (!response.ok) throw new Error(`Wave API returned ${response.status}`)

          const data = await response.json()
          frameBufferRef.current.push(data)
          setStatus('ready')

          frame = frame >= MAX_FRAME ? 0 : frame + 4
        } catch (error) {
          if (error.name !== 'AbortError') {
            setStatus('offline')
            console.error(error)
            // Back off before retrying
            await new Promise((r) => setTimeout(r, 2000))
          }
        }
      }
    }

    // ── Animation loop: only draws, consumes from buffer ──
    const animate = () => {
      if (stopped) return

      // Consume next buffered frame if available
      if (frameBufferRef.current.length > 0) {
        latestDataRef.current = frameBufferRef.current.shift()
      }

      if (latestDataRef.current && projectorRef.current) {
        renderScene(
          ctx,
          canvas,
          latestDataRef.current,
          projectorRef.current,
          buffersRef.current,
        )
      }

      animationId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    fetchLoop()
    animationId = requestAnimationFrame(animate)

    let resizeTimeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeCanvas, 100)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      stopped = true
      controller.abort()
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="relative h-[240px] w-full overflow-hidden rounded-2xl border border-white/10 bg-black sm:h-[300px]">
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        aria-label="Electromagnetic wave animation"
      />

      {status !== 'ready' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 px-5 text-center text-sm font-semibold text-gray-300">
          {status === 'loading'
            ? 'Loading EM wave simulation...'
            : 'Start the Python API on port 8000 to display the simulation.'}
        </div>
      )}
    </div>
  )
}

export default WaveSimulation