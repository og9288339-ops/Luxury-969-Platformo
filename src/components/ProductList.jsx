import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

const ProductCard = ({ product }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -10, transition: { duration: 0.3 } }}
    className="group relative bg-black/60 border border-gray-800 rounded-3xl overflow-hidden backdrop-blur-2xl hover:border-gold/50 transition-all duration-500"
  >
    <div className="h-64 overflow-hidden">
      <img src={product.image || 'https://via.placeholder.com/500'} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
    </div>
    <div className="p-6">
      <h3 className="text-2xl font-black text-white mb-2 group-hover:text-gold transition-colors">{product.name}</h3>
      <div className="flex justify-between items-center mt-4">
        <span className="text-gold font-bold text-xl">{product.price.toLocaleString()} EGP</span>
        <button className="bg-gold text-black px-6 py-2 rounded-full font-bold uppercase tracking-widest hover:bg-white transition-all">View</button>
      </div>
    </div>
  </motion.div>
);

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) console.error("Error:", error);
      else setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-light text-white uppercase tracking-[0.2em] mb-4">Elite Assets</h2>
        <div className="w-24 h-1 bg-gold mx-auto" />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => <div key={i} className="h-96 bg-gray-900 rounded-3xl animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {products.map(product => <ProductCard key={product.id} product={product} />)}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}