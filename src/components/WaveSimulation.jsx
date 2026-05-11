import { useEffect, useRef, useState } from 'react'

const API_URL =
  import.meta.env.VITE_WAVE_API_URL ||
  'http://192.168.123.7:8000'

const MAX_FRAME = 700


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
  const [status, setStatus] = useState('loading')

useEffect(() => {
  const canvas = canvasRef.current
  if (!canvas) return undefined

  const ctx = canvas.getContext('2d')

  let frame = 0
  let animationId

  let stopped = false
  let fetching = false

  const controller = new AbortController()

  const resizeCanvas = () => {
    const rect = canvas.getBoundingClientRect()
    const pixelRatio = window.devicePixelRatio || 1

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
  }

  const renderFrame = (data) => {
    const width = canvas.clientWidth
    const height = canvas.clientHeight

    const {
      x,
      electric,
      magnetic,
      x0,
      ey,
      bz,
      sx,
    } = data

    const axis = []
    const electricPoints = []
    const magneticPoints = []

    for (let i = 0; i < x.length; i += 1) {
      axis.push(
        project(x[i], 0, 0, width, height),
      )

      electricPoints.push(
        project(
          x[i],
          electric[i],
          0,
          width,
          height,
        ),
      )

      magneticPoints.push(
        project(
          x[i],
          0,
          magnetic[i],
          width,
          height,
        ),
      )
    }

    ctx.clearRect(0, 0, width, height)

    const gradient =
      ctx.createLinearGradient(
        0,
        0,
        width,
        height,
      )

    gradient.addColorStop(0, '#030712')
    gradient.addColorStop(0.55, '#050505')
    gradient.addColorStop(1, '#120816')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    ctx.globalAlpha = 0.55

    for (let i = 0; i < 18; i += 1) {
      const gx =
        (i / 17) * WAVE_LENGTH

      const yTop = project(
        gx,
        1.15,
        0,
        width,
        height,
      )

      const yBottom = project(
        gx,
        -1.15,
        0,
        width,
        height,
      )

      const zFront = project(
        gx,
        0,
        -1.15,
        width,
        height,
      )

      const zBack = project(
        gx,
        0,
        1.15,
        width,
        height,
      )

      drawLine(
        ctx,
        [yBottom, yTop],
        'rgba(62,231,255,0.18)',
        2,
      )

      drawLine(
        ctx,
        [zFront, zBack],
        'rgba(232,93,255,0.16)',
        2,
      )
    }

    ctx.globalAlpha = 1

    drawLine(
      ctx,
      axis,
      'rgba(255,255,255,0.22)',
      1.5,
    )

    drawLine(
      ctx,
      magneticPoints,
      '#e85dff',
      3,
    )

    drawLine(
      ctx,
      electricPoints,
      '#3ee7ff',
      3,
    )

    const origin = project(
      x0,
      0,
      0,
      width,
      height,
    )

    const electricTip = project(
      x0,
      ey,
      0,
      width,
      height,
    )

    const magneticTip = project(
      x0,
      0,
      bz,
      width,
      height,
    )

    const poyntingTip = project(
      x0 + sx * 0.95,
      0,
      0,
      width,
      height,
    )

    drawArrow(
      ctx,
      origin,
      electricTip,
      '#3ee7ff',
      'E',
    )

    drawArrow(
      ctx,
      origin,
      magneticTip,
      '#e85dff',
      'B',
    )

    drawArrow(
      ctx,
      origin,
      poyntingTip,
      '#ffd44d',
      'S',
    )
  }

  const fetchFrame = async () => {
    if (fetching || stopped) return

    fetching = true

    try {
      const response = await fetch(
        `${API_URL}/em-wave?frame=${frame}`,
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

      renderFrame(data)
      setStatus('ready')

      frame =
        frame >= MAX_FRAME
          ? 0
          : frame + 2
    } catch (error) {
      if (error.name !== 'AbortError') {
        setStatus('offline')
        console.error(error)
      }
    } finally {
      fetching = false
    }
  }

  const animate = () => {
    fetchFrame()

    animationId = window.setTimeout(
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
      <canvas ref={canvasRef} className="h-full w-full" aria-label="Electromagnetic wave animation" />
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
