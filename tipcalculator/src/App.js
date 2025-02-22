import { useState } from "react";

export default function App() {
  return (
    <div>
      <TipCalculator />
    </div>
  );
}

function TipCalculator() {
  const [bill, setBill] = useState("");
  const [perc1, setPerc1] = useState(0);
  const [perc2, setPerc2] = useState(0);

  const tip = (bill * ((perc1 + perc2) / 2 / 100)).toFixed(2);

  function reset() {
    setBill("");
    setPerc1(0);
    setPerc2(0);
  }

  return (
    <div>
      <BillInput billAmt={bill} onSetBill={setBill} />
      <Selecpercentage percentage={perc1} onSelect={setPerc1}>
        How was the Experience?
      </Selecpercentage>
      <Selecpercentage percenetage={perc2} onSelect={setPerc2}>
        What did your friend think about the experience?
      </Selecpercentage>
      <Output billAmt={bill} tip={tip} />
      <Reset reset={reset} />
    </div>
  );
}

function BillInput({ billAmt, onSetBill }) {
  return (
    <div>
      <label>How Much was the Bill?</label>
      <input
        type="text"
        placeholder="Enter amount..."
        value={billAmt}
        onChange={(e) => onSetBill(Number(e.target.value))}
      ></input>
    </div>
  );
}

function Selecpercentage({ children, percentage, onSelect }) {
  return (
    <div>
      <label>{children}</label>
      <select
        value={percentage}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        <option value="0">Dissatisfied 0%</option>
        <option value="5">It was Okay 5%</option>
        <option value="10">It was Good 10%</option>
        <option value="20">It was Amazing 20%</option>
      </select>
    </div>
  );
}

function Output({ billAmt, tip }) {
  return (
    <div>
      <h3 style={{ fontWeight: "800" }}>
        You Pay ${Number(billAmt) + Number(tip)} (${billAmt} + ${tip})
      </h3>
    </div>
  );
}

function Reset({ reset }) {
  return (
    <div>
      <button
        onClick={reset}
        style={{
          padding: "5px",
          width: "100px",
          fontWeight: "600",
          fontSize: "1rem",
        }}
      >
        Reset
      </button>
    </div>
  );
}
