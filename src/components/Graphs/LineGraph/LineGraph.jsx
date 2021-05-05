import React, {useEffect, useMemo, useState} from 'react'
import {Line} from 'react-chartjs-2'
import numeral from 'numeral'

const options = {
  elements: {
    point: {
      radius: 1,
    },
  },
  legend: {
    display: false
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data?.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

const LineGraph = ({label, casesType = 'cases', data}) => {
  const chartData = useMemo(() => buildChartData(data, casesType), [data, casesType])
  const [key, setKey] = useState(Math.random())

  useEffect(() => setKey(prev => prev + 1), [casesType, data])
  /*const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      covidAPI.getCountryHistories(country, lastDays)
        .then((data) => {
          let chartData = buildChartData(data, casesType);
          setData(chartData);
        });
    };

    fetchData();
  }, [casesType, country, lastDays]);*/

  return (
    <div>
      {chartData?.length > 0 && (
        <Line
          key={key}
          data={{
            datasets: [
              {
                label: label,
                backgroundColor: casesType === 'cases' ? 'rgba(204, 16, 52, 0.5)' : casesType === 'deaths' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(9, 179, 0, 0.5)' ,
                borderColor: casesType === 'cases' ? '#CC1034' : casesType === 'deaths' ? '#303030' : '#09b300',
                data: chartData,
                fill: true
              },
            ],
          }}
          options={options}
          height={200}
        />
      )}
    </div>
  );
}

export default React.memo(LineGraph)
