import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

export default function TransactionList() {
  const { transactions, setTransactions, role, search, setSearch } = useContext(AppContext);
  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    type: "expense",
  });

  const filtered = transactions.filter((t) =>
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!form.date || !form.amount || !form.category) return;

    const newTransaction = {
      id: Date.now(),
      ...form,
      amount: Number(form.amount),
    };

    setTransactions([...transactions, newTransaction]);

    setForm({ date: "", amount: "", category: "", type: "expense" });
  };

  const handleDelete = (id) => {
    const updated = transactions.filter((t) => t.id !== id);
    setTransactions(updated);
  };

  return (
    <div>
      <h2 className="trans">Transactions:</h2>
      <input
        placeholder="Search... 🔍"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {role === "admin" && (
        <div className="form">
  <div className="form-row">
    <input
      type="date"
      value={form.date}
      onChange={(e) => setForm({ ...form, date: e.target.value })}
    />

    <input
      type="number"
      placeholder="Amount"
      value={form.amount}
      onChange={(e) => setForm({ ...form, amount: e.target.value })}
    />

    <input
      placeholder="Category"
      value={form.category}
      onChange={(e) => setForm({ ...form, category: e.target.value })}
    />

    <select
      value={form.type}
      onChange={(e) => setForm({ ...form, type: e.target.value })}
    >
      <option value="income">Income</option>
      <option value="expense">Expense</option>
    </select>

    <button onClick={handleAdd}>ADD</button>
  </div>
</div>
      )}

      <ul>
        {filtered.map((t) => (
          <li key={t.id}>
            {t.date} - ₹{t.amount} - {t.category} ({t.type})
            {role === "admin" && (
              <button onClick={() => handleDelete(t.id)}>
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}