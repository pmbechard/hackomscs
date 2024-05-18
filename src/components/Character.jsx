import { Box } from '@react-three/drei';
import React from 'react';

const Character = () => {
  return (
    <Box position={[0, 1.125, 0]} scale={0.25}>
      <meshStandardMaterial color={'mediumpurple'} />
    </Box>
  );
};

export default Character;
