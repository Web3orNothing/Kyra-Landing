import { Fragment, useRef, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

const vertexShader = `
uniform float uTime;
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      vec3 pos = position;

      // Wave effect using sin function
      float waveAmplitude = 0.2;
      float waveFrequency = 2.0;
      pos.z += sin(pos.x * waveFrequency + uTime) * waveAmplitude;
      pos.z += sin(pos.y * waveFrequency + uTime) * waveAmplitude;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
`;

const fragmentShader = `
const float overallSpeed = 0.2;
const float gridSmoothWidth = 0.015;
const float axisWidth = 0.05;
const float majorLineWidth = 0.025;
const float minorLineWidth = 0.0125;
const float majorLineFrequency = 5.0;
const float minorLineFrequency = 1.0;
const vec4 gridColor = vec4(0.5);
const float scale = 5.0;
const vec4 lineColor = vec4(0.25, 0.5, 1.0, 1.0);
const float minLineWidth = 0.02;
const float maxLineWidth = 0.5;
const float lineSpeed = 1.0 * overallSpeed;
const float lineAmplitude = 1.0;
const float lineFrequency = 0.2;
const float warpSpeed = 0.2 * overallSpeed;
const float warpFrequency = 0.5;
const float warpAmplitude = 1.0;
const float offsetFrequency = 0.5;
const float offsetSpeed = 1.33 * overallSpeed;
const float minOffsetSpread = 0.6;
const float maxOffsetSpread = 2.0;
const int linesPerGroup = 16;
uniform float iTime;
uniform vec2 iResolution;

const vec4[] bgColors = vec4[]
    (
        lineColor * 0.5,
        lineColor - vec4(0.2, 0.2, 0.7, 1)
        );

#define drawCircle(pos, radius, coord) smoothstep(radius + gridSmoothWidth, radius, length(coord - (pos)))

#define drawSmoothLine(pos, halfWidth, t) smoothstep(halfWidth, 0.0, abs(pos - (t)))

#define drawCrispLine(pos, halfWidth, t) smoothstep(halfWidth + gridSmoothWidth, halfWidth, abs(pos - (t)))

#define drawPeriodicLine(freq, width, t) drawCrispLine(freq / 2.0, width, abs(mod(t, freq) - (freq) / 2.0))

float drawGridLines(float axis)   
{
    return   drawCrispLine(0.0, axisWidth, axis)
           + drawPeriodicLine(majorLineFrequency, majorLineWidth, axis)
           + drawPeriodicLine(minorLineFrequency, minorLineWidth, axis);
}

float drawGrid(vec2 space)
{
    return min(1., drawGridLines(space.x)
                  +drawGridLines(space.y));
}

// probably can optimize w/ noise, but currently using fourier transform
float random(float t)
{
    return (cos(t) + cos(t * 1.3 + 1.3) + cos(t * 1.4 + 1.4)) / 3.0;   
}

float getPlasmaY(float x, float horizontalFade, float offset)   
{
    return random(x * lineFrequency + iTime * lineSpeed) * horizontalFade * lineAmplitude + offset;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord.xy / iResolution.xy;
    vec2 space = (fragCoord - iResolution.xy / 2.0) / iResolution.x * 2.0 * scale;
    
    float horizontalFade = 1.0 - (cos(uv.x * 6.28) * 0.5 + 0.5);
    float verticalFade = 1.0 - (cos(uv.y * 6.28) * 0.5 + 0.5);

    // fun with nonlinear transformations! (wind / turbulence)
    space.y += random(space.x * warpFrequency + iTime * warpSpeed) * warpAmplitude * (0.5 + horizontalFade);
    space.x += random(space.y * warpFrequency + iTime * warpSpeed + 2.0) * warpAmplitude * horizontalFade;
    
    vec4 lines = vec4(0);
    
    for(int l = 0; l < linesPerGroup; l++)
    {
        float normalizedLineIndex = float(l) / float(linesPerGroup);
        float offsetTime = iTime * offsetSpeed;
        float offsetPosition = float(l) + space.x * offsetFrequency;
        float rand = random(offsetPosition + offsetTime) * 0.5 + 0.5;
        float halfWidth = mix(minLineWidth, maxLineWidth, rand * horizontalFade) / 2.0;
        float offset = random(offsetPosition + offsetTime * (1.0 + normalizedLineIndex)) * mix(minOffsetSpread, maxOffsetSpread, horizontalFade);
        float linePosition = getPlasmaY(space.x, horizontalFade, offset);
        float line = drawSmoothLine(linePosition, halfWidth, space.y) / 2.0 + drawCrispLine(linePosition, halfWidth * 0.15, space.y);
        
        float circleX = mod(float(l) + iTime * lineSpeed, 25.0) - 12.0;
        vec2 circlePosition = vec2(circleX, getPlasmaY(circleX, horizontalFade, offset));
        float circle = drawCircle(circlePosition, 0.01, space) * 4.0;
        
        line = line + circle;
        lines += line * lineColor * rand;
    }
    
    fragColor = mix(bgColors[0], bgColors[1], uv.x);
    fragColor *= verticalFade;
    fragColor.a = 1.0;
    // debug grid:
    //fragColor = mix(fragColor, gridColor, drawGrid(space));
    fragColor += lines;
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
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
};

const Background = () => (
  <Fragment>
    <Canvas
      orthographic
      camera={{ zoom: 100 }}
      style={{ width: "100vw", height: "100vh", opacity: 0.6 }}
    >
      <OceanShaderMesh />
    </Canvas>
  </Fragment>
);

export default Background;
