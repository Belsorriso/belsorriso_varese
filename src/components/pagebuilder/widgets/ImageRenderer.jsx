function ImageRenderer({ settings }) {
  const { src, alt, link, align = 'center', width = '100%' } = settings;

  if (!src) return null;

  const alignStyle = {
    left: { textAlign: 'left' },
    center: { textAlign: 'center' },
    right: { textAlign: 'right' },
  }[align] || { textAlign: 'center' };

  const img = (
    <img
      src={src}
      alt={alt || ''}
      style={{ width, maxWidth: '100%', height: 'auto', display: 'inline-block' }}
    />
  );

  return (
    <div className="pb-image-renderer" style={alignStyle}>
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {img}
        </a>
      ) : img}
    </div>
  );
}

export default ImageRenderer;
