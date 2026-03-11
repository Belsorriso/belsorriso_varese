function PhoneCta({ params = {} }) {
  const phone = params.phone || '+39 342 1895829';
  const label = params.label || 'Chiamaci';
  const cleanPhone = phone.replace(/\s/g, '');

  return (
    <div className="pb-shortcode-phone" style={{ textAlign: 'center', padding: '8px 0' }}>
      <a
        href={`tel:${cleanPhone}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 24px',
          background: '#ad172b',
          color: '#fff',
          borderRadius: 8,
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: 16,
        }}
      >
        <span>📞</span>
        <span>{label}: {phone}</span>
      </a>
    </div>
  );
}

export default PhoneCta;
