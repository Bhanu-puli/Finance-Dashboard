import SummaryCards from "./components/SummaryCards";
import TransactionList from "./components/TransactionList";
import Charts from "./components/Charts";
import RoleSwitcher from "./components/RoleSwitcher";
import Insights from "./components/Insights";

function App() {
  return (
    <div className="container">
      <h1>Finance Dashboard</h1>
      <RoleSwitcher />
      <SummaryCards />
      <Charts />
      <Insights />
      <TransactionList />
    </div>
  );
}

export default App;