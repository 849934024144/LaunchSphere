import { GradientText } from "../../components/ui/gradient-text"
import { HyperText } from "../../components/ui/hyper-text"
import { Typewriter } from "../../components/ui/typewriter"


"use client";
import { TextGenerateEffect } from "../../components/ui/text-generate-effect";

const words = `Oxygen gets you high. In a catastrophic emergency, we're taking giant, panicked breaths. Suddenly you become euphoric, docile. You accept your fate. It's all right here. Emergency water landing, six hundred miles an hour. Blank faces, calm as Hindu cows
`;

 const user=JSON.parse(localStorage.getItem('user'));

export function GradientTextBorderDemo() {
  return (
    <div className="space-y-8">
      {/* Basic example */}
      <GradientText
        colors={["#40ffaa", "#4079ff", "#40ffaa"]}
        animationSpeed={3}
        className="text-4xl font-semibold flex   text-center top-33 left-10"
      >
        <div className="flex ">
        <img src="LaunchSphere2.png" alt=""  className="w-[80px] h-[58px] "/> 
        <h2 >Hello , {user?.name}</h2>
        </div>
        
      </GradientText>
      {/* <div className="">
      <HyperText
      className="text-4xl font-bold text-white flex  mt-20 " 
      text="Your Gateway to Startup Success Starts Here."
    />
    
    </div> */}
    <div className="w-[770px] h-[30px] flex justify-center items-center text-center mt-50 lg:ml-103 md:ml-34 sm:ml-16  font-bold text-3xl md:text-5xl lg:text-6xl  ">
  <p className="whitespace-pre-wrap ">
    <span>{"🚀 We are here to "}</span>
    <Typewriter
      text={[
        "launch ideas",
        "build dreams",
        "ignite innovation",
        "empower founders",
        "create the future together",
      ]}
      speed={70}
      className="text-yellow-500"
      waitTime={1500}
      deleteSpeed={40}
      cursorChar={"_"}
    />
  </p>
</div>

    {/* <div className="flex justify-center items-center text-center mt-2 ml-100 w-[900px] h-[350px]">
    <TextGenerateEffect duration={2} filter={false} words={words} />;
    </div> */}
    </div>
  )
}

export function GradientTextDemo() {
  return (
    <div className="space-y-8">
      {/* With border */}
      <GradientText
        colors={["#ff40aa", "#40aaff", "#ff40aa"]}
        showBorder
        className="text-2xl font-medium px-4 py-2"
      >
        With Animated Border
      </GradientText>
    </div>
  )
}