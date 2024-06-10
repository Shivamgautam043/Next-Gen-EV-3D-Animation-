import { animated, useTransition } from "@react-spring/web";
import { concatenateNonNullStringsWithSpaces } from "./global-common-typescript/utilities/utilities";

type Content = {
    heading: string,
    headingStyle: string,
    text?: string,
    textStyle: string,
    dangerouslySetHtml?: string // New property to hold HTML content
};

type CardData = {
    fromPosition: number,
    entryPosition: number,
    leavePosistion: number,
    stackedData: Array<Content>
};

export function Cards({ index }: { index: number }) {
    const arr: CardData[] = [
        {
            fromPosition: 0,
            entryPosition: 160,
            leavePosistion: 0,
            stackedData: [
                {
                    heading: "MAGNUS EX",
                    text: "The Magnus EX e-scooty is a premium electric scooter designed for urban commuting, known for its impressive range and advanced features.",
                    headingStyle: "tw-text-[32px] tw-italic tw-text-white tw-font-bold tw-mb-8 tw-mt-24",
                    textStyle: " tw-text-white tw-w-[240px] tw-opacity-[0.7]"
                },
                {
                    heading: "1750cc",
                    dangerouslySetHtml: `   <div class="tw-flex tw-flex-col tw-gap-8"><div>290 kmph</div> <div>64 kW</div> <div>120 nM</div> </div>`, // Use dangerouslySetHtml for HTML content
                    headingStyle: "tw-text-[32px] tw-italic tw-text-white tw-font-bold tw-mb-8 tw-mt-24 tw-text-white tw-pr-96",
                    textStyle: " tw-text-[32px] tw-italic tw-font-bold tw-text-white"
                }
            ]
        },
        // Other items remain unchanged
        {
            fromPosition: 1200,
            entryPosition: 1000,
            leavePosistion: 1200,
            stackedData: [
                {
                    heading: "Advanced Lighting",
                    text: "Advanced lighting technology enhances the safety and aesthetics of our EV scooty, providing superior visibility in low-light conditions. The state-of-the-art LED headlights ensure a brighter, more focused beam for nighttime riding. Integrated ambient lighting adds a modern touch, enhancing the overall riding experience.  ",
                    headingStyle: "tw-text-[32px] tw-italic tw-text-white tw-font-bold tw-mt-32",
                    textStyle: "tw-w-[320px] tw-text-white tw-italic tw-mt-8 tw-opacity-[0.7]",
                }
            ]
        },
        {
            fromPosition: 350,
            entryPosition: 500,
            leavePosistion: 350,
            stackedData: [
                {
                    heading: "Radial Tires And 6-Spoke Wheels",
                    text: "Our EV scooty features advanced radial tires designed for superior grip and stability, ensuring a smooth ride on all surfaces. The robust 6-spoke wheels not only enhance durability but also add a sleek, modern look to the scooty. With these high-performance tires, riders can enjoy improved handling and reduced rolling resistance. Experience the perfect blend of style and function with our cutting-edge wheel design.",
                    headingStyle: "tw-text-[32px] tw-italic tw-text-white tw-font-bold tw-mt-16",
                    textStyle: "tw-text-white tw-italic tw-w-[460px] tw-opacity-[0.7]",
                }
            ]
        },
        {
            fromPosition: 1300,
            entryPosition: 1000,
            leavePosistion: 1300,
            stackedData: [
                {
                    heading: "A Chassis With A Light Frame ",
                    text: "The EV scooty boasts a chassis with a light frame, engineered for optimal agility and maneuverability. This lightweight construction enhances overall efficiency, contributing to longer battery life and extended riding range. Despite its minimal weight, the frame maintains exceptional strength and durability, ensuring a safe and sturdy ride. Experience the perfect balance of lightness and robustness with our innovative chassis design.",
                    headingStyle: "tw-text-[32px] tw-italic tw-text-white tw-font-bold tw-mt-64 ",
                    textStyle: "tw-text-white tw-italic tw-w-[460px] tw-pt-8 tw-opacity-[0.7]",
                }
            ]
        },
        {
            
            fromPosition: 0,
            entryPosition: 160,
            leavePosistion: 0,
            stackedData: [
                {
                    heading: "MAGNUS EX",
                    text: "The Magnus EX e-scooty is a premium electric scooter designed for urban commuting, known for its impressive range and advanced features.",
                    headingStyle: "tw-text-[32px] tw-italic tw-text-white tw-font-bold tw-mb-8 tw-mt-24",
                    textStyle: " tw-text-white tw-w-[240px] tw-opacity-[0.7]"
                },
                {
                    heading: "1750cc",
                    dangerouslySetHtml: `   <div class="tw-flex tw-flex-col tw-gap-8"><div>290 kmph</div> <div>64 kW</div> <div>120 nM</div> </div>`, // Use dangerouslySetHtml for HTML content
                    headingStyle: "tw-text-[32px] tw-italic tw-text-white tw-font-bold tw-mb-8 tw-mt-24 tw-text-white tw-pr-96",
                    textStyle: " tw-text-[32px] tw-italic tw-font-bold tw-text-white"
                }
            ]
        }
    ];

    const transitions = useTransition([index], {
        from: { opacity: 0, x: arr[index].fromPosition },
        enter: { opacity: 1, x: arr[index].entryPosition, display: "block" },
        leave: { opacity: 0, x: arr[index - 1]?.leavePosistion },
        exitBeforeEnter: true,
        config: { duration: 700 },
    });

    return (
        <>
            {transitions((styles, item) => (
                <animated.div
                    style={styles}
                    className={concatenateNonNullStringsWithSpaces(
                        "tw-m-10 ",
                        arr[item].stackedData.length > 1
                            ? "!tw-flex tw-justify-between tw-flex-row tw-w-screen"
                            : ""
                    )}
                >
                    {arr[item].stackedData.map((element, key) => (
                        <div key={key} className="">
                            <div className={element.headingStyle}>{element.heading}</div>
                            {element.dangerouslySetHtml ? (
                                <div
                                    className={element.textStyle}
                                    dangerouslySetInnerHTML={{ __html: element.dangerouslySetHtml }}
                                />
                            ) : (
                                <div className={element.textStyle}>{element.text}</div>
                            )}
                        </div>
                    ))}
                </animated.div>
            ))}
        </>
    );
}
