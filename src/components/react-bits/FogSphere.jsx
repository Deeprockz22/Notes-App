import React, { useEffect, useRef } from 'react';

/**
 * FogSphere - React Bits Pro Background Component
 * 
 * A soft, swirling volumetric sphere of fog rendered via a high-performance WebGL ray-marching shader.
 * 
 * @param {Object} props
 * @param {number} [props.rayMarchSteps=20] - Number of ray-march steps per pixel (8-32).
 * @param {number} [props.turbulenceIters=4] - Turbulence iterations folded into the warp field (2-10).
 * @param {number} [props.sphereRadius=1.8] - Radius of the sphere shell in world units.
 * @param {string} [props.coreColor='#a855f7'] - Inner/dense core color of the fog (hex).
 * @param {string} [props.glowColor='#38bdf8'] - Outer aura glow color (hex).
 * @param {number} [props.rotationSpeed=0.6] - Camera-orbit / internal swirl rotation speed.
 * @param {number} [props.brightness=1.1] - Final brightness multiplier.
 * @param {number} [props.opacity=0.85] - Global opacity of the fog effect.
 * @param {number} [props.turbulenceFrequency=1.4] - Noise frequency.
 * @param {number} [props.turbulenceAmplitude=0.9] - Noise amplitude.
 * @param {number} [props.turbulenceExponent=1.6] - Density falloff exponent.
 * @param {string} [props.className=''] - Custom container classes.
 * @param {React.ReactNode} [props.children] - Optional overlay content.
 */

function hexToRgb(hex) {
  let cleaned = (hex || '#a855f7').replace('#', '');
  if (cleaned.length === 3) {
    cleaned = cleaned.split('').map((c) => c + c).join('');
  }
  const num = parseInt(cleaned, 16) || 0;
  return [
    ((num >> 16) & 255) / 255,
    ((num >> 8) & 255) / 255,
    (num & 255) / 255
  ];
}

const VERTEX_SHADER = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;
varying vec2 v_uv;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_coreColor;
uniform vec3 u_glowColor;
uniform float u_sphereRadius;
uniform float u_rotationSpeed;
uniform float u_brightness;
uniform float u_opacity;
uniform float u_turbFreq;
uniform float u_turbAmp;
uniform float u_turbExp;
uniform int u_turbIters;
uniform int u_rayMarchSteps;

// 3D Noise Functions
float hash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash(i + vec3(0.0,0.0,0.0)), hash(i + vec3(1.0,0.0,0.0)), f.x),
        mix(hash(i + vec3(0.0,1.0,0.0)), hash(i + vec3(1.0,1.0,0.0)), f.x), f.y),
    mix(mix(hash(i + vec3(0.0,0.0,1.0)), hash(i + vec3(1.0,0.0,1.0)), f.x),
        mix(hash(i + vec3(0.0,1.0,1.0)), hash(i + vec3(1.0,1.0,1.0)), f.x), f.y), f.z);
}

mat2 rot2D(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
}

