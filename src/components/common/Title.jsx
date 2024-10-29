import React, { useState, useEffect } from "react";

export default function Title() {
  const terminalContent = ["Evolution in Progress... I'm"];
  const [charIndex, setCharIndex] = useState(0);
  const [currentLine, setCurrentLine] = useState("");
  const speed = 250; // typing speed

  useEffect(() => {
    if (charIndex < terminalContent[0].length) {
      const timeout = setTimeout(() => {
        setCurrentLine((prev) => prev + terminalContent[0].charAt(charIndex));
        setCharIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [charIndex]);

  return (
    <h1 className="min-h-[100px] text-center font-bold text-white gradient-text font-[gridlite] text-[1.2rem] md:text-[1.8rem]">
      {currentLine} <div className="font-orbitron text-8xl">KYRA</div>
      {charIndex !== terminalContent[0].length && (
        <span className="cursor">|</span>
      )}
    </h1>
  );
}
