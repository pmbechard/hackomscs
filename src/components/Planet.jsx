import React from 'react';
import { Html, useGLTF } from '@react-three/drei';

const Planet = ({ bodyRef }) => {
  const model = useGLTF('/surface.glb');

  return (
    <primitive ref={bodyRef} object={model.scene} scale={3}>
      <Html position={[-0.45, 1.4, -1.15]}>Home</Html>
    </primitive>
  );
};

export default Planet;
