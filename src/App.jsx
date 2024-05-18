import React from 'react';
import './App.css';

import { OrbitControls } from '@react-three/drei';

import Planet from './components/Planet';
import Character from './components/Character';

function App() {
  return (
    <>
      <Planet />
      <Character position={[0, 0, 0]} />

      <ambientLight />
      <directionalLight position={[2, 4, 3]} />
      <OrbitControls />
    </>
  );
}

export default App;
