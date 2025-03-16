import { useState, useEffect } from "react";

const content = [
  {
    summary: "React is a library for building UIs",
    details:
      "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "State management is like giving state a home",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "We can think of props as the component API",
    details:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

export default function App() {
  return (
    <div>
      <Tabbed content={content} />
    </div>
  );
}

function Tabbed({ content }) {
  const [activeTab, setActiveTab] = useState(0);

  // Handle left and right arrow key navigation
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "ArrowRight") {
        setActiveTab((prev) => (prev + 1) % content.length);
      } else if (e.key === "ArrowLeft") {
        setActiveTab((prev) => (prev - 1 + content.length) % content.length);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [content.length]);

  return (
    <div>
      <div className="tabs">
        {content.map((_, index) => (
          <Tab
            key={index}
            num={index}
            activeTab={activeTab}
            onClick={setActiveTab}
          />
        ))}
      </div>

      <TabContent item={content[activeTab]} />
    </div>
  );
}

function Tab({ num, activeTab, onClick }) {
  return (
    <button
      className={activeTab === num ? "tab active" : "tab"}
      onClick={() => onClick(num)}
    >
      Tab {num + 1}
    </button>
  );
}

function TabContent({ item }) {
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(() => {
    return JSON.parse(localStorage.getItem(item.summary)) || 0;
  });

  useEffect(() => {
    localStorage.setItem(item.summary, JSON.stringify(likes));
  }, [likes, item.summary]);

  function handleInc() {
    setLikes((prev) => prev + 1);
  }

  function handleUndo() {
    setLikes(0);
    setShowDetails(false);
  }

  function handleTrippleLikes() {
    setLikes((prev) => prev + 3);
  }

  function handleUndoLater() {
    setTimeout(handleUndo, 2000);
  }

  async function fetchRandomFact() {
    const response = await fetch(
      "https://uselessfacts.jsph.pl/random.json?language=en"
    );
    const data = await response.json();
    alert(`Random Fact: ${data.text}`);
  }

  return (
    <div className="tab-content">
      <h4>{item.summary}</h4>
      {showDetails && <p>{item.details}</p>}

      <div className="tab-actions">
        <button onClick={() => setShowDetails((h) => !h)}>
          {showDetails ? "Hide" : "Show"} details
        </button>

        <div className="hearts-counter">
          <span>{likes} ❤️</span>
          <button onClick={handleInc}>+</button>
          <button onClick={handleTrippleLikes}>+++</button>
        </div>
      </div>

      <div className="tab-undo">
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleUndoLater}>Undo in 2s</button>
      </div>

      <div className="tab-random">
        <button className="button" onClick={fetchRandomFact}>
          Get Random Fact
        </button>
      </div>
    </div>
  );
}
