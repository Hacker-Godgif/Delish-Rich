import { NavLink } from "react-router-dom";
import { navigation } from "../../config/navigation";

export default function Navigation({ open, setOpen }) {
  return (
    <nav
      className={`nav-links ${open ? "open" : ""}`}
      onClick={() => setOpen(false)}
    >
      {navigation.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === "/"}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}