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
import { Physics, RigidBody, quat } from '@react-three/rapier';

function App() {
  const planetRef = useRef();
  const planetBodyRef = useRef();
  const characterRef = useRef();
  const characterBodyRef = useRef();

  const [subscribeKeys, getKeys] = useKeyboardControls();

  useFrame((state, delta) => {
    // FIXME: weird spin around
    // TODO: orient character function
    // FIXME: continuous motion on key hold

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
      planetBodyRef.current.applyTorqueImpulse(
        { x: delta * factor * 10, y: 0, z: 0 },
        true
      );
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
      planetBodyRef.current.applyTorqueImpulse(
        { x: -delta * factor * 10, y: 0, z: 0 },
        true
      );
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
      planetBodyRef.current.applyTorqueImpulse(
        { x: 0, y: delta * factor * 10, z: 0 },
        true
      );
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
      planetBodyRef.current.applyTorqueImpulse(
        { x: 0, y: -delta * factor * 10, z: 0 },
        true
      );
    }
  });

  return (
    <>
      <Physics gravity={[0, 0, 0]} friction={0} restitution={0}>
        <RigidBody ref={planetBodyRef} colliders={'trimesh'}>
          <Planet bodyRef={planetRef} />
        </RigidBody>

        <RigidBody
          ref={characterBodyRef}
          type={'fixed'}
          friction={0}
          restitution={0}
        >
          <Character bodyRef={characterRef} />
        </RigidBody>
      </Physics>

      <ambientLight />
      <hemisphereLight args={['orange', 'purple', 3]} />

      <color args={[0x222222]} attach={'background'} />
      <Stars />

      <OrbitControls />
    </>
  );
}

export default App;
