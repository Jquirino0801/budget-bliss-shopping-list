import React, { useState, useEffect } from 'react';
import { ShoppingItem, Category } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import BudgetDisplay from '@/components/BudgetDisplay';
import ItemForm from '@/components/ItemForm';
import ShoppingList from '@/components/ShoppingList';
import ExpenseSummary from '@/components/ExpenseSummary';
import EditItemModal from '@/components/EditItemModal';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [budget, setBudget] = useState(500);
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [editingItem, setEditingItem] = useState<{ id: string; name: string; category: Category; amount: number } | null>(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    if (user) {
      const storageKey = `budgetApp_${user.id}`;
      const savedData = localStorage.getItem(storageKey);
      if (savedData) {
        const data = JSON.parse(savedData);
        setBudget(data.budget || 500);
        setItems(data.items || []);
      }
    }
  }, [user]);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    if (user) {
      const storageKey = `budgetApp_${user.id}`;
      const dataToSave = {
        budget,
        items,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(storageKey, JSON.stringify(dataToSave));
    }
  }, [budget, items, user]);

  const handleBudgetChange = (newBudget: number) => {
    setBudget(newBudget);
  };

  const handleAddItem = (name: string, category: Category, amount: number) => {
    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name,
      category,
      amount,
      completed: false,
      createdAt: new Date()
    };
    setItems(prev => [...prev, newItem]);
  };

  const handleToggleComplete = (id: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleDeleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleEditItem = (id: string, name: string, category: Category, amount: number) => {
    const item = items.find(item => item.id === id);
    if (item) {
      setEditingItem({ id, name: item.name, category: item.category, amount: item.amount });
    }
  };

  const handleSaveEdit = (name: string, category: Category, amount: number) => {
    if (editingItem) {
      setItems(prev =>
        prev.map(item =>
          item.id === editingItem.id ? { ...item, name, category, amount } : item
        )
      );
      setEditingItem(null);
    }
  };

  // Calculate expenses
  const totalExpenses = items.reduce((sum, item) => sum + item.amount, 0);
  
  const categoryExpenses = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {} as Record<Category, number>);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-muted-foreground">
            Manage your budget and track your shopping expenses
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Budget and Add Item */}
          <div className="lg:col-span-2 space-y-8">
            {/* Budget Display */}
            <BudgetDisplay
              budget={budget}
              onBudgetChange={handleBudgetChange}
              totalExpenses={totalExpenses}
            />

            {/* Add Item Form */}
            <ItemForm onAddItem={handleAddItem} />

            {/* Shopping List */}
            <ShoppingList
              items={items}
              onToggleComplete={handleToggleComplete}
              onDeleteItem={handleDeleteItem}
              onEditItem={handleEditItem}
            />
          </div>

          {/* Right Column - Expense Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ExpenseSummary
                totalExpenses={totalExpenses}
                categoryExpenses={categoryExpenses}
                budget={budget}
              />
            </div>
          </div>
        </div>

        {/* Mobile Layout Adjustments */}
        <div className="lg:hidden mt-8">
          {/* Mobile view puts summary at bottom */}
        </div>
      </div>

      {/* Edit Item Modal */}
      <EditItemModal
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        onSave={handleSaveEdit}
        item={editingItem}
      />
    </div>
  );
};

export default Dashboard;