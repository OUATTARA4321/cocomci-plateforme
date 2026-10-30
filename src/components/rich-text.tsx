export function RichText({ content }: { content: string }) {
  return (
    <div className="prose">
      {content
        .split(/\n\n+/)
        .map((block) => block.trim())
        .filter(Boolean)
        .map((block, index) =>
          block.startsWith("> ") ? <blockquote key={index}>{block.slice(2)}</blockquote> : <p key={index}>{block}</p>,
        )}
    </div>
  );
}
