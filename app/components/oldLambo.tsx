import * as THREE from "three";
import {  useMemo, useRef} from "react";
import { applyProps, useFrame } from "@react-three/fiber";
import { useGLTF, useScroll } from "@react-three/drei";
import { Color } from "./colorSelector";
// type paraType = {
//   rotateY:number,
//   transX:number,
//   transZ:number
// }
export function OldLambo(props) {
  const scroll = useScroll();
  const { scene, nodes, materials } = useGLTF("/lambo.glb");
  const ref = useRef();

  useMemo(() => {
    Object.values(nodes).forEach((node) => {
      if (node.isMesh) {
        if (node.name.startsWith("glass")) node.geometry.computeVertexNormals();

        if (node.name === "silver_001_BreakDiscs_0")
          node.material = applyProps(materials.BreakDiscs.clone(), {
            color: "#ddd",
          });
      }
    });

    nodes["glass_003"].scale.setScalar(2.7);

    applyProps(materials.FrameBlack, {
      metalness: 0.75,
      roughness: 0,
      color: "black",
    });

    applyProps(materials.Chrome, { metalness: 1, roughness: 0, color: "#333" });
    applyProps(materials.BreakDiscs, {
      metalness: 0.2,
      roughness: 0.2,
      color: "#555",
    });
    applyProps(materials.TiresGum, {
      metalness: 0,
      roughness: 0.4,
      color: "#181818",
    });
    applyProps(materials.GreyElements, { metalness: 0, color: "#292929" });

    applyProps(materials.emitbrake, {
      emissiveIntensity: 3,
      toneMapped: false,
    });
    applyProps(materials.LightsFrontLed, {
      emissiveIntensity: 3,
      toneMapped: false,
    });

    nodes.yellow_WhiteCar_0.material = new THREE.MeshPhysicalMaterial({
      roughness: 0.3,
      metalness: 0.05,
      color: "#111",
      envMapIntensity: 0.75,
      clearcoatRoughness: 0,
      clearcoat: 1,
    });
  }, [nodes, materials]);
  // const [paraVal,setParaVal] = useState<paraType>({rotateY : 0,transX : 0,transZ : 0});
  
  // useEffect(()=>{
  //   const scrollY = scroll.offset * 10; 
  //   setParaVal(dimenstions(scrollY,paraVal.rotateY,paraVal.transX,paraVal.transZ))
  // },[scroll.offset])

  useFrame(() => {
    console.log("hi");
    if (ref.current) {
      const scrollY = scroll.offset * 10; 
      if(scrollY <= 2.5)
        {
          ref.current.rotation.y = Math.PI / 2 * (scrollY/2.5);
          ref.current.position.z = -(scrollY/2.5)*4;
        }
      else if(scrollY>2.5 && scrollY<=5)
        {
            ref.current.rotation.y = Math.PI / 2 * (scrollY/2.5);
            ref.current.position.z = -4 + ((scrollY-2.5)/2.5)*4;
            ref.current.position.x = ((scrollY-2.5)/2.5)*2;
        }
      else if(scrollY>5 && scrollY<=10)
        {
          ref.current.rotation.y = Math.PI / 2 * (scrollY/2.5);
          ref.current.position.x =2 - ((scrollY-5)/2.5)*2;
        }
        const temp:string = Color(scrollY);
        
    }
  });
  return <primitive ref={ref} object={scene} {...props} />;
}

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