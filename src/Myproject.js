import { Route, Routes } from "react-router-dom";
import Distribution from "./Distribution/Distribution";
import Service from "./ServicePage/Service";
import Attacks from "./AttackPage/Attack";
import Page1 from "./Page1/Page1";

function Myproject() {
  return (
    <>
      <div className="firstpage">
        <Routes>
          <Route path="/" element={<Page1 />}>
            <Route path="/Distribution" element={<Distribution />} />
            <Route path="/attack" element={<Attacks />} />
            <Route path="/service" element={<Service />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default Myproject;
