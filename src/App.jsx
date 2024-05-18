import React from 'react';
import './App.css';

import Planet from './components/Planet';
import Character from './components/Character';
import { Stars } from '@react-three/drei';

function App() {
  return (
    <>
      <Planet />
      <Character />

      <ambientLight />
      <directionalLight position={[2, 4, 3]} />

      <color args={[0x222222]} attach={'background'} />
      <Stars />
    </>
  );
}

export default App;
