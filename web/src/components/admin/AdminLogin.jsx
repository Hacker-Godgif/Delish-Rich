export default function AdminLogin({ token, setToken }) {
  const handleUnlock = () => {
    localStorage.setItem("adminToken", token);
    location.reload();
  };

  return (
    <section
      className="section container"
      style={{ maxWidth: 480 }}
    >
      <h1>Admin</h1>

      <p style={{ color: "var(--bone-dim)" }}>
        Paste your ADMIN_TOKEN (from server <code>.env</code>).
      </p>

      <input
        className="field"
        style={{
          width: "100%",
          padding: "0.9rem 1rem",
          background: "var(--bg)",
          color: "var(--bone)",
          border: "1px solid var(--line)",
        }}
        placeholder="Admin token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />

      <button
        className="btn btn-solid"
        style={{ marginTop: "1rem" }}
        onClick={handleUnlock}
      >
        Unlock
      </button>
    </section>
  );
}