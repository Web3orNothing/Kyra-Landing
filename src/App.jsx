import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Background from "./components/layouts/Background.jsx";
import Landing from "./components/layouts/Landing.jsx";

export default function App() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Update dimensions on window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const canvasStyle = {
    width: dimensions.width > 640 ? "100vw" : "100vw", // Full width for all sizes
    height: dimensions.width > 640 ? "100vh" : "120vh", // Different heights for mobile and desktop
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  };

  return (
    <Fragment>
      <BrowserRouter>
        <div className="relative bg-black">
          <Background {...canvasStyle} />
          <div className="absolute bg-black opacity-90 w-full h-full top-0 left-0"></div>
          <Landing />
        </div>
      </BrowserRouter>
    </Fragment>
  );
}
