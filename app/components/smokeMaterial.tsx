import { ShaderMaterial } from "three";

export function createSmokeMaterial() {
  const vertexShader = `
    void main() {
      gl_PointSize = 10.0;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 0.5);
    }
  `;

  return new ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
  });
}
