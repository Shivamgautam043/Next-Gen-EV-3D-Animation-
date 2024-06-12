import { BufferGeometry, BufferAttribute } from "three";

export function createSmokeGeometry() {
  const geometry = new BufferGeometry();
  const vertices = [];
  const particleCount = 1000;

  for (let i = 0; i < particleCount; i++) {
    const x = Math.random() * 10 - 5;
    const y = Math.random() * 10 - 5;
    const z = Math.random() * 10 - 5;

    vertices.push(x, y, z);
  }

  geometry.setAttribute("position", new BufferAttribute(new Float32Array(vertices), 3));

  return geometry;
}
