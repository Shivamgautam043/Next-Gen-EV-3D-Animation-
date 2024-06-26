import { useLayoutEffect, useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, applyProps } from "@react-three/fiber";
import { useSpring, a, config, SpringValue } from "@react-spring/three";
import { useTexture } from "@react-three/drei";
import { TextureLoader } from "three";

import {
    PerformanceMonitor,
    Text,
    Environment,
    Lightformer,
    useGLTF,
    MeshReflectorMaterial,
    OrbitControls,
} from "@react-three/drei";
import * as THREE from "three";
import { Cards } from "./cards";
import { Cards2 } from "./cards2";
import { Smoke } from "react-smoke";

const keyframes = [
    {
        time: 0,
        position: [0, 0, 3],
        mobilePosition: [0, -0.1, 0.04],
        scale: 18,
        mobileScale: 1,
        rotation: 180,
        text: `⬤〇〇〇〇`,
        color: "red",
    },
    {
        time: 1,
        position: [-3, 0, 7],
        mobilePosition: [-0.15, -0.15, 0.2],
        scale: 22,
        mobileScale: 2,
        rotation: 120,
        text: "〇⬤〇〇〇",
        color: "#82a1ba",
    },
    {
        time: 2,
        position: [2.8, 0, 5],
        mobilePosition: [0.08, -0.07, 0.2],
        scale: 18,
        mobileScale: 1.2,
        rotation: 240,
        text: "〇〇⬤〇〇",
        color: "black",
    },
    {
        time: 3,
        position: [-2.8, 0, 5],
        mobilePosition: [-0.07, -0.05, 0.2],
        scale: 18,
        mobileScale: 1,
        rotation: 430,
        text: "〇〇〇⬤〇",
        color: "white",
    },
    {
        time: 4,
        position: [0, 0, 3],
        mobilePosition: [0, -0.1, 0],
        scale: 18,
        mobileScale: 1,
        rotation: 180,
        text: "〇〇〇〇⬤",
        color: "#223e66",
    },
];

