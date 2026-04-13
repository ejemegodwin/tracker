import { supabase } from '../lib/supabase';

export const addSale = async (item, amount, customerName, date) => {
  const { data, error } = await supabase
    .from('sales')
    .insert([
      {
        item,
        amount: parseFloat(amount),
        customer_name: customerName || null,
        date,
      },
    ])
    .select();

  if (error) throw error;
  return data[0];
};

export const getSales = async () => {
  const { data, error } = await supabase
    .from('sales')
    .select('*')
    .order('date', { ascending: false });

  if (error) throw error;
  return data;
};

export const getTotalSales = async () => {
  const { data, error } = await supabase
    .from('sales')
    .select('amount');

  if (error) throw error;
  return data.reduce((sum, sale) => sum + (sale.amount || 0), 0);
};
