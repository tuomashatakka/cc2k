import { Fragment, PropsWithChildren, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Mesh } from 'three'
import { selectMapData, selectMapDimensions, selectMapFetchState, updateMap } from '../modules/map'
import { useAppData } from '..'
import { useAppDispatch } from '../hooks'

function Box (props: PropsWithChildren<{ position: [ number, number, number ]}>) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<Mesh>(null)
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    if(!meshRef.current)
      return
    meshRef.current.rotation.x += delta
  })
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function MapTile ({ x, y, z }: { x: number, y: number, z: number }) {
  return <Box position={[x,y,z]} />
}

function MapTiles () {

  const dispatch = useAppDispatch()
  const [ width, height ] = useAppData(selectMapDimensions)
  const fetchState = useAppData(selectMapFetchState)
  const widthSlots  = Array(width)
  const heightSlots = Array(height)


  console.log(width, height, "ASD")

  useEffect(() => {
    if (!fetchState)
      dispatch(updateMap())
  }, [ fetchState, dispatch ])

  return <Fragment>
    {widthSlots.map((w, x) =>
      heightSlots.map((h, y) =>
      <MapTile x={x} y={y} z={0} />
    ))}
  </Fragment>

}

export default function MainView () {
  return <Canvas style={{ width: '100vw', height: '100vh' }}>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <MapTiles />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      <OrbitControls minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2.5} />
    </Canvas>
}
