import React from 'react';
import { NutritionalValue } from '../../types';

interface NutritionLabelProps {
  nutritionalValues: NutritionalValue;
  category: 'food' | 'beverage';
}

const NutritionLabel: React.FC<NutritionLabelProps> = ({ 
  nutritionalValues, 
  category 
}) => {
  // Create nutrition item rows
  const renderNutritionItem = (
    label: string,
    value: number,
    unit: string,
    colorClass: string = 'bg-gray-100'
  ) => (
    <div className={`grid grid-cols-3 py-2 px-4 ${colorClass}`}>
      <div className="font-medium">{label}</div>
      <div className="text-right col-span-2">
        {value} {unit}
      </div>
    </div>
  );

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="bg-gray-800 text-white py-3 px-4 text-lg font-bold">
        Nutrition Facts
      </div>
      
      {/* Energy/Calories */}
      <div className="bg-blue-200 py-3 px-4 border-b border-gray-300">
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold">Energy</div>
          <div className="text-xl font-bold">
            {nutritionalValues.energy} kcal
          </div>
        </div>
      </div>
      
      {/* Nutrition Details */}
      <div className="divide-y divide-gray-200">
      <div className="text-lg font-bold">
        {renderNutritionItem(
          'Protein', 
          nutritionalValues.protein, 
          'g',
          'bg-green-100'
        )}
        
        {renderNutritionItem(
          'Carbohydrates', 
          nutritionalValues.carbohydrates, 
          'g',
          'bg-amber-100'
        )}
        
        {renderNutritionItem(
          'Sugar', 
          nutritionalValues.sugar, 
          'g',
          'bg-rose-50'
        )}
        
        {renderNutritionItem(
          'Fat', 
          nutritionalValues.fat, 
          'g',
          'bg-red-100'
        )}
        
        {category === 'food' && nutritionalValues.salt && renderNutritionItem(
          'Natrium', 
          nutritionalValues.salt, 
          'mg',
          'bg-indigo-50'
        )}
      </div>
      </div>
      
      <div className="bg-gray-100 py-2 px-4 text-xs text-gray-600">
        * Values are approximated per serving
      </div>
    </div>
  );
};

export default NutritionLabel;