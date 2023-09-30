export default function TextWrapper({ children }) {
  return (
    <>
      <div className="inner-text-wrapper">{children}</div>
      <div className="inner-image-wrapper">{children}</div>
    </>
  );
}
