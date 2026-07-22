export default function ContactForm({
  form,
  handleChange,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label>Name</label>

        <input
          required
          value={form.name}
          onChange={handleChange("name")}
        />
      </div>

      <div className="field">
        <label>Email</label>

        <input
          type="email"
          required
          value={form.email}
          onChange={handleChange("email")}
        />
      </div>

      <div className="field">
        <label>Phone</label>

        <input
          value={form.phone}
          onChange={handleChange("phone")}
        />
      </div>

      <div className="field">
        <label>Company</label>

        <input
          value={form.company}
          onChange={handleChange("company")}
        />
      </div>

      <div className="field">
        <label>Message</label>

        <textarea
          rows={5}
          value={form.message}
          onChange={handleChange("message")}
        />
      </div>

      <button
        className="btn btn-solid"
        type="submit"
      >
        Send
      </button>
    </form>
  );
}