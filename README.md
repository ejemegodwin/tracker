# CashFlow Tracker

A simple, powerful web app to track expenses, record sales, and manage debts. Perfect for small business owners, freelancers, and anyone looking to manage their finances effortlessly.

## Features

### 💰 Expense Tracking
- Record all business expenses with amount, category, description, and date
- Categorize expenses (food, transport, utilities, supplies, other)
- View all expenses in an organized table
- Track total spending at a glance

### 🛒 Sales Recording
- Log every sale with item/service name, amount, and optional customer name
- Record the date of each transaction
- View total revenue across all sales
- Track customer information for future reference

### 🤝 Debt Tracking (Key Feature)
- Add debts owed to you with customer name, amount, and reason
- Mark debts as paid with a single click
- View unpaid debts separately from paid debts
- Track total amount owed to you in real-time

### 📊 Dashboard
At-a-glance summary showing:
- Total Expenses (red indicator)
- Total Sales (green indicator)
- Total Profit (blue indicator: Sales - Expenses)
- Total Debt Owed (orange indicator)

## Tech Stack

- **Frontend**: React 19.2.4 with Vite 8.0.4
- **Backend**: Supabase (PostgreSQL database)
- **Styling**: Modern CSS with light/dark mode support
- **State Management**: React Hooks (useState, useEffect)

## Installation

### Prerequisites
- Node.js 16+
- npm or yarn
- A Supabase account

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cashflow-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key

4. **Configure environment variables**
   Create a `.env` file in the project root:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Apply database migrations**
   The database schema is automatically created through Supabase migrations. The necessary tables (expenses, sales, debts) will be set up with Row Level Security enabled.

6. **Run development server**
   ```bash
   npm run dev
   ```

7. **Build for production**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/
│   ├── Dashboard.jsx       # Main dashboard with summary cards
│   ├── Expenses.jsx        # Expense tracking page
│   ├── Sales.jsx           # Sales recording page
│   ├── Debts.jsx           # Debt tracking page
│   └── Navigation.jsx      # Navigation bar component
├── services/
│   ├── expenses.js         # Expense API calls
│   ├── sales.js            # Sales API calls
│   └── debts.js            # Debt API calls
├── styles/
│   ├── Dashboard.css       # Dashboard styles
│   ├── Expenses.css        # Expenses page styles
│   ├── Sales.css           # Sales page styles
│   ├── Debts.css           # Debts page styles
│   └── Navigation.css      # Navigation styles
├── lib/
│   └── supabase.js         # Supabase client initialization
├── App.jsx                 # Main app component
├── App.css                 # App styles
├── main.jsx                # React entry point
└── index.css               # Global styles
```

## Database Schema

### expenses table
- `id` (uuid) - Primary key
- `amount` (numeric) - Expense amount
- `category` (text) - Category (food, transport, utilities, supplies, other)
- `description` (text) - What the expense was for
- `date` (date) - When the expense occurred
- `created_at` (timestamptz) - Timestamp of record creation

### sales table
- `id` (uuid) - Primary key
- `item` (text) - Name of item/service sold
- `amount` (numeric) - Sale amount
- `customer_name` (text) - Optional customer name
- `date` (date) - When the sale occurred
- `created_at` (timestamptz) - Timestamp of record creation

### debts table
- `id` (uuid) - Primary key
- `customer_name` (text) - Who owes the money
- `amount` (numeric) - Amount owed
- `reason` (text) - Why they owe this money
- `status` (text) - 'paid' or 'unpaid'
- `date` (date) - When the debt was created
- `created_at` (timestamptz) - Timestamp of record creation

All tables have Row Level Security (RLS) enabled for data protection.

## Usage

### Adding an Expense
1. Navigate to the Expenses page
2. Fill in the expense form with amount, category, description, and date
3. Click "Add Expense"
4. Your expense appears in the recent expenses table

### Recording a Sale
1. Navigate to the Sales page
2. Fill in the sales form with item name, amount, optional customer name, and date
3. Click "Record Sale"
4. Your sale appears in the recent sales table

### Tracking a Debt
1. Navigate to the Debts page
2. Fill in the debt form with customer name, amount, reason, and date
3. Click "Add Debt"
4. Debt appears in the unpaid debts table

### Marking a Debt as Paid
1. In the Debts page, find the debt in the unpaid debts table
2. Click the "Mark Paid" button
3. The debt moves to the paid debts section

### Viewing Dashboard
1. The Dashboard is the default landing page
2. View all financial summaries at a glance
3. Numbers update in real-time as you add transactions

## Key Features Explained

### Real-time Updates
All data updates instantly without page refreshes. The dashboard totals recalculate automatically.

### Light/Dark Mode
The app automatically adapts to your system's theme preference using CSS variables.

### Responsive Design
Fully responsive interface works seamlessly on mobile, tablet, and desktop devices.

### Data Security
- Row Level Security (RLS) policies protect all data
- Environment variables keep API keys secure
- All queries use Supabase client library for SQL injection prevention

## Future Enhancements

- Profit graphs (weekly/monthly trends)
- Export to CSV functionality
- Customer history and detailed views
- Mobile app version
- Authentication and multi-user support
- Payment reminders
- Recurring expense/income tracking
- Advanced filtering and search

## Scripts

- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## Support

For issues or questions:
1. Check the GitHub issues page
2. Review the database schema and migrations
3. Verify Supabase credentials in .env file

## Performance

The app builds to approximately 390KB (110KB gzipped), making it lightweight and fast even on slower connections.

## Security Notes

- Never commit `.env` file to version control
- Keep Supabase anon key secure (client-side is acceptable for RLS)
- RLS policies ensure data isolation
- All API calls go through Supabase client library

Enjoy tracking your cash flow!
