function GoogleMap({ params = {} }) {
  const address = params.address || 'Piazza Biroldi, 8, 21100 Varese VA';
  const height = Number(params.height) || 350;
  const encodedAddress = encodeURIComponent(address);

  return (
    <div className="pb-shortcode-map" style={{ width: '100%', height }}>
      <iframe
        title="Google Maps"
        src={`https://maps.google.com/maps?q=${encodedAddress}&output=embed`}
        width="100%"
        height={height}
        style={{ border: 0, display: 'block' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

export default GoogleMap;
