export default function Marquee({ items }: { items: string[] }) {
  // Triple the items to ensure seamless infinite loop without any gap
  const tripled = [...items, ...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {tripled.map((text, i) => (
          <div key={i} className="marquee-item">{text}</div>
        ))}
      </div>
    </div>
  );
}
