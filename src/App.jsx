import React, { Fragment } from "react";
import Background from "./components/layouts/Background.jsx";
import Landing from "./components/layouts/Landing.jsx";

export default function App() {
  return (
    <Fragment>
      <div className="relative">
        <Background />
        <Landing />
      </div>
    </Fragment>
  );
}
