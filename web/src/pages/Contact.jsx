import { useState } from "react";
import { api } from "../api";

import ContactForm from "../components/contact/ContactForm";
import InquirySuccess from "../components/contact/InquirySuccess";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [sent, setSent] = useState(false);

  const handleChange =
    (field) =>
    (event) =>
      setForm({
        ...form,
        [field]: event.target.value,
      });

  const handleSubmit = async (event) => {
    event.preventDefault();

    await api.submitInquiry(form);

    setSent(true);
  };

  return (
    <section
      className="section container"
      style={{ maxWidth: 680 }}
    >
      <div className="eyebrow">
        Contact
      </div>

      <h1>Let's begin.</h1>

      {sent ? (
        <InquirySuccess />
      ) : (
        <ContactForm
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
    </section>
  );
}