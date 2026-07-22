import ProductCard from "../catalogue/ProductCard";

export default function FeaturedProducts({ featuredProducts }) {
  if (!featuredProducts.length) {
    return null;
  }

  return (
    <section className="section container">
      <div className="eyebrow">Featured</div>

      <h2>Pieces we love</h2>

      <div
        className="grid grid-3"
        style={{ marginTop: "2rem" }}
      >
        {featuredProducts
          .slice(0, 6)
          .map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
      </div>
    </section>
  );
}