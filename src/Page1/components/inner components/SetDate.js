export function SetDate() {
  let date = new Date();
  let options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const Data = date.toLocaleDateString("en-US", options);
  return (
    <div style={{ marginRight: 15 }}>
      <h2>{Data}</h2>
    </div>
  );
}
