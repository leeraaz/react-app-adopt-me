import React from "react";
import { render } from "react-dom";
import Pet from './Pet'

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Adopt Me!"),
    React.createElement(Pet, { name: "Coco", animal: "Dog", breed: "Pug" }),
    React.createElement(Pet, { name: "Suga", animal: "Bird", breed: "Parrot" }),
    React.createElement(Pet, { name: "Meow", animal: "Cat", breed: "Mix" }),
  ]);
};

render(React.createElement(App), document.getElementById("root"));