export default function App() {
    const [currentKeyframe, setCurrentKeyframe] = useState(0);
    const totalKeyframes = keyframes.length;
    const [isShivamVisible, setIsShivamVisible] = useState(false);
    const shivamRef = useRef(null);

    const nextKeyframe = () => {
        setCurrentKeyframe(
            (prevKeyframe) => (prevKeyframe + 1) % totalKeyframes
        );
    };

    const prevKeyframe = () => {
        setCurrentKeyframe((prevKeyframe) =>
            prevKeyframe === 0 ? totalKeyframes - 1 : prevKeyframe - 1
        );
    };

    const { position, color, rotation, mobilePosition } = useSpring({
        position: keyframes[currentKeyframe].position,
        mobilePosition: keyframes[currentKeyframe].mobilePosition,
        color: keyframes[currentKeyframe].color,
        rotation: keyframes[currentKeyframe].rotation,
        config: config.molasses, // Use a pre-configured spring for smooth transitions
    });

    let count = 0;

    useEffect(() => {
        let lastScrollY = window.scrollY;
        let lastScrollTime = 0;

        const handleScroll = () => {
            const currentTime = Date.now();
            // console.log(currentTime);
            const currentScrollY = window.scrollY;

            if (currentTime - lastScrollTime >= 1500) {
                if (currentScrollY > lastScrollY) {
                    console.log("Scrolled down");
                    nextKeyframe();
                } else if (currentScrollY < lastScrollY) {
                    console.log("Scrolled up");
                    prevKeyframe();
                }
            }
            lastScrollTime = currentTime;
            lastScrollY = currentScrollY;
            count++;
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <div className="tw-py-4 tw-flex tw-w-full tw-text-white tw-justify-between tw-items-center tw-px-16 tw-bg-[#171616] tw-gap-2 !sm:tw-flex-col">
                <div className="tw-flex tw-justify-center">
                    <img
                        src="/nexus.svg"
                        alt=""
                        className="sm:tw-scale-[1.5]"
                    />
                </div>
                <div className="sm:tw-flex tw-gap-8 tw-hidden sm:tw-block">
                    <div className="tw-font-bold">PRODUCTS</div>
                    <div>STORE</div>
                    <div>ABOUT US</div>
                    <div>CONTACT</div>
                </div>
                <div className="tw-flex sm:tw-gap-4 tw-items-center tw-gap-2">
                    <img
                        src="https://i0.wp.com/showmeleb.com/wp-content/uploads/2020/06/facebook-logo-png-white-facebook-logo-png-white-facebook-icon-png-32.png?ssl=1"
                        alt=""
                        className="sm:tw-max-w-8 tw-max-w-6"
                    />
                    <img
                        src="https://www.pikpng.com/pngl/b/31-313145_twitter-png-white-white-twitter-logo-no-background.png"
                        alt=""
                        className="sm:tw-max-w-8 tw-max-w-5"
                    />
                    <img
                        src="https://www.pikpng.com/pngl/b/34-345914_continue-with-google-white-g-logo-clipart.png"
                        alt=""
                        className="sm:tw-max-w-6 tw-max-w-4"
                    />
                </div>
            </div>
            <br />

            {/* this is desktop view */}
            <div className="shivam tw-realtive tw-w-full tw-border tw-border-red-600 tw-border-4 tw-bg-black tw-hidden sm:tw-block">
                <div className="tw-sticky tw-top-[0px] tw-overflow-hidden">
                    <div className="tw-absolute tw-z-[10]  tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-white tw-left-[80px] tw-top-[40%]  tw-z-10 tw-opacity-[0.7] tw-text-[12px]">
                        <div>
                            <button
                                onClick={prevKeyframe}
                                className="tw-text-[16px]"
                            >
                                {"▲"}
                            </button>
                        </div>

                        {keyframes.map((_, index) => (
                            <div key={index}>
                                {currentKeyframe === index ? (
                                    <p>⬤</p>
                                ) : (
                                    <p>〇</p>
                                )}
                            </div>
                        ))}
                        <div>
                            <button
                                onClick={nextKeyframe}
                                className="tw-text-[16px]"
                            >
                                {"▼"}
                            </button>
                        </div>
                    </div>

                    <div className="tw-absolute tw-text-white tw-top-[5%] tw-left-[264px] ">
                        {" "}
                        <div></div>
                        <div className="tw-text-[200px] tw-italic tw-font-bold tw-opacity-[0.2] tw-z-[99]">
                            MAGNUS EX
                        </div>
                    </div>

                    <div className="tw-absolute  tw-h-[80vh] tw-flex tw-items-center tw-z-10 ">
                        <Cards index={currentKeyframe % keyframes.length} />
                    </div>

                    <Canvas
                        gl={{ logarithmicDepthBuffer: true, antialias: true }}
                        dpr={[1, 1.5]}
                        camera={{ position: [0, 5, 15], fov: 25 }}
                        style={{ width: "98vw", height: "78.5vh" }}
                    >
                        {/* <Smoke opacity={0.12} density={100} /> */}

                        <mesh
                            scale={20}
                            position={[0, 0, 10]}
                            rotation={[-1.58, 0, 0]}
                        >
                            <planeGeometry args={[1, 1]} />
                            <MeshReflectorMaterial
                                blur={[100, 300]} // Adjust blur values for a watery effect
                                resolution={2084} // Set resolution for better performance
                                mixBlur={1.5} // Increase mixBlur to blend blur with surface roughness
                                mixStrength={0.5} // Increase mixStrength to enhance reflection intensity
                                roughness={0.3} // Lower roughness for smoother reflections
                                depthScale={0.5} // Increase depth scale to add depth to reflections
                                minDepthThreshold={1}
                                maxDepthThreshold={0.7}
                                color="white" // Light blue color to simulate water
                                metalness={3} // Adjust metalness for slight metallic sheen
                                mirror={1} // Set mirror value to 1 for strong reflections
                            />
                        </mesh>

                        <a.group>
                            <Bike
                                rotation={[0, 0, 0]}
                                scale={keyframes[currentKeyframe].scale}
                                targetColor={color}
                                rotationY={keyframes[currentKeyframe].rotation}
                                position={position}
                            />
                        </a.group>

                        <hemisphereLight intensity={0.5} />
                        {/* <pointLight position={[0, 0, 0]} intensity={10} /> */}
                        {/* <Text position={[0,0,0]} scale={10}>.</Text> */}

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
                        {/* <OrbitControls> </OrbitControls> */}
                    </Canvas>
                </div>

                <div className="tw-h-[100vh] tw-bg-black tw-z-[-99]"> </div>
            </div>

            <div className="tw-h-[200vh] tw-bg-red-400"></div>

            {/* this is mobile view */}
            <div className="sm:tw-hidden tw-w-full tw-h-[70vh] tw-bg-blue-100">
                <div className="tw-absolute tw-text-white tw-top-[30%]  ">
                    {" "}
                    <div></div>
                    <div className="tw-text-[70px] tw-italic tw-font-bold tw-opacity-[0.1] tw-z-[99]">
                        MAGNUS EX
                    </div>
                </div>
                <div className="tw-absolute tw-w-screen tw-h-[80vh] tw-z-10 ">
                    <Cards2 index={currentKeyframe % keyframes.length} />
                </div>

                <div className="tw-bg-black">
                    <Canvas
                        gl={{ logarithmicDepthBuffer: true, antialias: true }}
                        dpr={[1, 1.5]}
                        camera={{ position: [0, 0.5, 1], fov: 25 }}
                        style={{ width: "100%", height: "70vh" }}
                    >
                        {/* <Smoke opacity={.12} density={100} /> */}

                        {/* <mesh
                            scale={5}
                            position={[0, 0, 10]}
                            rotation={[-1.58, 0, 0]}
                        >
                            <planeGeometry args={[1, 1]} />
                            <MeshReflectorMaterial
                                blur={[50, 150]} // Lower blur values
                                resolution={1024} // Reduce resolution
                                mixBlur={1.0} // Adjust to balance performance and visual quality
                                mixStrength={0.5} // Keep mixStrength reasonable
                                roughness={0.5} // Increase roughness slightly for less intensive reflections
                                depthScale={0.5} // Keep as is for visual depth
                                minDepthThreshold={0.9} // Adjust to balance performance and visual quality
                                maxDepthThreshold={1.0} // Adjust to balance performance and visual quality
                                color="white" // Light blue color to simulate water
                                metalness={0.8} // Lower metalness for less intensive reflections
                                mirror={0.8} // Reduce mirror value
                            />
                        </mesh> */}

                        <a.group>
                            <Bike
                                rotation={[0, 0, 0]}
                                scale={keyframes[currentKeyframe].mobileScale}
                                targetColor={color}
                                rotationY={keyframes[currentKeyframe].rotation}
                                position={mobilePosition}
                            />
                        </a.group>

                        <hemisphereLight intensity={0.5} />
                        {/* <pointLight position={[0, 0, 0]} intensity={10} /> */}
                        {/* <Text position={[0,0,0]} scale={10}>.</Text> */}

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
                        {/* <OrbitControls> </OrbitControls> */}
                    </Canvas>
                </div>
                <div className="">
                    <div className="tw-absolute tw-z-[99] tw-flex tw-w-full tw-gap-2 tw-justify-center tw-items-center tw-text-white tw-bg-black  tw-z-10  tw-text-[18px] tw-p-2   ">
                        <div className="tw-border  tw-p-2 tw-rounded-full">
                            <button
                                onClick={prevKeyframe}
                                className="tw-text-[22px]"
                            >
                                {"◀"}
                            </button>
                        </div>

                        {keyframes.map((_, index) => (
                            <div key={index}>
                                {currentKeyframe === index ? (
                                    <p>⬤</p>
                                ) : (
                                    <p>〇</p>
                                )}
                            </div>
                        ))}
                        <div className="tw-border  tw-p-2 tw-rounded-full">
                            <button
                                onClick={nextKeyframe}
                                className="tw-text-[22px]"
                            >
                                {"▶"}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="tw-h-[400vh] tw-w-full tw-bg-blue-400"></div>
            </div>
        </>
    );
}

type BikeProps = {
    targetColor: SpringValue<string>;
    rotationY: number;
    position: SpringValue<number[]>;
    scale: number;
    [key: string]: any;
};

function Bike({
    targetColor,
    position,
    scale,
    rotationY,
    ...props
}: BikeProps) {
    const { scene, nodes, materials } = useGLTF("/ampere2.glb");

    const { rotation } = useSpring({
        rotation: rotationY,
        config: { duration: 1200, tension: 100, friction: 0, mass: 1 },
    });
    const springProps = useSpring({
        position: position,
        config: {
            tension: 300, // default is 170, lower values for a softer spring
            friction: 50, // default is 26, lower values for a bouncier spring
        },
    });

    const colorProps = useSpring({
        color: targetColor,
        config: { duration: 300, tension: 100, friction: 0, mass: 1 },
    });

    const scaleProps = useSpring({
        scale: scale,
        config: {
            tension: 1500,
            friction: 1000,
        },
    });

    useFrame(() => {
        scene.position.set(
            springProps.position.get()[0],
            springProps.position.get()[1],
            springProps.position.get()[2]
        );
        scene.rotation.y = THREE.MathUtils.degToRad(rotation.get());

        const currentScale = scaleProps.scale.get();
        scene.scale.set(currentScale, currentScale, currentScale);

        scene.traverse((child) => {
            if (child.isMesh && child.material.name === "Body_color") {
                child.material.color.set(colorProps.color.get());
            }
        });
    });

    const textureUrl = "/Red_03.png";
    const texture = new TextureLoader().load(textureUrl);

    useMemo(() => {
        applyProps(materials.Body_color, {
            metalness: 0.6,
            roughness: 0.25,
        });

        applyProps(materials.Seat, {
            metalness: 0.8,
            roughness: 0.5,
            color: "black",
        });
        applyProps(materials.glossy_Black, {
            metalness: 0.8,
            roughness: 0.5,
            color: "grey",
        });
        applyProps(materials.Front_glass_ball, {
            metalness: 1,
            roughness: 0.1,
            color: "white",
        });
        applyProps(materials.Back_Chromium, {
            metalness: 0.8,
            roughness: 0.2,
            color: "grey",
        });
        applyProps(materials.Front_Chromium, {
            metalness: 1,
            roughness: 0.1,
            color: "white",
        });
        applyProps(materials.Mirror, {
            metalness: 1,
            roughness: 0.1,
            color: "white",
        });
        applyProps(materials.Front_light_glass, {
            metalness: 1,
            roughness: 0.1,
            color: "white",
        });

        applyProps(materials.aiStandardSurface39, {
            metalness: 0.8,
            roughness: 0.5,
            color: "grey",
        });
        applyProps(materials.Rubber, {
            metalness: 0.8,
            roughness: 0.5,
            color: "grey",
        });

        // Back_white_light
        applyProps(materials.Back_white_light, {
            metalness: 0.6,
            roughness: 0.2,
            map: texture,
        });
        applyProps(materials.Back_light_glass, {
            metalness: 0.9,
            roughness: 0.1,
            color: "black",
        });
        applyProps(materials.Under_feet, {
            metalness: 0.8,
            roughness: 0.5,
            color: "black",
        });
        applyProps(materials.Tires, {
            metalness: 0.8,
            roughness: 0.5,
            color: "black",
        });
        applyProps(materials.Black_plastic, {
            metalness: 0.8,
            roughness: 0.5,
            color: "grey",
        });
        applyProps(materials.Under_tank_plastic, {
            metalness: 0.8,
            roughness: 0.5,
            color: "grey",
        });
        applyProps(materials.ste_plastic_black, {
            metalness: 0.8,
            roughness: 0.5,
            color: "grey",
        });
        applyProps(materials.display, {
            metalness: 0.8,
            roughness: 0.1,
            color: "black",
        });
        applyProps(materials.Metal_black_pipes_MAT, {
            metalness: 0.8,
            roughness: 0.3,
            color: "grey",
        });
        applyProps(materials.Metal_black_pipes, {
            metalness: 0.8,
            roughness: 0.2,
            color: "grey",
        });
    }, [nodes, materials]);

    return <primitive object={scene} {...props} />;
}
