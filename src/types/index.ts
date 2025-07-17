export interface ShoppingItem {
  id: string;
  name: string;
  category: Category;
  amount: number;
  completed: boolean;
  createdAt: Date;
}

export type Category = 'Groceries' | 'Electronics' | 'Entertainment' | 'Health' | 'Transportation' | 'Clothing' | 'Other';

export interface Budget {
  total: number;
  categories: Record<Category, number>;
}

export interface ExpenseSummary {
  totalExpenses: number;
  categoryExpenses: Record<Category, number>;
  remainingBudget: number;
}