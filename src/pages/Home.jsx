import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const categories = [
    { 
      name: 'Skincare', 
      description: 'Nourish and protect your skin',
      image: '/api/placeholder/400/300?text=Skincare'
    },
    { 
      name: 'Makeup', 
      description: 'Enhance your natural beauty',
      image: '/api/placeholder/400/300?text=Makeup'
    },
    { 
      name: 'Haircare', 
      description: 'Healthy, gorgeous hair starts here',
      image: '/api/placeholder/400/300?text=Haircare'
    }
  ];

  return (
    <div className="text-center">
      <header className="bg-brand-secondary text-white py-16">
        <h1 className="text-4xl font-bold mb-4">Welcome to Livon Cosmetics</h1>
        <p className="text-xl mb-8">Discover your perfect beauty routine</p>
      </header>

      <section className="container mx-auto py-16">
        <h2 className="text-3xl font-bold mb-12">Our Categories</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div 
              key={category.name} 
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105"
            >
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-4">{category.name}</h3>
                <p className="text-gray-600 mb-6">{category.description}</p>
                <Link 
                  to={`/products?category=${category.name.toLowerCase()}`}
                  className="bg-brand-primary text-white px-6 py-2 rounded-full hover:bg-opacity-90"
                >
                  Shop {category.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;