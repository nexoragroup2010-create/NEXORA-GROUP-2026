import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const GLOW = '#3B7BEA'
const BLUE = '#1F4E9C'
const WHITE = '#F5F7FA'

function Constellation({ count, maxDist }: { count: number; maxDist: number }) {
  const group = useRef<THREE.Group>(null!)
  const pulses = useRef<THREE.InstancedMesh>(null!)
  const nodesRef = useRef<THREE.Points>(null!)

  const { nodes, linePositions, edges } = useMemo(() => {
    const nodes: THREE.Vector3[] = []
    for (let i = 0; i < count; i++) {
      // distribuição em elipsoide, mais densa no centro
      const r = Math.cbrt(Math.random()) * 4
      const t = Math.random() * Math.PI * 2
      const p = Math.acos(2 * Math.random() - 1)
      nodes.push(new THREE.Vector3(r * Math.sin(p) * Math.cos(t) * 1.25, r * Math.sin(p) * Math.sin(t) * 0.9, r * Math.cos(p)))
    }
    const edges: [number, number][] = []
    for (let i = 0; i < count; i++) {
      let links = 0
      for (let j = i + 1; j < count && links < 4; j++) {
        if (nodes[i].distanceTo(nodes[j]) < maxDist) {
          edges.push([i, j])
          links++
        }
      }
    }
    const linePositions = new Float32Array(edges.length * 6)
    edges.forEach(([a, b], k) => {
      nodes[a].toArray(linePositions, k * 6)
      nodes[b].toArray(linePositions, k * 6 + 3)
    })
    return { nodes, linePositions, edges }
  }, [count, maxDist])

  const nodePositions = useMemo(() => {
    const arr = new Float32Array(nodes.length * 3)
    nodes.forEach((n, i) => n.toArray(arr, i * 3))
    return arr
  }, [nodes])

  // pulsos de dados percorrendo arestas aleatórias
  const PULSES = Math.min(40, edges.length)
  const pulseState = useMemo(
    () =>
      Array.from({ length: PULSES }, () => ({
        edge: Math.floor(Math.random() * edges.length),
        t: Math.random(),
        speed: 0.25 + Math.random() * 0.5,
      })),
    [PULSES, edges.length],
  )
  const tmp = useMemo(() => new THREE.Object3D(), [])
  const v = useMemo(() => new THREE.Vector3(), [])

  useFrame((state, delta) => {
    const g = group.current
    g.rotation.y += delta * 0.06
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, state.pointer.y * 0.3, 2, delta)
    g.position.x = THREE.MathUtils.damp(g.position.x, state.pointer.x * 0.5, 2, delta)
    const mat = nodesRef.current.material as THREE.PointsMaterial
    mat.size = 0.09 + Math.sin(state.clock.elapsedTime * 2) * 0.015

    pulseState.forEach((p, i) => {
      p.t += delta * p.speed
      if (p.t > 1) {
        p.t = 0
        p.edge = Math.floor(Math.random() * edges.length)
      }
      const [a, b] = edges[p.edge]
      v.lerpVectors(nodes[a], nodes[b], p.t)
      tmp.position.copy(v)
      tmp.scale.setScalar(Math.sin(p.t * Math.PI))
      tmp.updateMatrix()
      pulses.current.setMatrixAt(i, tmp.matrix)
    })
    pulses.current.instanceMatrix.needsUpdate = true
  })

  return (
    <group ref={group}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={GLOW} transparent opacity={0.22} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color={GLOW} size={0.09} sizeAttenuation transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
      <instancedMesh ref={pulses} args={[undefined, undefined, PULSES]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color={WHITE} />
      </instancedMesh>
      <mesh>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial color={BLUE} transparent opacity={0.5} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial color={GLOW} transparent opacity={0.08} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  )
}

export default function NetworkScene({ mobile, active }: { mobile: boolean; active: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 50 }}
      dpr={mobile ? [1, 1.25] : [1, 1.75]}
      gl={{ antialias: !mobile, alpha: true }}
      frameloop={active ? 'always' : 'never'}
      eventSource={document.body}
      eventPrefix="client"
    >
      <Constellation count={mobile ? 90 : 220} maxDist={mobile ? 1.8 : 1.5} />
    </Canvas>
  )
}
