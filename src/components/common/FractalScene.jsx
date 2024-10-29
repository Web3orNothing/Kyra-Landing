import { useRef } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import PropTypes from "prop-types";

const FractalShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uEmotionState: 0,
  },
  // Vertex shader - simplified
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader - enhanced visibility
  `
    uniform float uTime;
    uniform float uEmotionState;
    varying vec2 vUv;
    
    void main() {
      vec2 p = vUv * 2.0 - 1.0;
      float r = length(p);
      float a = atan(p.y, p.x);
      
      // Create a more visible pattern
      float f = sin(r * 10.0 - uTime) * sin(a * 8.0) +
                sin(r * 15.0 + uTime * 0.5) * cos(a * 4.0);
                
      // Enhance contrast
      f = abs(f);
      f = smoothstep(0.0, 0.8, f);
      
      // Output bright white
      gl_FragColor = vec4(f, f, f, 1.0);
    }
  `
);

extend({ FractalShaderMaterial });

const FractalSymbol = ({ emotionState = 0 }) => {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime * 0.5; // Slowed down animation
      materialRef.current.uEmotionState = emotionState;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry />
      <fractalShaderMaterial ref={materialRef} />
    </mesh>
  );
};

FractalSymbol.propTypes = {
  emotionState: PropTypes.number,
};

const FractalScene = ({ emotionState = 0 }) => {
  return (
    <div className="w-full h-full backdrop-blur-lg flex justify-center text-white">
      <div className="absolute w-screen h-screen -z-[10] invert opacity-10 -translate-x-[20%] -translate-y-[5%] ">
        <Canvas camera={{ position: [0, 0, 0.4] }}>
          <FractalSymbol emotionState={emotionState} />
        </Canvas>
      </div>
    </div>
  );
};

FractalScene.propTypes = {
  emotionState: PropTypes.number,
};

export default FractalScene;
