import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  loginWithGoogle,
  loginWithEmail,
} from "../firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setSuccess("");
      setLoading(true);

      await loginWithEmail(email, password);

      setSuccess("Login successful. Welcome back!");

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (error) {
      console.error("Login failed:", error);

      setError(
        error.code === "auth/invalid-credential"
          ? "Invalid email or password."
          : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError("");
      setSuccess("");
      setLoading(true);

      await loginWithGoogle();

      setSuccess(
        "Google login successful. Welcome back!"
      );

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (error) {
      console.error("Google login failed:", error);

      setError(error.message);
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

          <h1>Welcome Back</h1>

          <p>
            Sign in to continue your journey
            with Delish Rich.
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
          onSubmit={handleEmailLogin}
        >
          <div className="auth-field">
            <label htmlFor="login-email">
              Email
            </label>

            <input
              id="login-email"
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
            <label htmlFor="login-password">
              Password
            </label>

            <input
              id="login-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
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
              ? "Signing in..."
              : "Sign In"}
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <button
          type="button"
          className="google-btn"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <span className="google-icon">
            G
          </span>

          {loading
            ? "Please wait..."
            : "Continue with Google"}
        </button>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/signup">
            Create an account
          </Link>
        </p>

      </section>
    </main>
  );
}

export default Login;