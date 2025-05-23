import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App() {
  const [step, setStep] = useState(1);
  const [isOpened, setIsOpened] = useState(true);

  function toggle() {
    setIsOpened(!isOpened);
  }
  //use functions for state changes instead of directly changing the state
  //functions are best for async operations and it makes sures that the state is updated correctly and right data is used
  function handlePrevious() {
    if (step > 1) {
      setStep((s) => s - 1);
    }
  }
  function handleNext() {
    if (step < 3) {
      setStep((s) => s + 1);
    }
  }
  return (
    <>
      <button className="close" onClick={toggle}>
        {isOpened ? "X" : "+"}
      </button>
      {isOpened && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>
          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#ffffff" }}
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#ffffff" }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
