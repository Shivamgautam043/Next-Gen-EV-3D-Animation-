type stageParams = {
  limit: number;
  color: number[];
};

export function Color(t: number){
  const stages: stageParams[] = [
    {
      limit: 0,
      color: [255, 255, 255], // base color
    },
    {
      limit: 2.5,
      color: [0, 255, 0],
    },
    {
      limit: 5,
      color: [255, 0, 0],
    },
    {
      limit: 10,
      color: [0, 0, 255],
    },
    {
      limit: 30,
      color: [0, 0, 255],
    },
  ];
  const delta: number = 1; 
  let color: string = "";
  for (let i = 0; i < stages.length; i++) {
    if (t < stages[i].limit && i > 0) {
      if (t > stages[i].limit - delta && t < stages[i].limit) {
        console.log("this is t  = ", t);
        const normalT = (t - stages[i].limit + delta) / (delta);
        color = FindRGB(stages[i - 1].color, stages[i].color, normalT);
        console.log(color);
      } else {
        color = FindRGB(stages[i - 1].color, stages[i - 1].color, t);
      }
      break;
    } else {
      color = "rgb(255,255,255)"; // edge condition
    }
  }
  return color;
}

export function FindRGB(
  lowerColor: number[],
  upperColor: number[],
  t: number
){
  const r = Math.floor(lowerColor[0] * (1 - t) + upperColor[0] * t);
  const g = Math.floor(lowerColor[1] * (1 - t) + upperColor[1] * t);
  const b = Math.floor(lowerColor[2] * (1 - t) + upperColor[2] * t);

  const color: string = `rgb(${r},${g},${b})`;
  return color;
}
