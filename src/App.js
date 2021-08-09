import React, {useState} from "react";
import "./App.css";
import Decimal from "break_infinity.js";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

function App() {
    const [score, setScore] = useState(new Decimal(0));
    const [scorePerSec, setScorePerSec] = useState(new Decimal(0));
    const [buy, setBuy] = useState(1);


    const incrementScore = (score2, gain) => {
        console.log(gain);
        setScore(score2.plus(gain).floor());
    };

    const decrementScore = (price) => {
        setScore(score.minus(price).floor());
    };
    return (
        <div className="App">
            <Header score={score.toString()} buy={buy} setBuy={setBuy} scorePerSec={scorePerSec}/>
            <Main
                score={score}
                buy={buy}
                scorePerSec={scorePerSec}
                setScorePerSec={setScorePerSec}
                incrementScore={incrementScore}
                decrementScore={decrementScore}
            />
        </div>
    );
}

export default App;
