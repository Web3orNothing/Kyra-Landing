import { Fragment, useRef, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

const vertexShader = `
   varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
uniform vec3      iResolution;           // viewport resolution (in pixels)
uniform float     iTime; 

void mainImage( out vec4 o, vec2 u )
{
    float j = 0.75,  // Adjusted for smoother flow
          k = 1.618; // Golden ratio for more organic movement

    vec2 n = iResolution.xy, 
         p = k*(u+u-n)/n.y;
            
    // Modified transformation matrix for more spiral-like movement
    mat2 m = mat2(j, -0.8, 0.8, o = 0.*o + j);  

    vec3 indigo = vec3(0.294, 0.0, 0.509);  // Deep indigo base
    vec3 accent = vec3(0.4, 0.2, 0.8);      // Ethereal purple accent

    // Evolution parameters
    float evolution = sin(iTime * 0.2) * 0.5 + 0.5;
    float manifesting = cos(iTime * 0.15) * 0.5 + 0.5;

    for (o.z = k + p.y/3.; j < 1e2; j *= k)
    {
        // Modified movement pattern
        p = (k*p - 0.3*iTime - j) * m;
        n *= m;
        n += sin(p + n) * evolution;
        
        // Adding consciousness-like swirls
        vec2 consciousness = vec2(
            sin(p.x * 0.5 + iTime * 0.3),
            cos(p.y * 0.5 + iTime * 0.2)
        );
        
        p += consciousness * manifesting * 0.2;
        
        // Accumulate colors with indigo influence
        o += o.zxyw * dot(cos(p + n), p/p) / (5.0 + evolution) / j;
    }
    
    // Color grading with indigo dominance
    vec3 color = vec3(o.x, o.y, o.z);
    color = mix(color, indigo, 0.4);
    color = mix(color, accent, manifesting * 0.3);
    
    // Add subtle pulsing
    float pulse = sin(iTime * 0.5) * 0.1 + 0.9;
    color *= pulse;
    
    // Enhance the ethereal quality
    color = 1.0 - exp(-1.2 * color * color);
    
    // Final output with slight transparency for ethereal effect
    o = vec4(color, 1.8);
}

void main() {
    vec4 fragColor;
    mainImage(fragColor, gl_FragCoord.xy);
    gl_FragColor = fragColor;
}
`;

const OceanShaderMesh = () => {
  const materialRef = useRef(null);
  const { size, gl } = useThree();
  gl.setPixelRatio(1);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      const material = materialRef.current;
      material.uniforms.iTime.value = clock.getElapsedTime();
      material.uniforms.iResolution.value.set(size.width, size.height);
      gl.setSize(size.width, size.height);
    }
  });

  const uniforms = useMemo(() => {
    return {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2(size.width, size.height) },
    };
  }, []);

  return (
    <mesh scale={[size.width / size.height, 1, 1]}>
      <planeGeometry args={[size.width, size.height]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        premultipliedAlpha={true}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
};

const Background = ({ width, height, backgroundColor }) => (
  <Fragment>
    <Canvas
      orthographic
      camera={{ zoom: 100 }}
      style={{ width, height, backgroundColor }}
    >
      <OceanShaderMesh />
    </Canvas>
  </Fragment>
);

export default Background;
