import ItemDimensions from "../src/ItemDimensions";

test("Deve retornar o volume do item", function() {
    const itemDimensions = new ItemDimensions(20, 15, 10, 1)
    const volume = itemDimensions.getVolume()
    expect(volume).toBe(0.003)
})

test("Deve retornar a densidade do item", function() {
    const itemDimensions = new ItemDimensions(20, 15, 10, 1)
    const density = itemDimensions.getDensity().toFixed(2)
    expect(density).toBe("333.33")
})

