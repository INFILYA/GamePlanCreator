export function Button({ onClick, value }) {
  return (
    <button className={"regularButton"} onClick={onClick}>
      {value}
    </button>
  );
}
