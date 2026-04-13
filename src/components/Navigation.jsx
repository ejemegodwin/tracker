import '../styles/Navigation.css';

export function Navigation({ currentPage, setCurrentPage }) {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">CashFlow Tracker</div>
        <div className="nav-links">
          <button
            className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentPage('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`nav-link ${currentPage === 'expenses' ? 'active' : ''}`}
            onClick={() => setCurrentPage('expenses')}
          >
            Expenses
          </button>
          <button
            className={`nav-link ${currentPage === 'sales' ? 'active' : ''}`}
            onClick={() => setCurrentPage('sales')}
          >
            Sales
          </button>
          <button
            className={`nav-link ${currentPage === 'debts' ? 'active' : ''}`}
            onClick={() => setCurrentPage('debts')}
          >
            Debts
          </button>
        </div>
      </div>
    </nav>
  );
}
