import { useState } from "react";
import { api } from "../../api";

export default function ImportCsvTab() {
  const [result, setResult] = useState(null);
  const [isImporting, setIsImporting] =
    useState(false);

  const handleFile = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setIsImporting(true);

    try {
      const response =
        await api.importProductsCsv(file);

      setResult(response);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <>
      <p style={{ color: "var(--bone-dim)" }}>
        CSV columns:
        <code>
          slug,name,category,description,
          price,images,featured
        </code>
      </p>

      <input
        type="file"
        accept=".csv"
        onChange={handleFile}
      />

      {isImporting && <p>Importing...</p>}

      {result && (
        <p style={{ color: "var(--gold)" }}>
          Inserted {result.inserted} ·
          Updated {result.updated}
        </p>
      )}
    </>
  );
}