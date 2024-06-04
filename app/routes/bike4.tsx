import { LoaderFunction } from "@remix-run/node";
import App from "~/components/bike4";

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
