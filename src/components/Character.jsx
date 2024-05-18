import { Float, useGLTF } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import React from 'react';

const Character = ({ bodyRef }) => {
  const model = useGLTF('/ghost.glb');

  return (
    <>
      <EffectComposer>
        <Bloom luminanceThreshold={1.1} mipmapBlur />
      </EffectComposer>
      <Float
        speed={2}
        rotationIntensity={0.3}
        floatIntensity={0.3}
        floatingRange={[0.1, 0.3]}
      >
        <primitive
          ref={bodyRef}
          object={model.scene}
          position={[0, 2.1, 0]}
          scale={0.1}
        ></primitive>
      </Float>
    </>
  );
};

export default Character;
