import React from "react";
import Plot from "react-plotly.js";
import "./EquityChart.css";

const EquityChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  const filtered = data.filter(row =>
    row[""] &&
    !isNaN(new Date(row[""])) &&
    !isNaN(parseFloat(row["equity"])) &&
    !isNaN(parseFloat(row["drawdown"])) &&
    !isNaN(parseFloat(row["utility"]))
  );

  const x = filtered.map(row => new Date(row[""]).toISOString().split("T")[0]);
  const equity = filtered.map(row => parseFloat(row["equity"]));
  const drawdown = filtered.map(row => parseFloat(row["drawdown"]));
  const utility = filtered.map(row => parseFloat(row["utility"]));

  return (
    <div className="equity-chart-container">
      <h3>Strategy Performance</h3>
      <Plot
        data={[
          {
            x,
            y: equity,
            type: "scatter",
            mode: "lines",
            name: "phantom_legacy",
            line: { color: "yellow", width: 2 },
            yaxis: "y1"
          },
          {
            x,
            y: drawdown,
            type: "scatter",
            mode: "lines",
            fill: "tozeroy",
            name: "drawdown_Equity",
            line: { color: "red" },
            yaxis: "y2"
          },
          {
            x,
            y: utility,
            type: "bar",
            name: "Utility",
            marker: { color: "turquoise" },
            yaxis: "y3"
          }
        ]}
        layout={{
          title: "Equity",
          height: 700,
          autosize: true,
          font: { color: "#fff" },
          paper_bgcolor: "#000",
          plot_bgcolor: "#000",
          grid: { rows: 3, columns: 1, pattern: "independent" },
          xaxis: {
            domain: [0, 1],
            anchor: "y3",
            showgrid: false
          },
          yaxis: {
            domain: [0.68, 1],
            title: "Equity",
            showgrid: true,
            gridcolor: "#333"
          },
          yaxis2: {
            domain: [0.34, 0.66],
            title: "Drawdown",
            showgrid: true,
            gridcolor: "#333"
          },
          yaxis3: {
            domain: [0, 0.32],
            title: "Utility",
            showgrid: true,
            gridcolor: "#333"
          },
          legend: {
            orientation: "h",
            y: -0.2,
            font: { color: "#fff" }
          },
          margin: {
            t: 40,
            l: 60,
            r: 20,
            b: 40
          }
        }}
        useResizeHandler
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default EquityChart;
