import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Canvas } from '@react-three/fiber';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Canvas camera={{ position: [1, 2, 3] }}>
      <App />
    </Canvas>
  </React.StrictMode>
);
