import { useState, useEffect } from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";


export default function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

useEffect(() => {
  const unsubscribe =
    onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

  return () => unsubscribe();
}, []);

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
          user={user}
        />

      </div>
    </header>
  );
}