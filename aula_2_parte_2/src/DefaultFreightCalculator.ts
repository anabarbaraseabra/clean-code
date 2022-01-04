import FreghtCalculator from "./FreightCalculator";
import ItemDimensions from "./ItemDimensions";

export default class DefaultFreightCalculator implements FreghtCalculator {
    calculate(item: ItemDimensions): number {
        const freight = (1000 * item.getVolume() * (item.getDensity() / 100));
        const minFreght = 10;
        return Math.max(minFreght, freight);
    }
}