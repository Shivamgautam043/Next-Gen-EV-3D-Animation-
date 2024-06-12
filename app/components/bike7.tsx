/* eslint-disable react/no-unknown-property */
import { useRef, useState, useMemo, useTransition, Suspense } from "react";
import { Canvas, useFrame, applyProps } from "@react-three/fiber";
import { useSpring, a, config, SpringValue, animated } from "@react-spring/three";
import {
    PerformanceMonitor,
    AccumulativeShadows,
    RandomizedLight,
    Environment,
    Lightformer,
    Float,
    useGLTF,
    Html,
    Reflector,
    OrbitControls,

} from "@react-three/drei";
import * as THREE from "three";
import { Cards } from "./cards";
import { Smoke } from "react-smoke";
import App from "./Smoke";

// function throttle(func, limit) {
//     let lastFunc;
//     let lastRan;
//     return function (...args) {
//         if (!lastRan) {
//             func.apply(this, args);
//             lastRan = Date.now();
//         } else {
//             clearTimeout(lastFunc);
//             lastFunc = setTimeout(() => {
//                 if (Date.now() - lastRan >= limit) {
//                     func.apply(this, args);
//                     lastRan = Date.now();
//                 }
//             }, limit - (Date.now() - lastRan));
//         }
//     };
// }

const keyframes = [
    {
        time: 0,
        position: [0, -0.6, 0],
        rotation: 180,
        text: `⬤〇〇〇〇`,
        color: "black",
    },
    {
        time: 1,
        position: [-1.5, -1, 1],
        rotation: 100,
        text: "〇⬤〇〇〇",
        color: "black",
    },
    {
        time: 2,
        position: [2, -1, 1],
        rotation: 230,
        text: "〇〇⬤〇〇",
        color: "white",
    },
    {
        time: 3,
        position: [-1, -1, 1],
        rotation: 430,
        text: "〇〇〇⬤〇",
        color: "white",
    },
    {
        time: 4,
        position: [0, -1, 0],
        rotation: 180,
        text: "〇〇〇〇⬤",
        color: "red",
    },
];

