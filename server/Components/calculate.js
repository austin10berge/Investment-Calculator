import React from 'react'
import Chart from './chart.js'

const data = require('../../client/src/Data/example.json');
const apiData = require('../server.js');
// const apiData = require('data').config({path:'../../../server/server.js'});
//require('dotenv').config({path:'../../.env'});

let startMonth = "01";
let startYear = "2020";
let initialInvestment = 200; // DCA amount
let portfolio = [];            // Each monthly investment after the month closes
let portfolioTotal = 0;        // Total 
let totalTracker = [];         // Full monthly portfolio array
let multiplier = 2;            // have to use multiplier param if over two years


export default function Calculate() {

    //localCalc(); 
    localCalc(startMonth);
    //console.log("TT: " + totalTracker);

    // Chart(portfolio, portfolioTotal, totalTracker, startMonth, startYear);

    return (
        true
    )
}

function localCalc() { // perform calculations using personally created database
    for (let i = parseInt(startMonth); i <= 12; i++) {
        let getRate = (data["2021"][i-1]["change"]);
        let rate = getRate / 100;
        let investmentChange;
        portfolioTotal += initialInvestment;
        investmentChange = rate * portfolioTotal;
        // if (getRate > 0) {
        //     investmentChange = rate * portfolioTotal;
        //     //console.log(rate + " positive");
        // } else {
        //     investmentChange = rate * portfolioTotal;
        //     //console.log(rate + " negative");
        // }

        console.log("Rate: " + getRate);
        investmentChange = rate * portfolioTotal; // Monthly investment after month closes
        
        portfolioTotal += investmentChange;
        console.log("Total: " + portfolioTotal);
        totalTracker.push(portfolioTotal);
        portfolio.push(investmentChange);
        
    }
    Chart(portfolio, portfolioTotal, totalTracker, startMonth, startYear);
}

function apiCalc(startMonth) {
    // API function
    const url = "https://api.polygon.io/v2/aggs/ticker/SPY/range/2/month/2019-01-31/2021-12-31?adjusted=true&sort=asc&limit=49000&apiKey=A0cAq1hPPHRZvActIiwgB4MItHd1giJE";
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let apiData = data.results;
            console.log(apiData);
            let k = 0; 
            if (multiplier > 1)
                initialInvestment *= 2;  
            for (let i = parseInt(startMonth); i <= 12; i++) {
                let rate = apiData[k].c / apiData[k].o;
                portfolioTotal += initialInvestment;
                //console.log("Rate: " + rate);
                if (multiplier > 1) {      // To calculate 2 months in one bar
                    i = i + multiplier - 1;
                }
        
                let investmentChange = rate * portfolioTotal; // Monthly investment after month closes
                portfolioTotal += investmentChange;
                console.log("Rate: " + rate);
                totalTracker.push(portfolioTotal);
                portfolio.push(investmentChange);

                k++;

                if (i >= 12 && apiData[k]) {
                    i = 1;
                }
            }
            //console.log("TT: " + totalTracker);
            Chart(portfolio, portfolioTotal, totalTracker, startMonth, startYear, multiplier);
    });
}
