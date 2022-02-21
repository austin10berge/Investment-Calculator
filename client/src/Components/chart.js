import React from 'react'
import { createChart } from 'lightweight-charts'
// MongoDB creds - investment:tracker 

// Polygon API Key: ######################
// URL:             https://api.polygon.io/v2/aggs/ticker/SPY/range/1/month/2021-01-01/2021-12-31?adjusted=true&sort=asc&limit=120&apiKey=###################

//console.log(data);
let apiData;

class chartData {
    constructor(time, value) {
        this.time = time;
        this.value = value;
    }
}

let year = [];
let yearObjs = {};

// Chart two for when I'm ready for it
// const chart_two = createChart(document.body, { width: 400, height: 300 });
// const baselineSeries = chart_two.addBaselineSeries();
// baselineSeries.setData([
//     { time: '2019-04-11', value: 80.01 },
//     { time: '2019-04-12', value: 96.63 },
//     { time: '2019-04-13', value: 76.64 },
//     { time: '2019-04-14', value: 81.89 },
//     { time: '2019-04-15', value: 74.43 },
//     { time: '2019-04-16', value: 80.01 },
//     { time: '2019-04-17', value: 96.63 },
//     { time: '2019-04-18', value: -76.64 },
//     { time: '2019-04-19', value: -81.89 },
//     { time: '2019-04-20', value: 74.43 },
//     { time: '2019-04-21', value: 124.43 },
//     { time: '2019-04-22', value: 40 }
// ]);


export default function Chart(portfolio, portfolioTotal, totalTracker, startMonth, startYear, multiplier) {
    const chart_one = createChart(document.body, { width: 400, height: 300 });
    const areaSeries = chart_one.addAreaSeries();
    // console.log("Portfolio: ")
    // console.log(portfolio)
    // console.log(portfolioTotal)
    // console.log("Tracker" + totalTracker);
    
    let j = 0;
    let m = parseInt(startMonth);

    for (let i = 0; i <= totalTracker.length; i++) {
        // let dateTemp = startYear + '-' + m + '-01';
        year[i] = new chartData(startYear + '-' + m + '-01', totalTracker[i] ); 
        //console.log(m);
        m++;
        if (multiplier == 2){
            m++;
        }
        if (m >= 13) {
            m = 1;
            let parse = (parseInt(startYear)+1);
            startYear = parse.toString();
        }
    }
    console.log("Year:");
    console.log(year);
    areaSeries.setData([
        ...year
       
    ]);
    //console.log(year)

    return (
        <div>
            <h1>Chart</h1>
        </div>
    )
}