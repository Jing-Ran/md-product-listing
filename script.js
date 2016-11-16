(function() {
  var shoppingPage = document.getElementById('shopping-page');
  var openBagBtn = document.getElementById('open-bag-btn');
  var openedBag = document.getElementById('opened-bag');
  var emptyBagMsg = document.getElementById('empty-bag-msg');
  var closeBagBtn = document.getElementById('close');
  var contShopBtn = document.getElementById('cont-shopping');
  var shoppingBag = document.getElementById('items-in-bag');
  var addBtns = document.getElementsByClassName('add-btn');
  var totalOriginalPr = document.getElementById('total-original');
  var totalAfterPromo = document.getElementById('total-promo');
  var applyPromoBtn = document.getElementById('apply-promo');
  var promoField = document.getElementById('promo-input');
  var invalidInfo = document.getElementById('invalid-info');
  var showCurrentPromo = document.getElementById('show-current-promo');
  var itemNum = document.getElementById('item-num');
  var itemsInBag = {};
  var currentPromo = '';


  function showBag() {
    openedBag.style.display = 'block';
    document.body.style.overflow = 'hidden';
    shoppingPage.classList.add('filter');
  }

  function closeBag() {
    openedBag.style.display = 'none';
    document.body.style.overflow = 'auto';
    shoppingPage.classList.remove('filter');
  }

  function updateItemNum() {
    var totalNum = 0;

    for (var prop in itemsInBag) {
      totalNum += itemsInBag[prop];
    }
    itemNum.innerHTML = totalNum;
  }

  // add items to bag, update item price and total price, update item qty
  function updateItemInBag(productId) {
    var product = products[productId];
    var row = document.createElement('tr');
    var td0 = row.insertCell(0);
    var td1 = row.insertCell(1);
    var td2 = row.insertCell(2);
    var td3 = row.insertCell(3);
    var image = document.createElement('img');
    var descriptionText = product.brand + ': ' + product.description;
    var description = document.createElement('p');
    var colorSzText = product.color + '/' + product.size;
    var colorSz = document.createElement('p');
    var qtyInput = document.createElement('input');
    var qty = document.createElement('label');
    var removeBtn = document.createElement('button');
    var price = document.createElement('p');
    var discountPr = document.createElement('p');
    var priceFor1 = product.price;
    var discountPrFor1 = product.discountPr;

    // when shopping bag was not empty
    if (itemsInBag.hasOwnProperty(productId)){
      itemsInBag[productId]++; // stores the num of this item in shopping bag
      document.getElementById('qty-input' + productId).value =
          itemsInBag[productId];
      // update each item's price and discountPr
      document.getElementById('price' + productId).innerHTML =
          '$' + (products[productId].price * itemsInBag[productId]).toFixed(2);
      if (products[productId].price !== products[productId].discountPr) {
        document.getElementById('discount' + productId).innerHTML =
            '$' + (products[productId].discountPr * itemsInBag[productId]).toFixed(2);
      }
    } else { // when shopping bag was empty
      itemsInBag[productId] = 1;
      shoppingBag.appendChild(row);

      // Add all elements to td and tr
      row.setAttribute('id', 'tr' + productId);
      row.setAttribute('class', 'row');

      image.setAttribute('src', product.imageUrl);
      td0.appendChild(image);
      td0.setAttribute('class', 'narrow-col');

      description.innerHTML = descriptionText;
      description.setAttribute('class', 'description');
      colorSz.innerHTML = colorSzText;
      colorSz.setAttribute('class', 'color-sz');
      td1.appendChild(description);
      td1.appendChild(colorSz);
      td1.setAttribute('class', 'wide-col');

      removeBtn.innerHTML = 'remove';
      removeBtn.setAttribute('value', productId);
      removeBtn.setAttribute('class', 'remove-btn');
      removeBtn.setAttribute('type', 'button');
      removeBtn.setAttribute('name', 'remove');
      qtyInput.setAttribute('type', 'number');
      qtyInput.setAttribute('name', 'quantity');
      qtyInput.setAttribute('min', '0');
      qtyInput.setAttribute('value', '1');
      qtyInput.setAttribute('id', 'qty-input' + productId);
      qty.innerHTML = 'QTY' + '&nbsp;';
      qty.appendChild(qtyInput);
      qty.setAttribute('class', 'qty');
      td2.appendChild(qty);
      td2.appendChild(removeBtn);
      td2.setAttribute('class', 'narrow-col');

      td3.appendChild(price);
      td3.appendChild(discountPr);
      td3.setAttribute('class', 'narrow-col');
      price.setAttribute('id', 'price' + productId);
      price.innerHTML = '$' + priceFor1.toFixed(2);
      if (discountPrFor1 !== priceFor1) {
        discountPr.innerHTML = '$' + discountPrFor1.toFixed(2);
        price.setAttribute('class', 'original-pr');
        discountPr.setAttribute('id', 'discount' + productId);
        discountPr.setAttribute('class', 'discount-pr');

      }
    }

    // remove product from bag when removeBtn is onclick
    removeBtn.onclick = function() {
      removeItemInBag(productId);
    };

    // change an item's qty and reflect the change to its price
    qtyInput.onchange = function () {
      changeQty(productId);

      //change this item's total price
      price.innerHTML = '$' + (itemsInBag[productId] * priceFor1).toFixed(2);
      if (discountPrFor1 !== priceFor1) {
        discountPr.innerHTML = '$' + (this.value * discountPrFor1).toFixed(2);
      }
    };

    //Update order total price
    updateOrderTotal();

    // Update itemNum (num next to openBagBtn)
    updateItemNum();
  }

  function removeItemInBag(productId) {
    var itemToRemove = document.getElementById('tr' + productId);
    shoppingBag.removeChild(itemToRemove); //remove from shopping bag visually
    delete itemsInBag[productId]; // remove this item from itemsInBag obj
    updateItemNum();

    //Update total price
    updateOrderTotal();
    // if itemsInBag is empty, close the shopping bag
  }

  function changeQty(productId) {
    var itemToChange = document.getElementById('qty-input' + productId);
    if (itemToChange.value === '0') {
      removeItemInBag(productId);
    } else {
      itemsInBag[productId] = Number(itemToChange.value); //update qty in itemInBag obj
      updateItemNum();
    }
    updateOrderTotal();
  }

  function calculateTotalPr() {
    var totalPrice = 0;
    var totalPromoPr = 0;
    var result = [];

    for (var prop in itemsInBag) { // prop is productId(s)
      totalPrice += itemsInBag[prop] * products[prop].discountPr;
      if (currentPromo !== '') {
        totalPromoPr += itemsInBag[prop] * getPromoPr(prop);
      }
    }
    result.push(totalPrice);
    result.push(totalPromoPr);
    return result;
  }

  function updateOrderTotal() {
    var temp = calculateTotalPr();
    totalOriginalPr.innerHTML = '$' + temp[0].toFixed(2);
    totalOriginalPr.style.textDecoration = 'none';
    console.log('update total price');
    if (currentPromo !== '') {
      console.log('has promo');
      totalAfterPromo.innerHTML = '$' + temp[1].toFixed(2);
      totalOriginalPr.style.textDecoration = 'line-through';
    }
  }

  function getPromoPr(productId) {
    var prAftDiscount = products[productId].discountPr;
    if (promoCodes[currentPromo].type === productId) {
      prAftDiscount = products[productId].discountPr *
          promoCodes[currentPromo].discount;
    }
    if (promoCodes[currentPromo].type === products[productId].category) {
      prAftDiscount = products[productId].discountPr *
          promoCodes[currentPromo].discount;
    }
    if (promoCodes[currentPromo].type === 'all') {
      prAftDiscount = products[productId].discountPr *
          promoCodes[currentPromo].discount;
    }
    return prAftDiscount;
  }

  function applyPromo() {
    var newPromo = promoField.value.toUpperCase();
    var totalWithOldPromo;
    var totalWithNewPromo;
    var temp;
    var tempPromo;

    // if newPromo is empty
    if (newPromo === '') {
      invalidInfo.innerHTML = '';
      totalAfterPromo.innerHTML = '';
      showCurrentPromo.innerHTML = '';
      totalOriginalPr.style.textDecoration = 'none';
      currentPromo = '';
    } else { // if newPromo is not empty
      if (!(newPromo in promoCodes)) { // invalid promo
        invalidInfo.innerHTML = 'Invalid promo code';
        totalAfterPromo.innerHTML = '';
        totalOriginalPr.style.textDecoration = 'none';
        showCurrentPromo.innerHTML = '';
        currentPromo = '';
        // promoField.value = ''; // clean up invalid promo
      } else { // valid promo
        if (currentPromo === '') { // no promo entered before
          currentPromo = newPromo;
          temp = calculateTotalPr();
          totalOriginalPr.innerHTML = '$' + temp[0].toFixed(2);
          totalAfterPromo.innerHTML = '$' + temp[1].toFixed(2);
          totalOriginalPr.style.textDecoration = 'line-through';
          invalidInfo.innerHTML = '';
          showCurrentPromo.innerHTML = currentPromo + ' applied';
        } else { // had a promo before
          totalWithOldPromo = calculateTotalPr()[1];
          tempPromo = currentPromo;
          currentPromo = newPromo;
          totalWithNewPromo = calculateTotalPr()[1];

          if (totalWithNewPromo < totalWithOldPromo) { // new promo saves more
            totalAfterPromo.innerHTML = '$' + totalWithNewPromo.toFixed(2);
            totalOriginalPr.style.textDecoration = 'line-through';
            invalidInfo.innerHTML = '';
            showCurrentPromo.innerHTML = currentPromo + ' applied';
          } else { // new promo doesn't save more
            invalidInfo.innerHTML =
                "New promo code doesn't save you more";
            currentPromo = tempPromo;
            // promoField.value = ''; // clean up new promo
          }
        }
      }
    }
  }


  // apply function to each "add to bag" btn
  for (var i = 0; i < addBtns.length; i++) {
    addBtns[i].addEventListener('click', function() {
      console.log('add an item');
      updateItemInBag(this.value);
    });
  }

  // apply function to applyPromoBtn
  applyPromoBtn.addEventListener('click', applyPromo);

  openBagBtn.onmouseover = function() {
    if (Object.keys(itemsInBag).length === 0) {
      emptyBagMsg.className = 'show';
    }
  };

  openBagBtn.onmouseout = function() {
    if (Object.keys(itemsInBag).length === 0) {
      emptyBagMsg.className = 'hidden';
    }
  };

  openBagBtn.onclick = function() {
    if (Object.keys(itemsInBag).length !== 0) {
      showBag();
    }
  };

  closeBagBtn.addEventListener('click', closeBag);

  contShopBtn.addEventListener('click', closeBag);
})();
