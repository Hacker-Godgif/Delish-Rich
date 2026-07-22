import { useEffect, useState } from "react";
import { api } from "../../api";

const initialForm = {
  slug: "",
  name: "",
  category: "",
  price: "",
  description: "",
};

export default function ProductsTab() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);

  const loadProducts = () => {
    api.products()
      .then(setProducts)
      .catch(console.error);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange =
    (field) =>
    (event) =>
      setForm({
        ...form,
        [field]: event.target.value,
      });

  const handleSubmit = async (event) => {
    event.preventDefault();

    await api.createProduct({
      ...form,
      price: form.price
        ? Number(form.price)
        : undefined,
    });

    setForm(initialForm);

    loadProducts();
  };

  const handleDelete = async (id) => {
    await api.deleteProduct(id);

    loadProducts();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(5,1fr) auto",
          gap: "0.5rem",
          marginBottom: "2rem",
        }}
      >
        <input
          placeholder="Slug"
          required
          value={form.slug}
          onChange={handleChange("slug")}
        />

        <input
          placeholder="Name"
          required
          value={form.name}
          onChange={handleChange("name")}
        />

        <input
          placeholder="Category"
          value={form.category}
          onChange={handleChange("category")}
        />

        <input
          placeholder="Price"
          value={form.price}
          onChange={handleChange("price")}
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={handleChange("description")}
        />

        <button className="btn btn-solid">
          Add
        </button>
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Slug</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.slug}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>

              <td>
                <button
                  className="filter-chip"
                  onClick={() =>
                    handleDelete(product._id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}