// This code updates the 'item counter' in the nav bar, the items in the review order list, and the numbers in the food boxes.

$(document).ready(function() {
  const menuContainer = $("#menu_container");
  const selectedItems = {};

  let currentItemTotal = 0;

  console.log("Menu container:", menuContainer);

  function updateSelectedItems(foodBox, quantity) {
    const foodName = foodBox.find('label').text().trim();
    if (quantity > 0) {
      selectedItems[foodName] = quantity;
    } else {
      delete selectedItems[foodName];
    }
  }

  function handleIncrement() { const $button = $(this);
    const foodBox = $button.closest(".food-box");
    const counter = foodBox.find("#counter-value");
    let currentVal = parseInt(counter.text()) || 0;
    currentVal += 1;
    currentItemTotal += 1;
    counter.text(currentVal);
    updateSelectedItems(foodBox, currentVal);
    const itemTotalCounter = $('.nav-right-label').children('counter');
    itemTotalCounter.text(`${currentItemTotal} Items`); }

  function handleDecrement() {
    const $button = $(this);
    const foodBox = $button.closest(".food-box");
    const counter = foodBox.find("#counter-value");
    let currentVal = parseInt(counter.text()) || 0;
    if (currentVal > 0) {
      currentVal -= 1;
      currentItemTotal += 1;
    }
    counter.text(currentVal);
    updateSelectedItems(foodBox, currentVal);
    const itemTotalCounter = $('.nav-right-label').children('counter');
    itemTotalCounter.text(`${currentItemTotal} Items`);
    //console.log("Updated current value:", currentVal);
  }

  menuContainer.on("click", ".increment-btn", handleIncrement);
  menuContainer.on("click", ".decrement-btn", handleDecrement);

  console.log($('#confirmOrderBtn'))

  $('#confirmOrderBtn').on('click', function (event) {
    event.preventDefault();
    const $button = $(this);
    const orderItems = $('#orderItems').children();
    const orderItemsArray = [];
    const phoneNumber = $('#phoneNumber').val();
    for (const item of orderItems) {
      const itemValues = $(item).text().split('$');
      const [price, quantity] = itemValues[1].split('(');
      const name = itemValues[0].trim();
      const adjustedPrice = price.trim();
      const adjustedQuantity = quantity.replace(')', '').trim();
      console.log(name, adjustedPrice, adjustedQuantity)
      //const menu_item_id = getId(itemValues[0]);
      // $.ajax({
      //   type: "GET",
      //   url: "/api/menus"
      // }).done((response) => {
      //   for(let menu of response.menus)
      //   {
      //     if (menu.name === name){
      //       menu_item_id = menu.id;
      //       console.log(menu.id, ' ');
      //     }
      //   }
      // })

      //console.log('Menu Array: ', menu_item_id);

      orderItemsArray.push({name, quantity: adjustedQuantity });
    }
    // const counter = foodBox.find("#counter-value");
    console.log($button)
    console.log(orderItems)

    const data = {
      orders: orderItemsArray,
      phoneNumber
    }

    console.log(data)

    // console.log(counter)
    $.ajax({
      type: "POST",
      url: "/order",
      contentType: 'application/json',
      data: JSON.stringify(data),
    })

  })


  $(".close").on("click", function() {
    $("#reviewPopup").hide();
  });
});
