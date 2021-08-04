import React, { useState } from "react";
import "./App.css";
import Decimal from "break_infinity.js";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

let score = new Decimal(0);
function App() {
  // const [score, setScore] = useState(new Decimal(0));
  const [buy, setBuy] = useState(1);

  const getScore = () => {
    return score;
  };

  const incrementScore = (gain) => {
    score.plus(gain).floor();
  };
  // const incrementScore = (score2, gain) => {
  //   setScore(score2.plus(gain).floor());
  // };
  const decrementScore = (price) => {
    score.minus(price).floor();
  };
  // const decrementScore = (price) => {
  //   setScore(score.minus(price).floor());
  // };
  return (
    <div className="App">
      <Header score={score.toString()} buy={buy} setBuy={setBuy} />
      <Main
        score={score}
        buy={buy}
        incrementScore={incrementScore}
        decrementScore={decrementScore}
        getScore={getScore}
      />
    </div>
  );
}

export default App;
