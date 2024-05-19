import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  Html,
  OrbitControls,
  Stars,
  useKeyboardControls,
} from '@react-three/drei';
import gsap from 'gsap';
import './App.css';

import Planet from './components/Planet';
import Character from './components/Character';
import { Physics, RigidBody } from '@react-three/rapier';

function App() {
  // TODO:
  //  - Make component for Html pop-ups
  //  - Dark/Light mode
  //  - Title Text that disappears on interaction
  //  - Instructions in top corner

  const [inMotion, setInMotion] = useState(false);

  const planetRef = useRef();
  const planetBodyRef = useRef();
  const characterRef = useRef();
  const characterBodyRef = useRef();

  const [subscribeKeys, getKeys] = useKeyboardControls();

  useFrame((state, delta) => {
    const { up, down, left, right, boost } = getKeys();

    // Orient Character
    const dirList = [];
    if (up) dirList.push('up');
    if (down) dirList.push('down');
    if (left) dirList.push('left');
    if (right) dirList.push('right');
    orient_character(dirList);

    // Planet Spin
    planetBodyRef.current.resetTorques();
    const factor = boost ? 2 : 1;
    let verticalForce = 0;
    let horizontalForce = 0;
    if (up) verticalForce += delta * factor * 10;
    if (down) verticalForce -= delta * factor * 10;
    if (right) horizontalForce += delta * factor * 10;
    if (left) horizontalForce -= delta * factor * 10;
    planetBodyRef.current.applyTorqueImpulse(
      {
        x: verticalForce * factor,
        y: horizontalForce * factor,
        z: 0,
      },
      true
    );
    if (!up && !down && !right && !left) planetBodyRef.current.sleep();
  });

  const orient_character = (directions) => {
    // FIXME: weird turn from left to down
    let direction = Math.PI;
    if (directions.includes('up') && directions.includes('right'))
      direction = (Math.PI * 3) / 4;
    else if (directions.includes('up') && directions.includes('left'))
      direction = (Math.PI * 5) / 4;
    else if (directions.includes('down') && directions.includes('left'))
      direction = (Math.PI * 7) / 4;
    else if (directions.includes('down') && directions.includes('right'))
      direction = Math.PI / 4;
    else if (directions.length >= 2) direction = Math.PI / 2;
    else if (directions.includes('up')) direction = Math.PI;
    else if (directions.includes('left')) direction = (Math.PI * 3) / 2;
    else if (directions.includes('down')) direction = 0;
    else if (directions.includes('right')) direction = Math.PI / 2;
    gsap.to(characterRef.current.rotation, {
      y: direction,
      duration: 0.5,
    });
  };

  const centre_planet = () => {
    planetBodyRef.current.sleep();
    // FIXME: Not sure if this is doing anything
    gsap.from(planetRef.current.position, { x: 0, y: 0, z: 0 });
  };

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
          onCollisionEnter={centre_planet}
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
