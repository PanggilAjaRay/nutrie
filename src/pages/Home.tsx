import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { mockFoodItems } from '../data/mockData';
import FoodCard from '../components/ui/FoodCard';
import Layout from '../components/common/Layout';

const Home: React.FC = () => {
  // Get 3 featured items (mix of food and beverages)
  const featuredItems = mockFoodItems.slice(0, 3);
  
  return (
    <Layout>
      {/* Hero Section */}
      <section 
        className="relative text-white bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://www.rumah123.com/seo-cms/assets/Alun_Alun_Kidul_Jogja_f5d82c521b/Alun_Alun_Kidul_Jogja_f5d82c521b.jpg")',
          minHeight: '80vh'
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Discover Nutritional Information for Local Foods
            </h1>
            <p className="text-xl mb-8 text-gray-100">
              Explore the nutritional content of various foods and beverages available at Alun Alun Kidul Yogyakarta.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/foods"
                className="px-6 py-3 bg-white text-green-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Explore Foods
              </Link>
              <Link
                to="/beverages"
                className="px-6 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-green-600 transition-colors"
              >
                Explore Beverages
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">About Nutrié</h2>
            <p className="text-lg text-gray-600 mb-8">
              Nutrié provides comprehensive nutritional information about traditional foods and beverages
              found at Alun Alun Kidul Yogyakarta. Our mission is to help you make informed decisions about
              the food you consume.
            </p>
          </div>
        </div>
      </section>


      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to explore more?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover the complete nutritional information for all foods and beverages available at Alun Alun Kidul Yogyakarta.
          </p>
          <Link
            to="/foods"
            className="inline-block px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Browse All Items
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Home;