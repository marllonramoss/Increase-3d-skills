import { Canvas } from '@react-three/fiber'
import { EffectComposer, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

export function FullScene() {
  return (
    <Canvas 
    gl={{ alpha: true }}
      camera={{ fov: 75, position: [0, 0, 5] }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh' }}
    >
      {/* Luz ambiente para iluminar a cena */}
      <ambientLight intensity={1.0} />
      
      {/* Plane que ocupa toda a visão da câmera */}
      <mesh position={[0, 0, 4]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="white" transparent opacity={0.1} />
      </mesh>
      
      {/* Post-processing global para toda a cena 3D */}
      <EffectComposer>
        <Noise premultiply blendFunction={BlendFunction.NORMAL} opacity={1.0} />
      </EffectComposer>
    </Canvas>
  )
}