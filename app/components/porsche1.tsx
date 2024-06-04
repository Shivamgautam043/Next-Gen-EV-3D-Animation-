// import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
// import { Canvas, applyProps, useFrame } from "@react-three/fiber";
// import { PerformanceMonitor, AccumulativeShadows, RandomizedLight, Environment, Lightformer, Float, useGLTF } from "@react-three/drei";
// import * as THREE from "three";
66

// // Debounce function to limit how often a function can run
// function debounce(func: (...args: any[]) => void, wait: number) {
//   let timeout: NodeJS.Timeout;
//   return function (...args: any[]) {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func.apply(this, args), wait);
//   };
// }

// export default function App() {
//   const [degraded, degrade] = useState(false);
//   const [yScroll, setYScroll] = useState(0);
//   const rotationYRef = useRef(0);
//   const [targetColor, setTargetColor] = useState("black");
//   const [bgColor, setBgColor] = useState("white");

//   const handleClickColor = (color: string) => {
//     setTargetColor(color);
//   };

//   const handleClickBgColor = (color: string) => {
//     setBgColor(color);
//   };

//   useEffect(() => {
//     const handleScroll = debounce(() => {
//       const totalScrollY = window.scrollY;
//       const normalizedScroll = totalScrollY / (document.documentElement.scrollHeight - window.innerHeight) * 3;
//       rotationYRef.current = normalizedScroll;
//       console.log("Total vertical scroll position:", normalizedScroll);
      
//       if (normalizedScroll < 1) {
//         setTargetColor("black");
//       } else if (normalizedScroll >= 1 && normalizedScroll < 2) {
//         setTargetColor("purple");
//       } else {
//         setTargetColor("green");
//       }
      
//     }, 0);

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <>
//       <div className="tw-h-[32px] tw-w-[100%] tw-bg-black tw-text-white tw-sticky tw-top-0">
//         {yScroll}
//       </div>
//       <div className="tw-w-full tw-h-[70vh] tw-fixed tw-top-64px tw-border">
//         <div className="tw-absolute tw-text-white tw-z-[10] tw-border tw-p-2 tw-flex tw-flex-col tw-bg-black tw-h-full tw-text-[14px]">
//           <div className="tw-flex tw-flex-col tw-gap-1">
//             Choose color
//             <button
//               className="tw-border tw-rounded tw-mb-1 tw-p-1 tw-bg-black"
//               onClick={() => handleClickColor("white")}
//             >
//               White
//             </button>
//             <button
//               className="tw-border tw-rounded tw-mb-1 tw-p-1 tw-bg-black"
//               onClick={() => handleClickColor("green")}
//             >
//               Green
//             </button>
//             <button
//               className="tw-border tw-rounded tw-mb-1 tw-p-1 tw-bg-black"
//               onClick={() => handleClickColor("purple")}
//             >
//               Purple
//             </button>
//             <button
//               className="tw-border tw-rounded tw-mb-1 tw-p-1 tw-bg-black"
//               onClick={() => handleClickColor("#ffff00")}
//             >
//               Yellow
//             </button>
//           </div>
//           <div className="tw-flex tw-flex-col tw-mt-2 tw-gap-1">
//             Background
//             <button
//               className="tw-border tw-rounded tw-mb-1 tw-p-1 tw-bg-black"
//               onClick={() => handleClickBgColor("white")}
//             >
//               White
//             </button>
//             <button
//               className="tw-border tw-rounded tw-mb-1 tw-p-1 tw-bg-black"
//               onClick={() => handleClickBgColor("black")}
//             >
//               Black
//             </button>
//             <button
//               className="tw-border tw-rounded tw-mb-1 tw-p-1 tw-bg-black"
//               onClick={() => handleClickBgColor("blue")}
//             >
//               Blue
//             </button>
//           </div>
//         </div>

//         <div className="tw-absolute tw-text-white tw-z-[10] tw-top-[16px] tw-w-full tw-flex tw-justify-center">
//           <img src="/nexus.svg" alt="" className="tw-scale-[1.5]" />
//         </div>

//         <Canvas shadows camera={{ position: [5, 0, 15], fov: 30 }}>
//           <spotLight
//             position={[0, 15, 0]}
//             angle={0.3}
//             penumbra={1}
//             castShadow
//             intensity={2}
//             shadow-bias={-0.0001}
//           />
//           <ambientLight intensity={1} />
//           <Porsche
//             scale={1.8}
//             position={[-2 + rotationYRef.current, -0.18, 0]}
//             rotation={[0, rotationYRef.current / 0.01, 0]}
//             targetColor={targetColor} // Pass the target color as a prop
//           />

