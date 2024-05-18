import React from 'react';
import { useGLTF } from '@react-three/drei';

const Planet = ({ bodyRef }) => {
  const model = useGLTF('/snow/snow_field_aerial_8k.gltf');

  return (
    <primitive ref={bodyRef} object={model.scene} scale={0.05}></primitive>
  );
};

export default Planet;