export default function Bike7() {
    const [currentKeyframe, setCurrentKeyframe] = useState(0);
    const totalKeyframes = keyframes.length;
    const [degraded, degrade] = useState(false);
    // const [yScroll, setYScroll] = useState(0);
    // const rotationYRef = useRef(0);
    const smokeColor = useMemo(() => new THREE.Color("white"), []);
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

    const { position, color, rotation } = useSpring({
        position: keyframes[currentKeyframe].position,
        color: keyframes[currentKeyframe].color,
        rotation: keyframes[currentKeyframe].rotation,
        config: config.molasses, // Use a pre-configured spring for smooth transitions
    });

    // const scroll = useScroll;
    // useEffect(() => {
    //     const handleScroll = throttle(() => {
    //         const scrollPosition =
    //             window.scrollY /
    //             (document.body.scrollHeight - window.innerHeight);
    //         const newKeyframe = Math.min(
    //             Math.floor(scrollPosition * keyframes.length),
    //             keyframes.length - 1
    //         );
    //         setCurrentKeyframe(newKeyframe);
    //         //   setYScroll(scrollPosition);
    //     }, 0); // Adjust throttle limit for better responsiveness

    //     window.addEventListener("scroll", handleScroll);
    //     return () => {
    //         window.removeEventListener("scroll", handleScroll);
    //     };
    //     console.log("hello");
    // }, [scroll]);


      // Define the transitions for appearing and disappearing animations

    return (
        <>
            <div className="tw-w-full tw-h-[100vh]  tw-relative tw-top-64px tw-border">
                <div className="tw-absolute tw-text-white tw-z-[100] tw-border tw-p-2 tw-flex tw-flex-col tw-bg-black tw-h-full tw-text-[14px]">
                    <div className="tw-flex tw-flex-col tw-gap-1">
                        {keyframes[currentKeyframe].text}
                        <div className="tw-flex">


                            <button  onClick={prevKeyframe} className="tw-text-[32px] ">{"⇦"}</button>
                            <button onClick={nextKeyframe} className="tw-text-[32px]">{"⇨"}</button>
                        </div>
                    </div>
                </div>

                <div className="tw-relative">
            <button onClick={() => setShowDivs(!showDivs)}>Toggle Divs</button>
        </div>
                <div className="tw-absolute tw-text-white tw-z-[10] tw-top-[16px] tw-w-full tw-flex tw-justify-center">
                    <img src="/nexus.svg" alt="" className="tw-scale-[1.5]" />
                </div>

                {/* 
                <div className="tw-h-screen tw-w-screen tw-flex tw-justify-between tw-items-center tw-absolute tw-z-10">
                    <div className="content1 tw-w-[30%] tw-h-[40%] tw-bg-blue-300 tw-m-10"></div>
                    <div className="content2 tw-w-[30%] tw-h-[40%] tw-bg-blue-200 tw-m-10"></div>
                </div>
                <div className="tw-h-screen tw-w-screen tw-flex tw-items-center tw-justify-end tw-absolute tw-z-10">
                    <div className="content2 tw-w-[30%] tw-h-[40%] tw-bg-green-200 tw-m-10"></div>
                </div>
                <div className="tw-h-screen tw-w-screen tw-flex tw-items-center tw-justify-start tw-absolute tw-z-10">
                    <div className="content2 tw-w-[30%] tw-h-[40%] tw-bg-red-200 tw-m-10"></div>
                </div>
                <div className="tw-h-screen tw-w-screen tw-flex tw-items-center tw-justify-end tw-absolute tw-z-10">
                    <div className="content2 tw-w-[30%] tw-h-[40%] tw-bg-green-200 tw-m-10"></div>
                </div>
                <div className="tw-h-screen tw-w-screen tw-flex tw-justify-between tw-items-center tw-absolute tw-z-10">
                    <div className="content1 tw-w-[30%] tw-h-[40%] tw-bg-blue-300 tw-m-10"></div>
                    <div className="content2 tw-w-[30%] tw-h-[40%] tw-bg-blue-200 tw-m-10"></div>
                </div> */}
                <div className="tw-absolute tw-top-[40%] tw-flex tw-items-center tw-z-10 ">
                <Cards index={currentKeyframe%keyframes.length} />
                </div>
               <div className="tw-flex">
                <App input={0}/>
                {/* <App input={600}/>
                <App input={1200}/> */}
                </div>
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 30 }}
                    // style={{
                    //     backgroundImage: `url('/bg.jpg')`,
                    //     backgroundSize: "cover",
                    // }}
                    className=""
                    
                >
                   {/* <OrbitControls /> */}
                  
                      {/* <Suspense fallback={null}>
                      <Smoke
            color={smokeColor}
            density={500}
            enableRotation={true}
            rotation={[0, 0, 0.2]}
           minBounds={[-200,-2,-2]}
           maxBounds={[400,4,4]}
          />
        
        </Suspense> */}
                     {/* <mesh
                            scale={400}
                            position={[3, -1.161, -1.5]}
                            rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}
                        >
                            <planeGeometry />
                            <meshStandardMaterial
                            color={"green"} 
                            metalness={2}
                            roughness={0.01}
                          />
                        </mesh> */}

                    <spotLight
                        position={[0, 2, 10]}
                        angle={0.5}
                        penumbra={1}
                        castShadow
                        intensity={200}
                        shadow-bias={-0.0001}
                    />
                    {/* <ambientLight intensity={10} /> */}
                    
                    <a.group>
                    <Bike
                            scale={8}
                            targetColor={color}
                            rotationY={keyframes[currentKeyframe].rotation}
                            position={position}
                        />
                    </a.group>
                    
                    {/* <OrbitControls/> */}
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
                        frames={Infinity}
                        resolution={256}
                        background
                        blur={1}
                    >
                        <Lightformers bgColor={"blue"} />
                        {/* <mesh
                           
                        >
                            <planeGeometry />
                            <meshStandardMaterial
                            color={"white"} 
                           
                          />

                        </mesh> */}
                          
                    </Environment>
                </Canvas>
            </div>
            
        </>
    );
}

type BikeProps = {
    targetColor: SpringValue<string>;
    rotationY: number;
    position: SpringValue<number[]>;
    [key: string]: any;
};

function Bike({ targetColor, position, rotationY, ...props }: BikeProps) {
    // const scroll = useScroll();
    // const ref = useRef();
    const { scene, nodes, materials } = useGLTF("/AMPERE.glb");
    // const [currentColor, setCurrentColor] = useState(new THREE.Color("blue"));
    // const targetTHREEColor = useRef(new THREE.Color(targetColor));

    const { rotation } = useSpring({
        rotation: rotationY,
        config: { duration: 2000, tension: 100, friction: 0, mass: 1 },
    });
    const springProps = useSpring({
        position: position,
        config: { duration: 500, tension: 100, friction: 0, mass: 1 },
    });
    
    const colorProps = useSpring({
      color: targetColor,
      config: { duration: 300, tension: 100, friction: 0, mass: 1 },
  });


    useFrame(() => {
        scene.position.set(
            springProps.position.get()[0],
            springProps.position.get()[1],
            springProps.position.get()[2]
        );
        scene.rotation.y = THREE.MathUtils.degToRad(rotation.get());
       
        scene.traverse((child) => {
          if (child.isMesh && child.material.name === "Body_color") {
            child.material.color.set(colorProps.color.get());
        }
      });

    });

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

type LightformersProps = {
    bgColor: string;
    positions?: number[];
};

function Lightformers({
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
                    position={[-35, 4, 40]}
                    target={[-4, 0, 0]}
                />
            </Float>
        </>
    );
}
