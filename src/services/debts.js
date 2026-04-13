import { supabase } from '../lib/supabase';

export const addDebt = async (customerName, amount, reason, date) => {
  const { data, error } = await supabase
    .from('debts')
    .insert([
      {
        customer_name: customerName,
        amount: parseFloat(amount),
        reason,
        status: 'unpaid',
        date,
      },
    ])
    .select();

  if (error) throw error;
  return data[0];
};

export const getDebts = async () => {
  const { data, error } = await supabase
    .from('debts')
    .select('*')
    .order('date', { ascending: false });

  if (error) throw error;
  return data;
};

export const markDebtAsPaid = async (debtId) => {
  const { data, error } = await supabase
    .from('debts')
    .update({ status: 'paid' })
    .eq('id', debtId)
    .select();

  if (error) throw error;
  return data[0];
};

export const getTotalUnpaidDebts = async () => {
  const { data, error } = await supabase
    .from('debts')
    .select('amount')
    .eq('status', 'unpaid');

  if (error) throw error;
  return data.reduce((sum, debt) => sum + (debt.amount || 0), 0);
};
