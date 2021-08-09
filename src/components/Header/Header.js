import React from "react";
import styled from "styled-components/macro";

const Header = ({score, buy, setBuy, scorePerSec}) => {
    const buyRange = [1, 10, 50, "Max"];

    const handleBuy = () => {
        let index = buyRange.indexOf(buy);
        index = index === buyRange.length - 1 ? 0 : index + 1;
        setBuy(buyRange[index]);
    };

    return (
        <HeaderStyled>
            <h2>${score}</h2>
            <h2>$/sec: {scorePerSec * 10}</h2>
            <button onClick={handleBuy}>Buy {buy}</button>
        </HeaderStyled>
    );
};

export default Header;

const HeaderStyled = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  border-bottom: 1px solid grey;
  /* margin: 0 3.5rem; */

  h2 {
    margin-left: 3.5rem;
  }

  button {
    margin-right: 3.5rem;
    padding: 5px 10px;
    background-color: rgba(0, 0, 0, 0.1);
    border: 1px solid grey;
    border-radius: 3px;
  }
`;
