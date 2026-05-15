"use client"

import { useEffect, useRef } from "react"

interface Dot {
  x: number
  y: number
  baseX: number
  baseY: number
  vx: number
  vy: number
}

interface MagneticDotsProps {
  dotSize?: number
  dotSpacing?: number
  rippleRadius?: number
  rippleStrength?: number
  springStrength?: number
  damping?: number
  dotColor?: string
  className?: string
}

export function MagneticDots({
  dotSize = 1.5,
  dotSpacing = 20,
  rippleRadius = 120,
  rippleStrength = 25,
  springStrength = 0.08,
  damping = 0.85,
  dotColor = "rgba(37, 248, 96, 0.25)",
  className = "",
}: MagneticDotsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<Dot[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      initializeDots()
    }

    const initializeDots = () => {
      const dots: Dot[] = []
      const cols = Math.ceil(canvas.width / dotSpacing) + 1
      const rows = Math.ceil(canvas.height / dotSpacing) + 1

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * dotSpacing
          const y = j * dotSpacing
          dots.push({
            x,
            y,
            baseX: x,
            baseY: y,
            vx: 0,
            vy: 0,
          })
        }
      }

      dotsRef.current = dots
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { 
        x: e.clientX - rect.left, 
        y: e.clientY - rect.top 
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mouseX = mouseRef.current.x
      const mouseY = mouseRef.current.y

      dotsRef.current.forEach((dot) => {
        // Calculate distance from mouse
        const dx = mouseX - dot.x
        const dy = mouseY - dot.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Ripple effect - push dots away from cursor
        if (distance < rippleRadius && distance > 0) {
          const normalizedDistance = distance / rippleRadius
          const force = (1 - normalizedDistance) * rippleStrength
          
          // Push away from cursor
          const pushX = -(dx / distance) * force
          const pushY = -(dy / distance) * force
          
          dot.vx += pushX * 0.1
          dot.vy += pushY * 0.1
        }

        // Spring back to base position
        const springDx = dot.baseX - dot.x
        const springDy = dot.baseY - dot.y
        dot.vx += springDx * springStrength
        dot.vy += springDy * springStrength

        // Apply damping
        dot.vx *= damping
        dot.vy *= damping

        // Update position
        dot.x += dot.vx
        dot.y += dot.vy

        // Draw dot
        ctx.fillStyle = dotColor
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseleave", handleMouseLeave)
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseleave", handleMouseLeave)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [dotSize, dotSpacing, rippleRadius, rippleStrength, springStrength, damping, dotColor])

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" style={{ pointerEvents: "none" }} />
    </div>
  )
}
