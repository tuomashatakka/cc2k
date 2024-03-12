import { Fragment, PropsWithChildren, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sky } from '@react-three/drei'
import { Mesh } from 'three'
import { selectMapDimensions, selectMapFetchState, updateMap } from '../modules/map'
import { useAppData } from '..'
import { useAppDispatch } from '../hooks'

// import { GLSL } from 'gl-react'

// const shaders = Shaders.create({
//   sdf1: {
//     frag: GLSL(require('./signedDistance.glsl'))
//   }
// })



function Box (props: PropsWithChildren<{ position: [ number, number, number ]}>) {

  // This reference will give us direct access to the mesh
  const meshRef = useRef<Mesh>(null)

  // Set up state for the hovered and active state
  const [ hovered, setHover ] = useState(false)
  const [ active, setActive ] = useState(false)

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    if (!meshRef.current)
      return

    // meshRef.current.rotation.x += delta
  })

  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={[ 1, active ? 15 : 1, 1 ]}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[ 1, 0.02, 1 ]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'black'} />
    </mesh>
  )
}

function MapTiles () {
  const dispatch          = useAppDispatch()
  const [ width, height ] = useAppData(selectMapDimensions)
  const fetchState        = useAppData(selectMapFetchState)
  const widthSlots        = Array(width).fill(1)
  const heightSlots       = Array(height).fill(1)
  const startX            = Math.floor(widthSlots.length / 2)
  const startY            = Math.floor(heightSlots.length / 2)

  useEffect(() => {
    if (!fetchState)
      dispatch(updateMap())
  }, [ fetchState, dispatch ])

  return <Fragment>
    {widthSlots.map((w, x) =>
      heightSlots.map((h, y) =>
        <Box key={`${x}${y}`} position={[ x - startX, 0, y - startY ]} />
      )
    )}
  </Fragment>
}

export default function MainView () {
  return <Canvas style={{ width: '100vw', height: '100vh' }}>
    <Sky distance={40} sunPosition={[ 5, 5, 5 ]} />
    <spotLight position={[ -5, 10, 10 ]} angle={0.55} penumbra={1} decay={0} intensity={Math.PI * 100} />
    <pointLight position={[ -10, 10, -10 ]} decay={0} intensity={Math.PI} />
    <MapTiles />
    <OrbitControls minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2.5} maxDistance={15} target={[ 0, 0, 0 ]} />
  </Canvas>
}
