import "./App.css";
import { useState, useMemo } from "react";

export default function App() {
  const [countOne, setCountOne] = useState(0);
  const [countTwo, setCountTwo] = useState(0);

  const handleCountOne = () => {
    setCountOne(countOne + 1);
  };

  const handleCountTwo = () => {
    setCountTwo(countTwo + 1);
  };

  const isEven = useMemo(() => {
    let i = 0;
    while (i < 200000000) i++;

    return countOne % 2 === 0;
  }, [countOne]);

  return (
    <div className="App">
      <div className="mb">
        <button onClick={handleCountOne}>CountOne - {countOne}</button>
        &nbsp; {isEven ? "Even" : "Odd"}
      </div>

      <div>
        <button onClick={handleCountTwo}>CountTwo - {countTwo}</button>
      </div>
    </div>
  );
}
