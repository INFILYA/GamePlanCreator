import { Route, Routes } from "react-router-dom";
import Distribution from "./Distribution/Distribution";
import Service from "./ServicePage/Service";
import Attacks from "./AttackPage/Attack";
import Page1 from "./Page1/Page1";
import Ratings from "./Ratings/Ratings";
import RecieversRating from "./Ratings/components/RecieversRating";
import OppositesRating from "./Ratings/components/OppositesRating";

function Myproject() {
  return (
    <>
      <div className="firstpage">
        <Routes>
          <Route path="/" element={<Page1 />}>
            <Route path="/Distribution" element={<Distribution />} />
            <Route path="/Ratings" element={<Ratings />}>
              <Route
                path="/Ratings/RecieversRating"
                element={<RecieversRating />}
              />
              <Route
                path="/Ratings/OppositesRating"
                element={<OppositesRating />}
              />
            </Route>
            <Route path="/attack" element={<Attacks />} />
            <Route path="/service" element={<Service />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default Myproject;
