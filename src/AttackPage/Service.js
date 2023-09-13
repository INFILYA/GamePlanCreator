import { ServiceFields } from "./components/ServiceFields";
import WrapperForAttacks from "./WrapperForAttacks";

export default function Service() {
  return <WrapperForAttacks type={"Service"} children={<ServiceFields />} />;
}
