import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        {/* Left Section */}
        <div>
          <div style={{ marginBottom: "0.5rem" }}>
            <Logo className="footer-logo" />
          </div>

          <div>Hospitality interiors, crafted.</div>
        </div>

        {/* Right Section */}
        <div className="text-center">
          <div>
            &copy; {new Date().getFullYear()} Delish Rich Hospitality
          </div>

          <div className="text-sm opacity-70">
            Managed by Avishek Prasad
          </div>
        </div>
      </div>
    </footer>
  );
}