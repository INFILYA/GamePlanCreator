import { AttackFields } from "./components/AttackFields";
import WrapperForActions from "./WrapperForActions";

export default function Attacks() {
  return <WrapperForActions type="Attack" children={<AttackFields />} />;
}
