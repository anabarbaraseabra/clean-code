import FreghtCalculator from "./FreightCalculator";
import ItemDimensions from "./ItemDimensions";

export default class FixedFreightCalculator implements FreghtCalculator {
    calculate(item: ItemDimensions): number {
        return 10;
    }

}