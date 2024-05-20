import React, { useEffect, useRef } from 'react';
import { Html, useGLTF, Sphere, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const Planet = ({ planetRef, setLinks, showBox }) => {
  const model = useGLTF('/surface.glb');

  const theIdeaRef = useRef();
  const theTechRef = useRef();
  const theGuyRef = useRef();
  const theHackRef = useRef();
  const theGetAtMeRef = useRef();

  useEffect(() => {
    setLinks([
      theIdeaRef.current,
      theTechRef.current,
      theGuyRef.current,
      theHackRef.current,
      theGetAtMeRef.current,
    ]);
  }, []);

  const content = {
    idea: 'The idea behind this project is to explore different ways of navigating the web outside of the link and scroll method that has been common since the early days. It is inspired by the rise in AR/VR technologies and open world games. Web technologies have advanced rapidly, but navigation has remained generally the same and deserves a proper shakeup!',
    tech: 'The tech stack used here is based around React Three Fiber which is an abstraction of three.js which is, itself, an abstraction of WebGL. Blender was used to create the models shown here. Special thanks to the pmdrs team and their many helpful components that make creating these projects even more enjoyable!',
    hack: 'This being my first hackathon, I tried hard to make something that would leave an impression. It was difficult for me to gauge what could be done in 24 hours and I ran into many challenges, especially in Blender and the R3F Rapier physics. I also came across some interesting bugs that I will be opening issues for once I catch up on my sleep! Some of my original ideas changed throughout the process, others were dropped, others could not be completed in time. While the project is not super advanced in a technical sense, my goal was to explore, be creative, and get people thinking about how we navigate the web and how we might change that in the future.',
    guy: "My name is Peyton Bechard. I am starting OMSCS in Fall 2024 doing either CS or HCI… haven't quite decided. I am a self-taught programmer, high school math and CS teacher, have an MA Humanities, former North Korean tour guide and project manager, licensed Canadian Risk Manager, and I am a month or so away from being a father.",
    contact:
      'Github: github.com/pmbechard\n\nLinkedIn: linkedin.com/in/peyton-bechard/',
  };

  useFrame((state, delta) => {
    theIdeaRef.current.lookAt(state.camera.position);
    theTechRef.current.lookAt(state.camera.position);
    theGuyRef.current.lookAt(state.camera.position);
    theHackRef.current.lookAt(state.camera.position);
    theGetAtMeRef.current.lookAt(state.camera.position);
  });

  return (
    <>
      <primitive ref={planetRef} object={model.scene} scale={3}>
        {/* TODO: Add class for highlight based on proximity - set to state and respond to enter click */}

        <Text
          ref={theIdeaRef}
          position={[-0.3, 1.1, -0.6]}
          scale={0.1}
          onClick={() => showBox(content.idea)}
        >
          the idea
        </Text>

        <Text
          ref={theTechRef}
          position={[1.2, 0.5, 0.2]}
          scale={0.1}
          onClick={() => showBox(content.tech)}
        >
          the tech
        </Text>

        <Text
          ref={theGuyRef}
          position={[-1.1, -0.6, 0.75]}
          scale={0.1}
          onClick={() => showBox(content.guy)}
        >
          the guy
        </Text>

        <Text
          ref={theHackRef}
          position={[-0.4, -0.4, -1.1]}
          scale={0.1}
          onClick={() => showBox(content.hack)}
        >
          the hack
        </Text>

        <Text
          ref={theGetAtMeRef}
          position={[0.6, -1.1, -0.3]}
          scale={0.1}
          onClick={() => showBox(content.contact)}
        >
          get @ me
        </Text>
      </primitive>
    </>
  );
};

export default Planet;
