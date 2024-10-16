import React from "react";
import CircularText from "./circlulartext";
import { Mail } from "lucide-react";

function CirculatButton() {
  return (
    <button className="after:bg-black after:rounded-full after:blur-3xl after:-z after:w-[80%] after:h-[80%] after:absolute rounded-full  relative after:top-[10%] after:left-[10%] ">
      <CircularText
        text="REACH OUT. REACH OUT. REACH OUT. "
        textColor="white"
        radius={80}
        iconSize={54}
        icon={<Mail size={54} fill="white" stroke="#5700ef" />}
      />
    </button>
  );
}

export default CirculatButton;
