import { DistrField } from "./components/DistrField";
import WrapperForDistribution from "./WrapperForDistribution";

export default function Distribution() {
  return <WrapperForDistribution children={<DistrField />} />;
}
