import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signupWithEmail } from "../firebase/auth";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setSuccess("");
      setLoading(true);

      await signupWithEmail(
        name,
        email,
        password
      );

      setSuccess(
        "Account created successfully! Welcome to Delish Rich."
      );

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error(
        "Signup failed:",
        error
      );

      if (
        error.code ===
        "auth/email-already-in-use"
      ) {
        setError(
          "An account with this email already exists."
        );
      } else if (
        error.code ===
        "auth/weak-password"
      ) {
        setError(
          "Password should be at least 6 characters."
        );
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">

        <div className="auth-heading">
          <span className="auth-eyebrow">
            DELISH RICH HOSPITALITY
          </span>

          <h1>Create Account</h1>

          <p>
            Join us and experience hospitality
            interiors, crafted.
          </p>
        </div>

        {error && (
          <div className="auth-message auth-error">
            {error}
          </div>
        )}

        {success && (
          <div className="auth-message auth-success">
            {success}
          </div>
        )}

        <form
          className="auth-form"
          onSubmit={handleSignup}
        >
          <div className="auth-field">
            <label htmlFor="signup-name">
              Full Name
            </label>

            <input
              id="signup-name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
              disabled={loading}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="signup-email">
              Email
            </label>

            <input
              id="signup-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
              disabled={loading}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="signup-password">
              Password
            </label>

            <input
              id="signup-password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              minLength={6}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="auth-primary-btn"
            disabled={loading}
          >
            {loading
              ? "Creating account..."
              : "Create Account"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login">
            Sign in
          </Link>
        </p>

      </section>
    </main>
  );
}

export default Signup;