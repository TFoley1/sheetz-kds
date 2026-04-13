let selectedOrder;
const STATIONS = ["starter", "finisher", "expo"];
const activeOrders = [
//     {
//     "orderNumber": "850",
//     "timer":"0:00",
//     "deliverTo":"Deliver To: Customer at Expo",
//     items: [
//         {
//         "itemName": "Burger",
//         ingredients: [
//             { name: "Bun", type: "ingredient" },
//             { name: "TOAST", type: "modifier" },
//             { name: "Mayo", type: "ingredient" },
//             { name: "Stacked Burger", qty: 2, type: "ingredient" },
//             { name: "Send To Finisher", type: "tag" },
//             { name: "American Cheese", qty: 2, type: "ingredient" },
//             {
//                 type: "build",
//                 name: "BUILD",
//                 ingredients: [
//                 "Stacked Burger",
//                 "American Cheese",
//                 "Stacked Burger",
//                 "American Cheese"
//                 ]
//             },
//             { name: "Lettuce", type: "ingredient" }
// ]
//         },
//         {
//         "itemName": "Hot Dog",
//         ingredients: [
//             { name: "Hot Dog Bun", type: "ingredient" },
//             { name: "Mustard", type: "ingredient" },
//             { name: "Hot Dog", type: "ingredient"}
//         ]
//         }
//     ]
//     }
]

const inactiveOrders = [
    
];
setInterval(() => {
    let currentOrders = orderController.getActiveOrders();
    // Every second check for...
    updateAllOrderTimers(currentOrders);
    currentOrders.forEach(order => {
        // run some stuff that gotta be checked each order
    });
    renderOrders();

}, 1000);

let newOrder = new Order({
    "id": "850",
    "timer":"0:00",
    "deliverTo":"Deliver To: Customer at Expo",
    items: [
        {
        "itemName": "Burger",
        ingredients: [
            { name: "Bun", type: "ingredient" },
            { name: "TOAST", type: "modifier" },
            { name: "Mayo", type: "ingredient" },
            { name: "Stacked Burger", qty: 2, type: "ingredient" },
            { name: "Send To Finisher", type: "tag" },
            { name: "American Cheese", qty: 2, type: "ingredient" },
            {
                type: "build",
                name: "BUILD",
                ingredients: [
                "Stacked Burger",
                "American Cheese",
                "Stacked Burger",
                "American Cheese"
                ]
            },
            { name: "Lettuce", type: "ingredient" }
]
        },
        {
        "itemName": "Hot Dog",
        ingredients: [
            { name: "Hot Dog Bun", type: "ingredient" },
            { name: "Mustard", type: "ingredient" },
            { name: "Hot Dog", type: "ingredient"}
        ]
        }
    ]
    });

    activeOrders.push(newOrder);

let orderController = new OrderController(activeOrders);

function renderOrders() { 
    const container = $("#orders-container");
    container.empty();

    orderController.orders.forEach(order => {
        const orderCard = renderOrder(order);
        $("#orders-container").append(orderCard);
    }); 
//   activeOrders.forEach(order => {
//     const orderCard = renderOrder(order);
//     $("#orders-container").append(orderCard);
//   });

}

// // Take JSON and turn it into HTML & Tailwind
// function renderOrders() {
//     const container = $("#orders-container");
//     container.empty();

//   activeOrders.forEach(order => {
//     const orderCard = document.createElement("div");
//     orderCard.classList.add("order","relative","border-3", "border-solid", "rounded-md", "col-span-2");

//     let itemsHTML = "";

//     // Loop through the items in whole order
//     order.items.forEach(item => {

//       let ingredientsHTML = "";

//       // LOOP THROUGH INGREDIENTS
//       item.ingredients.forEach(ingredient => {
//         let buildItems = "";
//          if (ingredient.type === "ingredient") {
//             if (ingredient.qty == null) {
//                 ingredientsHTML += `<li>${ingredient.name}</li>`;
//             } else {
//                 ingredientsHTML += `<li>${ingredient.name} - ${ingredient.qty}</li>`;
//             }
            
//         }
//         if (ingredient.type === "modifier") {
//             ingredientsHTML += `<li class="bg-amber-800 font-bold text-center rounded-md">${ingredient.name}</li>`;
//         }
//         if (ingredient.type === "tag") {
//             ingredientsHTML += `<li class="bg-lime-700 font-bold text-center rounded-md">${ingredient.name}</li>`;
//         }
//         if (ingredient.type === "build") {
//             ingredient.ingredients.forEach(i => {
//                 buildItems += `<li>${i}</li>`;
//             });
//             ingredientsHTML += `
//                 <li>
//                 <ul class="bg-amber-800 rounded-md p-1">
//                     <li class="font-bold text-center">${ingredient.name}</li>
//                     ${buildItems}
//                 </ul>
//                 </li>
//             `;
//         }
//       });

//       itemsHTML += `
//         <div class="flex-1">
//           <h2 class="text-lg font-bold border-dashed border-b-2 p-1">
//             ${item.itemName}
//           </h2>

//           <ul class="inline-block text-base p-2">
//             ${ingredientsHTML}
//           </ul>
//         </div>
//       `;

//     });

