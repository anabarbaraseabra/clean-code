import Coupon from "../src/Coupon";
import DefaultFreightCalculator from "../src/DefaultFreightCalculator";
import FixedFreightCalculator from "../src/FixedFreightCalculator";
import Item from "../src/Item";
import ItemDimensions from "../src/ItemDimensions";
import Order from "../src/Order";


test("Deve criar um pedido com CPF válido", function () {
    const cpf = "120.713.896-70";
    const order = new Order(cpf);
    const total = order.getTotal();
    expect(total).toBe(0);
})

test("Deve tentar criar um pedido com CPF inválido", function () {
    const cpf = "111.111.111-11";
    expect(() => new Order(cpf)).toThrow(new Error("Invalid cpf"));
})

test("Deve criar um pedido com 3 itens", function () {
    const cpf = "120.713.896-70";
    const order = new Order(cpf);
    const dimensions = new ItemDimensions(20, 15, 10, 1)
    order.addItem(new Item(1, "Musica", "CD", 30, dimensions), 3);
    order.addItem(new Item(2, "Video", "DVD", 50, dimensions), 1);
    order.addItem(new Item(3, "Video", "VHS", 10, dimensions), 2);
    const total = order.getTotal();
    expect(total).toBe(160);
})

test("Deve criar um pedido com 3 itens com cupom de desconto", function () {
    const cpf = "120.713.896-70";
    const order = new Order(cpf);
    const dimensions = new ItemDimensions(20, 15, 10, 1)
    order.addItem(new Item(1, "Musica", "CD", 30, dimensions), 3);
    order.addItem(new Item(2, "Video", "DVD", 50, dimensions), 1);
    order.addItem(new Item(3, "Video", "VHS", 10, dimensions), 2);
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 3)
    order.addCoupon(new Coupon("VALE20", 20, expirationDate));
    const total = order.getTotal();
    expect(total).toBe(128);
})

test("Não deve aplicar cupom de desconto expirado", function() {
    const cpf = "120.713.896-70";
    const order = new Order(cpf, new Date("2021-12-10"));
    const dimensions = new ItemDimensions(20, 15, 10, 1)
    order.addItem(new Item(1, "Musica", "CD", 30, dimensions), 3);
    order.addCoupon(new Coupon("VALE20", 20, new Date(2002, 1, 1)));
    const total = order.getTotal();
    expect(total).toBe(90);
})
test("Deve criar um pedido com 3 itens com o cálculo do frete com a estratégia default", function () {
	const cpf = "839.435.452-10";
	const order = new Order(cpf, new Date(), new DefaultFreightCalculator());
    const dimensions = new ItemDimensions(20, 15, 10, 1)
	order.addItem(new Item(4, "Instrumentos Musicais", "Guitarra", 1000, new ItemDimensions(100, 30, 10, 3)), 1); // 30
	order.addItem(new Item(5, "Instrumentos Musicais", "Amplificador", 5000, new ItemDimensions(100, 50, 50, 20)), 1);
	order.addItem(new Item(6, "Acessórios", "Cabo", 30, new ItemDimensions(10, 10, 10, 0.9)), 3);
	const freight = order.getFreight();
	expect(freight).toBe(260);
});

test("Deve criar um pedido com 3 itens com o cálculo do frete com a estratégia fixo", function () {
	const cpf = "839.435.452-10";
	const order = new Order(cpf, new Date(), new FixedFreightCalculator());
	order.addItem(new Item(4, "Instrumentos Musicais", "Guitarra", 1000, new ItemDimensions(100, 30, 10, 3)), 1); // 30
	order.addItem(new Item(5, "Instrumentos Musicais", "Amplificador", 5000, new ItemDimensions(100, 50, 50, 20)), 1);
	order.addItem(new Item(6, "Acessórios", "Cabo", 30, new ItemDimensions(10, 10, 10, 0.9)), 3);
	const freight = order.getFreight();
	expect(freight).toBe(50);
});

