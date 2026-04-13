import { supabase } from '../lib/supabase';

export const addExpense = async (amount, category, description, date) => {
  const { data, error } = await supabase
    .from('expenses')
    .insert([
      {
        amount: parseFloat(amount),
        category,
        description,
        date,
      },
    ])
    .select();

  if (error) throw error;
  return data[0];
};

export const getExpenses = async () => {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .order('date', { ascending: false });

  if (error) throw error;
  return data;
};

export const getTotalExpenses = async () => {
  const { data, error } = await supabase
    .from('expenses')
    .select('amount');

  if (error) throw error;
  return data.reduce((sum, expense) => sum + (expense.amount || 0), 0);
};
