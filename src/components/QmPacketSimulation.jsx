import { useEffect, useRef, useState } from 'react'

const API_URL =
  import.meta.env.VITE_WAVE_API_URL ||
  'http://web-production-ff01e.up.railway.app'

const X_MIN = -36
const X_MAX = 36

const Y_FLOOR = -1.55
const Y_TOP = 1.65

const Z_FLOOR = -1.15
const Z_BACK = 1.65

const X_SIDE = X_MIN
const MAX_FRAME = 700

const WORLD_SCALE = 1

const project = (x, y, z, width, height) => {
  const padding = width * 0.12

  const usableWidth = width - padding * 2

  const scaleX =
    (usableWidth / (X_MAX - X_MIN)) *
    WORLD_SCALE

  const scaleY =
    Math.min(width, height) *
    0.1 *
    WORLD_SCALE

  const originX = padding
  const originY = height * 0.56

  return {
    x:
      originX +
      (x - X_MIN) * scaleX -
      z * scaleY * 0.5,

    y:
      originY -
      y * scaleY +
      z * scaleY * 0.28,
  }
}

const drawLine = (
  ctx,
  points,
  color,
  width = 2,
  alpha = 1,
) => {
  if (points.length < 2) return

  ctx.save()
  ctx.globalAlpha = alpha

  ctx.beginPath()

  points.forEach((point, index) => {
    if (index === 0) {
      ctx.moveTo(point.x, point.y)
    } else {
      ctx.lineTo(point.x, point.y)
    }
  })

  ctx.strokeStyle = color
  ctx.lineWidth = width
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  ctx.stroke()
  ctx.restore()
}

const drawBoxEdge = (
  ctx,
  start,
  end,
  color,
  alpha,
  width,
  height,
) => {
  drawLine(
    ctx,
    [
      project(
        start[0],
        start[1],
        start[2],
        width,
        height,
      ),

      project(
        end[0],
        end[1],
        end[2],
        width,
        height,
      ),
    ],
    color,
    1,
    alpha,
  )
}

const drawScene = (ctx, canvas, waveData) => {
  const width = canvas.clientWidth
  const height = canvas.clientHeight

  const {
    x,
    real,
    imag,
    envelope,
    probability,
    center,
  } = waveData

  ctx.clearRect(0, 0, width, height)

  // Background
  const gradient = ctx.createLinearGradient(
    0,
    0,
    width,
    height,
  )

  gradient.addColorStop(0, '#030712')
  gradient.addColorStop(0.55, '#050505')
  gradient.addColorStop(1, '#16061a')

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  // Prism edges

  // top rectangle
  drawBoxEdge(
    ctx,
    [X_MIN, Y_TOP, Z_FLOOR],
    [X_MAX, Y_TOP, Z_FLOOR],
    '#3ee7ff',
    0.2,
    width,
    height,
  )

  drawBoxEdge(
    ctx,
    [X_MIN, Y_TOP, Z_BACK],
    [X_MAX, Y_TOP, Z_BACK],
    '#3ee7ff',
    0.2,
    width,
    height,
  )

  drawBoxEdge(
    ctx,
    [X_MIN, Y_TOP, Z_FLOOR],
    [X_MIN, Y_TOP, Z_BACK],
    '#3ee7ff',
    0.2,
    width,
    height,
  )

  drawBoxEdge(
    ctx,
    [X_MAX, Y_TOP, Z_FLOOR],
    [X_MAX, Y_TOP, Z_BACK],
    '#3ee7ff',
    0.2,
    width,
    height,
  )

  // bottom edges
  drawBoxEdge(
    ctx,
    [X_MIN, Y_FLOOR, Z_FLOOR],
    [X_MAX, Y_FLOOR, Z_FLOOR],
    '#ffd44d',
    0.28,
    width,
    height,
  )

  drawBoxEdge(
    ctx,
    [X_MIN, Y_FLOOR, Z_FLOOR],
    [X_MIN, Y_TOP, Z_FLOOR],
    '#ffd44d',
    0.24,
    width,
    height,
  )

  drawBoxEdge(
    ctx,
    [X_MAX, Y_FLOOR, Z_FLOOR],
    [X_MAX, Y_TOP, Z_FLOOR],
    '#ffd44d',
    0.24,
    width,
    height,
  )

  // side depth edges
  drawBoxEdge(
    ctx,
    [X_SIDE, Y_FLOOR, Z_FLOOR],
    [X_SIDE, Y_FLOOR, Z_BACK],
    '#e85dff',
    0.25,
    width,
    height,
  )

  drawBoxEdge(
    ctx,
    [X_SIDE, Y_TOP, Z_FLOOR],
    [X_SIDE, Y_TOP, Z_BACK],
    '#e85dff',
    0.25,
    width,
    height,
  )

  // Main axis
  const axis = x.map((value) =>
    project(value, 0, 0, width, height),
  )

  // Main 3D wave packet
  const packet = x.map((value, index) =>
    project(
      value,
      real[index],
      imag[index],
      width,
      height,
    ),
  )

  // TOP projection (purple)
  const topProjection = x.map((value, index) =>
    project(
      value,
      Y_TOP,
      imag[index],
      width,
      height,
    ),
  )

  // FLOOR projection (yellow)
const floorProjection = x.map((value, index) =>
  project(
    value,
    Y_FLOOR-0.4,
    -probability[index] * 1.8,
    width,
    height,
  ),
)
  // SIDE projection
  const sideProjection = x
    .map((value, index) => ({
      value,
      index,
    }))
    .filter(
      ({ index }) => envelope[index] > 0.06,
    )
    .map(({ index }) =>
      project(
        X_SIDE,
        real[index],
        imag[index],
        width,
        height,
      ),
    )

  // Envelope guides
  const envelopeYTop = x.map(
    (value, index) =>
      project(
        value,
        envelope[index],
        0,
        width,
        height,
      ),
  )

  const envelopeYBottom = x.map(
    (value, index) =>
      project(
        value,
        -envelope[index],
        0,
        width,
        height,
      ),
  )

  const envelopeZTop = x.map(
    (value, index) =>
      project(
        value,
        0,
        envelope[index],
        width,
        height,
      ),
  )

  const envelopeZBottom = x.map(
    (value, index) =>
      project(
        value,
        0,
        -envelope[index],
        width,
        height,
      ),
  )

  // Motion vector
  const motion = [
    project(center, 0, 0, width, height),

    project(
      center + 3.5,
      0,
      0,
      width,
      height,
    ),
  ]

  // Draw all layers

  drawLine(
    ctx,
    axis,
    'rgba(255,255,255,0.24)',
    1.5,
  )

  drawLine(
    ctx,
    envelopeYTop,
    '#3ee7ff',
    1.2,
    0.28,
  )

  drawLine(
    ctx,
    envelopeYBottom,
    '#3ee7ff',
    1.2,
    0.28,
  )

  drawLine(
    ctx,
    envelopeZTop,
    '#e85dff',
    1.2,
    0.24,
  )

  drawLine(
    ctx,
    envelopeZBottom,
    '#e85dff',
    1.2,
    0.24,
  )

  // Purple top graph
  drawLine(
    ctx,
    topProjection,
    '#e85dff',
    2.2,
    0.82,
  )

  // Yellow bottom graph
  drawLine(
    ctx,
    floorProjection,
    '#ffd44d',
    2.6,
    0.94,
  )

  // Cyan side graph
  drawLine(
    ctx,
    sideProjection,
    '#3ee7ff',
    2.2,
    0.86,
  )

  // Main packet glow
  drawLine(
    ctx,
    packet,
    'rgba(255,255,255,0.42)',
    5,
    0.18,
  )

  // Main packet
  drawLine(
    ctx,
    packet,
    '#3ee7ff',
    2.8,
  )

  // Motion arrow
  drawLine(
    ctx,
    motion,
    2.5,
    0.68,
  )
}

