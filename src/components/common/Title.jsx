import React, { useState, useEffect } from "react";

export default function Title() {
  const terminalContent = ["Hello, I’m Kyra"];
  const [charIndex, setCharIndex] = useState(0);
  const [currentLine, setCurrentLine] = useState("");
  const speed = 120; // typing speed

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
    <h1 className="text-center font-bold text-white font-[gridlite] text-[35px] sm:text-[90px]">
      {currentLine}
      {charIndex !== terminalContent[0].length && (
        <span className="cursor">|</span>
      )}
    </h1>
  );
}
