(function() {
    var openBagBtn = document.getElementById("open-bag-btn"),
        openedBag = document.getElementById("opened-bag"),
        emptyBagMsg = document.getElementById("empty-bag-msg"),
        closeBagBtn = document.getElementById("close"),
        contShopBtn = document.getElementById("cont-shopping"),
        shoppingBag = document.getElementById("products-in-bag"),
        addBtns = document.getElementsByClassName("add-btn"),
        totalOriginalPr = document.getElementById("total-original"),
        totalAfterPromo = document.getElementById("total-promo"),
        applyPromoBtn = document.getElementById("apply-promo"),
        promoField = document.getElementById("promo-input"),
        currentPromo = "",
        invalidInfo = document.getElementById("invalid-info"),
        showCurrentPromo = document.getElementById("show-current-promo"),
        itemsInBag = {};

    for (var i = 0; i < addBtns.length; i++) {
        addBtns[i].addEventListener("click", function() {
            updateItemInBag(this.value);
            console.log("add an item");
        });
    }

    function showBag() {
        openedBag.style.display = "block";
        document.body.style.backgroundColor = "#f5f5f5";
        document.body.style.overflow = "hidden";
    }

    function closeBag() {
        openedBag.style.display = "none";
        document.body.style.backgroundColor = "white";
        document.body.style.overflow = "auto";
    }

    function updateItemInBag(productId) {
        var product = products[productId],
            row = document.createElement("tr"),
            td0 = row.insertCell(0),
            td1 = row.insertCell(1),
            td2 = row.insertCell(2),
            td3 = row.insertCell(3),
            image = document.createElement("img"),
            qtyInput = document.createElement("input"),
            qty = document.createElement("label"),
            removeBtn = document.createElement("button"),
            descriptionText = product.brand + ": " + product.description,
            description = document.createElement("p"),
            colorSzText = product.color + "/" + product.size,
            colorSz = document.createElement("p"),
            priceFor1 = product.price,
            price = document.createElement("p"),
            discountPrFor1 = product.discountPr,
            discountPr = document.createElement("p"),
            temp;

        // shopping bag was not empty
        if (itemsInBag.hasOwnProperty(productId)){
            itemsInBag[productId]++;
            // console.log("itemsInBag: " + itemsInBag[productId]);
            document.getElementById("qty-input" + productId).value =
                itemsInBag[productId];
            // update each item's price and discountPr
            document.getElementById("price" + productId).innerHTML =
                "$" + (products[productId].price * itemsInBag[productId]).toFixed(2);
            if (products[productId].price !== products[productId].discountPr) {
                document.getElementById("discount" + productId).innerHTML =
                    "$" + (products[productId].discountPr * itemsInBag[productId]).toFixed(2);
            }
            // update totalPrice in summary
            temp = calculateTotalPr();
            totalOriginalPr.innerHTML = "$" + temp[0].toFixed(2);
            totalOriginalPr.style.textDecoration = "none";
            if (currentPromo !== "") {
                totalAfterPromo.innerHTML = "$" + temp[1].toFixed(2);
                totalOriginalPr.style.textDecoration = "line-through";
            }
            return;
        }

        // shopping bag was empty
        itemsInBag[productId] = 1;
        shoppingBag.appendChild(row);

        // Add all elements to td and tr
        row.setAttribute("id", "tr" + productId);
        row.setAttribute("class", "row");

        image.setAttribute("src", product.image);
        td0.appendChild(image);
        td0.setAttribute("class", "narrow-col");

        description.innerHTML = descriptionText;
        description.setAttribute("class", "description");
        colorSz.innerHTML = colorSzText;
        colorSz.setAttribute("class", "color-sz");
        td1.appendChild(description);
        td1.appendChild(colorSz);
        td1.setAttribute("class", "wide-col");

        removeBtn.innerHTML = "remove";
        removeBtn.setAttribute("value", productId);
        removeBtn.setAttribute("class", "remove-btn");
        removeBtn.setAttribute("type", "button");
        removeBtn.setAttribute("name", "remove");
        qtyInput.setAttribute("type", "number");
        qtyInput.setAttribute("name", "quantity");
        qtyInput.setAttribute("min", "0");
        qtyInput.setAttribute("value", "1");
        qtyInput.setAttribute("id", "qty-input" + productId);
        qty.innerHTML = "QTY" + "&nbsp;";
        qty.appendChild(qtyInput);
        qty.setAttribute("class", "qty");
        td2.appendChild(qty);
        td2.appendChild(removeBtn);
        td2.setAttribute("class", "narrow-col");

        td3.appendChild(price);
        td3.appendChild(discountPr);
        td3.setAttribute("class", "narrow-col");
        price.setAttribute("id", "price" + productId);
        price.innerHTML = "$" + priceFor1.toFixed(2);
        if (discountPrFor1 !== priceFor1) {
            discountPr.innerHTML = "$" + discountPrFor1.toFixed(2);
            price.setAttribute("class", "original-pr");
            discountPr.setAttribute("id", "discount" + productId);
            discountPr.setAttribute("class", "discount-pr");
            console.log("line 108");
        }

        temp = calculateTotalPr();
        totalOriginalPr.innerHTML = "$" + temp[0].toFixed(2);
        totalOriginalPr.style.textDecoration = "none";
        if (currentPromo !== "") {
            console.log("has promo");
            totalAfterPromo.innerHTML = "$" + temp[1].toFixed(2);
            totalOriginalPr.style.textDecoration = "line-through";
        }


        // remove product from bag when removeBtn is onclick
        removeBtn.onclick = function() {
            var temp;
            shoppingBag.removeChild(row);
            delete itemsInBag[removeBtn.value];
            // calculateTotalPr();
            temp = calculateTotalPr();
            totalOriginalPr.innerHTML = "$" + temp[0].toFixed(2);
            totalOriginalPr.style.textDecoration = "none";
            if (currentPromo !== "") {
                totalAfterPromo.innerHTML = "$" + temp[1].toFixed(2);
                totalOriginalPr.style.textDecoration = "line-through";
            }
            // if itemsInBag is empty, close the shopping bag
        };

        qtyInput.onchange = function () {
            var temp;
            console.log("onchange");
            if (this.value === "0") {
                shoppingBag.removeChild(row);
                delete itemsInBag[productId];
                // if itemsInBag is empty, close the shopping bag
            } else {
                itemsInBag[productId] = this.value;
                price.innerHTML = "$" + (this.value * priceFor1).toFixed(2);
                if (discountPrFor1 !== priceFor1) {
                    discountPr.innerHTML = "$" + (this.value * discountPrFor1).toFixed(2);
                }
            }
            console.log("total price onchange: " + calculateTotalPr());
            // calculateTotalPr();
            temp = calculateTotalPr();
            totalOriginalPr.innerHTML = "$" + temp[0].toFixed(2);
            totalOriginalPr.style.textDecoration = "none";
            if (currentPromo !== "") {
                totalAfterPromo.innerHTML = "$" + temp[1].toFixed(2);
                totalOriginalPr.style.textDecoration = "line-through";
            }
        };
    }

    function calculateTotalPr() {
        console.log("enter calculate func");
        var totalPrice = 0,
            totalPromoPr = 0,
            result = [];
        for (var item in itemsInBag) {
            totalPrice += itemsInBag[item] * products[item].discountPr;
            if (currentPromo !== "") {
                console.log("has a promo code");
                console.log(item);
                totalPromoPr += itemsInBag[item] * getPromoPr(item);
            }
        }
        // totalOriginalPr.innerHTML = "$" + totalPrice.toFixed(2);
        // if (currentPromo !== "") {
        //     totalAfterPromo.innerHTML = "$" + totalPromoPr.toFixed(2);
        // }
        result.push(totalPrice);
        result.push(totalPromoPr);
        console.log("result arr: " + result);
        return result;
    }

    function getPromoPr(productId) {
        console.log(currentPromo);
        console.log(promoCodes[currentPromo]);
        if (promoCodes[currentPromo].type === productId) {
            console.log("single item");
            return products[productId].discountPr * promoCodes[currentPromo].discount;
        }
        if (promoCodes[currentPromo].type === products[productId].category) {
            console.log("category");
            return products[productId].discountPr * promoCodes[currentPromo].discount;
        }
        if (promoCodes[currentPromo].type === "all") {
            console.log("all");
            return products[productId].discountPr * promoCodes[currentPromo].discount;
        }
        console.log("no code apply to " + productId);
        return products[productId].discountPr;
    }

    applyPromoBtn.onclick = function() {
        var newPromo = promoField.value.toUpperCase(),
            totalOldPromo,
            totalNewPromo,
            temp,
            tempPromo;
        console.log("new code " + newPromo);
        console.log("current code " + currentPromo);

        // if newPromo is empty
        if (newPromo === "") {
            console.log("newPromo is empty");
            invalidInfo.innerHTML = "";
            totalAfterPromo.innerHTML = "";
            showCurrentPromo.innerHTML = "";
            totalOriginalPr.style.textDecoration = "none";
            currentPromo = "";
            console.log("current promo is changed to empty");
        } else { // if newPromo is not empty
            if (!(newPromo in promoCodes)) {
                console.log("Invalid new promo");
                invalidInfo.innerHTML = "Invalid promo code";
                totalAfterPromo.innerHTML = "";
                totalOriginalPr.style.textDecoration = "none";
                showCurrentPromo.innerHTML = "";
                currentPromo = "";
            } else {
                console.log("valid new promo");
                if (currentPromo === "") {
                    console.log("no code before");
                    currentPromo = newPromo;
                    temp = calculateTotalPr();
                    totalOriginalPr.innerHTML = "$" + temp[0].toFixed(2);
                    totalAfterPromo.innerHTML = "$" + temp[1].toFixed(2);
                    totalOriginalPr.style.textDecoration = "line-through";
                    invalidInfo.innerHTML = "";
                    showCurrentPromo.innerHTML = currentPromo + " applied";
                } else {
                    console.log("has code before, compare new and old");
                    totalWithOldPromo = calculateTotalPr()[1];
                    tempPromo = currentPromo;
                    currentPromo = newPromo;
                    totalWithNewPromo = calculateTotalPr()[1];
                    console.log(totalWithOldPromo + " with old");
                    console.log(totalWithNewPromo + " with New");

                    if (totalWithNewPromo < totalWithOldPromo) {
                        console.log("new < old");
                        totalAfterPromo.innerHTML = "$" + totalWithNewPromo.toFixed(2);
                        totalOriginalPr.style.textDecoration = "line-through";
                        invalidInfo.innerHTML = "";
                        showCurrentPromo.innerHTML = currentPromo + " applied";
                    } else {
                        console.log("new >= old");
                        invalidInfo.innerHTML = "New promo code doesn't make your order cheaper";
                        currentPromo = tempPromo;
                        console.log("current code after compare: " + currentPromo);
                    }
                }
            }
        }

    };

    openBagBtn.onmouseover = function() {
        if (Object.keys(itemsInBag).length === 0) {
            emptyBagMsg.style.display = "block";
        }
    };

    openBagBtn.onmouseout = function() {
        if (Object.keys(itemsInBag).length === 0) {
            emptyBagMsg.style.display = "none";
        }
    };

    openBagBtn.onclick = function() {
        if (Object.keys(itemsInBag).length === 0) {
            emptyBagMsg.style.display = "none";
        } else {
            showBag();
        }
    };

    closeBagBtn.onclick = closeBag;

    contShopBtn.onclick = closeBag;
})();
