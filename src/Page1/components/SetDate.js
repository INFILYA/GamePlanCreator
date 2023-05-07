export function SetDate() {
  let date = new Date();
  let options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const Data = date.toLocaleDateString("en-US", options);
  return <button className="date">{Data}</button>;
}
