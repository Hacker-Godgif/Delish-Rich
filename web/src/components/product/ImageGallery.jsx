export default function ImageGallery({ images }) {
  if (!images?.length) {
    return <div className="card-img" />;
  }

  return (
    <div
      style={{
        display: "grid",
        gap: "0.5rem",
      }}
    >
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt=""
          loading="lazy"
        />
      ))}
    </div>
  );
}