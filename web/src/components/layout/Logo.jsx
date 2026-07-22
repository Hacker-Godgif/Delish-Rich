import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

export default function Logo({ className = "" }) {
  return (
    <Link to="/" className={`brand ${className}`}>
      <img
        src={logo}
        alt="Delish Rich Hospitality"
        className="brand-logo"
      />


      <div className="brand-text">
        <h2>DELISH RICH</h2>
        <span>Hospitality</span>
      </div>
      
    </Link>
  );
}