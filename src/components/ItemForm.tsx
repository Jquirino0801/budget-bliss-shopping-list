import React, { useState } from 'react';
import { Plus, ShoppingCart } from 'lucide-react';
import { Category } from '@/types';

interface ItemFormProps {
  onAddItem: (name: string, category: Category, amount: number) => void;
}

const categories: Category[] = [
  'Groceries',
  'Electronics', 
  'Entertainment',
  'Health',
  'Transportation',
  'Clothing',
  'Other'
];

const ItemForm: React.FC<ItemFormProps> = ({ onAddItem }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('Groceries');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && amount) {
      onAddItem(name.trim(), category, parseFloat(amount));
      setName('');
      setAmount('');
      setCategory('Groceries');
    }
  };

  return (
    <div className="card-elevated p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <ShoppingCart className="h-5 w-5 mr-2 text-primary" />
        Add Item
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Item Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            placeholder="Enter item name"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="input-field"
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Amount ($)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input-field"
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <button type="submit" className="btn-primary w-full flex items-center justify-center">
          <Plus className="h-5 w-5 mr-2" />
          Add Item
        </button>
      </form>
    </div>
  );
};

export default ItemForm;