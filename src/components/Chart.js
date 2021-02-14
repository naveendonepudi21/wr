import { Line } from "@reactchartjs/react-chart.js";

function Chart({ next6days }) {
  const chartData = {
    labels: next6days.days,
    datasets: [
      {
        label: "Temperature",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: next6days.temps,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    responsiveAnimationDuration: 300,
    scales: {
      xAxes: [
        {
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
        },
      ],
    },
  };

  return <Line data={chartData} options={chartOptions} />;
}

export default Chart;
