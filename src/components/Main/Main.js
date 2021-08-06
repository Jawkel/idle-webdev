import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components/macro";
import {Workers, Steps} from "../../Workers";
import Worker from "./Worker";

const Main = ({score, incrementScore, decrementScore, buy}) => {
    const [total, setTotal] = useState(1);
    const [timer, setTimer] = useState(null);
    const [workersStats, setWorkersStats] = useState({
        UI: {
            nb: 1,
            gain: 1,
            gainTime: 1,
            gainStep: 1.05,
            unlock: true,
            step: 0,
        },
        "Dev Front": {
            nb: 0,
            gain: 4,
            gainTime: 2,
            gainStep: 1.1,
            unlock: false,
            step: 0,
        },
        "Dev CMS": {
            nb: 0,
            gain: 10,
            gainTime: 4,
            gainStep: 1.12,
            unlock: false,
            step: 0,
        },
        UX: {
            nb: 0,
            gain: 15,
            gainTime: 5,
            gainStep: 1.13,
            unlock: false,
            step: 0,
        },
        "Dev Back": {
            nb: 0,
            gain: 50,
            gainTime: 10,
            gainStep: 1.25,
            unlock: false,
            step: 0,
        },
        "Dev FullStack": {
            nb: 0,
            gain: 100,
            gainTime: 12,
            gainStep: 1.42,
            unlock: false,
            step: 0,
        },
        Agency: {
            nb: 0,
            gain: 1000,
            gainTime: 15,
            gainStep: 1.5,
            unlock: false,
            step: 0,
        },
        Cloud: {
            nb: 0,
            gain: 1000,
            gainTime: 30,
            gainStep: 2,
            unlock: false,
            step: 0,
        },
    });
    const scoreRef = useRef();
    scoreRef.current = score;
    const totalRef = useRef();
    totalRef.current = total;

    useEffect(() => {
        let subtotal = 0;
        for (const worker in workersStats) {
            subtotal += workersStats[worker].nb * workersStats[worker].gain / workersStats[worker].gainTime * Steps[workersStats[worker].step].timeDiviser * Math.pow(workersStats[worker].gainStep, (workersStats[worker].step + 1));
        }
        console.log(subtotal);
        setTotal(subtotal);
    }, [workersStats]);

    useEffect(() => {
        timer && clearInterval(timer);
        // Gaining half passively
        const _timer = setInterval(() => incrementScore(scoreRef.current, totalRef.current / 20), 100);
        setTimer(_timer);
    }, [total]);

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
