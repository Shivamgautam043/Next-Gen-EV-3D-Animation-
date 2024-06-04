import { LoaderFunction } from "@remix-run/node";
import App from "~/components/bike";

export const loader :LoaderFunction = async ()=>{
  return null;
}

export default function HeroSection(){
  return (
    <>
    <App />
    </>
  )
}