const QmPacketSimulation = () => {
  const canvasRef = useRef(null)

  const latestDataRef = useRef(null)

  const [status, setStatus] =
    useState('loading')

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) return undefined

    const ctx = canvas.getContext('2d')

    let frame = 0
    let animationId

    let stopped = false
    let fetching = false

    const controller =
      new AbortController()

    const resizeCanvas = () => {
      const rect =
        canvas.getBoundingClientRect()

      const pixelRatio =
        window.devicePixelRatio || 1

      canvas.width = Math.max(
        1,
        Math.floor(rect.width * pixelRatio),
      )

      canvas.height = Math.max(
        1,
        Math.floor(rect.height * pixelRatio),
      )

      ctx.setTransform(
        pixelRatio,
        0,
        0,
        pixelRatio,
        0,
        0,
      )

      if (latestDataRef.current) {
        drawScene(
          ctx,
          canvas,
          latestDataRef.current,
        )
      }
    }

    const fetchFrame = async () => {
      if (fetching || stopped) return

      fetching = true

      try {
        const response = await fetch(
          `${API_URL}/qm-wave?frame=${frame}`,
          {
            signal: controller.signal,
          },
        )

        if (!response.ok) {
          throw new Error(
            `Wave API returned ${response.status}`,
          )
        }

        const data = await response.json()

        latestDataRef.current = data

        drawScene(ctx, canvas, data)

        setStatus('ready')

        frame =
          frame >= MAX_FRAME
            ? 0
            : frame + 2
      } catch (error) {
        if (error.name !== 'AbortError') {
          setStatus('offline')
        }
      } finally {
        fetching = false
      }
    }

    const animate = () => {
      fetchFrame()

      animationId =
        window.setTimeout(
          animate,
          33,
        )
    }

    resizeCanvas()
    animate()

    window.addEventListener(
      'resize',
      resizeCanvas,
    )

    return () => {
      stopped = true

      controller.abort()

      window.clearTimeout(animationId)

      window.removeEventListener(
        'resize',
        resizeCanvas,
      )
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
            ? 'Loading wave simulation...'
            : 'Start the Python API on port 8000 to display the simulation.'}
        </div>
      )}
    </div>
  )
}

export default QmPacketSimulation