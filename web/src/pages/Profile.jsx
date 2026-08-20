import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase/firebase";

function Profile() {
  const [user, setUser] = useState(null);
  const [imageError, setImageError] =
    useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (firebaseUser) => {
          if (!firebaseUser) {
            navigate("/login");
            return;
          }

          setUser(firebaseUser);
        }
      );

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);

      localStorage.removeItem("token");

      navigate("/");
    } catch (error) {
      console.error(
        "Logout failed:",
        error
      );
    }
  };

  if (!user) {
    return (
      <main className="auth-page">
        <div className="profile-loading">
          Loading profile...
        </div>
      </main>
    );
  }

  const initial = (
    user.displayName ||
    user.email ||
    "U"
  )
    .charAt(0)
    .toUpperCase();

  const showPhoto =
    user.photoURL && !imageError;

  return (
    <main className="profile-page">

      <section className="profile-card">

        <div className="profile-heading">
          <span className="auth-eyebrow">
            DELISH RICH HOSPITALITY
          </span>

          <h1>My Profile</h1>

          <p>
            Manage your account and
            preferences.
          </p>
        </div>

        <div className="profile-avatar-large">
          {showPhoto ? (
            <img
              src={user.photoURL}
              alt={
                user.displayName ||
                "Profile"
              }
              referrerPolicy="no-referrer"
              onError={() =>
                setImageError(true)
              }
            />
          ) : (
            <span>
              {initial}
            </span>
          )}
        </div>

        <div className="profile-info">
          <h2>
            {user.displayName || "User"}
          </h2>

          <p>{user.email}</p>
        </div>

        <div className="profile-details">

          <div className="profile-detail">
            <span>Authentication</span>

            <strong>
              {user.providerData?.[0]
                ?.providerId ===
              "google.com"
                ? "Google"
                : "Email & Password"}
            </strong>
          </div>

          <div className="profile-detail">
            <span>Account</span>

            <strong>Active</strong>
          </div>

        </div>

        <button
          className="profile-logout-btn"
          onClick={handleLogout}
        >
          Log Out
        </button>

      </section>

    </main>
  );
}

export default Profile;