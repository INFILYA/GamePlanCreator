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
      height: "95%",
    },
    title: {
      verticalAlign: "middle",
      enabled: false,
      text:
        link === "Attack"
          ? `<b style="font-size:calc((var(--normal-text-size-value) - 1) * 3vmax + 0.5rem)">Attack</b>`
          : `<b style="font-size:calc((var(--normal-text-size-value) - 1) * 3vmax + 0.5rem)">Service</b>`,
    },
    tooltip: {
      headerFormat: '<span style="font-size:1.5vw">{series.name}</span><br>',
      pointFormat: '<span style="font-size:1.5vw"><b>{point.name}</b></span>',
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        colorByPoint: true,
        colors,
        type: "pie",
        size: "100%",
        innerSize: "50%",
        dataLabels: {
          enabled: true,
          crop: true,
          format: `<b>{point.percentage:.0f}%</b>`,
          distance: "-25%",
          style: {
            fontWeight: "bold",
            fontSize: "calc((var(--normal-text-size-value) - 1) * 3vmax + 0.2rem)",
            color: "black",
          },
        },
        showInLegend: false,
      },
    },
    series: [
      {
        name: link === "Attack" ? "Attack" : "Service",
        type: "pie",
        allowPointSelect: false,
        data: [
          [link === "Attack" ? "Win" : "Ace", rightPercentageForDiagramm(0), true],
          [link === "Attack" ? "In Game" : "Plus", rightPercentageForDiagramm(1), false],
          [link === "Attack" ? "Block" : "Minus", rightPercentageForDiagramm(2), false],
          ["Error", rightPercentageForDiagramm(3), false],
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
