import { Float, Text } from '@react-three/drei';
import React, { useEffect } from 'react';

const Page = ({ content, setShowPage }) => {
  return (
    <>
      <Float
        speed={2}
        rotationIntensity={0.2}
        floatIntensity={0.2}
        floatingRange={[0.1, 0.2]}
      >
        <mesh scale={12} onClick={() => setShowPage(false)}>
          {/* <boxGeometry /> */}
          <meshStandardMaterial />
          <Text
            position={[2, -6, -6]}
            rotation-x={Math.PI / -4}
            scale={0.05}
            maxWidth={300}
            fontSize={12}
            center
            overflowWrap={'normal'}
            onClick={() => setShowPage(false)}
          >
            {content}
          </Text>
        </mesh>
      </Float>
    </>
  );
};

export default Page;
