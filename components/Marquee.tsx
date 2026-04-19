export default function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((text, i) => (
          <div key={i} className="marquee-item">{text}</div>
        ))}
      </div>
    </div>
  );
}
