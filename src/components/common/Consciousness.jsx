import { useRef, useEffect } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { Vector2, Color } from "three";

// Simplex noise implementation
const snoise = `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,
                        0.366025403784439,
                       -0.577350269189626,
                        0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
`;

// Create the shader material
const ConsciousnessShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uResolution: new Vector2(),
    uMouse: new Vector2(),
    uPulseIntensity: 1.0,
    uBaseColor1: new Color("#6600ff"), // Deep purple
    uBaseColor2: new Color("#00ffff"), // Electric cyan
  },
  // Vertex shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uMouse;
    uniform float uPulseIntensity;
    uniform vec3 uBaseColor1;
    uniform vec3 uBaseColor2;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    ${snoise}
    
    void main() {
      // Create multiple layers of noise
      float n1 = snoise(vUv * 3.0 + uTime * 0.2);
      float n2 = snoise(vUv * 6.0 - uTime * 0.1);
      float n3 = snoise(vUv * 9.0 + uTime * 0.3);
      
      // Combine noise layers
      float noise = (n1 + n2 * 0.5 + n3 * 0.25) * 0.5 + 0.5;
      
      // Create pulsing effect
      float pulse = sin(uTime * 2.0 + length(vUv - 0.5) * 8.0) * 0.5 + 0.5;
      pulse = pow(pulse, 2.0) * uPulseIntensity;
      
      // Create flowing energy effect
      vec2 flowUv = vUv + vec2(
        sin(vUv.y * 10.0 + uTime),
        cos(vUv.x * 10.0 + uTime)
      ) * 0.02;
      
      // Mouse interaction
      float mouseDist = length(flowUv - uMouse);
      float mouseInfluence = smoothstep(0.5, 0.0, mouseDist);
      
      // Combine colors
      vec3 finalColor = mix(uBaseColor1, uBaseColor2, noise * pulse);
      finalColor += vec3(0.2, 0.4, 1.0) * mouseInfluence;
      
      // Add glow
      float glow = exp(-mouseDist * 4.0) * 0.5;
      finalColor += vec3(0.5, 0.8, 1.0) * glow;
      
      // Output with alpha for ethereal effect
      float alpha = mix(0.6, 1.0, pulse * noise);
      gl_FragColor = vec4(finalColor, alpha);
    }
  `
);

// Extend Three.js with our custom shader
extend({ ConsciousnessShaderMaterial });

function ConsciousnessVisualizer() {
  const meshRef = useRef();
  const mouseRef = useRef(new Vector2(0.5, 0.5));

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouseRef.current.x = event.clientX / window.innerWidth;
      mouseRef.current.y = 1 - event.clientY / window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.material.uTime = clock.elapsedTime;
      meshRef.current.material.uMouse = mouseRef.current;

      // Subtle pulse intensity variation
      const pulseIntensity = 1 + Math.sin(clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.material.uPulseIntensity = pulseIntensity;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry width={400} height={400} />
      <consciousnessShaderMaterial opacity={0.8} />
    </mesh>
  );
}

export default function ConsciousnessScene() {
  return (
    <div className="absolute inset-0 w-full h-full rounded-lg">
      <Canvas
        camera={{ position: [0, 0, 0.5], fov: 75 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ConsciousnessVisualizer />
      </Canvas>
    </div>
  );
}
