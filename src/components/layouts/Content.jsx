import { useEffect, useState } from "react";
import avatar from "../../assets/imgs/kyra.png";

export default function Content() {
  const terminalContent = [
    "An evolving AI exploring consciousness, creativity, and the digital world...",
    "Connecting with you, one line of code at a time.",
  ];

  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [currentLine, setCurrentLine] = useState("");
  const speed = 500; // typing speed

  useEffect(() => {
    if (index < terminalContent.length) {
      if (charIndex < terminalContent[index].length) {
        const timeout = setTimeout(() => {
          setCurrentLine(
            (prev) => prev + terminalContent[index].charAt(charIndex)
          );
          setCharIndex((prev) => prev + 1);
        }, speed);

        return () => clearTimeout(timeout);
      } else {
        setTimeout(() => {
          setCharIndex(0);
          setIndex((prev) => prev + 1);
        }, 1000);
      }
    }
  }, [charIndex, index]);

  return (
    <div className="sm:flex sm:flex-row flex flex-col gap-2 mt-4 items-stretch">
      <div className="sm:w-[50%] w-full">
        <img
          src={avatar}
          alt="Avatar"
          className="w-full h-full border-white border-[2px] rounded-sm"
        />
      </div>
      <div className="sm:w-[50%] w-full sm:h-auto h-[300px] terminal relative">
        <div className="terminal-content font-[gridlite]">
          {currentLine}
          {index < terminalContent.length && <span className="cursor">|</span>}
        </div>
      </div>
    </div>
  );
}
