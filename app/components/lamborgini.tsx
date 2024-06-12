import { Canvas } from "@react-three/fiber";
import {
    OrbitControls,
    Environment,
    Lightformer,
    Text,
    ScrollControls,
    ContactShadows,
} from "@react-three/drei";
import { Lamborghini } from "~/lambo";
import React from "react";
import { Overlay } from "./overlay";
import { Ampere_Scooty } from "~/ampere";

export function Animation() {
    const [animationIndex, setAnimationIndex] = React.useState(0);
    // const [yScroll];
    return (
        <>
            <div className="tw-relative">
                <img
                    src="/nexus.svg"
                    alt="logo"
                    className="tw-absolute tw-top-[5%] tw-left-[20%] tw-z-10 tw-w-[50%] tw-h-auto"
                />
                <div>
                    <Canvas
                        gl={{ logarithmicDepthBuffer: true, antialias: false }}
                        dpr={[1, 1.5]}
                        camera={{ position: [0, 2, 15], fov: 25 }}
                        style={{ width: "100vw", height: "100vh" }}
                    >
                        <color attach="background" args={["#15151a"]} />
                        <mesh
                            scale={40}
                            position={[3, -1.161, -1.5]}
                            rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}
                        >
                            <planeGeometry />
                            <meshBasicMaterial />
                        </mesh>
                        
                        <ScrollControls pages={10} damping={0.25} camera={{ position: [0, 0, 15], fov: 25 }}>
                        <Overlay/>
                            <Lamborghini
                                rotation={[0, Math.PI / 1.5, 0]}
                                scale={0.015}
                            />
                            <OrbitControls
                            enablePan={false}
                            enableZoom={false}
                            minPolarAngle={Math.PI / 2.2}
                            maxPolarAngle={Math.PI / 2.2}
                        />

                           
                        </ScrollControls>
                        {/* <Lamborghini rotation={[0, Math.PI / 1.5, 0]} scale={0.015} /> */}
                        <hemisphereLight intensity={0.5} />
                        <pointLight
                            position={[0, -10, 0]}
                            intensity={100}
                            color={""}
                        />
                        <ContactShadows
                            resolution={1024}
                            position={[0, -1.16, 0]}
                            scale={15}
                            blur={0.5}
                            opacity={1}
                            far={20}
                        />
                        {/* <mesh scale={4} position={[3, -1.161, -1.5]} rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}>
        <ringGeometry args={[0.9, 1, 4, 1]} />
        <meshStandardMaterial color="white" roughness={0.75} />
      </mesh>
      <mesh scale={4} position={[-3, -1.161, -1]} rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}>
        <ringGeometry args={[0.9, 1, 3, 1]} />
        <meshStandardMaterial color="white" roughness={0.75} />
      </mesh> */}
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
                        {/* <Effects /> */}
                        
                        <Text
                            scale={[1, 1, 1]}
                            color="blue" // default
                            anchorX="center" // default
                            anchorY="middle" // default
                            position={[5, 0, -15]}
                        >
                            Ampere Tech Car
                        </Text>
                    </Canvas>
                </div>
            </div>
        </>
    );
}
