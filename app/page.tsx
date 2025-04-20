export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold">¡Hola desde mi web con V0!</h1>
    </main>
  );
}
"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function FuturisticDiamond() {
  const [smallInputs, setSmallInputs] = useState(["", "", "", ""])
  const [largeInputs, setLargeInputs] = useState(["", "", "", ""])
  const [centerInput, setCenterInput] = useState("")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Efecto para las partículas mágicas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Ajustar el tamaño del canvas al tamaño del contenedor
    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Crear partículas
    const particles: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      alpha: number
      decreaseRate: number
    }[] = []

    const createParticle = () => {
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const angle = Math.random() * Math.PI * 2
      const distance = 125 + Math.random() * 20 // Distancia desde el centro (tamaño del rombo)

      const x = centerX + Math.cos(angle) * distance
      const y = centerY + Math.sin(angle) * distance

      const colors = ["#FFD700", "#FFA500", "#9370DB", "#8A2BE2", "#00BFFF"]

      particles.push({
        x,
        y,
        size: 1 + Math.random() * 3,
        speedX: (Math.random() - 0.5) * 1.5,
        speedY: (Math.random() - 0.5) * 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.7 + Math.random() * 0.3,
        decreaseRate: 0.005 + Math.random() * 0.01,
      })
    }

    // Animar partículas
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Crear nuevas partículas
      if (particles.length < 100 && Math.random() > 0.9) {
        createParticle()
      }

      // Actualizar y dibujar partículas
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        p.x += p.speedX
        p.y += p.speedY
        p.alpha -= p.decreaseRate

        if (p.alpha <= 0) {
          particles.splice(i, 1)
          i--
          continue
        }

        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  const handleSmallInputChange = (index: number, value: string) => {
    const newInputs = [...smallInputs]
    newInputs[index] = value
    setSmallInputs(newInputs)
  }

  const handleLargeInputChange = (index: number, value: string) => {
    const newInputs = [...largeInputs]
    newInputs[index] = value
    setLargeInputs(newInputs)
  }

  // Distancia desde el centro hasta las puntas del rombo
  const diamondRadius = 125
  // Distancia adicional para asegurar que los cuadros no toquen el rombo
  const offset = 35

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <div className="relative h-[900px] w-[1200px] max-w-full">
        {/* Círculos concéntricos */}
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-gray-500/30"></div>
        <div className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-gray-500/30"></div>
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-gray-500/30"></div>
        <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-gray-500/30"></div>

        {/* Canvas para efectos mágicos */}
        <canvas ref={canvasRef} className="absolute inset-0 z-0 h-full w-full" />

        {/* Yellow Diamond with magical border */}
        <div className="absolute left-1/2 top-1/2 z-10 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-transparent magical-border">
          <div
            className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 transform bg-yellow-400 shadow-[0_0_30px_rgba(234,179,8,0.6)]"
            style={{ transform: "translate(-50%, -50%) rotate(45deg)" }}
          ></div>
        </div>

        {/* Center Purple Input */}
        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform">
          <div className="w-32 rounded-full bg-purple-300 py-2 text-center text-black shadow-[0_0_15px_rgba(147,51,234,0.7)] purple-glow">
            <Input
              className="border-none bg-transparent text-center font-medium text-black placeholder:text-black/50 focus-visible:ring-0"
              placeholder="texto pequeño"
              value={centerInput}
              onChange={(e) => setCenterInput(e.target.value)}
            />
          </div>
        </div>

        {/* Top Small Input - Outside the diamond's top vertex */}
        <div className="absolute left-1/2 top-[calc(50%-160px)] z-20 -translate-x-1/2 transform">
          <div className="w-40 rounded-full bg-yellow-100 py-2 text-center text-black shadow-[0_0_15px_rgba(234,179,8,0.4)]">
            <Input
              className="border-none bg-transparent text-center font-medium text-black placeholder:text-black/50 focus-visible:ring-0"
              placeholder="TEXTO PEQUEÑO"
              value={smallInputs[0]}
              onChange={(e) => handleSmallInputChange(0, e.target.value)}
            />
          </div>
        </div>

        {/* Right Small Input - Outside the diamond's right vertex */}
        <div className="absolute left-[calc(50%+160px)] top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform">
          <div className="w-40 rounded-full bg-yellow-100 py-2 text-center text-black shadow-[0_0_15px_rgba(234,179,8,0.4)]">
            <Input
              className="border-none bg-transparent text-center font-medium text-black placeholder:text-black/50 focus-visible:ring-0"
              placeholder="TEXTO PEQUEÑO"
              value={smallInputs[1]}
              onChange={(e) => handleSmallInputChange(1, e.target.value)}
            />
          </div>
        </div>

        {/* Bottom Small Input - Outside the diamond's bottom vertex */}
        <div className="absolute left-1/2 top-[calc(50%+160px)] z-20 -translate-x-1/2 transform">
          <div className="w-40 rounded-full bg-yellow-100 py-2 text-center text-black shadow-[0_0_15px_rgba(234,179,8,0.4)]">
            <Input
              className="border-none bg-transparent text-center font-medium text-black placeholder:text-black/50 focus-visible:ring-0"
              placeholder="TEXTO PEQUEÑO"
              value={smallInputs[2]}
              onChange={(e) => handleSmallInputChange(2, e.target.value)}
            />
          </div>
        </div>

        {/* Left Small Input - Outside the diamond's left vertex */}
        <div className="absolute left-[calc(50%-160px)] top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform">
          <div className="w-40 rounded-full bg-yellow-100 py-2 text-center text-black shadow-[0_0_15px_rgba(234,179,8,0.4)]">
            <Input
              className="border-none bg-transparent text-center font-medium text-black placeholder:text-black/50 focus-visible:ring-0"
              placeholder="TEXTO PEQUEÑO"
              value={smallInputs[3]}
              onChange={(e) => handleSmallInputChange(3, e.target.value)}
            />
          </div>
        </div>

        {/* Top Large Input */}
        <div className="absolute left-1/2 top-[100px] z-20 -translate-x-1/2 transform">
          <div className="w-64 rounded-3xl bg-yellow-100 p-6 text-center text-xl font-bold text-black shadow-[0_0_15px_rgba(234,179,8,0.4)]">
            <Textarea
              className="min-h-[80px] resize-none border-none bg-transparent p-0 text-center text-xl font-bold text-black placeholder:text-black/50 focus-visible:ring-0"
              placeholder="TEXTO GRANDE"
              value={largeInputs[0]}
              onChange={(e) => handleLargeInputChange(0, e.target.value)}
            />
          </div>
        </div>

        {/* Right Large Input */}
        <div className="absolute right-[100px] top-1/2 z-20 -translate-y-1/2 transform">
          <div className="w-64 rounded-3xl bg-yellow-100 p-6 text-center text-xl font-bold text-black shadow-[0_0_15px_rgba(234,179,8,0.4)]">
            <Textarea
              className="min-h-[80px] resize-none border-none bg-transparent p-0 text-center text-xl font-bold text-black placeholder:text-black/50 focus-visible:ring-0"
              placeholder="TEXTO GRANDE"
              value={largeInputs[1]}
              onChange={(e) => handleLargeInputChange(1, e.target.value)}
            />
          </div>
        </div>

        {/* Bottom Large Input */}
        <div className="absolute bottom-[100px] left-1/2 z-20 -translate-x-1/2 transform">
          <div className="w-64 rounded-3xl bg-yellow-100 p-6 text-center text-xl font-bold text-black shadow-[0_0_15px_rgba(234,179,8,0.4)]">
            <Textarea
              className="min-h-[80px] resize-none border-none bg-transparent p-0 text-center text-xl font-bold text-black placeholder:text-black/50 focus-visible:ring-0"
              placeholder="TEXTO GRANDE"
              value={largeInputs[2]}
              onChange={(e) => handleLargeInputChange(2, e.target.value)}
            />
          </div>
        </div>

        {/* Left Large Input */}
        <div className="absolute left-[100px] top-1/2 z-20 -translate-y-1/2 transform">
          <div className="w-64 rounded-3xl bg-yellow-100 p-6 text-center text-xl font-bold text-black shadow-[0_0_15px_rgba(234,179,8,0.4)]">
            <Textarea
              className="min-h-[80px] resize-none border-none bg-transparent p-0 text-center text-xl font-bold text-black placeholder:text-black/50 focus-visible:ring-0"
              placeholder="TEXTO GRANDE"
              value={largeInputs[3]}
              onChange={(e) => handleLargeInputChange(3, e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
