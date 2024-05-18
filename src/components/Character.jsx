import { useGLTF } from '@react-three/drei';
import React from 'react';

const Character = ({ bodyRef }) => {
  const model = useGLTF('/Fox/glTF/Fox.gltf');

  return (
    <primitive
      ref={bodyRef}
      object={model.scene}
      position={[0, 2, 0]}
      rotation-y={Math.PI}
      scale={0.0025}
    ></primitive>
  );
};

export default Character;
