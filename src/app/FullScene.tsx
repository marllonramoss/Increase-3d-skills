import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { EffectComposer, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

export function FullScene() {
  return (
    <Canvas 
    gl={{ alpha: false }}
      camera={{ fov: 75, position: [0, 0, 5] }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh' }}
    >
      {/* Luz ambiente para iluminar a cena */}
      <ambientLight intensity={1} />
      {/* Luz direcional vinda de cima (iluminação vertical) */}
      <directionalLight position={[5, 5, 0]} intensity={0.5} castShadow />

      <Environment preset="sunset" />
      
      {/* Plane que ocupa toda a visão da câmera */}
      <mesh position={[0, 0, 4]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="white" transparent opacity={0.1} />
      </mesh>
      
      {/* Cubo vermelho na posição 0,0,0 */}
      <mesh position={[0, 0, 0]} scale={[2, 2, 2]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial color="red" metalness={0.5} roughness={0.5} />
      </mesh>
      
      {/* Controles de órbita */}
      <OrbitControls enableZoom enablePan enableRotate />

      {/* Post-processing global para toda a cena 3D */}
      <EffectComposer>
        <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={1.0} />
      </EffectComposer>
    </Canvas>
  )
}