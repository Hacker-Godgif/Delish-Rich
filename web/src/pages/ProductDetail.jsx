import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';
import ImageGallery from "../components/product/ImageGallery";
import ProductInfo from "../components/product/ProductInfo";

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

    useEffect(() => {
      api.product(slug)
        .then(setProduct)
        .catch((error) => setError(error.message));
    }, [slug]); 
     
  if (error) return <section className="section container"><h2>Not found</h2><Link className="btn" to="/catalogue">Back</Link></section>;

  if (!product) return <section className="section container">Loading…</section>;

  return (
          <section className="section container">
        <Link
          to="/catalogue"
          style={{
            color: "var(--bone-dim)",
            fontSize: "0.8rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          ← Catalogue
        </Link>

        <div
          className="grid grid-2"
          style={{
            marginTop: "1.5rem",
            alignItems: "start",
          }}
        >
          <ImageGallery
            images={product.images}
          />

          <ProductInfo
            product={product}
          />
        </div>
      </section>
  );
}
