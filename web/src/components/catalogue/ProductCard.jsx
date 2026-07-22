import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/catalogue/${product.slug}`}
      className="card"
    >
      <div
        className="card-img"
        style={{
          backgroundImage: product.images?.[0]
            ? `url(${product.images[0]})`
            : "none",
        }}
      />

      <div className="card-body">
        <div className="meta">
          {product.category}
        </div>

        <h3>{product.name}</h3>

        {product.price ? (
          <div style={{ color: "var(--bone-dim)" }}>
            ₹ {product.price.toLocaleString()}
          </div>
        ) : null}
      </div>
    </Link>
  );
}