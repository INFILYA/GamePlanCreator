import { ServiceFields } from "./components/ServiceFields";
import WrapperForActions from "./WrapperForActions";

export default function Service() {
  return <WrapperForActions type="Service" children={<ServiceFields />} />;
}
