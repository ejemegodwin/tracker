/*
  # Create CashFlow Tracker Tables

  1. New Tables
    - `expenses`: Track all business expenses
      - `id` (uuid, primary key)
      - `amount` (numeric, expense amount)
      - `category` (text, expense category)
      - `description` (text, what the expense was for)
      - `date` (date, when the expense occurred)
      - `created_at` (timestamp)
    
    - `sales`: Record all sales/revenue
      - `id` (uuid, primary key)
      - `item` (text, name of item/service sold)
      - `amount` (numeric, sale amount)
      - `customer_name` (text, optional customer name)
      - `date` (date, when the sale occurred)
      - `created_at` (timestamp)
    
    - `debts`: Track money owed by customers
      - `id` (uuid, primary key)
      - `customer_name` (text, who owes the money)
      - `amount` (numeric, amount owed)
      - `reason` (text, why they owe this money)
      - `status` (text, 'unpaid' or 'paid')
      - `date` (date, when the debt was created)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add public SELECT policies for viewing data
    - Add authenticated-only INSERT policies for adding data
    - Add authenticated-only UPDATE policies for updating debt status
*/

CREATE TABLE IF NOT EXISTS expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  amount numeric NOT NULL,
  category text NOT NULL,
  description text,
  date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view expenses"
  ON expenses FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can add expenses"
  ON expenses FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE TABLE IF NOT EXISTS sales (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item text NOT NULL,
  amount numeric NOT NULL,
  customer_name text,
  date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE sales ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view sales"
  ON sales FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can add sales"
  ON sales FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE TABLE IF NOT EXISTS debts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  amount numeric NOT NULL,
  reason text,
  status text NOT NULL DEFAULT 'unpaid',
  date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE debts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view debts"
  ON debts FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can add debts"
  ON debts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update debts"
  ON debts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);