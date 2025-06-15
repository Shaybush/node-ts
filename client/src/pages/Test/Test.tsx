export default function Test() {
  const num = 10_000;
  const items = Array.from({ length: num }, (_, index) => index + 1);

  return (
    <div>
      {items.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </div>
  );
}
