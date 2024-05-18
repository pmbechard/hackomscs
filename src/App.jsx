import React from 'react';
import './App.css';
import { OrbitControls } from '@react-three/drei';

function App() {
  return (
    <>
      <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>

      <OrbitControls makeDefault />
    </>
  );
}

export default App;
