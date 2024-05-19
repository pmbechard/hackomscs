import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  Center,
  Float,
  Html,
  OrbitControls,
  Stars,
  Text3D,
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

  const [showTitle, setShowTitle] = useState(true);
  const [cameraAdjusted, setCameraAdjusted] = useState(false);

  const titleRef = useRef();
  const planetRef = useRef();
  const planetBodyRef = useRef();
  const characterRef = useRef();
  const characterBodyRef = useRef();

  const [subscribeKeys, getKeys] = useKeyboardControls();

  useFrame((state, delta) => {
    if (!showTitle && !cameraAdjusted) {
      gsap.to(state.camera.position, { z: 5, duration: 2 });
    }

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
    const SPEED_FACTOR = 20;
    let verticalForce = 0;
    let horizontalForce = 0;
    if (up) verticalForce += delta * factor * SPEED_FACTOR;
    if (down) verticalForce -= delta * factor * SPEED_FACTOR;
    if (right) horizontalForce += delta * factor * SPEED_FACTOR;
    if (left) horizontalForce -= delta * factor * SPEED_FACTOR;
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

  useEffect(() => {
    const timeout1 = setTimeout(() => {
      gsap.to(titleRef.current.position, { z: 10, duration: 20 });
    }, 2_000);
    const timeout2 = setTimeout(() => {
      setShowTitle(false);
    }, 6_000);
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  const orient_character = (directions) => {
    // FIXME: weird turn from left to down
    let direction = 0;
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

  return (
    <>
      {showTitle && (
        <Float
          speed={2}
          rotationIntensity={0.2}
          floatIntensity={0.2}
          floatingRange={[0.1, 0.2]}
        >
          <Center ref={titleRef} position={[0, 6, 5]} rotation-x={-Math.PI / 4}>
            <Text3D
              font='/fonts/optimer_regular.typeface.json'
              size={0.1}
              height={0.0025}
              curveSegments={6}
              bevelEnabled
              bevelThickness={0.01}
              bevelSize={0.01}
              bevelOffset={0}
              bevelSegments={5}
            >
              Reimagining Web Navigation for HackOMSCS
              <meshStandardMaterial
                color={'white'}
                roughness={0.1}
                metalness={0.4}
              />
            </Text3D>
          </Center>
        </Float>
      )}

      <Physics gravity={[0, 0, 0]} friction={0} restitution={0}>
        <RigidBody ref={planetBodyRef} colliders={'trimesh'} lockTranslations>
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
      <directionalLight position={[4, 6, 7]} />
      <hemisphereLight args={['orange', 'purple', 3]} />

      <color args={[0x222222]} attach={'background'} />
      <Stars />

      <OrbitControls />
    </>
  );
}

export default App;
