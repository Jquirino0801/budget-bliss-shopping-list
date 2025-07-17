import React from 'react';
import { Check, Edit, Trash2, Package } from 'lucide-react';
import { ShoppingItem, Category } from '@/types';

interface ShoppingListProps {
  items: ShoppingItem[];
  onToggleComplete: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onEditItem: (id: string, name: string, category: Category, amount: number) => void;
}

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

const getCategoryColor = (category: Category) => {
  const colors = {
    'Groceries': 'category-groceries',
    'Electronics': 'category-electronics',
    'Entertainment': 'category-entertainment',
    'Health': 'category-health',
    'Transportation': 'category-groceries',
    'Clothing': 'category-electronics',
    'Other': 'category-entertainment'
  };
  return colors[category] || 'category-entertainment';
};

const ShoppingList: React.FC<ShoppingListProps> = ({ 
  items, 
  onToggleComplete, 
  onDeleteItem, 
  onEditItem 
}) => {
  if (items.length === 0) {
    return (
      <div className="card-elevated p-8 text-center">
        <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No items yet</h3>
        <p className="text-muted-foreground">Start adding items to your shopping list!</p>
      </div>
    );
  }

  return (
    <div className="card-elevated">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground flex items-center">
          <Package className="h-5 w-5 mr-2 text-primary" />
          Shopping List
          <span className="ml-2 bg-primary/10 text-primary px-2 py-1 rounded-full text-sm font-medium">
            {items.length}
          </span>
        </h2>
      </div>

      <div className="divide-y divide-border">
        {items.map((item) => (
          <div
            key={item.id}
            className={`p-4 transition-colors hover:bg-muted/50 ${
              item.completed ? 'opacity-60' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                {/* Checkbox */}
                <button
                  onClick={() => onToggleComplete(item.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    item.completed
                      ? 'bg-success border-success text-success-foreground'
                      : 'border-border hover:border-primary'
                  }`}
                >
                  {item.completed && <Check className="h-4 w-4" />}
                </button>

                {/* Item Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-lg">{getCategoryIcon(item.category)}</span>
                    <h3 className={`font-medium ${
                      item.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                    }`}>
                      {item.name}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`category-badge ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                    <span className="text-lg font-semibold text-foreground">
                      ${item.amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onEditItem(item.id, item.name, item.category, item.amount)}
                  className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  aria-label="Edit item"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDeleteItem(item.id)}
                  className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                  aria-label="Delete item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingList;