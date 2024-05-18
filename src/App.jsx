import React from 'react';
import './App.css';

import Planet from './components/Planet';
import Character from './components/Character';

function App() {
  return (
    <>
      <Planet />
      <Character />

      <ambientLight />
      <directionalLight position={[2, 4, 3]} />
    </>
  );
}

export default App;
