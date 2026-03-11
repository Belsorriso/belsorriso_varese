function CodeRenderer({ settings }) {
  const code = settings.code || '';
  if (!code) return null;

  return (
    <div
      className="pb-code-renderer"
      dangerouslySetInnerHTML={{ __html: code }}
    />
  );
}

export default CodeRenderer;
