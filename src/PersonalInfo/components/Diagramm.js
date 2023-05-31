import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSelector } from "react-redux";
export default function Diagramm({ link }) {
  const playerInfo = useSelector((state) => state.playerInfo.playerInfo);
  const colors = ["lightgreen", "yellow", "orange", "orangered"];
  const options = {
    chart: {
      type: "pie",
      backgroundColor: null,
      width: 350,
      height: 450,
    },
    title: {
      text:
        link === "Attack"
          ? `<b style="font-size:30px">Attack</b>`
          : `<b style="font-size:30px">Service</b>`,
    },

    tooltip: {
      headerFormat: '<span style="font-size:30px">{series.name}</span><br>',
      pointFormat:
        '<span style="font-size:20px">{point.name}</span>: <b style="font-size:20px">{point.y:.0f}%</b>',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        colors,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: `<b>{point.percentage:.0f}%</b>`,
          distance: -50,
          style: {
            color: "black",
            fontWeight: "bold",
            fontSize: "20px",
          },
        },
        showInLegend: true,
      },
    },
    legend: {
      itemStyle: {
        color: "black",
        fontWeight: "bold",
        fontSize: "20px",
      },
    },
    series: [
      {
        name: link === "Attack" ? "Attack" : "Service",
        type: "pie",
        allowPointSelect: true,
        data: [
          [link === "Attack" ? "Win" : "Aces", rightPercentageForDiagramm(0), true],
          [link === "Attack" ? "In Game" : "Service +", rightPercentageForDiagramm(1), false],
          [link === "Attack" ? "Block" : "Service -", rightPercentageForDiagramm(2), false],
          [link === "Attack" ? "Loose" : "Service =", rightPercentageForDiagramm(3), false],
        ],
      },
    ],
  };

  function rightPercentageForDiagramm(index) {
    if (link === "Attack") {
      let totalAtt = [
        playerInfo.winPoints,
        playerInfo.leftInGame,
        playerInfo.attacksInBlock,
        playerInfo.loosePoints,
      ];
      const sumOfTotalAtt = totalAtt.reduce((a, b) => a + b, 0);
      const percentOfActions = totalAtt.map((att) => Math.round((att / sumOfTotalAtt) * 100));
      return percentOfActions[index];
    } else if (link === "Service") {
      let totalService = [
        playerInfo.aces,
        playerInfo.servicePlus,
        playerInfo.serviceMinus,
        playerInfo.serviceFailed,
      ];
      const sumOfTotalService = totalService.reduce((a, b) => a + b, 0);
      const percentOfActions = totalService.map((service) =>
        Math.round((service / sumOfTotalService) * 100)
      );
      return percentOfActions[index];
    }
  }
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
