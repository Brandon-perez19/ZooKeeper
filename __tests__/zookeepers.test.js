const fs = require('fs');
const { filteredByQuery, findById, createNewZookeeper, validateZooKeeper, } = require("../lib/zookeepers");
const { zookeepers } = require("../data/zookeepers.json");

jest.mock('fs');

test("creates zookeeper object", () => {
    const zookeeper = createNewZookeeper({
        name: "Eric",
        age: "15",
    }, zookeepers);
    expect(zookeeper.name).toBe("Eric");
    expect(zookeeper.age).toBe("15");
})

test("filters by query", () => {
    const startingKeepers = [{
        id: "3",
        name: "Eric",
        favoriteAnimal: "gorilla",
        age: "20"
    },
    {
        id: "4",
        name: "Noel",
        favoriteAnimal: "bear",
        age: "32"
    },
    ];

    const updatedKeepers = filteredByQuery({ favoriteAnimal: "gorilla" }, startingKeepers);
    expect(updatedKeepers.length).toEqual(1);
});

test('finds by ID', () => {
    const startingKeepers = [{
        id: "3",
        name: "Eric",
        favoriteAnimal: "gorilla",
        age: "20"
    },
    {
        id: "4",
        name: "Noel",
        favoriteAnimal: "bear",
        age: "32"
    },
    ];

    const result = findById("3", startingKeepers);
    expect(result.name).toBe("Eric");
});

test("validates zookeeper object", () => {
    const zookeeper = {
        id: "3",
        name: "Eric",
        favoriteAnimal: "gorilla",
        age: 20
    }

    const invalidKeeper = {
        id: "4",
        name: "Noel",
        age: "32"
    };

    const result = validateZooKeeper(zookeeper);
    const result2 = validateZooKeeper(invalidKeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});