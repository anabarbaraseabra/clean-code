import ItemDimensions from "./ItemDimensions";

export default class OrderItem {
    constructor(readonly idItem: number, readonly price:number, readonly quantity:number, readonly dimensions: ItemDimensions){
    }

    getTotal() {
        return this.price * this.quantity    
    }
}