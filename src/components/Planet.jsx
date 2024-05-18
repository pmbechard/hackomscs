import React from 'react';
import { useGLTF, useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const Planet = () => {
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const bodyRef = useRef();
  const model = useGLTF('/snow/snow_field_aerial_8k.gltf');

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
    <primitive ref={bodyRef} object={model.scene} scale={0.05}></primitive>
  );
};

export default Planet;
