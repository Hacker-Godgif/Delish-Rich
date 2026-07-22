import { Link } from "react-router-dom";

export default function ProductInfo({ product }) {
  return (
    <div>
      <div className="eyebrow">
        {product.category}
      </div>

      <h1>{product.name}</h1>

      {product.price && (
        <div
          style={{
            color: "var(--gold)",
            fontSize: "1.2rem",
            margin: "1rem 0",
          }}
        >
          ₹ {product.price.toLocaleString()}
        </div>
      )}

      <p
        style={{
          color: "var(--bone-dim)",
        }}
      >
        {product.description}
      </p>

      <Link
        to="/contact"
        className="btn btn-solid"
        style={{
          marginTop: "1.5rem",
        }}
      >
        Enquire
      </Link>
    </div>
  );
}