import { useEffect, useRef } from 'react'

export default function BlueprintCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas && canvas.getContext ? canvas.getContext('2d') : null
    if (!canvas || !context) {
      return undefined
    }

    const root = document.documentElement
    let frame = 0
    let resizeObserver = null

    const readVar = (name, fallback) => {
      const value = window.getComputedStyle(root).getPropertyValue(name)
      return value && value.trim() ? value.trim() : fallback
    }

    const crosshair = (x, y, size, color, alpha) => {
      const cx = Math.round(x) + 0.5
      const cy = Math.round(y) + 0.5
      context.save()
      context.globalAlpha = alpha
      context.strokeStyle = color
      context.lineWidth = 1
      context.beginPath()
      context.moveTo(cx, cy - size)
      context.lineTo(cx, cy + size)
      context.moveTo(cx - size, cy)
      context.lineTo(cx + size, cy)
      context.stroke()
      context.restore()
    }

    const ring = (x, y, radius, color, alpha) => {
      context.save()
      context.globalAlpha = alpha
      context.strokeStyle = color
      context.lineWidth = 1
      context.beginPath()
      context.arc(Math.round(x) + 0.5, Math.round(y) + 0.5, radius, 0, Math.PI * 2)
      context.stroke()
      context.restore()
    }

    const drawGrid = (width, height, major, minor, rule, faint) => {
      const drawLines = (step, color) => {
        let offset
        context.strokeStyle = color
        context.beginPath()
        for (offset = step; offset < width; offset += step) {
          const x = Math.round(offset) + 0.5
          context.moveTo(x, 0)
          context.lineTo(x, height)
        }
        for (offset = step; offset < height; offset += step) {
          const y = Math.round(offset) + 0.5
          context.moveTo(0, y)
          context.lineTo(width, y)
        }
        context.stroke()
      }

      context.save()
      context.lineWidth = 1
      drawLines(minor, faint)
      drawLines(major, rule)
      context.restore()
    }

    const draw = () => {
      frame = 0
      const rect = canvas.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      if (!width || !height) {
        return
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const pixelWidth = Math.round(width * dpr)
      const pixelHeight = Math.round(height * dpr)
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth
        canvas.height = pixelHeight
      }

      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.clearRect(0, 0, width, height)

      const copper = readVar('--sienna', '#E06D44')
      const teal = readVar('--teal', '#2BB69B')
      const rule = readVar('--rule-major', 'rgba(38, 49, 61, 0.9)')
      const faint = readVar('--rule-faint', 'rgba(38, 49, 61, 0.5)')
      const rootStyle = window.getComputedStyle(root)
      const baseSize = Number.parseFloat(rootStyle.fontSize) || 16
      const major = baseSize * 6
      const minor = baseSize * 1.5

      drawGrid(width, height, major, minor, rule, faint)

      context.save()
      context.globalAlpha = 0.5
      context.strokeStyle = faint
      context.lineWidth = 1
      context.setLineDash([2, 6])
      const axisX = Math.round(width / 2) + 0.5
      const axisY = Math.round(height / 2) + 0.5
      context.beginPath()
      context.moveTo(axisX, 0)
      context.lineTo(axisX, height)
      context.moveTo(0, axisY)
      context.lineTo(width, axisY)
      context.stroke()
      context.restore()

      let x
      let y
      for (x = major; x < width; x += major) {
        for (y = major; y < height; y += major) {
          crosshair(x, y, 4, rule, 0.45)
        }
      }

      const cornerInset = Math.min(major, Math.max(minor * 2, 48))
      const nodes = [
        { x: cornerInset, y: cornerInset, color: copper },
        { x: width - cornerInset, y: cornerInset, color: teal },
        { x: cornerInset, y: height - cornerInset, color: teal },
        { x: width - cornerInset, y: height - cornerInset, color: copper },
      ]

      nodes.forEach((node) => {
        crosshair(node.x, node.y, 11, node.color, 0.6)
        ring(node.x, node.y, 4, node.color, 0.6)
      })

      canvas.classList.add('is-rendered')
    }

    const scheduleDraw = () => {
      if (frame) {
        window.cancelAnimationFrame(frame)
      }
      frame = window.requestAnimationFrame(draw)
    }

    window.addEventListener('resize', scheduleDraw, { passive: true })
    document.addEventListener('portfolio:themechange', scheduleDraw)

    if (window.ResizeObserver) {
      resizeObserver = new window.ResizeObserver(scheduleDraw)
      resizeObserver.observe(canvas)
    }

    if (document.fonts && document.fonts.ready && document.fonts.ready.then) {
      document.fonts.ready.then(scheduleDraw).catch(() => {})
    }

    scheduleDraw()

    return () => {
      window.removeEventListener('resize', scheduleDraw)
      document.removeEventListener('portfolio:themechange', scheduleDraw)
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
      if (frame) {
        window.cancelAnimationFrame(frame)
      }
    }
  }, [])

  return <canvas id="blueprint-canvas" aria-hidden="true" />
}
