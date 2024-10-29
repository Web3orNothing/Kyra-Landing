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
    <h1 className="text-center font-bold text-white gradient-text font-[gridlite] text-[1.4rem] md:text-[2.7rem]">
      {currentLine} <span className="font-orbitron">KYRA</span>
      {charIndex !== terminalContent[0].length && (
        <span className="cursor">|</span>
      )}
    </h1>
  );
}
