import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { fetchItems } from '../api';
import { FoodItem } from '../types';
import FoodCard from '../components/ui/FoodCard';
import Layout from '../components/common/Layout';

const FoodsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState<FoodItem[]>([]);
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
  
  // Filter food items (only 'food' category)
  const foodItems = items.filter(
    (item) => 
      item.category === 'food' && 
      (searchTerm === '' || 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Foods</h1>
          <p className="text-gray-600">
            Explore traditional foods available at Alun Alun Kidul Yogyakarta and their nutritional information.
          </p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="Search foods..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {foodItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {foodItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No food items found matching your search.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FoodsPage;