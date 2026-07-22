import { useRef, useState } from "react";
import { api } from "../../api";

export default function BulkImagesTab() {
  const [isDragging, setIsDragging] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef(null);

  const uploadFiles = async (files) => {
    setIsUploading(true);

    try {
      const { urls } = await api.uploadBulk(files);

      setImageUrls((previous) => [
        ...urls,
        ...previous,
      ]);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = async (event) => {
    event.preventDefault();

    setIsDragging(false);

    const files = [...event.dataTransfer.files]
      .filter((file) =>
        file.type.startsWith("image/")
      );

    if (!files.length) return;

    uploadFiles(files);
  };

  const handlePick = async (event) => {
    const files = [...event.target.files];

    if (!files.length) return;

    uploadFiles(files);
  };

  return (
    <>
      <div
        className={`dropzone ${
          isDragging ? "over" : ""
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() =>
          setIsDragging(false)
        }
        onDrop={handleDrop}
        onClick={() =>
          fileInputRef.current?.click()
        }
      >
        {isUploading
          ? "Uploading..."
          : "Drop images here, or click to choose a folder"}

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          webkitdirectory=""
          directory=""
          style={{ display: "none" }}
          onChange={handlePick}
        />
      </div>

      {imageUrls.length > 0 && (
        <>
          <p
            style={{
              marginTop: "1.5rem",
              color: "var(--gold)",
            }}
          >
            {imageUrls.length} uploaded —
            paste these URLs into
            product.images
          </p>

          <textarea
            readOnly
            rows={4}
            value={imageUrls.join("\n")}
            style={{
              width: "100%",
              background: "var(--bg)",
              color: "var(--bone)",
              border: "1px solid var(--line)",
              padding: "0.75rem",
            }}
          />

          <div className="thumbs">
            {imageUrls.map((url) => (
              <img
                key={url}
                src={url}
                alt=""
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}