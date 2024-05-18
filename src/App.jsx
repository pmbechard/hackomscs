import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, useKeyboardControls } from '@react-three/drei';
import './App.css';

import Planet from './components/Planet';
import Character from './components/Character';

function App() {
  const planetRef = useRef();
  const characterRef = useRef();

  const [subscribeKeys, getKeys] = useKeyboardControls();

  useFrame((state, delta) => {
    const { up, down, left, right, boost } = getKeys();
    const factor = boost ? 2 : 1;
    if (up) planetRef.current.rotation.x += delta * 0.2 * factor;
    if (down) planetRef.current.rotation.x -= delta * 0.2 * factor;
    if (right) planetRef.current.rotation.y += delta * 0.2 * factor;
    if (left) planetRef.current.rotation.y -= delta * 0.2 * factor;
    // TODO: connect character animation
  });

  return (
    <>
      <Planet bodyRef={planetRef} />
      <Character bodyRef={characterRef} />

      <ambientLight />
      <directionalLight position={[2, 4, 3]} />

      <color args={[0x222222]} attach={'background'} />
      <Stars />

      <OrbitControls />
    </>
  );
}

export default App;
