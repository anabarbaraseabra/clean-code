import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Item from "./Item";
import OrderItem from "./OrderItem";

export default class Order {
    cpf: Cpf;
    orderItems: OrderItem[];
    coupon: Coupon | undefined;
    distance = 1000

    constructor(cpf: string) {
        this.cpf = new Cpf(cpf);
        this.orderItems = []
    }

    getTotal() {
        let total = 0;
        for(const ordermItem of this.orderItems) {
            total+= ordermItem.getTotal();
        }
        const dateToCompare = new Date()
        dateToCompare.setHours(0,0,0,0)
        if (this.coupon && this.coupon.expiration >= new Date()) {
            total -= total*this.coupon.discount / 100;
        }
        return total;
    }

    addItem(item: Item, quantity: number){
        this.orderItems.push(new OrderItem(item.idItem, item.price, quantity, item.dimensions))
    }

    addCoupon(coupon: Coupon) {
        this.coupon = coupon;
    }

    getShippingPrice(){
        let totalShippingPrice = 0
        for (const orderItem of this.orderItems){
            totalShippingPrice += this.distance * orderItem.dimensions.getVolume() * (orderItem.dimensions.getDensity()/100);
        }
        return totalShippingPrice < 10 ? 10 : totalShippingPrice;
    }

}