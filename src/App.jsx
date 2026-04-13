import { useState } from 'react'
import { Navigation } from './components/Navigation'
import { Dashboard } from './components/Dashboard'
import { Expenses } from './components/Expenses'
import { Sales } from './components/Sales'
import { Debts } from './components/Debts'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  return (
    <>
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main>
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'expenses' && <Expenses />}
        {currentPage === 'sales' && <Sales />}
        {currentPage === 'debts' && <Debts />}
      </main>
    </>
  )
}

export default App
