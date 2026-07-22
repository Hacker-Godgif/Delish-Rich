const services = [
  { t: 'Interior Design', d: 'Concept to handover, for hospitality and high-end residential.' },
  { t: 'Custom Furniture', d: 'Bespoke pieces designed and made in our workshop.' },
  { t: 'Project Management', d: 'On-site coordination, procurement, and install.' },
];
export default function Services() {
  return (
    <section className="section container">
      <div className="eyebrow">Services</div>
      <h1>What we do.</h1>
      <div className="grid grid-3" style={{ marginTop: '2rem' }}>
        {services.map((s) => (
          <div className="card" key={s.t}>
            <div className="card-body">
              <h3>{s.t}</h3>
              <p style={{ color: 'var(--bone-dim)', margin: 0 }}>{s.d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