vec2 sphereIntersect(vec3 ro, vec3 rd, float rad) {
  float b = dot(ro, rd);
  float c = dot(ro, ro) - rad * rad;
  float h = b * b - c;
  if (h < 0.0) return vec2(-1.0);
  h = sqrt(h);
  return vec2(-b - h, -b + h);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  
  vec3 ro = vec3(0.0, 0.0, 3.2);
  vec3 rd = normalize(vec3(uv, -1.5));

  vec2 hit = sphereIntersect(ro, rd, u_sphereRadius);
  
  // Ambient radial glow background
  float distToCenter = length(uv);
  float ambientGlow = max(0.0, 1.0 - distToCenter / (u_sphereRadius * 0.75));
  vec3 finalColor = u_glowColor * pow(ambientGlow, 2.8) * 0.25;
  float finalAlpha = ambientGlow * 0.2;

  if (hit.y > 0.0) {
    float tStart = max(0.0, hit.x);
    float tEnd = hit.y;
    float dt = (tEnd - tStart) / float(u_rayMarchSteps);

    vec3 accumColor = vec3(0.0);
    float accumAlpha = 0.0;

    for (int i = 0; i < 32; i++) {
      if (i >= u_rayMarchSteps || accumAlpha >= 0.96) break;
      float t = tStart + (float(i) + 0.5) * dt;
      vec3 p = ro + rd * t;

      // Subtle slow internal orbital rotation
      p.xz = rot2D(u_time * u_rotationSpeed * 0.25) * p.xz;
      p.yz = rot2D(u_time * u_rotationSpeed * 0.15) * p.yz;

      // Multi-octave turbulence noise
      float f = 0.0;
      float amp = u_turbAmp;
      vec3 q = p * u_turbFreq;
      for (int j = 0; j < 8; j++) {
        if (j >= u_turbIters) break;
        f += amp * noise(q + vec3(u_time * 0.12));
        q *= 2.04;
        amp *= 0.5;
      }

      // Radial density falloff inside the sphere shell
      float r = length(p) / u_sphereRadius;
      float density = smoothstep(1.0, 0.2, r) * f;
      density = pow(clamp(density, 0.0, 1.0), u_turbExp);

      vec3 stepCol = mix(u_glowColor, u_coreColor, smoothstep(0.15, 0.75, density));
      float stepAlpha = clamp(density * dt * 3.5, 0.0, 1.0);

      accumColor += stepCol * stepAlpha * (1.0 - accumAlpha);
      accumAlpha += stepAlpha * (1.0 - accumAlpha);
    }

    finalColor += accumColor * u_brightness;
    finalAlpha = max(finalAlpha, accumAlpha);
  }

  // Soft rim aura
  float rim = max(0.0, 1.0 - abs(distToCenter - u_sphereRadius * 0.5) * 1.5);
  finalColor += u_glowColor * pow(rim, 3.2) * 0.3;
  finalAlpha = clamp(finalAlpha * u_opacity, 0.0, 1.0);

  gl_FragColor = vec4(finalColor, finalAlpha);
}
`;

export default function FogSphere({
  rayMarchSteps = 20,
  turbulenceIters = 4,
  sphereRadius = 1.7,
  coreColor = '#a855f7',
  glowColor = '#38bdf8',
  rotationSpeed = 0.6,
  brightness = 1.1,
  opacity = 0.85,
  turbulenceFrequency = 1.4,
  turbulenceAmplitude = 0.9,
  turbulenceExponent = 1.6,
  className = '',
  children
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, antialias: true, powerPreference: 'high-performance' });
    if (!gl) return;

    // Compile Shaders
    function createShader(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn('FogSphere Shader Compile Error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('FogSphere Program Link Error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Quad geometry covering NDC
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPosition = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uCoreColor = gl.getUniformLocation(program, 'u_coreColor');
    const uGlowColor = gl.getUniformLocation(program, 'u_glowColor');
    const uSphereRadius = gl.getUniformLocation(program, 'u_sphereRadius');
    const uRotationSpeed = gl.getUniformLocation(program, 'u_rotationSpeed');
    const uBrightness = gl.getUniformLocation(program, 'u_brightness');
    const uOpacity = gl.getUniformLocation(program, 'u_opacity');
    const uTurbFreq = gl.getUniformLocation(program, 'u_turbFreq');
    const uTurbAmp = gl.getUniformLocation(program, 'u_turbAmp');
    const uTurbExp = gl.getUniformLocation(program, 'u_turbExp');
    const uTurbIters = gl.getUniformLocation(program, 'u_turbIters');
    const uRayMarchSteps = gl.getUniformLocation(program, 'u_rayMarchSteps');

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let animationId;
    let startTime = performance.now();

    const handleResize = () => {
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // Cap at 1.5 for silky performance

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = (now) => {
      const elapsed = (now - startTime) * 0.001;

      const [cr, cg, cb] = hexToRgb(coreColor);
      const [gr, gg, gb] = hexToRgb(glowColor);

      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, elapsed);
      gl.uniform3f(uCoreColor, cr, cg, cb);
      gl.uniform3f(uGlowColor, gr, gg, gb);
      gl.uniform1f(uSphereRadius, sphereRadius);
      gl.uniform1f(uRotationSpeed, rotationSpeed);
      gl.uniform1f(uBrightness, brightness);
      gl.uniform1f(uOpacity, opacity);
      gl.uniform1f(uTurbFreq, turbulenceFrequency);
      gl.uniform1f(uTurbAmp, turbulenceAmplitude);
      gl.uniform1f(uTurbExp, turbulenceExponent);
      gl.uniform1i(uTurbIters, Math.min(Math.max(turbulenceIters, 2), 8));
      gl.uniform1i(uRayMarchSteps, Math.min(Math.max(rayMarchSteps, 8), 32));

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(positionBuffer);
    };
  }, [
    rayMarchSteps,
    turbulenceIters,
    sphereRadius,
    coreColor,
    glowColor,
    rotationSpeed,
    brightness,
    opacity,
    turbulenceFrequency,
    turbulenceAmplitude,
    turbulenceExponent
  ]);

  return (
    <div
      className={`fog-sphere-container ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
      {children && (
        <div style={{ position: 'relative', zIndex: 1, pointerEvents: 'auto' }}>
          {children}
        </div>
      )}
    </div>
  );
}
