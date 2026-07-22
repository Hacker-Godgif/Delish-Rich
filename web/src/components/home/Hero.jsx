import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner container">
        <div className="eyebrow">Hospitality Interiors</div>

        <h1>Considered spaces, crafted with intention.</h1>

        <p>
          From boutique hotels to private residences,
          Delish Rich shapes interiors that hold a room
          together — quietly, completely.
        </p>

        <Link
          to="/catalogue"
          className="btn btn-solid"
        >
          View Catalogue
        </Link>

        <Link
          to="/contact"
          className="btn"
          style={{ marginLeft: "0.75rem" }}
        >
          Get in Touch
        </Link>
      </div>
    </section>
  );
}