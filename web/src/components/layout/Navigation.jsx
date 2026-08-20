import { NavLink } from "react-router-dom";
import { navigation } from "../../config/navigation";

export default function Navigation({
  open,
  setOpen,
  user,
}) {
  return (
    <nav
      className={`nav-links ${open ? "open" : ""}`}
      onClick={() => setOpen(false)}
    >
      {navigation.map((item) => {
        if (item.path === "/login" && user) {
          return null;
        }

        return (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
          >
            {item.label}
          </NavLink>
        );
      })}

      {user && (
        <NavLink
          to="/profile"
          className="profile-nav-link"
          title="My Profile"
        >
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={
                user.displayName || "Profile"
              }
              className="profile-avatar"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.style.display =
                  "none";

                if (
                  e.currentTarget
                    .nextElementSibling
                ) {
                  e.currentTarget
                    .nextElementSibling.style.display =
                    "flex";
                }
              }}
            />
          ) : null}

          <div
            className="profile-avatar profile-fallback"
            style={{
              display: user.photoURL
                ? "none"
                : "flex",
            }}
          >
            {(
              user.displayName ||
              user.email ||
              "U"
            )
              .charAt(0)
              .toUpperCase()}
          </div>
        </NavLink>
      )}
    </nav>
  );
}