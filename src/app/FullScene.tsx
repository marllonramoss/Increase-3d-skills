import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import vertexShader from '../shaders/cube.vert.js'
import fragmentShader from '../shaders/cube.frag.js'

function MyModel() {
  return (
    <>
      <mesh position={[-1.5, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
      <mesh position={[1.5, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </>
  )
}

export function FullScene() {
  return (
    <Canvas 
      camera={{ fov: 75, position: [0, 0, 5] }}
      style={{ position: 'absolute', top: 0, left: 0 }}
    >
      {/* Fundo da cena */}
      <mesh position={[0, 0, -10]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      
      {/* Iluminação melhorada */}
      <ambientLight intensity={1.0} />
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <directionalLight position={[-10, -10, -5]} intensity={1} />
      <pointLight position={[0, 10, 0]} intensity={1.5} />
      <pointLight position={[0, -10, 0]} intensity={0.5} />
      
      {/* Environment para iluminação ambiente */}
      <Environment preset="sunset" />
      
      <MyModel />
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      {/* Post-processing global para toda a cena 3D */}
      <EffectComposer>
        <Noise premultiply blendFunction={BlendFunction.NORMAL} opacity={0.2} />
      </EffectComposer>
    </Canvas>
  )
}