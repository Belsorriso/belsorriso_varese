function TextRenderer({ settings }) {
  const content = settings.content || '';
  if (!content) return null;

  return (
    <div
      className="pb-text-renderer"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

export default TextRenderer;
