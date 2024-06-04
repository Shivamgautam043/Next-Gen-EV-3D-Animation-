import * as THREE from "three";
import { useLayoutEffect, useMemo, useRef, useState, useEffect } from "react";
import { applyProps, useFrame } from "@react-three/fiber";
import { useGLTF, useScroll } from "@react-three/drei";

import { root } from "postcss";
import { rotate } from "three/examples/jsm/nodes/Nodes.js";

export function Lamborghini(props) {
    const scroll = useScroll();
    const { scene, nodes, materials } = useGLTF("/lambo.glb");
    const ref = useRef();
    // const tl = useRef();
    // const Floor_HEIGHT = 4;
    // useLayoutEffect(()=>{
    //   tl.current = gsap.timeline();
    //   tl.current.to(
    //     ref.current.position,
    //     {
    //       duration: 2,
    //       z: -Floor_HEIGHT,
    //       x: Floor_HEIGHT+ scroll.delta
    //     },0
    //   )
    // },[]);

    // useFrame(() => {
    //   if (ref.current) {
    //     ref.current.rotation.y += 0.001;

    //     // time += 100;
    //     // ref.current.position.x = Math.log(time + 0.1);
    //     // ref.current.position.z = Math.log(time + 0.1);
    //   }
    // });
    // useMemo(() => {
    //   Object.values(nodes).forEach((node) => {
    //     if (node.isMesh) {
    //       if (node.name.startsWith("glass")) node.geometry.computeVertexNormals();

    //       if (node.name === "silver_001_BreakDiscs_0")
    //         node.material = applyProps(materials.BreakDiscs.clone(), {
    //           color: "#ddd",
    //         });
    //     }
    //   });

    //   nodes["glass_003"].scale.setScalar(2.7);

    //   applyProps(materials.FrameBlack, {
    //     metalness: 0.75,
    //     roughness: 0,
    //     color: "black",
    //   });

    //   applyProps(materials.Chrome, { metalness: 1, roughness: 0, color: "#333" });
    //   applyProps(materials.BreakDiscs, {
    //     metalness: 0.2,
    //     roughness: 0.2,
    //     color: "#555",
    //   });
    //   applyProps(materials.TiresGum, {
    //     metalness: 0,
    //     roughness: 0.4,
    //     color: "#181818",
    //   });
    //   applyProps(materials.GreyElements, { metalness: 0, color: "#292929" });

    //   applyProps(materials.emitbrake, {
    //     emissiveIntensity: 3,
    //     toneMapped: false,
    //   });
    //   applyProps(materials.LightsFrontLed, {
    //     emissiveIntensity: 3,
    //     toneMapped: false,
    //   });

    //   nodes.yellow_WhiteCar_0.material = new THREE.MeshPhysicalMaterial({
    //     roughness: 0.3,
    //     metalness: 0.05,
    //     color: "#111",
    //     envMapIntensity: 0.75,
    //     clearcoatRoughness: 0,
    //     clearcoat: 1,
    //   });
    // }, [nodes, materials]);
    // const [paraVal,setParaVal] = useState<paraType>({rotateY : 0,transX : 0,transZ : 0});

    // useEffect(()=>{
    //   const scrollY = scroll.offset * 10;
    //   setParaVal(dimenstions(scrollY,paraVal.rotateY,paraVal.transX,paraVal.transZ))
    // },[scroll.offset])

    const steps = [
        {
            point: 2.5,
            color: "green",
            xMultiple: 0,
            zMultiple: -5,
            xOffset: 0,
            zOffset: 0,
        },
        {
            point: 5,
            color: "black",
            xMultiple: 3,
            zMultiple: 5,
            xOffset: 0,
            zOffset: -5,
        },
        {
            point: 10,
            color: "blue",
            xMultiple: -3,
            zMultiple: 0,
            xOffset: 3,
            zOffset: 0,
        },
    ];
    useFrame(() => {
        console.log("hi");
        if (ref.current) {
            const scrollY = scroll.offset * 10;

            if (scrollY <= steps[0].point && scrollY >= 0) {
                ref.current.rotation.y = (Math.PI / 2) * (scrollY / 2.5);
                ref.current.position.z =
                    steps[0].zOffset + (scrollY / 2.5) * steps[0].zMultiple;
                ref.current.position.x =
                    steps[0].xOffset +
                    ((scrollY - 2.5) / 2.5) * steps[0].xMultiple;
                scene.traverse((child) => {
                    if (child.isMesh && child.material.name === "WhiteCar") {
                        child.material.color.set(steps[0].color);
                    }
                });
            } else if (scrollY > steps[0].point && scrollY <= steps[1].point) {
                ref.current.rotation.y = (Math.PI / 2) * (scrollY / 2.5);
                ref.current.position.z =
                    steps[1].zOffset +
                    ((scrollY - 2.5) / 2.5) * steps[1].zMultiple;
                ref.current.position.x =
                    steps[1].xOffset +
                    ((scrollY - 2.5) / 2.5) * steps[1].xMultiple;

                scene.traverse((child) => {
                    if (child.isMesh && child.material.name === "WhiteCar") {
                        child.material.color.set(steps[1].color);
                    }
                });
            } else if (scrollY > steps[1].point && scrollY <= steps[2].point) {
                ref.current.rotation.y = (Math.PI / 2) * (scrollY / 2.5);
                ref.current.position.z =
                    steps[2].zOffset +
                    ((scrollY - 5) / 10) * steps[2].zMultiple;
                ref.current.position.x =
                    steps[2].xOffset +
                    ((scrollY - 5) / 10) * steps[2].xMultiple;
                scene.traverse((child) => {
                    if (child.isMesh && child.material.name === "WhiteCar") {
                        child.material.color.set(steps[2].color);
                    }
                });
            }
        }
    });
    return <primitive ref={ref} object={scene} {...props} />;
}

// type paraType = {
//   rotateY:number,
//   transX:number,
//   transZ:number
// }

// export function dimenstions(scrollY:number,y:number,x:number,z:number):paraType{
//   let rotatey:number = 0;
//   let translatex:number = 0;
//   let translatez:number = 0;

//   if(scrollY<=2.5)
//     {
//       rotatey = Math.PI / 2 * (scrollY/2.5);
//       translatez = z - (scrollY/2.5)*5;
//     }
//   else if(scrollY>2.5 && scrollY<=5)
//     {
//       rotatey = Math.PI / 2 * (scrollY/2.5);
//       translatez = z + ((scrollY-2.5)/2.5)*5;
//       translatex = x + ((scrollY-2.5)/2.5)*3;
//     }
//   return {rotateY:rotatey,transX:translatex,transZ:translatez};
// }
