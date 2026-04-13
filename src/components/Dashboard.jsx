import { useState, useEffect } from 'react';
import { getTotalExpenses } from '../services/expenses';
import { getTotalSales } from '../services/sales';
import { getTotalUnpaidDebts } from '../services/debts';
import '../styles/Dashboard.css';

export function Dashboard() {
  const [totals, setTotals] = useState({
    expenses: 0,
    sales: 0,
    profit: 0,
    debt: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTotals();
  }, []);

  const loadTotals = async () => {
    try {
      const [expenses, sales, debt] = await Promise.all([
        getTotalExpenses(),
        getTotalSales(),
        getTotalUnpaidDebts(),
      ]);

      setTotals({
        expenses,
        sales,
        profit: sales - expenses,
        debt,
      });
    } catch (error) {
      console.error('Error loading totals:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="cards-grid">
        <div className="card expenses">
          <div className="card-label">Total Expenses</div>
          <div className="card-value">₦{totals.expenses.toLocaleString()}</div>
        </div>

        <div className="card sales">
          <div className="card-label">Total Sales</div>
          <div className="card-value">₦{totals.sales.toLocaleString()}</div>
        </div>

        <div className="card profit">
          <div className="card-label">Total Profit</div>
          <div className="card-value">₦{totals.profit.toLocaleString()}</div>
        </div>

        <div className="card debt">
          <div className="card-label">Total Debt Owed</div>
          <div className="card-value">₦{totals.debt.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}
