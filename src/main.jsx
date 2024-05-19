import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import { Canvas } from '@react-three/fiber';
import { KeyboardControls } from '@react-three/drei';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <KeyboardControls
      map={[
        { name: 'up', keys: ['ArrowUp', 'KeyW'] },
        { name: 'down', keys: ['ArrowDown', 'KeyS'] },
        { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
        { name: 'right', keys: ['ArrowRight', 'KeyD'] },
        { name: 'boost', keys: ['Space'] },
      ]}
    >
      <Canvas camera={{ position: [0.2, 7, 7] }} shadows>
        <App />
      </Canvas>
    </KeyboardControls>
  </React.StrictMode>
);