//     // Build card and HTML
//     orderCard.innerHTML = `
//         <div class="grid grid-cols-3 gap-4 bg-green-700 border-b-3 p-2 ">
//             <h3 class="text-xl font-bold">Order #${order.orderNumber}</h3>
//             <h3 class="text-2xl font-bold text-center" data-order-id=${order.orderNumber}>${order.timer}</h3>
//             <h3 class="text-sm font-bold text-center">${order.deliverTo}</h3>
//         </div>
//         <div class="flex flex-row gap-4">
//             ${itemsHTML}
//         </div>
//     `;
//     //container.appendChild(orderCard);
//     $("#orders-container").append(orderCard);
//   });
// }

document.addEventListener("DOMContentLoaded", function () {
  renderOrders(); 
});

$(document).ready(function(){

    $("#bump-btn").click(function() {
        // Selected Order gets saved to inactive order list at the beginning
            // Find order based on #
            // unshift or add to beginning
            //inactiveOrders.unshift();
        // Selected order gets removed from screen
        selectedOrder.remove();
    });
    let selectedOrder = null;

$(".order").click(function (e) {
    e.stopPropagation(); // 🔥 prevents body click from firing

    // If clicking the same order → deselect it
    if (selectedOrder && selectedOrder.is($(this))) {
        selectedOrder.css("background-color", "rgb(8,8,8)");
        selectedOrder = null;
        return;
    }

    // Reset previous selection
    $(".order").css("background-color", "rgb(8,8,8)");

    // Set new selection
    selectedOrder = $(this);
    selectedOrder.css("background-color", "rgb(25,25,25)");
});

$(document).click(function () {
    if (selectedOrder) {
        selectedOrder.css("background-color", "rgb(8,8,8)");
        selectedOrder = null;
    }
});

    
}); 

function renderIngredient(ingredient) {
    let buildItems = "";
     if (ingredient.type === "modifier") {
            return `<li class="bg-amber-800 font-bold text-center rounded-md">${ingredient.name}</li>`;
        }
        if (ingredient.type === "tag") {
            return `<li class="bg-lime-700 font-bold text-center rounded-md">${ingredient.name}</li>`;
        }
        // if (ingredient.type === "build") {
        //     buildItems += `<li>${ingredient.name}</li>`;
        //     ingredient.ingredients.forEach(i => {
        //         buildItems += `<li>${i}</li>`;
        //     });
        //     return buildItems;
        // }
        if (ingredient.type === "build") {
            let buildItems = "";
            ingredient.ingredients.forEach(i => {
                buildItems += `<li>${i}</li>`;
            });
            return `
            <li>
                <ul class="bg-amber-800 rounded-md p-1">
                <li class="font-bold text-center">${ingredient.name}</li>
                ${buildItems}
                </ul>
            </li>`;
        }
        else {
            if (ingredient.qty == null) {
                return `<li>${ingredient.name}</li>`;
            } else {
               return `<li>${ingredient.name} - ${ingredient.qty}</li>`;
            }
        }
}

function renderItem(item) {
    let ingredientsHTML = "";


    item.ingredients.forEach(ingredient => {
        ingredientsHTML += renderIngredient(ingredient);
    });
    return `<div class="flex-1">
      <h2 class="text-lg font-bold border-dashed border-b-2 p-1">
        ${item.itemName}
      </h2>

      <ul class="inline-block text-base p-2">
        ${ingredientsHTML}
      </ul>
    </div>`;
}

function renderOrder(order) {
    const orderCard = document.createElement("div");

    orderCard.classList.add(
        "order",
        "relative",
        "border-3",
        "rounded-md",
        "col-span-2"
    );

    let itemsHTML = "";

    order.items.forEach(item => {
        itemsHTML += renderItem(item);
    });
    // add if for beginning of innerHTML to change the color if order.timer is  < 3 min as well as < 5 min
    if (order.getElapsedTime() >= 180) {
        orderCard.innerHTML = `
        <div class="grid grid-cols-3 gap-4 bg-yellow-700 border-b-3 p-2">
            <h3 class="text-xl font-bold">Order #${order.orderNumber}</h3>
            <h3 class="text-2xl font-bold text-center">${order.timer}</h3>
            <h3 class="text-sm font-bold text-center">${order.deliverTo}</h3>
        </div>

        <div class="flex flex-row gap-4">
        ${itemsHTML}
        </div>
    `; 
    }
    else if (order.getElapsedTime() >= 300) {
        orderCard.innerHTML = `
        <div class="grid grid-cols-3 gap-4 bg-red-700 border-b-3 p-2">
            <h3 class="text-xl font-bold">Order #${order.orderNumber}</h3>
            <h3 class="text-2xl font-bold text-center">${order.timer}</h3>
            <h3 class="text-sm font-bold text-center">${order.deliverTo}</h3>
        </div>

        <div class="flex flex-row gap-4">
        ${itemsHTML}
        </div>
    `; 
    }
    else {
        orderCard.innerHTML = `
        <div class="grid grid-cols-3 gap-4 bg-green-700 border-b-3 p-2">
            <h3 class="text-xl font-bold">Order #${order.orderNumber}</h3>
            <h3 class="text-2xl font-bold text-center">${order.timer}</h3>
            <h3 class="text-sm font-bold text-center">${order.deliverTo}</h3>
        </div>

        <div class="flex flex-row gap-4">
        ${itemsHTML}
        </div>
    `; 
    }
    

    return orderCard;
}

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateAllOrderTimers(orders) {
    // find time right now
    const now = Date.now()
    // find elapsed time
    // find difference between order created and now
    // format to seconds
    // formate seconds to MM:SS
    orders.forEach((order) => {
        const elapsedSeconds = order.getElapsedTime();
        order.timer = formatTime(elapsedSeconds);
    });
}