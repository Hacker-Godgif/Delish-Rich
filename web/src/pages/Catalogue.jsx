import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import ProductCard from "../components/catalogue/ProductCard";

export default function Catalogue() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => { api.categories().then(setCategories).catch(() => {}); }, []);
  useEffect(() => {
    api.products(activeCategory ? { category: activeCategory } : {}).then(setProducts).catch(() => setProducts([]));
  }, [activeCategory]);

  return (
    <section className="section container">
      <div className="eyebrow">Catalogue</div>
      <h1>Pieces, in current rotation.</h1>
      <div className="filters">
        <button className={`filter-chip ${!activeCategory ? 'active' : ''}`} onClick={() => setActiveCategory('')}>All</button>
        {categories.map((category) => (
          <button key={category.slug} className={`filter-chip ${activeCategory === category.slug ? 'activeCategory' : ''}`} onClick={() => setActiveCategory(category.slug)}>{category.name}</button>
        ))}
      </div>
      <div className="grid grid-3">
        {products.map((product) => (
          <ProductCard
          key={product._id}
          product={product}
      />
    ))}
        {products.length === 0 && <p style={{ color: 'var(--bone-dim)' }}>No products yet — add some in /admin.</p>}
      </div>
    </section>
  );
}
