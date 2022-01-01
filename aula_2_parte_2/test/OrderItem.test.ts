import ItemDimensions from "../src/ItemDimensions";
import OrderItem from "../src/OrderItem"

test("Deve criar um item do pedido", function(){
    const dimensions = new ItemDimensions(20, 15, 10, 1)
    const orderItem = new OrderItem(1, 1000, 10, dimensions);
    expect(orderItem.getTotal()).toBe(10000);
})