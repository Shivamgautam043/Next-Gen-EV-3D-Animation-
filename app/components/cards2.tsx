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

export function Cards2({ index }: { index: number }) {
    const arr: CardData[] = [
        {
            fromPosition: -10,
            entryPosition: 9,
            leavePosistion: 50,
            stackedData: [
                {
                    heading: "MAGNUS EX",
                    text: "",
                    headingStyle: "tw-text-[32px] tw-italic tw-text-white tw-font-bold tw-mb-8  tw-mt-16",
                    textStyle: " tw-text-white  tw-opacity-[0.7]"
                },
                {
                    heading: "",
                    dangerouslySetHtml: `   <div class="tw-flex tw-gap-4"> <div> <div>1750cc</div> <div>290 kmph</div></div><div> <div>64 kW</div> <div>120 nM</div></div> </div>`, // Use dangerouslySetHtml for HTML content
                    headingStyle: "tw-text-[32px] tw-italic tw-text-white tw-font-bold  tw-text-white",
                    textStyle: " tw-text-[32px] tw-italic tw-font-bold tw-text-white"
                }
            ]
        },
        // Other items remain unchanged
        {
            fromPosition: -30,
            entryPosition: 10,
            leavePosistion: 100,
            stackedData: [
                {
                    heading: "Advanced Lighting",
                    text: "Advanced lighting technology enhances the safety and aesthetics of our EV scooty, providing superior visibility in low-light conditions.",
                    headingStyle: "tw-text-[32px] tw-italic tw-text-white tw-font-bold ",
                    textStyle: "tw-w-[320px] tw-text-white tw-italic  tw-opacity-[0.7] ",
                }
            ]
        },
        {
            fromPosition: 0,
            entryPosition: 30,
            leavePosistion: -50,
            stackedData: [
                {
                    heading: "Radial Tires And 6-Spoke Wheels",
                    dangerouslySetHtml: ` <div class="tw-flex tw-flex-col tw-gap-4">
                    <div>Durable</div>
                    <div>Sleek</div>
                    <div>Modern</div>
                    <div>Robust</div>
                    <div>Stylish</div>
                    </div>`,
                    headingStyle: "tw-text-[32px] tw-italic tw-text-white tw-font-bold tw-mt-16",
                    textStyle: "tw-text-[22px]  tw-italic tw-font-semiBold tw-text-white tw-mt-32 tw-opacity-[0.7]",
                }
            ]
        },
        {
            fromPosition: 200,
            entryPosition: 40,
            leavePosistion: 200,
            stackedData: [
                {
                    heading: "A Chassis With A Light Frame ",
                    text: "The EV scooty boasts a chassis with a light frame, engineered for optimal agility and maneuverability. This lightweight construction enhances overall efficiency, contributing to longer battery life and extended riding range. ",
                    headingStyle: "tw-text-[32px] tw-italic tw-text-white tw-font-bold tw-mb-8  tw-mt-16",
                    textStyle: "tw-text-white tw-italic tw-w-[160px] tw-pt-24 tw-opacity-[0.7] tw-text-end tw-ml-48",
                }
            ]
        },
        {
            fromPosition: -10,
            entryPosition: 9,
            leavePosistion: -100,
            stackedData: [
                {
                    heading: "MAGNUS EX",
                    text: "",
                    headingStyle: "tw-text-[32px] tw-italic tw-text-white tw-font-bold tw-mb-8  tw-mt-16",
                    textStyle: " tw-text-white  tw-opacity-[0.7]"
                },
                {
                    heading: "",
                    dangerouslySetHtml: `   <div class="tw-flex tw-gap-4"> <div> <div>1750cc</div> <div>290 kmph</div></div><div> <div>64 kW</div> <div>120 nM</div></div> </div>`, // Use dangerouslySetHtml for HTML content
                    headingStyle: "tw-text-[32px] tw-italic tw-text-white tw-font-bold  tw-text-white",
                    textStyle: " tw-text-[32px] tw-italic tw-font-bold tw-text-white"
                }
            ]
        },
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
                        " ",
                        arr[item].stackedData.length > 1
                            ? "!tw-flex tw-justify-between !tw-flex-col tw-gap-72 tw-items-center"
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
