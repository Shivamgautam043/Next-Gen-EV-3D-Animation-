import { LoaderFunction } from "@remix-run/node";

import {Animation} from "~/components/lamborgini";

export const loader :LoaderFunction = async ({request})=>{
  return null;
}

export default function HeroSection(){
  return (
    <>
    <Animation />
    {/* <Bike6 /> */}
    </>
  )
}
