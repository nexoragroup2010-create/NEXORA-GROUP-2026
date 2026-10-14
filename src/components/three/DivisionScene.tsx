import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Edges, Float } from '@react-three/drei'
import * as THREE from 'three'
import type { DivisionKind } from '../../lib/data'

const GLOW = '#3B7BEA'
const BLUE = '#1F4E9C'
const WHITE = '#F5F7FA'
const CARD = '#0D111A'
const layers = [3, 5, 5, 3]

/** Rede neural: camadas de nós conectados com sinais pulsando. */
function NeuralNet() {
  const ref = useRef<THREE.Group>(null!)
  const { nodes, lines } = useMemo(() => {
    const nodes: THREE.Vector3[][] = layers.map((n, li) =>
      Array.from({ length: n }, (_, i) => new THREE.Vector3((li - 1.5) * 0.9, (i - (n - 1) / 2) * 0.48, 0)),
    )
    const pts: number[] = []
    for (let l = 0; l < nodes.length - 1; l++)
      for (const a of nodes[l]) for (const b of nodes[l + 1]) pts.push(a.x, a.y, a.z, b.x, b.y, b.z)
    return { nodes, lines: new Float32Array(pts) }
  }, [])
  const layerOf = useMemo(() => layers.flatMap((n, li) => Array<number>(n).fill(li)), [])
  const mats = useRef<THREE.MeshBasicMaterial[]>([])
  useFrame((s) => {
    ref.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.5) * 0.6
    mats.current.forEach((m, i) => {
      m.color.set(Math.sin(s.clock.elapsedTime * 3 - layerOf[i] * 1.2) > 0.6 ? WHITE : GLOW)
    })
  })
  return (
    <group ref={ref}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={GLOW} transparent opacity={0.25} />
      </lineSegments>
      {nodes.flat().map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial ref={(m) => { if (m) mats.current[i] = m }} color={GLOW} />
        </mesh>
      ))}
    </group>
  )
}

/** Painel solar inclinado com sol brilhando. */
function SolarPanel() {
  const ref = useRef<THREE.Group>(null!)
  const sun = useRef<THREE.Mesh>(null!)
  useFrame((s) => {
    ref.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.4) * 0.5
    const k = 1 + Math.sin(s.clock.elapsedTime * 2) * 0.08
    sun.current.scale.setScalar(k)
  })
  const cells = []
  for (let x = 0; x < 4; x++)
    for (let y = 0; y < 3; y++)
      cells.push(
        <mesh key={`${x}-${y}`} position={[(x - 1.5) * 0.46, 0.06, (y - 1) * 0.46]}>
          <boxGeometry args={[0.42, 0.03, 0.42]} />
          <meshStandardMaterial color={BLUE} emissive={BLUE} emissiveIntensity={0.4} metalness={0.9} roughness={0.2} />
          <Edges color={GLOW} />
        </mesh>,
      )
  return (
    <group>
      <mesh ref={sun} position={[1.1, 1.1, -0.6]}>
        <sphereGeometry args={[0.26, 32, 32]} />
        <meshBasicMaterial color={WHITE} />
        <pointLight color={GLOW} intensity={8} distance={6} />
      </mesh>
      <group ref={ref} position={[0, -0.35, 0]}>
        <group rotation={[0.6, 0, 0]}>
          <mesh>
            <boxGeometry args={[1.95, 0.06, 1.45]} />
            <meshStandardMaterial color={CARD} metalness={0.6} roughness={0.4} />
          </mesh>
          {cells}
        </group>
        <mesh position={[0, -0.45, 0.2]}>
          <cylinderGeometry args={[0.04, 0.04, 0.8]} />
          <meshStandardMaterial color={BLUE} />
        </mesh>
      </group>
    </group>
  )
}

/** Rack de servidores com LEDs piscando. */
function ServerRack() {
  const ref = useRef<THREE.Group>(null!)
  const leds = useRef<THREE.MeshBasicMaterial[]>([])
  useFrame((s) => {
    ref.current.rotation.y = -0.6 + Math.sin(s.clock.elapsedTime * 0.5) * 0.35
    leds.current.forEach((m, i) => {
      m.opacity = Math.sin(s.clock.elapsedTime * (3 + (i % 4)) + i * 1.7) > 0 ? 1 : 0.15
    })
  })
  const units = 6
  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[1.2, 2.1, 1]} />
        <meshStandardMaterial color={CARD} metalness={0.7} roughness={0.35} transparent opacity={0.9} />
        <Edges color={GLOW} />
      </mesh>
      {Array.from({ length: units }).map((_, i) => (
        <group key={i} position={[0, 0.85 - i * 0.34, 0.51]}>
          <mesh>
            <planeGeometry args={[1.02, 0.26]} />
            <meshStandardMaterial color={BLUE} emissive={BLUE} emissiveIntensity={0.3} />
          </mesh>
          {[0, 1, 2].map((j) => {
            const idx = i * 3 + j
            return (
              <mesh key={j} position={[0.32 + j * 0.08, 0, 0.01]}>
                <circleGeometry args={[0.025, 12]} />
                <meshBasicMaterial ref={(m) => { if (m) leds.current[idx] = m }} color={j === 2 ? WHITE : GLOW} transparent />
              </mesh>
            )
          })}
          <mesh position={[-0.2, 0, 0.01]}>
            <planeGeometry args={[0.5, 0.03]} />
            <meshBasicMaterial color={GLOW} transparent opacity={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/** Skyline de prédios com janelas acesas. */
function City() {
  const ref = useRef<THREE.Group>(null!)
  const buildings = useMemo(() => {
    const arr: { x: number; z: number; h: number; w: number }[] = []
    for (let x = -2; x <= 2; x++)
      for (let z = -2; z <= 2; z++) {
        if (Math.abs(x) + Math.abs(z) > 3) continue
        const center = 1 - (Math.abs(x) + Math.abs(z)) / 4
        arr.push({ x: x * 0.42, z: z * 0.42, h: 0.3 + center * 1.6 * (0.6 + Math.random() * 0.6), w: 0.3 })
      }
    return arr
  }, [])
  useFrame((_, d) => (ref.current.rotation.y += d * 0.3))
  return (
    <group ref={ref} position={[0, -0.7, 0]} rotation={[0.2, 0, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.6, 48]} />
        <meshBasicMaterial color={BLUE} transparent opacity={0.25} />
      </mesh>
      <gridHelper args={[3, 12, GLOW, BLUE]} position={[0, 0.002, 0]} />
      {buildings.map((b, i) => (
        <mesh key={i} position={[b.x, b.h / 2, b.z]}>
          <boxGeometry args={[b.w, b.h, b.w]} />
          <meshStandardMaterial color={CARD} emissive={BLUE} emissiveIntensity={0.25} metalness={0.5} roughness={0.4} />
          <Edges color={i % 3 === 0 ? WHITE : GLOW} />
        </mesh>
      ))}
    </group>
  )
}

const OBJECTS: Record<DivisionKind, () => JSX.Element> = {
  ai: NeuralNet,
  energy: SolarPanel,
  cloud: ServerRack,
  cities: City,
}

export default function DivisionScene({ kind, active }: { kind: DivisionKind; active: boolean }) {
  const Obj = OBJECTS[kind]
  return (
    <Canvas
      camera={{ position: [0, 0.3, 4.2], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      frameloop={active ? 'always' : 'never'}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} intensity={20} color={GLOW} />
      <pointLight position={[-3, -1, 2]} intensity={10} color={WHITE} />
      <Float speed={2} rotationIntensity={0.15} floatIntensity={0.5}>
        <Obj />
      </Float>
    </Canvas>
  )
}
