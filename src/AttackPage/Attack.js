import { AttackFields } from "./components/AttackFields";
import WrapperForAttacks from "./WrapperForAttacks";

function Attacks() {
  return <WrapperForAttacks type={"Attack"} children={<AttackFields />} />;
}
export default Attacks;
