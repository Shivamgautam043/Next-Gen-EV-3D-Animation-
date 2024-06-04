import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, applyProps } from "@react-three/fiber";
import { useSpring, a } from "@react-spring/three";
import {
    PerformanceMonitor,
    AccumulativeShadows,
    RandomizedLight,
    Environment,
    Lightformer,
    Float,
    useGLTF,
} from "@react-three/drei";
import * as THREE from "three";

// Debounce function to limit how often a function can run
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

const keyframes = [
    {
        time: 0,
        position: [0, 1, 0],
        rotation: 0,
        text: "Welcome",
        color: "orange",
    },
    {
        time: 1,
        position: [2, 1, 0],
        rotation: 45,
        text: "Scroll Down",
        color: "purple",
    },
    {
        time: 2,
        position: [2, 1.5, 1],
        rotation: 60,
        text: "Keep Going",
        color: "green",
    },
    {
        time: 3,
        position: [-1.5, 1.2, 2],
        rotation: 90,
        text: "Almost There",
        color: "pink",
    },
    {
        time: 4,
        position: [0, 1, 0],
        rotation: 180,
        text: "Done!",
        color: "yellow",
    },
];

export default function App() {
    const [currentKeyframe, setCurrentKeyframe] = useState(0);
    const [degraded, degrade] = useState(false);
    const [yScroll, setYScroll] = useState(0);
    const rotationYRef = useRef(0);

    const { position, color, rotation } = useSpring({
        position: keyframes[currentKeyframe].position,
        color: keyframes[currentKeyframe].color,
        rotation: keyframes[currentKeyframe].rotation,
        config: { duration: 1000 },
    });

    useEffect(() => {
        const handleScroll = debounce(() => {
            const scrollPosition =
                window.scrollY /
                (document.body.scrollHeight - window.innerHeight);
            const newKeyframe = Math.min(
                Math.floor(scrollPosition * keyframes.length),
                keyframes.length - 1
            );
            setCurrentKeyframe(newKeyframe);
            // setYScroll(scrollPosition);
        }, 0);

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <div className="tw-h-[32px] tw-w-[100%] tw-bg-black tw-text-white tw-sticky tw-top-0">
                {yScroll}
            </div>
            <div className="tw-w-full tw-h-[70vh] tw-fixed tw-top-64px tw-border">
                <div className="tw-absolute tw-text-white tw-z-[10] tw-border tw-p-2 tw-flex tw-flex-col tw-bg-black tw-h-full tw-text-[14px]">
                    <div className="tw-flex tw-flex-col tw-gap-1">
                        {keyframes[currentKeyframe].text}
                    </div>
                </div>

                <div className="tw-absolute tw-text-white tw-z-[10] tw-top-[16px] tw-w-full tw-flex tw-justify-center">
                    <img src="/nexus.svg" alt="" className="tw-scale-[1.5]" />
                </div>

                <Canvas
                    shadows
                    camera={{ fov: 30 }}
                    style={{
                        backgroundImage: `url('/bg.jpg')`,
                        backgroundSize: "cover",
                    }}
                >
                    <spotLight
                        position={[0, 15, 0]}
                        angle={0.3}
                        penumbra={1}
                        castShadow
                        intensity={2}
                        shadow-bias={-0.0001}
                    />
                    <ambientLight intensity={1} />
                    <a.group position={position} >
                        <Bike
                            scale={0.1}
                            position={[0, -2, 0]}
                            targetColor={keyframes[currentKeyframe].color}
                            rotationY={keyframes[currentKeyframe].rotation}
                        />
                    </a.group>

                    <AccumulativeShadows
                        position={[0, -1.16, 0]}
                        frames={100}
                        alphaTest={0.9}
                        scale={10}
                    >
                        <RandomizedLight
                            amount={8}
                            radius={10}
                            ambient={0.5}
                            position={[1, 5, -1]}
                        />
                    </AccumulativeShadows>
                    <PerformanceMonitor onDecline={() => degrade(true)} />
                    <Environment
                        frames={degraded ? 1 : Infinity}
                        resolution={256}
                        background
                        blur={1}
                    >
                        <Lightformers bgColor="black" />
                    </Environment>
                </Canvas>
            </div>
            <div className="tw-h-[200vh] tw-bg-black"></div>
        </>
    );
}

type BikeProps = {
    targetColor: string;
    rotationY: number;
    [key: string]: any;
};



function Bike({ targetColor, rotationY, ...props }: BikeProps) {
    const { scene, nodes, materials } = useGLTF("/bike2.glb");
    const [currentColor, setCurrentColor] = useState(new THREE.Color("blue"));
    const targetTHREEColor = useRef(new THREE.Color(targetColor));

    // Create new glossy materials
    const glossyMaterial = new THREE.MeshStandardMaterial({
        metalness: 0.8,
        roughness: 0.4,
    });

    // Define rotation spring
    const { rotation } = useSpring({
        rotation: rotationY,
        config: { duration: 500 }, // Adjust duration as needed
    });

    // Define color spring
    const { color } = useSpring({
        color: targetColor,
        config: { duration: 500 }, // Adjust duration as needed
    });

    useFrame(() => {
        targetTHREEColor.current.set(targetColor);
        currentColor.lerp(targetTHREEColor.current, 0.1);
        glossyMaterial.color = currentColor;

        scene.traverse((child) => {
            if (child.isMesh && child.material.name === "blinn8") {
                // Example: Change the color of material with name "blinn8"
                child.material.color.set(targetColor); // Set color dynamically
            }
        });

        // Update bike rotation based on spring rotation
        scene.rotation.y = THREE.MathUtils.degToRad(rotation.get());
    });

    useLayoutEffect(() => {
        Object.values(nodes).forEach(
            (node) =>
                node.isMesh && (node.receiveShadow = node.castShadow = true)
        ); 

        // tank name-----blinn8
        // tyre name lambert7
        // rest body -----blinn1
        //rear tyre attach----blinn9
        //

        applyProps(materials.blinn8, {
            color:targetColor ,
        });
        applyProps(materials.lambert7, {
            color: "black",
        });
        applyProps(materials.blinn1, {
            color: "purple",
        });
        applyProps(materials.blinn9, {
            color: "grey",
        });
        // applyProps(materials.paint, {
        //     envMapIntensity: 2,
        //     roughness: 0.45,
        //     metalness: 0.8,
        //     color: "black", // Set the initial color
        // });
    }, [nodes, materials]);

    return <primitive object={scene} {...props} />;
}



type LightformersProps = {
    bgColor: string;
    positions?: number[];
};

function Lightformers({
    bgColor,
    positions = [2, 0, 2, 0, 2, 0, 2, 0],
}: LightformersProps) {
    const group = useRef<THREE.Group>(null);
    useFrame(
        (state, delta) =>
            (group.current!.position.z += delta * 10) > 20 &&
            (group.current!.position.z = -60)
    );
    return (
        <>
            <Lightformer
                intensity={0.75}
                rotation-x={Math.PI / 2}
                position={[0, 5, -9]}
                scale={[10, 10, 1]}
            />
            <group rotation={[0, 0.5, 0]}>
                <group ref={group}>
                    {positions.map((x, i) => (
                        <Lightformer
                            key={i}
                            form="circle"
                            intensity={3}
                            rotation={[Math.PI / 2, 0, 0]}
                            position={[x, 15, i * 4]}
                            scale={[3, 1, 1]}
                        />
                    ))}
                </group>
            </group>
            <Float speed={15} floatIntensity={2} rotationIntensity={2}>
                <Lightformer
                    form="ring"
                    color="white"
                    intensity={13}
                    scale={22}
                    // positions are x,y,z
                    position={[-35, 4, 40]}
                    target={[-4, 0, 0]}
                />
            </Float>
        </>
    );
}
