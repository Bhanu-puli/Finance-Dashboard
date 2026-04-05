import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Insights() {
  const { transactions } = useContext(AppContext);

  const categories = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      categories[t.category] =
        (categories[t.category] || 0) + t.amount;
    }
  });

  const maxCategory = Object.keys(categories).reduce((a, b) =>
    categories[a] > categories[b] ? a : b
  );
  let income = 0;
  let expense = 0;

  transactions.forEach((t) => {
    if (t.type === "income") income += t.amount;
    else expense += t.amount;
  });

  const savings = income - expense;

  let observation = "";
  if (expense > income) {
    observation = "⚠️ Your expenses are higher than income.";
  } else if (savings > 0) {
    observation = "✅ You are saving money this month.";
  } else {
    observation = "⚖️ Your income and expenses are balanced.";
  }

  return (
    <div className="insights">
      <h2 className="insights-title">Insights</h2>

      <div className="insights-grid">
        <p>
           <strong>Highest Spending:</strong> {maxCategory} 🛍️
        </p>
        <p>
           <strong>Monthly Income:</strong> ₹{income} 💸
        </p>

        <p>
           <strong>Monthly Expenses:</strong> ₹{expense} 📉
        </p>
        <p>
           <strong>Savings:</strong> ₹{savings} 💰
        </p>
      </div>

      <p className="insights-observation">
         <strong>Financial-Status:</strong> {observation}
      </p>
    </div>
  );
}