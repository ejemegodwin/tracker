import { useState, useEffect } from 'react';
import { addDebt, getDebts, markDebtAsPaid } from '../services/debts';
import '../styles/Debts.css';

export function Debts() {
  const [debts, setDebts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    customerName: '',
    amount: '',
    reason: '',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    loadDebts();
  }, []);

  const loadDebts = async () => {
    try {
      const data = await getDebts();
      setDebts(data);
    } catch (error) {
      console.error('Error loading debts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDebt(
        formData.customerName,
        formData.amount,
        formData.reason,
        formData.date
      );
      setFormData({
        customerName: '',
        amount: '',
        reason: '',
        date: new Date().toISOString().split('T')[0],
      });
      await loadDebts();
    } catch (error) {
      console.error('Error adding debt:', error);
    }
  };

  const handleMarkAsPaid = async (debtId) => {
    try {
      await markDebtAsPaid(debtId);
      await loadDebts();
    } catch (error) {
      console.error('Error marking debt as paid:', error);
    }
  };

  const unpaidDebts = debts.filter(d => d.status === 'unpaid');
  const paidDebts = debts.filter(d => d.status === 'paid');

  return (
    <div className="debts">
      <h1>Debts</h1>

      <form className="debt-form" onSubmit={handleSubmit}>
        <h2>Add New Debt</h2>

        <div className="form-group">
          <label htmlFor="customerName">Customer Name</label>
          <input
            id="customerName"
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="Who owes you?"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reason">Reason</label>
          <input
            id="reason"
            type="text"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Why do they owe you?"
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-primary">Add Debt</button>
      </form>

      <div className="debts-list">
        <h2>Unpaid Debts</h2>
        {loading ? (
          <p>Loading...</p>
        ) : unpaidDebts.length === 0 ? (
          <p className="empty">No unpaid debts</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Amount</th>
                <th>Reason</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {unpaidDebts.map(debt => (
                <tr key={debt.id}>
                  <td>{debt.customer_name}</td>
                  <td className="amount">₦{parseFloat(debt.amount).toLocaleString()}</td>
                  <td>{debt.reason || '-'}</td>
                  <td>{new Date(debt.date).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn-paid"
                      onClick={() => handleMarkAsPaid(debt.id)}
                    >
                      Mark Paid
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {paidDebts.length > 0 && (
        <div className="paid-debts-list">
          <h2>Paid Debts</h2>
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Amount</th>
                <th>Reason</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {paidDebts.map(debt => (
                <tr key={debt.id} className="paid">
                  <td>{debt.customer_name}</td>
                  <td className="amount">₦{parseFloat(debt.amount).toLocaleString()}</td>
                  <td>{debt.reason || '-'}</td>
                  <td>{new Date(debt.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
