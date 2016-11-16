(function(object) {
    object.products = {};
    object.promoCodes = {};

    products["001"] = {
        brand: "Abc",
        description: "Maxi dress",
        size: "m",
        color: "blue",
        price: 59.99,
        discountPr: 59.99,
        imageUrl: "http://placehold.it/100x100",
        category: "clothing"
    };

    products["002"] = {
        brand: "Nullam",
        description: "Knee-length skirt",
        size: "s",
        color: "black",
        price: 49.99,
        discountPr: 49.99,
        imageUrl: "http://placehold.it/100x100",
        category: "clothing"
    };

    products["003"] = {
        brand: "Abc",
        description: "wool sweater",
        size: "l",
        color: "grey",
        price: 109,
        discountPr: 85.99,
        imageUrl: "http://placehold.it/100x100",
        category: "clothing"
    };

    products["004"] = {
        brand: "Vivamus",
        description: "washed jeans",
        size: "m",
        color: "indigo",
        price: 80,
        discountPr: 65.99,
        imageUrl: "http://placehold.it/100x100",
        category: "clothing"
    };

    products["005"] = {
        brand: "Abc",
        description: "shoulder bag",
        size: "one size",
        color: "red",
        price: 499,
        discountPr: 499,
        imageUrl: "http://placehold.it/100x100",
        category: "bag"
    };

    products["006"] = {
        brand: "Maecenas",
        description: "platform",
        size: "7",
        color: "black",
        price: 359,
        discountPr: 309.99,
        imageUrl: "http://placehold.it/100x100",
        category: "shoe"
    };

    products["007"] = {
        brand: "Maecenas",
        description: "flat",
        size: "9",
        color: "pink",
        price: 299,
        discountPr: 299,
        imageUrl: "http://placehold.it/100x100",
        category: "shoe"
    };


    products["008"] = {
        brand: "Duis sed",
        description: "sunglasses",
        size: "one size",
        color: "brown",
        price: 199,
        discountPr: 199,
        imageUrl: "http://placehold.it/100x100",
        category: "accessory"
    };

    products["009"] = {
        brand: "Duis sed",
        description: "scarf",
        size: "one size",
        color: "plaid",
        price: 29,
        discountPr: 18.99,
        imageUrl: "http://placehold.it/100x100",
        category: "accessory"
    };

    products["010"] = {
        brand: "feugiat",
        description: "long coat",
        size: "s",
        color: "camel",
        price: 599,
        discountPr: 450.99,
        imageUrl: "http://placehold.it/100x100",
        category: "clothing"
    };

    products["011"] = {
        brand: "feugiat",
        description: "leather jacket",
        size: "s",
        color: "camel",
        price: 559,
        discountPr: 409.99,
        imageUrl: "http://placehold.it/100x100",
        category: "clothing"
    };

    products["012"] = {
        brand: "Vivamus",
        description: "cashmere poncho",
        size: "one size",
        color: "navy",
        price: 165,
        discountPr: 98.99,
        imageUrl: "http://placehold.it/100x100",
        category: "accessory"
    };


    promoCodes["WELCOME10"] = {
        type: "all",
        discount: 0.9
    };

    promoCodes["ACCESS15OFF"] = {
        type: "accessory",
        discount: 0.85
    };

    promoCodes["ABCBAG10"] = {
        type: "005",
        discount: 0.9
    };

})(window);