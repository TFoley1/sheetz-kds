const activeOrders = [
    {
    "orderNumber": "850",
    "timer": "1:09",
    "deliverTo":"Deliver To: Customer at Expo",
    items: [
        {
        "itemName": "Burger",
        "ingredients": ["bun", "mayo", "burger", "american cheese"]
        },
        {
        "itemName": "Hot Dog",
        "ingredients": ["Hot dog bun", "mmustard", "hot dog"]
        }
    ]
    },
    {
    "orderNumber": "851",
    "timer": "1:09",
    "deliverTo":"Deliver To: Customer at Expo",
    items: [
        {
        "itemName": "Burger",
        "ingredients": ["bun", "mayo", "burger", "american cheese"]
        }
    ]
    }
]

const inactiveOrders = [
    {
    "itemName": "Street Tacos",
    "ingredients": ["Tortilla", "Taco Beef", "Shredded Cheddar", "Lettuce","Boom Boom Sauce"],
    "orderNumber": "848",
    "timer": "1:09",
    "deliverTo":"Deliver To: Customer at Expo"
    }
];

// Take JSON and turn it into HTML & Tailwind
function renderOrders() {
    const container = $("#orders-container");
    container.empty();

  activeOrders.forEach(order => {
    const orderCard = document.createElement("div");
    orderCard.classList.add("order","relative","border-3", "border-solid", "rounded-md", "col-span-2");

    let itemsHTML = "";

    // Loop through the items in whole order
    order.items.forEach(item => {

      let ingredientsHTML = "";

      // LOOP THROUGH INGREDIENTS
      item.ingredients.forEach(ingredient => {
        ingredientsHTML += `<li>${ingredient}</li>`;
      });

      itemsHTML += `
        <div class="flex-1">
          <h2 class="text-lg font-bold border-dashed border-b-2 p-1">
            ${item.itemName}
          </h2>

          <ul class="inline-block text-base p-2">
            ${ingredientsHTML}
          </ul>
        </div>
      `;

    });
    orderCard.innerHTML = `
        <div class="grid grid-cols-3 gap-4 bg-green-700 border-b-3 p-2 ">
            <h3 class="text-xl font-bold">Order #${order.orderNumber}</h3>
            <h3 class="text-2xl font-bold text-center">${order.timer}</h3>
            <h3 class="text-sm font-bold text-center">${order.deliverTo}</h3>
        </div>
        <div class="flex flex-row gap-4">
            ${itemsHTML}
        </div>
    `;
    //container.appendChild(orderCard);
    $("#orders-container").append(orderCard);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  renderOrders();
});

let selectedOrder;


$(document).ready(function(){

    $("#bump-btn").click(function() {
        // Selected Order gets saved to inactive order list at the beginning
            // Find order based on #
            // unshift or add to beginning
            //inactiveOrders.unshift();
        // Selected order gets removed from screen
        selectedOrder.remove();
    });

    $(".order").click(function() {
        $(".order").css("background-color","rgb(8,8,8)");
        // Save order data into variable
        // Highlight background
        selectedOrder = $(this);
        selectedOrder.css("background-color","rgb(30, 30, 30)");
    });
}); 


