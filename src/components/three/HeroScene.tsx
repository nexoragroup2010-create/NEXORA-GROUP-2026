import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

const BLUE = '#1F4E9C'
const GLOW = '#3B7BEA'
const WHITE = '#F5F7FA'

function Planet({ mobile }: { mobile: boolean }) {
  const group = useRef<THREE.Group>(null!)
  const wire = useRef<THREE.Mesh>(null!)
  const inner = useRef<THREE.Mesh>(null!)

  useFrame((state, delta) => {
    wire.current.rotation.y += delta * 0.12
    inner.current.rotation.y -= delta * 0.05
    // reage ao mouse com suavização
    const { x, y } = state.pointer
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -y * 0.35, 3, delta)
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, x * 0.15, 3, delta)
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, x * 0.4, 2, delta)
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, y * 0.25, 2, delta)
  })

  return (
    <group ref={group}>
      {/* núcleo */}
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.55, mobile ? 3 : 6]} />
        <meshStandardMaterial color="#05070D" emissive={BLUE} emissiveIntensity={0.12} roughness={0.55} metalness={0.8} />
      </mesh>
      {/* wireframe externo */}
      <mesh ref={wire}>
        <icosahedronGeometry args={[1.85, mobile ? 2 : 3]} />
        <meshBasicMaterial color={GLOW} wireframe transparent opacity={0.55} />
      </mesh>
      {/* halo */}
      <mesh scale={2.35}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={GLOW} transparent opacity={0.06} side={THREE.BackSide} blending={THREE.AdditiveBlending} />
      </mesh>
      <PointsShell count={mobile ? 500 : 1400} radius={1.88} />
      <Ring radius={2.7} tilt={[1.2, 0.2, 0]} speed={0.25} color={GLOW} satellites={3} />
      <Ring radius={3.3} tilt={[1.6, -0.5, 0.3]} speed={-0.18} color={BLUE} satellites={2} />
      {!mobile && <Ring radius={3.9} tilt={[1.05, 0.7, -0.2]} speed={0.12} color={WHITE} satellites={1} opacity={0.25} />}
    </group>
  )
}

/** Pontos distribuídos na superfície da esfera (efeito "cidades/dados"). */
function PointsShell({ count, radius }: { count: number; radius: number }) {
  const ref = useRef<THREE.Points>(null!)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // distribuição de Fibonacci
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      arr[i * 3] = radius * Math.cos(theta) * Math.sin(phi)
      arr[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi)
      arr[i * 3 + 2] = radius * Math.cos(phi)
    }
    return arr
  }, [count, radius])
  useFrame((_, d) => (ref.current.rotation.y += d * 0.12))
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={WHITE} size={0.025} sizeAttenuation transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  )
}

function Ring({
  radius,
  tilt,
  speed,
  color,
  satellites,
  opacity = 0.5,
}: {
  radius: number
  tilt: [number, number, number]
  speed: number
  color: string
  satellites: number
  opacity?: number
}) {
  const ref = useRef<THREE.Group>(null!)
  useFrame((_, d) => (ref.current.rotation.z += d * speed))
  return (
    <group rotation={tilt}>
      <group ref={ref}>
        <mesh>
          <torusGeometry args={[radius, 0.006, 8, 200]} />
          <meshBasicMaterial color={color} transparent opacity={opacity} />
        </mesh>
        {Array.from({ length: satellites }).map((_, i) => {
          const a = (i / satellites) * Math.PI * 2
          return (
            <mesh key={i} position={[Math.cos(a) * radius, Math.sin(a) * radius, 0]}>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshBasicMaterial color={WHITE} />
              <pointLight color={GLOW} intensity={0.6} distance={1.5} />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}

function StarField({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null!)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 18
      const t = Math.random() * Math.PI * 2
      const p = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(p) * Math.cos(t)
      arr[i * 3 + 1] = r * Math.sin(p) * Math.sin(t)
      arr[i * 3 + 2] = r * Math.cos(p)
    }
    return arr
  }, [count])
  useFrame((state, d) => {
    ref.current.rotation.y += d * 0.01
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, state.pointer.y * 0.05, 1, d)
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={GLOW} size={0.05} sizeAttenuation transparent opacity={0.7} depthWrite={false} />
    </points>
  )
}

export default function HeroScene({ mobile, active }: { mobile: boolean; active: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, mobile ? 10 : 8], fov: 45 }}
      dpr={mobile ? [1, 1.25] : [1, 1.75]}
      gl={{ antialias: !mobile, alpha: true, powerPreference: 'high-performance' }}
      frameloop={active ? 'always' : 'never'}
      eventSource={document.body}
      eventPrefix="client"
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={18} color={GLOW} />
      <pointLight position={[-6, -3, -4]} intensity={12} color={BLUE} />
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
        <Planet mobile={mobile} />
      </Float>
      <StarField count={mobile ? 400 : 1500} />
      {!mobile && <Sparkles count={60} scale={9} size={2} speed={0.3} color={GLOW} opacity={0.6} />}
    </Canvas>
  )
}
