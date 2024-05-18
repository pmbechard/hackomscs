import React from 'react';
import { Sphere } from '@react-three/drei';

const Planet = () => {
  return (
    <Sphere>
      <meshStandardMaterial color='hotpink' />
    </Sphere>
  );
};

export default Planet;
