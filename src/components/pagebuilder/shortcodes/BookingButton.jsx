function BookingButton({ params = {} }) {
  const label = params.label || 'Prenota Ora';
  const url = params.url || 'https://belsorrisovarese.kross.travel/';

  return (
    <div className="pb-shortcode-booking" style={{ textAlign: 'center', padding: '8px 0' }}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary"
      >
        {label}
      </a>
    </div>
  );
}

export default BookingButton;
