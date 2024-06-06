import { useMemo, useRef } from "react";
import { applyProps, useFrame } from "@react-three/fiber";
import { useGLTF, useScroll } from "@react-three/drei";
import { Color } from "./components/colorSelector";

export function Ampere_Scooty(props) {
    const scroll = useScroll();
    const { scene, nodes, materials } = useGLTF("/AMPERE.glb");
    const ref = useRef();

    useMemo(() => {

        applyProps(materials.Body_color, {
            metalness: 0.8,
            roughness: 0.2,
            color: "black",
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
        // applyProps(materials.Under_tank_fiber, {
        //     metalness: 0.8,
        //     roughness: 0.5,
    
        //     color: "grey",
        // });

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

    const steps = [
        { point: 2.5, xMultiple: -3, zMultiple: 6, xOffset: 0, zOffset: 0 },
        { point: 5, xMultiple: 5, zMultiple: -3, xOffset:-3, zOffset: 6},
        { point: 10, xMultiple: -2, zMultiple: -3, xOffset: 2, zOffset: 3},
    ];

    useFrame(() => {
        if (ref.current) {
            const scrollY = scroll.offset * 10;
            let previousPoint = 0;
            for (let i = 0; i < steps.length; i++) {
                const currentStep = steps[i];
                if (scrollY > previousPoint && scrollY <= currentStep.point) {
                    ref.current.rotation.y = (Math.PI / 2) * (scrollY / 2.5);
                    ref.current.position.z =
                        currentStep.zOffset +
                        ((scrollY - previousPoint) /
                            (currentStep.point - previousPoint)) *
                            currentStep.zMultiple;
                    ref.current.position.x =
                        currentStep.xOffset +
                        ((scrollY - previousPoint) /
                            (currentStep.point - previousPoint)) *
                            currentStep.xMultiple;
                    break;
                }
                previousPoint = currentStep.point;
            }
            const vehicleColor: string = Color(scrollY);
            scene.traverse((child) => {
                if (child.isMesh && child.material.name === "Body_color") {
                    child.material.color.set(vehicleColor);
                }
                
            });
        }
    });
    return <primitive ref={ref} object={scene} {...props} />;
}

