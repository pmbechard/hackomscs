import React from 'react';
import { useGLTF } from '@react-three/drei';

const Planet = ({ bodyRef }) => {
  const model = useGLTF('/surface.glb');

  return <primitive ref={bodyRef} object={model.scene} scale={2}></primitive>;
};

export default Planet;
