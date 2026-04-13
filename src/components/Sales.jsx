import { useState, useEffect } from 'react';
import { addSale, getSales } from '../services/sales';
import '../styles/Sales.css';

export function Sales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    item: '',
    amount: '',
    customerName: '',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {
    try {
      const data = await getSales();
      setSales(data);
    } catch (error) {
      console.error('Error loading sales:', error);
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
      await addSale(
        formData.item,
        formData.amount,
        formData.customerName,
        formData.date
      );
      setFormData({
        item: '',
        amount: '',
        customerName: '',
        date: new Date().toISOString().split('T')[0],
      });
      await loadSales();
    } catch (error) {
      console.error('Error adding sale:', error);
    }
  };

  return (
    <div className="sales">
      <h1>Sales</h1>

      <form className="sales-form" onSubmit={handleSubmit}>
        <h2>Record New Sale</h2>

        <div className="form-group">
          <label htmlFor="item">Item/Service</label>
          <input
            id="item"
            type="text"
            name="item"
            value={formData.item}
            onChange={handleChange}
            placeholder="What did you sell?"
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
          <label htmlFor="customerName">Customer Name (Optional)</label>
          <input
            id="customerName"
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="Who bought this?"
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

        <button type="submit" className="btn-primary">Record Sale</button>
      </form>

      <div className="sales-list">
        <h2>Recent Sales</h2>
        {loading ? (
          <p>Loading...</p>
        ) : sales.length === 0 ? (
          <p className="empty">No sales yet</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Item</th>
                <th>Customer</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {sales.map(sale => (
                <tr key={sale.id}>
                  <td>{new Date(sale.date).toLocaleDateString()}</td>
                  <td>{sale.item}</td>
                  <td>{sale.customer_name || '-'}</td>
                  <td className="amount">₦{parseFloat(sale.amount).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
