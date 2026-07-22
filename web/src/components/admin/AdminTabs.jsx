const tabs = [
  "products",
  "projects",
  "bulk-images",
  "import-csv",
];

export default function AdminTabs({
  tab,
  setTab,
}) {
  return (
    <div className="admin-tabs">
      {tabs.map((item) => (
        <button
          key={item}
          className={tab === item ? "active" : ""}
          onClick={() => setTab(item)}
        >
          {item.replace("-", " ")}
        </button>
      ))}
    </div>
  );
}