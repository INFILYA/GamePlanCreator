import { AttackFields } from "./components/AttackFields";
import WrapperForAttacks from "./WrapperForAttacks";

export default function Attacks() {
  return <WrapperForAttacks type={"Attack"} children={<AttackFields />} />;
}