//           <AccumulativeShadows
//             position={[0, -1.16, 0]}
//             frames={100}
//             alphaTest={0.9}
//             scale={10}
//           >
//             <RandomizedLight
//               amount={8}
//               radius={10}
//               ambient={0.5}
//               position={[1, 5, -1]}
//             />
//           </AccumulativeShadows>
//           <PerformanceMonitor onDecline={() => degrade(true)} />
//           <Environment
//             frames={degraded ? 1 : Infinity}
//             resolution={256}
//             background
//             blur={1}
//           >
//             <Lightformers bgColor={bgColor} />
//           </Environment>
//           <CameraRig rotationYRef={rotationYRef} />
//         </Canvas>
//       </div>
//       <div className="tw-h-[200vh] tw-bg-black"></div>
//     </>
//   );
// }

// type PorscheProps = {
//   targetColor: string;
//   [key: string]: any;
// };

// function Porsche({ targetColor, ...props }: PorscheProps) {
//   const { scene, nodes, materials } = useGLTF("/911-transformed.glb") as any;
//   const [currentColor, setCurrentColor] = useState(new THREE.Color("orange"));
//   const targetTHREEColor = useRef(new THREE.Color(targetColor));

//   useFrame(() => {
//     targetTHREEColor.current.set(targetColor);
//     currentColor.lerp(targetTHREEColor.current, 0.1); // Smoothly interpolate towards the target color
//     applyProps(materials.paint, {
//       color: currentColor,
//     });
//   });

//   useLayoutEffect(() => {
//     Object.values(nodes).forEach(
//       (node: any) =>
//         node.isMesh && (node.receiveShadow = node.castShadow = true)
//     );
//     applyProps(materials.rubber, {
//       color: "#222",
//       roughness: 0.6,
//       roughnessMap: null,
//       normalScale: [4, 4],
//     });
//     applyProps(materials.window, {
//       color: "white",
//       roughness: 0,
//       clearcoat: 0.1,
//     });
//     applyProps(materials.coat, {
//       envMapIntensity: 4,
//       roughness: 0.5,
//       metalness: 1,
//     });
//     applyProps(materials.paint, {
//       envMapIntensity: 2,
//       roughness: 0.45,
//       metalness: 0.8,
//       color: currentColor, // Set the initial color
//     });
//   }, [nodes, materials]);

//   return <primitive object={scene} {...props} />;
// }

// type CameraRigProps = {
//   v?: THREE.Vector3;
//   rotationYRef: React.RefObject<number>;
// };

// function CameraRig({ v = new THREE.Vector3(), rotationYRef }: CameraRigProps) {
//   return useFrame((state) => {
//     const t = state.clock.elapsedTime;
//     state.camera.position.lerp(
//       v.set(Math.sin(t / 5), 0, 12 + Math.cos(t / 5) / 2),
//       0.05
//     );
//     state.camera.lookAt(-4, 0, 0);

//     // Update rotation based on scroll
//     const rotationY = rotationYRef.current;
//     if (state.scene.rotation.y !== rotationY) {
//       state.scene.rotation.y = THREE.MathUtils.lerp(
//         state.scene.rotation.y,
//         rotationY,
//         0.1
//       );
//     }
//   });
// }

// type LightformersProps = {
//   bgColor: string;
//   positions?: number[];
// };

// function Lightformers({
//   bgColor,
//   positions = [2, 0, 2, 0, 2, 0, 2, 0],
// }: LightformersProps) {
//   const group = useRef<THREE.Group>(null);
//   useFrame(
//     (state, delta) =>
//       (group.current!.position.z += delta * 10) > 20 &&
//       (group.current!.position.z = -60)
//   );
//   return (
//     <>
//       <Lightformer
//         intensity={0.75}
//         rotation-x={Math.PI / 2}
//         position={[0, 5, -9]}
//         scale={[10, 10, 1]}
//       />
//       <group ref={group}>
//         {positions.map((y, i) => (
//           <Lightformer
//             key={i}
//             form="ring"
//             color={bgColor}
//             intensity={1}
//             scale={1}
//             position={[i * 4, 4, -10]}
//             target={[0, 0, 0]}
//           />
//         ))}
//       </group>
//     </>
//   );
// }
