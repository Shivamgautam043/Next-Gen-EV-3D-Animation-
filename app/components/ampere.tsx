import { Canvas } from "@react-three/fiber";
import {
    Environment,
    Lightformer,
    Text,
    ScrollControls,
    ContactShadows,
    Image,
    MeshReflectorMaterial,
} from "@react-three/drei";
import React from "react";
import { Overlay } from "./overlay";
import { Ampere_Scooty } from "~/ampere";
import { metalness } from "three/examples/jsm/nodes/Nodes.js";

export function Ampere_Animation() {
    const [animationIndex, setAnimationIndex] = React.useState(0);
    // const [yScroll];
    return (
        <>
            <div className="tw-relative">
                <img
                    src="/nexus.svg"
                    alt="logo"
                    className="tw-absolute tw-top-[5%] tw-left-[35%] tw-z-10 tw-w-[30%] tw-h-auto"
                />
                <div>
                    <Canvas
                        gl={{ logarithmicDepthBuffer: true, antialias: false }}
                        dpr={[1, 1.5]}
                        camera={{ position: [0, 2, 15], fov: 25 }}
                        style={{ width: "100vw", height: "100vh" }}
                    >
                        <color attach="background" args={["#15151a"]} />
                        {/* floor */}
                        <mesh
                            scale={40}
                            position={[3, -1.161, -1.5]}
                            rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}
                        >
                            <planeGeometry args={[1, 1]} />
                            <MeshReflectorMaterial
                                blur={[100, 300]} // Adjust blur values for a watery effect
                                resolution={2000} // Set resolution for better performance
                                mixBlur={4} // Increase mixBlur to blend blur with surface roughness
                                mixStrength={.5} // Increase mixStrength to enhance reflection intensity
                                roughness={0.15} // Lower roughness for smoother reflections
                                depthScale={.3} // Increase depth scale to add depth to reflections
                                minDepthThreshold={0.9}
                                maxDepthThreshold={.5}
                                color="#aadfff" // Light blue color to simulate water
                                metalness={0.5} // Adjust metalness for slight metallic sheen
                                mirror={.5} // Set mirror value to 1 for strong reflections
                            />
                        </mesh>

                        <ScrollControls
                            pages={10}
                            damping={0.25}
                            camera={{ position: [0, 0, 15], fov: 25 }}
                        >
                            <Overlay />
                            {/* <Lamborghini
                                rotation={[0, Math.PI / 1.5, 0]}
                                scale={0.015}
                            /> */}

                            <Ampere_Scooty
                                scale={15}
                                position={[0, -1.1, 0]}
                            />
                        </ScrollControls>
                        {/* <Lamborghini rotation={[0, Math.PI / 1.5, 0]} scale={0.015} /> */}
                        <hemisphereLight intensity={0.5} />
                        <pointLight
                            position={[0, -10, 0]}
                            intensity={100}
                            color={""}
                        />
                        {/* <ContactShadows
                            resolution={1024}
                            position={[0, -1.16, 0]}
                            scale={15}
                            blur={0.5}
                            opacity={1}
                            far={20}
                        /> */}

                        <Environment resolution={1000}>
                            {/* Ceiling */}

                            <Lightformer
                                intensity={2}
                                rotation-x={Math.PI / 2}
                                position={[0, 4, -9]}
                                scale={[10, 1, 1]}
                            />
                            <Lightformer
                                intensity={2}
                                rotation-x={Math.PI / 2}
                                position={[0, 4, -6]}
                                scale={[10, 1, 1]}
                            />
                            <Lightformer
                                intensity={2}
                                rotation-x={Math.PI / 2}
                                position={[0, 4, -3]}
                                scale={[10, 1, 1]}
                            />
                            <Lightformer
                                intensity={2}
                                rotation-x={Math.PI / 2}
                                position={[0, 4, 0]}
                                scale={[10, 1, 1]}
                            />
                            <Lightformer
                                intensity={2}
                                rotation-x={Math.PI / 2}
                                position={[0, 4, 3]}
                                scale={[10, 1, 1]}
                            />
                            <Lightformer
                                intensity={2}
                                rotation-x={Math.PI / 2}
                                position={[0, 4, 6]}
                                scale={[10, 1, 1]}
                            />
                            <Lightformer
                                intensity={2}
                                rotation-x={Math.PI / 2}
                                position={[0, 4, 9]}
                                scale={[10, 1, 1]}
                            />
                            {/* Sides */}
                            <Lightformer
                                intensity={2}
                                rotation-y={Math.PI / 2}
                                position={[-50, 2, 0]}
                                scale={[100, 2, 1]}
                            />
                            <Lightformer
                                intensity={2}
                                rotation-y={-Math.PI / 2}
                                position={[50, 2, 0]}
                                scale={[100, 2, 1]}
                            />
                            {/* Key */}
                            <Lightformer
                                form="ring"
                                color="red"
                                intensity={10}
                                scale={2}
                                position={[10, 5, 10]}
                                onUpdate={(self) => self.lookAt(0, 0, 0)}
                            />
                        </Environment>
                        {/* <Text
                            scale={[1, 1, 1]}
                            color="blue" // default
                            anchorX="center" // default
                            anchorY="middle" // default
                            position={[5, 0, -15]}
                        >
                            Ampere
                        </Text> */}
                    </Canvas>
                </div>
            </div>
        </>
    );
}
