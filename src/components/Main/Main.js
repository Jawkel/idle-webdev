import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components/macro";
import {Workers, Steps} from "../../Workers";
import Worker from "./Worker";

const Main = ({score, incrementScore, scorePerSec, setScorePerSec, decrementScore, buy}) => {

    const [timer, setTimer] = useState(null);
    const [workersStats, setWorkersStats] = useState({
        UI: {
            nb: 1,
            gain: 2,
            gainTime: 1,
            gainStep: 1.05,
            cost: 25,
            unlock: true,
            step: 0,
        },
        "Dev Front": {
            nb: 0,
            gain: 10,
            gainTime: 2,
            gainStep: 1.1,
            cost: 100,
            unlock: false,
            step: 0,
        },
        "Dev CMS": {
            nb: 0,
            gain: 45,
            gainTime: 4,
            gainStep: 1.12,
            cost: 1000,
            unlock: false,
            step: 0,
        },
        UX: {
            nb: 0,
            gain: 100,
            gainTime: 5,
            gainStep: 1.13,
            cost: 5000,
            unlock: false,
            step: 0,
        },
        "Dev Back": {
            nb: 0,
            gain: 500,
            gainTime: 10,
            gainStep: 1.25,
            cost: 10000,
            unlock: false,
            step: 0,
        },
        "Dev FullStack": {
            nb: 0,
            gain: 1000,
            gainTime: 12,
            gainStep: 1.42,
            cost: 25000,
            unlock: false,
            step: 0,
        },
        Agency: {
            nb: 0,
            gain: 10000,
            gainTime: 15,
            gainStep: 1.5,
            cost: 100000,
            unlock: false,
            step: 0,
        },
        Cloud: {
            nb: 0,
            gain: 100000,
            gainTime: 30,
            gainStep: 2,
            cost: 1000000,
            unlock: false,
            step: 0,
        },
    });
    const scoreRef = useRef();
    scoreRef.current = score;
    const scorePerSecRef = useRef();
    scorePerSecRef.current = scorePerSec;

    useEffect(() => {
        let subtotal = 0;
        for (const worker in workersStats) {
            subtotal += workersStats[worker].nb * workersStats[worker].gain / workersStats[worker].gainTime * Steps[workersStats[worker].step].timeDiviser * Math.pow(workersStats[worker].gainStep, (workersStats[worker].step + 1));
        }
        console.log(subtotal);
        // Gaining half passively on a 100ms timer (/2/10)
        setScorePerSec(Math.floor(subtotal / 20));
    }, [workersStats]);

    useEffect(() => {
        timer && clearInterval(timer);
        const _timer = setInterval(() => incrementScore(scoreRef.current, scorePerSecRef.current), 100);
        setTimer(_timer);
    }, [scorePerSec]);

    const unlock = (name, stat) => {
        setWorkersStats({...workersStats, [name]: stat});
    };

    const buyWorker = (name, cost, nb) => {
        const limit = Steps[workersStats[name].step].limit;
        const nbBuy = {...workersStats[name]};

        nbBuy.nb += nb;
        while (nbBuy.nb >= limit && nbBuy.step < 4) {
            nbBuy.nb = nbBuy.nb - limit;
            nbBuy.step++;
        }
        if (nbBuy.nb === 0 && nbBuy.step > 0) nbBuy.nb++;
        nbBuy.unlock = true;

        decrementScore(nb * cost);
        setWorkersStats({...workersStats, [name]: nbBuy});
    };

    return (
        <MainStyled>
            {Workers.filter(
                (worker) => score.gte(worker.cost) || workersStats[worker.name].unlock
            ).map((worker, idx) => (
                <Worker
                    key={idx}
                    buy={buy}
                    score={score}
                    worker={worker}
                    unlock={unlock}
                    stats={workersStats[worker.name]}
                    buyWorker={buyWorker}
                    incrementScore={incrementScore}
                />
            ))}
        </MainStyled>
    );
};

export default Main;

const MainStyled = styled.div`
  display: flex;
  flex-direction: column;
`;
