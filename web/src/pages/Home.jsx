import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../api';

import Hero from "../components/home/Hero";
import FeaturedProducts from "../components/home/FeaturedProducts";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
// useEffect(() => {
//   async function loadFeaturedProducts() {
//     try {
//       const data = await api.products({
//         featured: true,
//       });

//       setFeaturedProducts(data);

//     } catch (error) {
//       console.error(error);
//     }
//   }

//   loadFeaturedProducts();
// }, []);
  
  return (
  <>
    <Hero />

    <FeaturedProducts
      featuredProducts={featuredProducts}
    />
  </>
);
}
