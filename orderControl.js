const activeOrders = [
    {
    "itemName": "Burger",
    "ingredients": ["Bun", "Mayo", "Burger", "American cheese"],
    "orderNumber": "849",
    "timer": "1:09",
    "deliverTo":"Deliver To: Customer at Expo"
    },
    {
    "itemName": "Street Tacos",
    "ingredients": ["Tortilla", "Taco Beef", "Shredded Cheddar", "Lettuce"],
    "orderNumber": "851",
    "timer": "1:09",
    "deliverTo":"Deliver To: Customer at Expo"
    },
    {
    "itemName": "Burger",
    "ingredients": ["bun", "mayo", "burger", "american cheese"],
    "orderNumber": "850",
    "timer": "1:09",
    "deliverTo":"Deliver To: Customer at Expo"
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
  //container.classList.add("grid","grid-cols-2","gap-4","span-2");
  container.innerHTML = ""; // clear before re-render

  activeOrders.forEach(order => {

    const orderCard = document.createElement("div");
    orderCard.classList.add("order","relative","border-3", "border-solid", "rounded-md", "col-span-2");
    orderCard.innerHTML = `
        <div class="grid grid-cols-3 gap-4 bg-green-700 border-b-3 p-2 ">
            <h3 class="text-xl font-bold">Order #${order.orderNumber}</h3>
            <h3 class="text-2xl font-bold text-center">${order.timer}</h3>
            <h3 class="text-sm font-bold text-center">${order.deliverTo}</h3>
        </div>
        <div class="flex flex-row gap-4">
        <div class="flex-1">
            <h2 class="text-lg font-bold border-dashed border-b-2 p-1">${order.itemName}</h2>
            <ul class="inline-block text-base p-2">
                ${order.ingredients.map(ingredient => `<li>${ingredient}</li>`).join("")}
            </ul>
        </div>
        </div>
    `;
    //container.appendChild(orderCard);
    $("#orders-container").append(orderCard);
  });

}

document.addEventListener("DOMContentLoaded", function () {
  renderOrders();
});