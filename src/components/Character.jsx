import { Box } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React from 'react';

const Character = () => {
  return (
    <Box position={[0, 2.125, 0]} scale={0.25}>
      <meshStandardMaterial color={'mediumpurple'} />
    </Box>
  );
};

export default Character;
