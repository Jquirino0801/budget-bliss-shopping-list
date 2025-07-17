import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, PieChart } from 'lucide-react';
import { Category } from '@/types';

interface ExpenseSummaryProps {
  totalExpenses: number;
  categoryExpenses: Record<Category, number>;
  budget: number;
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ 
  totalExpenses, 
  categoryExpenses, 
  budget 
}) => {
  const remainingBudget = budget - totalExpenses;
  const isOverBudget = remainingBudget < 0;

  const sortedCategories = Object.entries(categoryExpenses)
    .filter(([_, amount]) => amount > 0)
    .sort((a, b) => b[1] - a[1]) as [Category, number][];

  const getCategoryIcon = (category: Category) => {
    const icons = {
      'Groceries': '🛒',
      'Electronics': '📱',
      'Entertainment': '🎮',
      'Health': '💊',
      'Transportation': '🚗',
      'Clothing': '👕',
      'Other': '📦'
    };
    return icons[category] || '📦';
  };

  return (
    <div className="card-elevated p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center">
        <PieChart className="h-5 w-5 mr-2 text-primary" />
        Expense Summary
      </h2>

      {/* Total Expenses */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">Total Expenses</span>
          <div className="flex items-center space-x-1">
            <DollarSign className="h-4 w-4 text-foreground" />
            <span className="text-2xl font-bold text-foreground">
              {totalExpenses.toFixed(2)}
            </span>
          </div>
        </div>
        
        {/* Budget Status */}
        <div className={`flex items-center space-x-2 text-sm ${
          isOverBudget ? 'text-destructive' : 'text-success'
        }`}>
          {isOverBudget ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          <span>
            {isOverBudget ? 'Over budget by' : 'Under budget by'} ${Math.abs(remainingBudget).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Category Breakdown */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-4">By Category</h3>
        
        {sortedCategories.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No expenses yet</p>
        ) : (
          <div className="space-y-3">
            {sortedCategories.map(([category, amount]) => {
              const percentage = totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0;
              
              return (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{getCategoryIcon(category)}</span>
                    <div>
                      <div className="font-medium text-foreground">{category}</div>
                      <div className="text-sm text-muted-foreground">
                        {percentage.toFixed(1)}% of total
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-foreground">
                      ${amount.toFixed(2)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Budget Progress */}
      {budget > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Budget Progress</span>
            <span>{((totalExpenses / budget) * 100).toFixed(1)}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                (totalExpenses / budget) * 100 > 100 ? 'bg-destructive' : 
                (totalExpenses / budget) * 100 > 80 ? 'bg-warning' : 'bg-success'
              }`}
              style={{ width: `${Math.min((totalExpenses / budget) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseSummary;