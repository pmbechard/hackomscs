import React, { useRef } from 'react';
import { Html, useGLTF, Sphere } from '@react-three/drei';

const Planet = ({ planetRef, setLinks }) => {
  const model = useGLTF('/surface.glb');

  const theIdeaRef = useRef();
  const theTechRef = useRef();
  const theGuyRef = useRef();
  const theHackRef = useRef();
  const theGetAtMeRef = useRef();

  return (
    <>
      <primitive ref={planetRef} object={model.scene} scale={3}>
        {/* TODO: Add class for highlight based on proximity - set to state and respond to enter click */}

        <Html
          ref={theIdeaRef}
          wrapperClass={'pageLink'}
          position={[-0.4, 0.9, -0.8]}
          distanceFactor={8}
          // occlude={[planetRef]}
        >
          the idea
        </Html>
        <Html
          ref={theTechRef}
          wrapperClass={'pageLink'}
          position={[1, 0.7, 0.45]}
          distanceFactor={8}
          // occlude={[planetRef]}
        >
          the tech
        </Html>
        <Html
          ref={theGuyRef}
          wrapperClass={'pageLink'}
          position={[-1.1, -0.6, 0.75]}
          distanceFactor={8}
          // occlude={[planetRef]}
        >
          the guy
        </Html>
        <Html
          ref={theHackRef}
          wrapperClass={'pageLink'}
          position={[-0.4, -0.6, -1.1]}
          distanceFactor={8}
          // occlude={[planetRef]}
        >
          the hack
        </Html>
        <Html
          ref={theGetAtMeRef}
          wrapperClass={'pageLink'}
          position={[0.8, -1.3, -0]}
          distanceFactor={8}
          // occlude={[planetRef]}
        >
          get @ me
        </Html>
      </primitive>
    </>
  );
};

export default Planet;
