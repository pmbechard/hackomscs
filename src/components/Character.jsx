import { Box } from '@react-three/drei';
import React from 'react';

const Character = () => {
  return (
    <Box position={[0, 1.25, 0]} scale={0.5}>
      <meshStandardMaterial color={'mediumpurple'} />
    </Box>
  );
};

export default Character;
