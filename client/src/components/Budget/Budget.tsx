import React, { useState } from 'react';

const Budget = () => {
  const [budgetAmount, setBudgetAmount] = useState(0);
  const [budgetMonth, setBudgetMonth] = useState('');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudgetAmount(Number(e.target.value));
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudgetMonth(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the budgetAmount and budgetMonth to your backend or a global state
    console.log('Budget Amount:', budgetAmount);
    console.log('Budget Month:', budgetMonth);
    // You might want to format the budgetMonth to only send month and year
  };

  return (
    <div className="budget-form-container">
      <h2>Set Budget</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group flex flex-col">
          <label htmlFor="budgetAmount">Budget Amount: ${budgetAmount}</label>
          <input
            type="range"
            id="budgetAmount"
            min="0"
            max="500000"
            value={budgetAmount}
            onChange={handleAmountChange}
            className="form-range"
          />
        </div>
        <div className="form-group">
          <label htmlFor="budgetMonth">Month and Year:</label>
          <input
            type="month"
            id="budgetMonth"
            value={budgetMonth}
            onChange={handleMonthChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Agregar presupuesto</button>
      </form>
    </div>
  );
};

export default Budget;
