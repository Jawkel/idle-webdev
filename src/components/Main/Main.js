import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { Workers, Steps } from "../../Workers";
import Worker from "./Worker";

const Main = ({ score, incrementScore, decrementScore, buy }) => {
  const [workersStats, setWorkersStats] = useState({
    UI: {
      nb: 1,
      unlock: true,
      step: 0,
    },
    "Dev Front": {
      nb: 0,
      unlock: false,
      step: 0,
    },
    "Dev CMS": {
      nb: 0,
      unlock: false,
      step: 0,
    },
    UX: {
      nb: 0,
      unlock: false,
      step: 0,
    },
    "Dev Back": {
      nb: 0,
      unlock: false,
      step: 0,
    },
    "Dev FullStack": {
      nb: 0,
      unlock: false,
      step: 0,
    },
    Agency: {
      nb: 0,
      unlock: false,
      step: 0,
    },
    Cloud: {
      nb: 0,
      unlock: false,
      step: 0,
    },
  });

  useEffect(() => {
    console.log(workersStats);
  }, [workersStats]);

  const unlock = (name, stat) => {
    setWorkersStats({ ...workersStats, [name]: stat });
  };

  const buyWorker = (name, cost, nb) => {
    const limit = Steps[workersStats[name].step].limit;
    console.log("🚀 ~ file: Main.js ~ line 39 ~ name", name);
    console.log("🚀 ~ file: Main.js ~ line 39 ~ cost", cost);
    console.log("🚀 ~ file: Main.js ~ line 39 ~ nb", nb);
    console.log(
      "🚀 ~ file: Main.js ~ line 39 ~ Steps",
      Steps[workersStats[name].step]
    );
    // Je copie un sous objet
    const nbBuy = { ...workersStats[name] };

    // Je le modifie
    nbBuy.nb += nb;
    while (nbBuy.nb >= limit && nbBuy.step < 4) {
      nbBuy.nb = nbBuy.nb - limit;
      //   nbBuy.step += nbBuy.step >= 4 ? 0 : 1;
      nbBuy.step++;
    }
    if (nbBuy.nb === 0 && nbBuy.step > 0) nbBuy.nb++;
    nbBuy.unlock = true;

    decrementScore(nb * cost);
    setWorkersStats({ ...workersStats, [name]: nbBuy });
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
