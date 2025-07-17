import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, DollarSign, PieChart, Target } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-foreground">Loading...</span>
        </div>
      </div>
    );
  }

  // Show landing page briefly while redirecting
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          <ShoppingBag className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-foreground">Budget Shopping List</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Track your expenses, manage your budget, and shop smarter
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
          <div className="text-center p-6">
            <Target className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Set Budgets</h3>
            <p className="text-sm text-muted-foreground">Create and manage your spending limits</p>
          </div>
          <div className="text-center p-6">
            <DollarSign className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Track Expenses</h3>
            <p className="text-sm text-muted-foreground">Monitor your spending in real-time</p>
          </div>
          <div className="text-center p-6">
            <PieChart className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Analyze Spending</h3>
            <p className="text-sm text-muted-foreground">Get insights into your spending habits</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
