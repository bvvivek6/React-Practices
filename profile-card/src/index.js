import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const skillsData = [
  { skill: "HTML", level: "Advanced", color: "#E34F26" },
  { skill: "CSS", level: "Advanced", color: "#1572B6" },
  { skill: "JavaScript", level: "Intermediate", color: "#F7DF1E" },
  { skill: "React", level: "Intermediate", color: "#61DAFB" },
  { skill: "Node.js", level: "Beginner", color: "#339933" },
  { skill: "MongoDB", level: "Beginner", color: "#47A248" },
  { skill: "Git", level: "Intermediate", color: "#F05032" },
  { skill: "Figma", level: "Advanced", color: "#F24E1E" },
];

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
    <div className="shine">
      <div className="card">
        <div>
          <Avatar />
          <h3 style={{ margin: "1rem", fontSize: "1rem", fontWeight: "500" }}>
            Hi, I’m Vivek, a UI/UX Designer and Frontend Developer with a
            passion for crafting intuitive digital experiences and building
            functional, user-centered web applications. I’m constantly honing my
            skills in React, MERN stack, and modern design principles.
          </h3>
          <Skillist />
        </div>
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

function Skillist() {
  return (
    <div className="skill-list">
      {skillsData.map((skill) => (
        <Skill skills={skill.skill} color={skill.color} level={skill.level} />
      ))}
    </div>
  );
}
function Skill({ skills, color, level }) {
  //using short circuting to display emoji based on level
  return (
    <div className="skill" style={{ backgroundColor: color }}>
      <span>{skills}</span>
      <span>
        {level === "Beginner" && "🤓"}
        {level === "Advanced" && "😎"}
        {level === "Intermediate" && "🧐"}
      </span>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
