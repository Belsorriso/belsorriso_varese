const SOCIAL_ICONS = {
  facebook: '📘',
  instagram: '📷',
  tripadvisor: '🦉',
};

function SocialLinks({ params = {} }) {
  const links = Object.entries(params).filter(([, url]) => url && url.trim());

  if (links.length === 0) return null;

  return (
    <div className="pb-shortcode-social" style={{ display: 'flex', gap: 12, justifyContent: 'center', padding: '8px 0' }}>
      {links.map(([key, url]) => (
        <a
          key={key}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          title={key.charAt(0).toUpperCase() + key.slice(1)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: '#f3f4f6',
            textDecoration: 'none',
            fontSize: 22,
            transition: 'background 0.15s',
          }}
        >
          {SOCIAL_ICONS[key] || '🔗'}
        </a>
      ))}
    </div>
  );
}

export default SocialLinks;
