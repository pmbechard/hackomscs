import { Float, useGLTF } from '@react-three/drei';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import React from 'react';

const Character = ({ bodyRef }) => {
  const model = useGLTF('/ghost.glb');

  return (
    <>
      <EffectComposer>
        <Bloom luminanceThreshold={1.1} mipmapBlur />
        <Vignette offset={0.3} darkness={0.9} />
      </EffectComposer>

      <Float
        speed={5}
        rotationIntensity={0.3}
        floatIntensity={0.3}
        floatingRange={[0.1, 0.3]}
      >
        <primitive
          ref={bodyRef}
          object={model.scene}
          position={[0, 2.5, 0]}
          scale={0.1}
        ></primitive>
      </Float>
    </>
  );
};

export default Character;
