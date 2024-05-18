import React from 'react';
import { Sphere, useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const Planet = () => {
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const bodyRef = useRef();

  useFrame((state, delta) => {
    const { up, down, left, right } = getKeys();
    if (up) bodyRef.current.rotation.x += delta;
    if (down) bodyRef.current.rotation.x -= delta;
    if (right) bodyRef.current.rotation.y += delta;
    if (left) bodyRef.current.rotation.y -= delta;
    // TODO: connect character animation
    // TODO: add "jump"
  });

  return (
    <Sphere ref={bodyRef} scale={2}>
      <meshStandardMaterial color='hotpink' />
    </Sphere>
  );
};

export default Planet;
