import React, { useState } from 'react';
import { DollarSign, Target, TrendingUp } from 'lucide-react';

interface BudgetDisplayProps {
  budget: number;
  onBudgetChange: (budget: number) => void;
  totalExpenses: number;
}

const BudgetDisplay: React.FC<BudgetDisplayProps> = ({ budget, onBudgetChange, totalExpenses }) => {
  const [inputBudget, setInputBudget] = useState(budget.toString());
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBudget = parseFloat(inputBudget) || 0;
    onBudgetChange(newBudget);
    setIsEditing(false);
  };

  const remainingBudget = budget - totalExpenses;
  const budgetProgress = budget > 0 ? (totalExpenses / budget) * 100 : 0;

  return (
    <div className="card-elevated p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center">
          <Target className="h-5 w-5 mr-2 text-primary" />
          Budget
        </h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-primary hover:text-primary/80 text-sm font-medium"
          >
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Set Your Budget
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="number"
                value={inputBudget}
                onChange={(e) => setInputBudget(e.target.value)}
                className="input-field pl-10"
                placeholder="Enter your budget"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>
          <div className="flex space-x-3">
            <button type="submit" className="btn-primary flex-1">
              Save Budget
            </button>
            <button
              type="button"
              onClick={() => {
                setInputBudget(budget.toString());
                setIsEditing(false);
              }}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-foreground">
              ${budget.toFixed(2)}
            </span>
            <div className={`flex items-center space-x-1 text-sm ${
              remainingBudget >= 0 ? 'text-success' : 'text-destructive'
            }`}>
              <TrendingUp className="h-4 w-4" />
              <span>
                {remainingBudget >= 0 ? 'Remaining: ' : 'Over: '}
                ${Math.abs(remainingBudget).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Budget Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Spent: ${totalExpenses.toFixed(2)}</span>
              <span>{budgetProgress.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  budgetProgress > 100 ? 'bg-destructive' : 
                  budgetProgress > 80 ? 'bg-warning' : 'bg-success'
                }`}
                style={{ width: `${Math.min(budgetProgress, 100)}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetDisplay;