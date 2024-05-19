import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  Html,
  OrbitControls,
  Stars,
  useKeyboardControls,
} from '@react-three/drei';
import './App.css';

import Planet from './components/Planet';
import Character from './components/Character';

function App() {
  const planetRef = useRef();
  const characterRef = useRef();

  const [subscribeKeys, getKeys] = useKeyboardControls();

  useFrame((state, delta) => {
    // FIXME: weird spin around
    const { up, down, left, right, boost } = getKeys();
    const factor = boost ? 2 : 1;

    if (up) {
      if (characterRef.current.rotation.y !== Math.PI)
        if (characterRef.current.rotation.y < Math.PI)
          characterRef.current.rotation.y = Math.min(
            Math.PI,
            characterRef.current.rotation.y + 0.2
          );
        else if (characterRef.current.rotation.y > Math.PI)
          characterRef.current.rotation.y = Math.max(
            Math.PI,
            characterRef.current.rotation.y - 0.2
          );
      planetRef.current.rotation.x += delta * 0.2 * factor;
    }
    if (down) {
      if (characterRef.current.rotation.y < 0)
        characterRef.current.rotation.y = Math.min(
          0,
          characterRef.current.rotation.y + 0.2
        );
      else if (characterRef.current.rotation.y > 0)
        characterRef.current.rotation.y = Math.max(
          0,
          characterRef.current.rotation.y - 0.2
        );
      planetRef.current.rotation.x -= delta * 0.2 * factor;
    }
    if (right) {
      if (characterRef.current.rotation.y < Math.PI / 2)
        characterRef.current.rotation.y = Math.min(
          Math.PI / 2,
          characterRef.current.rotation.y + 0.2
        );
      else if (characterRef.current.rotation.y > Math.PI / 2)
        characterRef.current.rotation.y = Math.max(
          Math.PI / 2,
          characterRef.current.rotation.y - 0.2
        );
      planetRef.current.rotation.y += delta * 0.2 * factor;
    }
    if (left) {
      if (characterRef.current.rotation.y < (Math.PI * 6) / 4)
        characterRef.current.rotation.y = Math.min(
          (Math.PI * 6) / 4,
          characterRef.current.rotation.y + 0.2
        );
      else if (characterRef.current.rotation.y > (Math.PI * 6) / 4)
        characterRef.current.rotation.y = Math.max(
          (Math.PI * 6) / 4,
          characterRef.current.rotation.y - 0.2
        );
      planetRef.current.rotation.y -= delta * 0.2 * factor;
    }
  });

  return (
    <>
      <Planet bodyRef={planetRef} />
      <Character bodyRef={characterRef} />

      <ambientLight />
      <hemisphereLight args={['orange', 'purple', 3]} />

      <color args={[0x222222]} attach={'background'} />
      <Stars />

      <Html position={[5, 0, 0]}>
        Use Arrow keys or WASD to move and Space for a speed boost
      </Html>

      <OrbitControls />
    </>
  );
}

export default App;
