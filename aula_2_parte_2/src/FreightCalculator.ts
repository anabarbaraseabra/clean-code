import ItemDimensions from "./ItemDimensions";

export default interface FreghtCalculator {
    calculate (item: ItemDimensions): number 
}