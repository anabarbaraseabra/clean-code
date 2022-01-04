import Coupon from "./Coupon";
import Cpf from "./Cpf";
import DefaultFreightCalculator from "./DefaultFreightCalculator";
import FreghtCalculator from "./FreightCalculator";
import Item from "./Item";
import OrderItem from "./OrderItem";

export default class Order {
    cpf: Cpf;
    private orderItems: OrderItem[];
    coupon: Coupon | undefined;
    private freight: number

    constructor(cpf: string, readonly date: Date = new Date(), readonly freightCalculator: FreghtCalculator = new DefaultFreightCalculator) {
        this.cpf = new Cpf(cpf);
        this.orderItems = []
        this.freight = 0;
    }

    getTotal() {
        let total = 0;
        for(const ordermItem of this.orderItems) {
            total+= ordermItem.getTotal();
        }
        if (this.coupon) {
            total -= total*this.coupon.discount / 100;
        }
        return total;
    }

    addItem(item: Item, quantity: number){
        this.freight += this.freightCalculator.calculate(item.dimensions) * quantity;
        this.orderItems.push(new OrderItem(item.idItem, item.price, quantity, item.dimensions))
    }

    addCoupon(coupon: Coupon) {
        if(coupon.isValid(this.date)){
            this.coupon = coupon;
        }
    }

    getFreight () {
		return this.freight;
	}

}