import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, OrbitControls, MeshDistortMaterial } from '@react-three/drei'
import { EffectComposer, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import { useRef } from 'react'

function ScreenPlane() {
  const planeRef = useRef<THREE.Mesh>(null)
  const { camera } = useThree()

  useFrame(() => {
    if (!planeRef.current) return
    const distanceFromCamera = 0.75

    const forward = new THREE.Vector3()
    camera.getWorldDirection(forward)

    const targetPosition = new THREE.Vector3()
      .copy(camera.position)
      .add(forward.multiplyScalar(distanceFromCamera))

    planeRef.current.position.copy(targetPosition)

    // Orienta o plano para ficar perpendicular ao olhar da câmera
    planeRef.current.quaternion.copy(camera.quaternion)
    planeRef.current.rotateY(Math.PI)

    // Ajusta o tamanho do plano para preencher o viewport
    if (camera instanceof THREE.PerspectiveCamera) {
      const fovInRadians = (camera.fov * Math.PI) / 180
      const visibleHeight = 2 * distanceFromCamera * Math.tan(fovInRadians / 2)
      const visibleWidth = visibleHeight * camera.aspect
      planeRef.current.scale.set(visibleWidth, visibleHeight, 1)
    } else if (camera instanceof THREE.OrthographicCamera) {
      const visibleWidth = camera.right - camera.left
      const visibleHeight = camera.top - camera.bottom
      planeRef.current.scale.set(visibleWidth, visibleHeight, 1)
    }
  })

  return (
    <mesh ref={planeRef}>
      <planeGeometry args={[1, 1]} />
      
      <meshBasicMaterial transparent opacity={0} depthTest={false} depthWrite={false} colorWrite={false} side={THREE.DoubleSide} />
    </mesh>
  )
}

export function FullScene() {
  return (
    <Canvas 
    gl={{ alpha: true }}
      camera={{ fov: 75, position: [0, 0, 5] }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh' }}
    >
      {/* Luz ambiente para iluminar a cena */}
      <ambientLight intensity={1} />
      {/* Luz direcional vinda de cima (iluminação vertical) */}
      <directionalLight position={[5, 5, 0]} intensity={0.5} castShadow />

      <Environment preset="sunset" />
      
      {/* Plane que acompanha a câmera e cobre toda a visão */}
      <ScreenPlane />
      
      {/* Esfera vermelha na posição 0,0,0 */}
      <mesh position={[0, 0, 0]} scale={[2, 2, 2]}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
    color="black"
    distort={0.5}
    speed={3}
    metalness={0.7}
    roughness={1}
    emissive="#222"
    emissiveIntensity={0.5}
    transparent
    opacity={0.8}
    side={THREE.DoubleSide}
  />
      </mesh>
      
      {/* Controles de órbita */}
      <OrbitControls enableZoom enablePan enableRotate />

      {/* Post-processing global para toda a cena 3D */}
      <EffectComposer>
        <Noise premultiply={false} blendFunction={BlendFunction.EXCLUSION} opacity={0.09} />
      </EffectComposer>
    </Canvas>
  )
}