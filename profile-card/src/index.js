import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function App() {
  return (
    <div
      className="Cards"
      style={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}
    >
      <Card />
    </div>
  );
}

function Card() {
  return (
    <div className="card">
      <div>
        <Avatar />
        <h3 style={{ margin: "1rem", fontSize: "1rem", fontWeight: "500" }}>
          Hi, I’m Vivek, a UI/UX Designer and Frontend Developer with a passion
          for crafting intuitive digital experiences and building functional,
          user-centered web applications. I’m constantly honing my skills in
          React, MERN stack, and modern design principles.
        </h3>
        <Skilllist />
      </div>
    </div>
  );
}
function Avatar() {
  return (
    <div>
      <img className="avatar" src="avatar.jpeg" alt="Vivek" />
      <h1 style={{ margin: "1rem", fontSize: "1.5rem", fontWeight: "700" }}>
        BV Vivek
      </h1>
    </div>
  );
}

function Skilllist() {
  return (
    <div className="skill-list">
      <Skill skill="HTML+CSS" colors="#4A90E2" />
      <Skill skill="javaScript" colors="#E91172" />
      <Skill skill="React" colors="#50C878" />
      <Skill skill="Figma" colors="#FF6B6B" />
      <Skill skill="Web Design" colors="#9B51E0" />
    </div>
  );
}
function Skill(skills) {
  return (
    <div className="skill" style={{ backgroundColor: skills.colors }}>
      <span>{skills.skill}</span>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
