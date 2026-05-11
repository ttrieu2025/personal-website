import { useEffect, useRef, useState } from 'react'

const API_URL =
  import.meta.env.VITE_WAVE_API_URL ||
  'https://backend-personal-website.up.railway.app'

const X_MIN = -36
const X_MAX = 36

const Y_FLOOR = -1.55
const Y_TOP = 1.65

const Z_FLOOR = -1.15
const Z_BACK = 1.65

const X_SIDE = X_MIN
const MAX_FRAME = 700

const WORLD_SCALE = 1

// ─── Cached projector (recreated only on resize) ──────────────────────────────

const createProjector = (width, height) => {
  const padding = width * 0.12
  const usableWidth = width - padding * 2
  const scaleX = (usableWidth / (X_MAX - X_MIN)) * WORLD_SCALE
  const scaleY = Math.min(width, height) * 0.1 * WORLD_SCALE
  const originX = padding
  const originY = height * 0.56

  return (x, y, z) => ({
    x: originX + (x - X_MIN) * scaleX - z * scaleY * 0.5,
    y: originY - y * scaleY + z * scaleY * 0.28,
  })
}

// ─── Drawing helpers ──────────────────────────────────────────────────────────

const drawLine = (ctx, points, color, width = 2, alpha = 1) => {
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

const drawBoxEdge = (ctx, project, start, end, color, alpha) => {
  drawLine(
    ctx,
    [
      project(start[0], start[1], start[2]),
      project(end[0], end[1], end[2]),
    ],
    color,
    1,
    alpha,
  )
}

// ─── Scene renderer (accepts pre-built projector and pre-allocated buffers) ───

const drawScene = (ctx, canvas, waveData, project, buffers) => {
  const width = canvas.clientWidth
  const height = canvas.clientHeight

  const { x, real, imag, envelope, probability, center } = waveData

  ctx.clearRect(0, 0, width, height)

  // Background — gradient is passed in (cached outside)
  ctx.fillStyle = buffers.gradient
  ctx.fillRect(0, 0, width, height)

  // Prism edges — top rectangle
  drawBoxEdge(ctx, project, [X_MIN, Y_TOP, Z_FLOOR], [X_MAX, Y_TOP, Z_FLOOR], '#3ee7ff', 0.16)
  drawBoxEdge(ctx, project, [X_MIN, Y_TOP, Z_BACK], [X_MAX, Y_TOP, Z_BACK], '#3ee7ff', 0.16)
  drawBoxEdge(ctx, project, [X_MIN, Y_TOP, Z_FLOOR], [X_MIN, Y_TOP, Z_BACK], '#3ee7ff', 0.16)
  drawBoxEdge(ctx, project, [X_MAX, Y_TOP, Z_FLOOR], [X_MAX, Y_TOP, Z_BACK], '#3ee7ff', 0.16)

  // bottom edges
  drawBoxEdge(ctx, project, [X_MIN, Y_FLOOR, Z_FLOOR], [X_MAX, Y_FLOOR, Z_FLOOR], '#ffd44d', 0.2)
  drawBoxEdge(ctx, project, [X_MIN, Y_FLOOR, Z_FLOOR], [X_MIN, Y_TOP, Z_FLOOR], '#ffd44d', 0.18)
  drawBoxEdge(ctx, project, [X_MAX, Y_FLOOR, Z_FLOOR], [X_MAX, Y_TOP, Z_FLOOR], '#ffd44d', 0.18)

  // side depth edges
  drawBoxEdge(ctx, project, [X_SIDE, Y_FLOOR, Z_FLOOR], [X_SIDE, Y_FLOOR, Z_BACK], '#e85dff', 0.2)
  drawBoxEdge(ctx, project, [X_SIDE, Y_TOP, Z_FLOOR], [X_SIDE, Y_TOP, Z_BACK], '#e85dff', 0.2)

  // ── Reuse pre-allocated point buffers ──
  const {
    axis,
    packet,
    topProjection,
    floorProjection,
    sideProjection,
    envelopeYTop,
    envelopeYBottom,
    envelopeZTop,
    envelopeZBottom,
  } = buffers

  axis.length = 0
  packet.length = 0
  topProjection.length = 0
  floorProjection.length = 0
  sideProjection.length = 0
  envelopeYTop.length = 0
  envelopeYBottom.length = 0
  envelopeZTop.length = 0
  envelopeZBottom.length = 0

  const length = x.length

  for (let i = 0; i < length; i += 1) {
    const value = x[i]

    axis.push(project(value, 0, 0))
    packet.push(project(value, real[i], imag[i]))
    topProjection.push(project(value, Y_TOP, imag[i]))
    floorProjection.push(project(value, Y_FLOOR - 0.4, -probability[i] * 1.8))
    envelopeYTop.push(project(value, envelope[i], 0))
    envelopeYBottom.push(project(value, -envelope[i], 0))
    envelopeZTop.push(project(value, 0, envelope[i]))
    envelopeZBottom.push(project(value, 0, -envelope[i]))

    if (envelope[i] > 0.06) {
      sideProjection.push(project(X_SIDE, real[i], imag[i]))
    }
  }

  // Motion vector
  const motion = [project(center, 0, 0), project(center + 3.5, 0, 0)]

  // ── Draw all layers ──

  drawLine(ctx, axis, 'rgba(255,255,255,0.18)', 1.2)
  drawLine(ctx, envelopeYTop, '#3ee7ff', 0.9, 0.16)
  drawLine(ctx, envelopeYBottom, '#3ee7ff', 0.9, 0.16)
  drawLine(ctx, envelopeZTop, '#e85dff', 0.9, 0.14)
  drawLine(ctx, envelopeZBottom, '#e85dff', 0.9, 0.14)

  // Purple top graph
  drawLine(ctx, topProjection, '#e85dff', 1.9, 0.76)

  // Yellow bottom graph
  drawLine(ctx, floorProjection, '#ffd44d', 2, 0.9)

  // Cyan side graph
  drawLine(ctx, sideProjection, '#3ee7ff', 1.9, 0.78)

  // Main packet glow
  drawLine(ctx, packet, 'rgba(255,255,255,0.32)', 3, 0.12)

  // Main packet
  drawLine(ctx, packet, '#3ee7ff', 2.2, 0.96)

  // Motion arrow
  drawLine(ctx, motion, '#ffffff', 1.8, 0.58)
}

// ─── Component ────────────────────────────────────────────────────────────────

const QmPacketSimulation = () => {
  const canvasRef = useRef(null)
  const latestDataRef = useRef(null)
  const frameBufferRef = useRef([])        // prefetch buffer
  const projectorRef = useRef(null)        // cached projector
  const buffersRef = useRef({              // pre-allocated point arrays + gradient
    axis: [],
    packet: [],
    topProjection: [],
    floorProjection: [],
    sideProjection: [],
    envelopeYTop: [],
    envelopeYBottom: [],
    envelopeZTop: [],
    envelopeZBottom: [],
    gradient: null,
  })

  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d', { alpha: false })

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
      grad.addColorStop(1, '#16061a')
      buffersRef.current.gradient = grad

      if (latestDataRef.current) {
        drawScene(ctx, canvas, latestDataRef.current, projectorRef.current, buffersRef.current)
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
          const response = await fetch(`${API_URL}/qm-wave?frame=${frame}`, {
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
        drawScene(
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
      resizeTimeout = setTimeout(resizeCanvas, 80)
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
        aria-label="API-rendered quantum wave packet simulation"
      />

      {status !== 'ready' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 px-5 text-center text-sm font-semibold text-gray-300">
          {status === 'loading'
            ? 'Loading Gaussian wave packetsimulation...'
            : 'Error! Please report to the website owner.'}
        </div>
      )}
    </div>
  )
}

export default QmPacketSimulation