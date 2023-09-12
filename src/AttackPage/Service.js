import { ServiceFields } from "./components/ServiceFields";
import WrapperForAttacks from "./WrapperForAttacks";

function Service() {
  return <WrapperForAttacks type={"Service"} children={<ServiceFields />} />;
}
export default Service;
