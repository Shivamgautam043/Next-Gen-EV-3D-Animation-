import { LoaderFunction } from "@remix-run/node";
import { Ampere_Animation } from "~/components/ampere";

export const loader: LoaderFunction = async ({ request }) => {
    return null;
};

export default function HeroSection() {
    return (
        <>
            <Ampere_Animation />
        </>
    );
}
