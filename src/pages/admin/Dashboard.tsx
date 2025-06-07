import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Plus, Download } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/common/Layout';
import Button from '../../components/ui/Button';
import { fetchItems, createItem, updateItem, deleteItem } from '../../api';
import { FoodItem } from '../../types';
import AdminFoodList from './AdminFoodList';
import FoodForm from '../../components/admin/FoodForm';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<FoodItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<FoodItem | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await fetchItems();
        setItems(data);
      } catch (err) {
        setError('Failed to load items');
      } finally {
        setLoading(false);
      }
    };
    
    loadItems();
  }, []);
  
  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/login\" replace />;
  }
  
  const handleAddItem = async (newItem: FoodItem) => {
    try {
      const formData = new FormData();
      Object.entries(newItem).forEach(([key, value]) => {
        if (key === 'nutritionalValues') {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value.toString());
        }
      });
      
      const result = await createItem(formData);
      setItems([...items, { ...newItem, id: result.id }]);
      setShowForm(false);
    } catch (err) {
      setError('Failed to create item');
    }
  };
  
  const handleUpdateItem = async (updatedItem: FoodItem) => {
    try {
      const formData = new FormData();
      Object.entries(updatedItem).forEach(([key, value]) => {
        if (key === 'nutritionalValues') {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value.toString());
        }
      });
      
      await updateItem(updatedItem.id, formData);
      setItems(items.map(item => 
        item.id === updatedItem.id ? updatedItem : item
      ));
      setEditingItem(undefined);
      setShowForm(false);
    } catch (err) {
      setError('Failed to update item');
    }
  };
  
  const handleDeleteItem = async (id: string) => {
    try {
      await deleteItem(id);
      setItems(items.filter(item => item.id !== id));
    } catch (err) {
      setError('Failed to delete item');
    }
  };
  
  const handleEditItem = (item: FoodItem) => {
    setEditingItem(item);
    setShowForm(true);
  };
  
  const exportToExcel = () => {
    const headers = [
      'ID',
      'Name',
      'Category',
      'Price',
      'Energy',
      'Protein',
      'Carbohydrates',
      'Sugar',
      'Fat',
      'Salt',
    ].join(',');
    
    const rows = items.map(item => {
      return [
        item.id,
        item.name,
        item.category,
        item.price,
        item.nutritionalValues.energy.value,
        item.nutritionalValues.protein.value,
        item.nutritionalValues.carbohydrates.value,
        item.nutritionalValues.sugar.value,
        item.nutritionalValues.fat.value,
        item.nutritionalValues.salt?.value || '-',
      ].join(',');
    });
    
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'nutrisurvey_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-50 text-red-800 p-4 rounded-md mb-6">
            {error}
          </div>
        )}
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <div className="flex space-x-4">
            <Button
              onClick={exportToExcel}
              variant="secondary"
            >
              <Download size={16} className="mr-2" /> Export to Excel
            </Button>
            <Button
              onClick={() => {
                setEditingItem(undefined);
                setShowForm(true);
              }}
            >
              <Plus size={16} className="mr-2" /> Add New Item
            </Button>
          </div>
        </div>
        
        {showForm ? (
          <div className="mb-8">
            <FoodForm
              initialData={editingItem}
              onSubmit={editingItem ? handleUpdateItem : handleAddItem}
              onCancel={() => {
                setShowForm(false);
                setEditingItem(undefined);
              }}
            />
          </div>
        ) : (
          <AdminFoodList
            items={items}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
          />
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;