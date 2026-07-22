export default function ProjectGallery({ images }) {
  if (!images?.length) {
    return <div className="card-img" />;
  }

  return (
    <div
      style={{
        display: "grid",
        gap: "0.75rem",
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