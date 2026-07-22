import { useState } from "react";

import AdminLogin from "../components/admin/AdminLogin";
import AdminTabs from "../components/admin/AdminTabs";
import ProductsTab from "../components/admin/ProductsTab";
import ProjectsTab from "../components/admin/ProjectsTab";
import BulkImagesTab from "../components/admin/BulkImagesTab";
import ImportCsvTab from "../components/admin/ImportCsvTab";

export default function Admin() {
  const [token, setToken] = useState(
    localStorage.getItem("adminToken") || ""
  );

  const [activeTab, setActiveTab] = useState("products");

  const handleSignOut = () => {
    localStorage.removeItem("adminToken");
    location.reload();
  };

  if (!token) {
    return (
      <AdminLogin
        token={token}
        setToken={setToken}
      />
    );
  }

  return (
    <section className="section container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Admin</h1>

        <button
          className="btn"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>

      <AdminTabs
        tab={activeTab}
        setTab={setActiveTab}
      />

      {activeTab === "products" && <ProductsTab />}

      {activeTab === "projects" && <ProjectsTab />}

      {activeTab === "bulk-images" && (
        <BulkImagesTab />
      )}

      {activeTab === "import-csv" && (
        <ImportCsvTab />
      )}
    </section>
  );
}