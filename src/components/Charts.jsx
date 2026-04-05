import { Bar, Pie } from "react-chartjs-2";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels
);

export default function Charts() {
  const { transactions } = useContext(AppContext);

    const categories = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      categories[t.category] =
        (categories[t.category] || 0) + t.amount;
    }
  });

  
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  return (
    <div className="charts-container">
      {/* PIE CHART */}
      <div className="chart-box">
        <h3>Spending Breakdown</h3>

        <div style={{ height: "100%", position: "relative" }}>
          <Pie
            data={{
              labels: Object.keys(categories),
              datasets: [
                {
                  data: Object.values(categories),
                  backgroundColor: [
                    "#ff6384",
                    "#36a2eb",
                    "#ffce56",
                    "#4bc0c0",
                    "#9966ff",
                    "#ff9f40",
                  ],
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false, 
              layout: {
                padding: 10,
              },
              plugins: {
                legend: {
                  position: "top",
                  labels: {
                    color: "white",
                    boxWidth: 12,
                  },
                },
                
              },
            }}
          />
        </div>
      </div>

      {/* BAR CHART */}
      <div className="chart-box">
        <h3>Income vs Expense</h3>

        <div style={{ height: "100%", position: "relative" }}>
          <Bar
            data={{
              labels: ["Income", "Expense"],
              datasets: [
                {
                  data: [income, expense],
                  backgroundColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) return;

                    
                    const gradientGreen = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
                    gradientGreen.addColorStop(0, "#43cea2");
                    gradientGreen.addColorStop(1, "#185a9d");

                    
                    const gradientRed = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
                    gradientRed.addColorStop(0, "#ff512f");
                    gradientRed.addColorStop(1, "#dd2476");

                    return [gradientGreen, gradientRed];
                  },
                  borderRadius: 10,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false, 
              layout: {
                padding: 10,
              },
              plugins: {
                legend: {
                  display: false,
                },
                datalabels: {
                  color: "white",
                  anchor: "center",
                  align: "center",
                  font: {
                    weight: "bold",
                    size: 14,
                  },
                },
              },
              scales: {
                x: {
                  ticks: {
                    color: "white",
                  },
                  grid: {
                    display: false,
                  },
                },
                y: {
                  ticks: {
                    color: "white",
                  },
                  grid: {
                    color: "rgba(255,255,255,0.1)",
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}