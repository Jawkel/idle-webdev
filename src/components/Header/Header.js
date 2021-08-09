import React from "react";
import styled from "styled-components/macro";
import {AppBar, Button, Grid, Toolbar, Typography} from "@material-ui/core";
import {LocalAtm} from "@material-ui/icons";

const Header = ({score, buy, setBuy, scorePerSec}) => {
    const buyRange = [1, 10, 50, "Max"];

    const handleBuy = () => {
        let index = buyRange.indexOf(buy);
        index = index === buyRange.length - 1 ? 0 : index + 1;
        setBuy(buyRange[index]);
    };

    // console.log(scorePerSec);

    const formatScore = (score, perSec = false) => {
        if (perSec)
            score = score.mul(10);
        if (score.exponent >= 3) {
            if (score.exponent < 6) {
                return `${(Math.round(score.mantissa / Math.pow(10, 3 - score.exponent) * 100) / 100).toFixed(3)}K`;
            } else if (score.exponent < 9) {
                return `${(Math.round(score.mantissa / Math.pow(10, 6 - score.exponent) * 100) / 100).toFixed(3)}M`;
            } else if (score.exponent < 12) {
                return `${(Math.round(score.mantissa / Math.pow(10, 9 - score.exponent) * 100) / 100).toFixed(3)}B`;
            } else {
                return `${(Math.round(score.mantissa / Math.pow(10, 12 - score.exponent) * 100) / 100).toFixed(3)}T`;
            }
        } else return score.toString();
    };
    // const formatScorePerSec = (score) => {
    //     let scorePer = score.mul(10);
    //     if (score.exponent >= 3) {
    //         if (scorePer.exponent < 6) {
    //             // console.log(scorePer);
    //             return `${(Math.round(scorePer.mantissa / Math.pow(10, 3 - scorePer.exponent) * 100) / 100).toFixed(3)}K`;
    //         } else if (scorePer.exponent < 9) {
    //             return `${(Math.round(scorePer.mantissa / Math.pow(10, 6 - scorePer.exponent) * 100) / 100).toFixed(3)}M`;
    //         } else if (scorePer.exponent < 12) {
    //             return `${(Math.round(scorePer.mantissa / Math.pow(10, 9 - scorePer.exponent) * 100) / 100).toFixed(3)}B`;
    //         } else {
    //             return `${(Math.round(scorePer.mantissa / Math.pow(10, 12 - scorePer.exponent) * 100) / 100).toFixed(3)}T`;
    //         }
    //     } else return scorePer.toString();
    // };

    return (
        <AppBar color="default">
            <Toolbar>
                <Grid container justifyContent="space-around">
                    <Grid item xs={4} align="left">
                        <h2>${formatScore(score)}</h2>
                    </Grid>
                    <Grid item xs={4}>
                        <Flex>
                            <LocalAtm/>
                            <Typography variant="h5" align="center">/s: {formatScore(scorePerSec, true)}
                            </Typography>
                        </Flex>
                    </Grid>
                    <Grid item xs={4} align="right">
                        <Button startIcon={<LocalAtm/>} variant="contained" onClick={handleBuy}>Buy {buy}</Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Header;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
// const HeaderStyled = styled.div`
// position: sticky;
// top: 0;
// z-index: 1;
// background-color: white;
// display: flex;
// justify-content: space-between;
// align-items: center;
// height: 3rem;
// border-bottom: 1px solid grey;
// /* margin: 0 3.5rem; */
//
// h2 {
//     margin-left: 3.5rem;
//   }
//
//   button {
//     margin-right: 3.5rem;
//     padding: 5px 10px;
//     background-color: rgba(0, 0, 0, 0.1);
//     border: 1px solid grey;
//     border-radius: 3px;
//   }
// `;
//
