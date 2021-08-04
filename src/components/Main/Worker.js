import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components/macro";
import Decimal from "break_infinity.js";
import { Steps } from "../../Workers";

const Worker = ({
  worker,
  stats,
  incrementScore,
  buy,
  score,
  buyWorker,
  unlock,
}) => {
  const [click, setClick] = useState(false);

  useEffect(() => {
    let stat = { ...stats };
    stat.unlock = true;
    unlock(worker.name, stat);
  }, []);

  let buyDisplay =
    buy === "Max"
      ? Math.min(
          Math.floor(score / new Decimal(worker.cost)),
          Steps[stats.step].limit - stats.nb
        )
      : buy;
  buyDisplay = buyDisplay === 0 ? 1 : buyDisplay;
  const price = worker.cost * buyDisplay;
  const scoreRef = useRef(score);
  scoreRef.current = score;

  //   const handleIncrement = (gain) => {
  //     incrementScore(gain);
  //   };
  return (
    <WorkerStyled>
      <Img
        onClick={() => {
          if (click || (stats && stats.nb === 0)) return;
          setClick(true);
          setTimeout(() => {
            incrementScore(scoreRef.current, worker.gain * stats.nb);
            setClick(false);
          }, (worker.gainTime / Steps[stats.step].timeDiviser) * 1000);
        }}
      >
        <Title>
          {Steps[stats.step].title} {worker.name}
        </Title>
        <Nb>
          {stats.nb} / {Steps[stats.step].limit}
        </Nb>
        <img src={worker.avatar} alt="Worker" width="100%" height="100%" />
      </Img>
      <Operation>
        <Task
          className={click ? "working" : ""}
          timing={worker.gainTime / Steps[stats.step].timeDiviser}
        >
          {worker.task}
        </Task>
        <Buy
          canBuy={
            price <= score &&
            stats.step < 4 &&
            stats.nb !== Steps[stats.step].limit
          }
          disabled={
            price > score ||
            (stats.step === 4 && stats.nb === Steps[stats.step].limit)
          }
          onClick={() => {
            buyWorker(worker.name, worker.cost, buyDisplay);
          }}
        >
          <span>Buy {buyDisplay}</span>
          <span>${price}</span>
        </Buy>
      </Operation>
    </WorkerStyled>
  );
};

export default Worker;

const WorkerStyled = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  margin-left: 2rem;
  margin-bottom: 1rem;
`;

const Img = styled.div`
  /* display: block; */
  position: relative;
  width: 100px;
  height: 100px;
`;

const Operation = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  align-items: flex-start;
`;

const Task = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  padding: 0.5rem 0;
  border: 1px solid grey;
  overflow: hidden;
  position: relative;

  &:after {
    background: #000;
    content: "";
    height: 42px;
    left: -101%;
    opacity: 0.2;
    position: absolute;
    transition: all 0s;
    width: 250px;
    z-index: -10;
  }

  &.working {
    &:after {
      left: 0;
      transition: all ${(props) => props.timing}s;
    }
  }
`;

const Title = styled.span`
  position: absolute;
  width: fit-content;
  top: -5%;
  left: 50%;
  padding: 5px 15px;
  font-size: 0.75rem;
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateX(-50%);
`;
const Nb = styled.span`
  position: absolute;
  width: fit-content;
  bottom: -17%;
  left: 50%;
  transform: translateX(-50%);
`;

const Buy = styled.button`
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-top: 0.25rem;
  padding: 0.25rem 0;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: ${(props) => (props.canBuy ? "green" : "red")};
  cursor: pointer;
`;
