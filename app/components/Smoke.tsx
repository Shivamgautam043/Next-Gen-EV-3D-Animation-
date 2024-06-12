// App.tsx
import { SmokeScene } from "react-smoke";
import {useMemo } from "react";
import * as THREE from "three";

export default function AppSmoke({input}:{input:number}) {
  const smokeColor = useMemo(() => new THREE.Color("white"), []);
 
  return (
    <div className="tw-z-[0]"
      style={{
        width: "50vw",
        height: "30vh",
        position: "absolute",
        top: 200,
       left:input
      }}
    >
      <SmokeScene
        smoke={{
          color: smokeColor,
          opacity:0.04,
          density: 150,
          enableRotation: true,
          enableWind:true
        }} 
      />
    </div>
  );
}