import { useState } from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="nav-inner">

        <Logo />

        <button
          className="nav-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          ≡
        </button>

        <Navigation
          open={open}
          setOpen={setOpen}
        />

      </div>
    </header>
  );
}