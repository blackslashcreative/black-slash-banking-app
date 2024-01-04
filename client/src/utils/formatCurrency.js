function formatCurrency(amount) {
  return amount.toLocaleString('en-IN', { 
    style: 'currency', 
    currency: 'INR' 
  });
}

export default formatCurrency;
