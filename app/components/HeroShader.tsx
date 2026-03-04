"use client";

import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   GLSL Shader — Aurora mesh gradient
   Premiere purple palette, noise-driven movement, soft organic feel.
   ───────────────────────────────────────────────────────────────────────────── */

const VERTEX = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT = `
  precision mediump float;
  uniform float u_time;
  uniform vec2  u_resolution;

  /* --- Simplex-style noise (hash-based, no textures) --- */
  vec3 mod289(vec3 x) { return x - floor(x / 289.0) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x / 289.0) * 289.0; }
  vec3 permute(vec3 x) { return mod289((x * 34.0 + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
     -0.577350269189626, 0.024390243902439
    );
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x_ = 2.0 * fract(p * C.www) - 1.0;
    vec3 h  = abs(x_) - 0.5;
    vec3 ox = floor(x_ + 0.5);
    vec3 a0 = x_ - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  /* --- FBM (fractal Brownian motion) for richer noise --- */
  float fbm(vec2 p) {
    float f = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 4; i++) {
      f += amp * snoise(p);
      p *= 2.1;
      amp *= 0.45;
    }
    return f;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

    float t = u_time * 0.12;

    /* --- Three flowing noise layers with different speeds --- */
    float n1 = fbm(p * 1.8 + vec2(t * 0.7, t * 0.3));
    float n2 = fbm(p * 2.4 + vec2(-t * 0.5, t * 0.8) + 3.7);
    float n3 = fbm(p * 1.2 + vec2(t * 0.3, -t * 0.4) + 7.1);

    /* --- Premiere purple palette --- */
    vec3 purple1 = vec3(0.616, 0.549, 1.0);    /* #9D8CFF — main accent */
    vec3 purple2 = vec3(0.459, 0.365, 0.918);   /* deeper violet */
    vec3 purple3 = vec3(0.710, 0.651, 1.0);     /* #B5A6FF — bright */
    vec3 dark    = vec3(0.051, 0.051, 0.063);    /* #0D0D10 — bg-base */

    /* --- Mix colors driven by noise --- */
    vec3 col = dark;
    col = mix(col, purple2 * 0.3, smoothstep(-0.2, 0.6, n1) * 0.6);
    col = mix(col, purple1 * 0.4, smoothstep(0.0, 0.8, n2) * 0.5);
    col = mix(col, purple3 * 0.25, smoothstep(0.1, 0.7, n3) * 0.35);

    /* --- Radial vignette: strong fade to bg at edges --- */
    float dist = length(p * vec2(0.8, 1.2));
    float vignette = 1.0 - smoothstep(0.2, 1.1, dist);
    col = mix(dark, col, vignette);

    /* --- Extra soft glow in upper-center area --- */
    float topGlow = smoothstep(0.6, -0.2, uv.y) * smoothstep(0.6, 0.0, abs(uv.x - 0.5));
    col += purple1 * topGlow * 0.04 * (0.8 + 0.2 * sin(t * 2.0));

    /* --- Subtle grain for texture --- */
    float grain = (fract(sin(dot(uv * u_time * 0.01, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.015;
    col += grain;

    gl_FragColor = vec4(col, 1.0);
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   React component — WebGL canvas that fills the hero section background
   ───────────────────────────────────────────────────────────────────────────── */

export default function HeroShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* Respect reduced motion */
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      preserveDrawingBuffer: false,
    });
    if (!gl) return;

    /* --- Compile shader helper --- */
    function compile(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }

    const vs = compile(gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT);

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    /* --- Fullscreen quad --- */
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_resolution");

    /* --- Resize handler --- */
    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 1.5); // cap for perf
      const w = canvas!.clientWidth * dpr;
      const h = canvas!.clientHeight * dpr;
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
        gl!.viewport(0, 0, w, h);
      }
    }

    resize();
    window.addEventListener("resize", resize);

    /* --- Render loop --- */
    const start = performance.now();

    function draw() {
      const elapsed = (performance.now() - start) / 1000;
      resize();
      gl!.uniform1f(uTime, prefersReduced ? 0 : elapsed);
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);

      if (prefersReduced) return; // single frame, no loop
      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="ac-hero-shader"
      aria-hidden="true"
    />
  );
}
