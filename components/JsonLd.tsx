export default function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}) {
  // Sanitize '<' to prevent script tag injection while preserving valid JSON-LD
  const sanitizedJson = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: sanitizedJson }}
    />
  );
}
