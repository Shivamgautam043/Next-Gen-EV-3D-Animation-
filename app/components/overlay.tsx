import { Scroll, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";
export const Overlay = () => {
    const scroll=useScroll();
    const[opacityFirstSection,setOpacityFirstSection]=useState(1);
    const[opacitySecondSection,setOpacitySecondSection]=useState(1);
    const[opacityThirdSection,setOpacityThirdSection]=useState(1);    

    // useFrame(()=>{
    //     setOpacityFirstSection(1-scroll.range(0,1/3));
    //     setOpacitySecondSection(1-scroll.range(0,1/3));
    //     setOpacityThirdSection(1-scroll.range(0,1/3));
    // })

    return (
        <>
            <Scroll html>
                <div className="tw-w-screen">
                <Section right>
                    <h1 className=" ">Shivam fsfsfsf</h1>
                    <p className="tw-mt-3 tw-text-black">Backend</p>
                    <ul className="tw-leading-9">
                        <li>shivam 1</li>
                        <li>shivam 2</li>
                        <li>shivam 3</li>
                    </ul>
                </Section>
                <Section>
                    <h1 className="tw-bg-blue-100  ">Shivam fsfsfsf</h1>
                    <p className="tw-mt-3">Backend</p>
                    <ul className="tw-leading-9">
                        <li>shivam 1</li>
                        <li>shivam 2</li>
                        <li>shivam 3</li>
                    </ul>
                </Section>
                <Section right>
                    <h1 className="tw-bg-blue-100  ">Shivam fsfsfsf</h1>
                    <p className="tw-mt-3">Backend</p>
                    <ul className="tw-leading-9">
                        <li>shivam 1</li>
                        <li>shivam 2</li>
                        <li>shivam 3</li>
                    </ul>
                </Section>
                </div>
            </Scroll>
           
        </>
    );
};

const Section = (props) => {
    return (
        <section className={`tw-h-screen tw-flex tw-flex-col tw-justify-center tw-p-10 ${props.right? 'tw-items-end':'tw-items-start' }`}>
            <div className="tw-flex tw-items-center tw-justify-center">
                <div className="tw-max-w-sm w-full">
                    <div className="tw-bg-white tw-rounded-lg tw-px-4 tw-py-4 !tw-text-[black]">
                    {props.children}
                    </div>
                </div>
            </div>
        </section>
    );
};
