import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  sendEmailVerification,
  reload,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase/firebase";

function VerifyEmail() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);
  const [resending, setResending] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/signup");
      return;
    }

    setEmail(auth.currentUser.email || "");
  }, [navigate]);

  const checkVerification = async () => {
    try {
      setChecking(true);
      setError("");
      setMessage("");

      const user = auth.currentUser;

      if (!user) {
        navigate("/signup");
        return;
      }

      await reload(user);

      if (user.emailVerified) {
        setMessage(
          "Email verified successfully! Redirecting..."
        );

        await signOut(auth);

        setTimeout(() => {
          navigate("/login");
        }, 1200);
      } else {
        setError(
          "Your email is not verified yet. Please check your inbox and click the verification link."
        );
      }
    } catch (error) {
      console.error(
        "Verification check failed:",
        error
      );

      setError(error.message);
    } finally {
      setChecking(false);
    }
  };

  const resendVerification = async () => {
    try {
      setResending(true);
      setError("");
      setMessage("");

      const user = auth.currentUser;

      if (!user) {
        navigate("/signup");
        return;
      }

      await sendEmailVerification(user);

      setMessage(
        "A new verification email has been sent."
      );
    } catch (error) {
      console.error(
        "Resend verification failed:",
        error
      );

      setError(error.message);
    } finally {
      setResending(false);
    }
  };

  const handleCancel = async () => {
    try {
      await signOut(auth);
      navigate("/signup");
    } catch (error) {
      console.error(
        "Sign out failed:",
        error
      );
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">

        <div className="auth-heading">
          <span className="auth-eyebrow">
            DELISH RICH HOSPITALITY
          </span>

          <h1>Verify Your Email</h1>

          <p>
            We've sent a verification link to
          </p>

          <strong className="verification-email">
            {email}
          </strong>
        </div>

        {message && (
          <div className="auth-message auth-success">
            {message}
          </div>
        )}

        {error && (
          <div className="auth-message auth-error">
            {error}
          </div>
        )}

        <button
          type="button"
          className="auth-primary-btn"
          onClick={checkVerification}
          disabled={checking}
        >
          {checking
            ? "Checking..."
            : "I've Verified My Email"}
        </button>

        <button
          type="button"
          className="google-btn"
          onClick={resendVerification}
          disabled={resending}
        >
          {resending
            ? "Sending..."
            : "Resend Verification Email"}
        </button>

        <button
          type="button"
          className="verification-cancel"
          onClick={handleCancel}
        >
          Use a Different Account
        </button>

      </section>
    </main>
  );
}

export default VerifyEmail;