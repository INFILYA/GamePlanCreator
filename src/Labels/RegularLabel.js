import { useRef } from "react";
export function RegularLabel({ value }) {
  const targetElement = useRef();
  function useSlideUp() {
    targetElement.current.scrollIntoView(false);
  }
  function useSlideDown() {
    targetElement.current.scrollIntoView(true);
  }
  return (
    <label className="label" ref={targetElement}>
      <div className="nextSlide" onClick={useSlideUp}>
        <button>▲</button>
      </div>
      <div className="distrWindow">{value}</div>
      <div className="previousSlide" onClick={useSlideDown}>
        <button>▼</button>
      </div>
    </label>
  );
}
