import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import Workers from "../../Workers";
import Worker from "./Worker";

const Main = ({ score, incrementScore, decrementScore, buy, getScore }) => {
  const [workersStats, setWorkersStats] = useState({
    UI: {
      nb: 1,
      unlock: true,
    },
    "Dev Front": {
      nb: 0,
      unlock: false,
    },
    "Dev CMS": {
      nb: 0,
      unlock: false,
    },
    UX: {
      nb: 0,
      unlock: false,
    },
    "Dev Back": {
      nb: 0,
      unlock: false,
    },
    "Dev FullStack": {
      nb: 0,
      unlock: false,
    },
    Agency: {
      nb: 0,
      unlock: false,
    },
    Cloud: {
      nb: 0,
      unlock: false,
    },
  });

  useEffect(() => {
    console.log(workersStats);
  }, [workersStats]);

  const buyWorker = (name, cost) => {
    console.log("🚀 ~ file: Main.js ~ line 39 ~ name", name);
    // Je copie un sous objet
    const nbBuy = { ...workersStats[name] };

    // Je le modifie
    nbBuy.nb += buy;
    nbBuy.unlock = true;

    decrementScore(buy * cost);
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
          getScore={getScore}
          worker={worker}
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
