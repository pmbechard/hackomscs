import React from 'react';
import { Sphere, useGLTF, useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const Planet = () => {
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const bodyRef = useRef();
  const snowModel = useGLTF('/snow_01_8k.gltf');

  useFrame((state, delta) => {
    const { up, down, left, right, boost } = getKeys();
    const factor = boost ? 2 : 1;
    if (up) bodyRef.current.rotation.x += delta * 0.2 * factor;
    if (down) bodyRef.current.rotation.x -= delta * 0.2 * factor;
    if (right) bodyRef.current.rotation.y += delta * 0.2 * factor;
    if (left) bodyRef.current.rotation.y -= delta * 0.2 * factor;
    // TODO: connect character animation
  });

  return (
    // <Sphere ref={bodyRef} scale={2}>
    //   <meshStandardMaterial color='hotpink' />
    // </Sphere>
    <primitive ref={bodyRef} object={snowModel.scene} scale={2}></primitive>
  );
};

export default Planet;
