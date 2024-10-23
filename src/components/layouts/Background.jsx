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
    float j = .8, 
          k = 1.5;

    vec2 n = iResolution.xy, 
         p = k*(u+u-n)/n.y;
                
    mat2 m = mat2(j, -1, 1, o = 0.*o + j);  

    for (o.z = k + p.y/4.; j < 1e2; j *= k)
        p = (k*p - .4*iTime - j) * m,
        n *= m,
        n += sin(p + n),
        o += o.zxyw*dot(cos(p + n), p/p)/6./j;
        
    // o = 1.-exp(-1.*o*o);
    float gray = dot(vec3(o.x, o.y, o.z), vec3(1.0, 0.087, 0.014)); // Luminance formula for grayscale
    o = vec4(gray, gray, gray, 2.0);
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
