import React, { useState } from "react";
import styled from "styled-components/macro";

const Worker = ({
  worker,
  stats,
  //   getScore,
  incrementScore,
  buy,
  score,
  buyWorker,
}) => {
  const [click, setClick] = useState(false);
  const buyDisplay = buy === "Max" ? 100 - stats.nb : buy;
  const price = worker.cost * buyDisplay;

  const handleIncrement = (gain) => {
    incrementScore(gain);
  };
  return (
    <WorkerStyled>
      <Img
        onClick={() => {
          if (click || (stats && stats.nb === 0)) return;
          setClick(true);
          setTimeout(() => {
            handleIncrement(worker.gain * stats.nb);
            setClick(false);
          }, worker.gainTime * 1000);
        }}
      >
        <Nb>{stats.nb} / 100</Nb>
        <img src={worker.avatar} alt="Worker" width="100%" height="100%" />
      </Img>
      <Operation>
        <Task className={click ? "working" : ""} timing={worker.gainTime}>
          {worker.task}
        </Task>
        <Buy
          canBuy={price <= score}
          disabled={price > score}
          onClick={() => buyWorker(worker.name, worker.cost)}
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

const Nb = styled.span`
  position: absolute;
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
