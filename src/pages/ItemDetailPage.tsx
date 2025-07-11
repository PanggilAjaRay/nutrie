import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileDown } from 'lucide-react';
import { fetchItemById } from '../api';
import { FoodItem } from '../types';
import NutritionLabel from '../components/ui/NutritionLabel';
import Layout from '../components/common/Layout';
import Button from '../components/ui/Button';

const ItemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<FoodItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadItem = async () => {
      try {
        if (id) {
          const data = await fetchItemById(id);
          setItem(data);
        }
      } catch (err) {
        setError('Failed to load item details');
      } finally {
        setLoading(false);
      }
    };

    loadItem();
  }, [id]);
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (error || !item) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">
            {error || 'Item Not Found'}
          </h1>
          <p className="text-gray-600 mb-6">
            The item you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </Layout>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleExportToExcel = () => {
    const headers = ['Property', 'Value', 'Unit'];
    const rows = [
      ['Name', item.name, ''],
      ['Category', item.category, ''],
      ['Price', item.price.toString(), 'IDR'],
      ['Energy', item.energy.toString(), 'kcal'],
      ['Protein', item.protein.toString(), 'g'],
      ['Carbohydrates', item.carbohydrates.toString(), 'g'],
      ['Sugar', item.sugar.toString(), 'g'],
      ['Fat', item.fat.toString(), 'g'],
    ];

    if (item.category === 'food' && item.salt) {
      rows.push(['Natrium', item.salt.toString(), 'g']);
    }

    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${item.name.toLowerCase().replace(/\s+/g, '-')}-nutrition.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-green-600 hover:text-green-700 mb-6"
        >
          <ArrowLeft size={18} className="mr-1" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="rounded-lg overflow-hidden shadow-md bg-white mb-6">
              <img
                src={`https://directus-production-e31e.up.railway.app/assets/${item.image}`}
                alt={item.name}
                className="w-full h-80 object-cover"
              />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Export Data</h3>
                <Button
                  onClick={handleExportToExcel}
                  variant="primary"
                  size="sm"
                >
                  <FileDown size={18} className="mr-2" />
                  Export to Excel
                </Button>
              </div>
              <p className="text-sm text-gray-600">
                Download detailed nutritional information in Excel format for your records.
              </p>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold text-gray-800">
                  {item.name}
                </h1>
                <span className="text-2xl font-bold text-green-600">
                  {formatPrice(item.price)}
                </span>
              </div>
              
              <div className="mb-4">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  {item.category === 'food' ? 'Food' : 'Beverage'}
                </span>
              </div>
              
              <p className="text-gray-600 mb-6">
                {item.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-blue-600 mb-1">Energy</div>
                  <div className="text-xl font-bold text-blue-900">
                    {item.energy}
                    <span className="text-sm ml-1">kcal</span>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-green-600 mb-1">Protein</div>
                  <div className="text-xl font-bold text-green-900">
                    {item.protein}
                    <span className="text-sm ml-1">g</span>
                  </div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="text-sm text-yellow-600 mb-1">Carbs</div>
                  <div className="text-xl font-bold text-yellow-900">
                    {item.carbohydrates}
                    <span className="text-sm ml-1">g</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Nutrition Facts
                </h2>
                <NutritionLabel 
                  nutritionalValues={{
                    energy: item.energy,
                    protein: item.protein,
                    carbohydrates: item.carbohydrates,
                    sugar: item.sugar,
                    fat: item.fat,
                    salt: item.salt
                  }}
                  category={item.category} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetailPage;