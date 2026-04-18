let selectedOrder,isRinging = true;
const STATIONS = ["starter", "finisher", "expo"];
const dingSound = new Audio("audio/ding.mp3");
const activeOrders = [
]

const inactiveOrders = [
    
];

setInterval(() => {
    let currentOrders = orderController.getActiveOrders();
    // Every second check for...
    //updateAllOrderTimers(currentOrders);
    // currentOrders.forEach(order => {
        
    // });
    //renderOrders();
    syncOrders();
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
  //renderOrders(); 
});

$(document).ready(function(){

    $("#bump-btn").click(function () {
        const currentStation = getCurrentStation();
        const selected = orderController.orders.find(order => order.selected);

        if (!selected || selected.getStationState(currentStation) !== "active") {
            return;
        }

        selected.bump();
        syncOrders();
    });

    $("#bellIcon").click(function(){
        $("#bellIcon").hide();
        dingSound.stop();
        isRinging = false;
    });

    $("#orders-container").on("click", ".order", function (event) {
        event.stopPropagation();

        const orderId = this.dataset.orderId;
        const order = orderController.getOrderById(orderId);
        const currentStation = getCurrentStation();
        order.isRinging = false;

        if (!order || order.getStationState(currentStation) !== "active") {
            return;
        }

        orderController.orders.forEach(o => {
            o.selected = o.orderNumber === order.orderNumber ? !o.selected : false;
            o.lastRenderState = null;
        });

        syncOrders();
    });

// $(document).click(function () {
//     if (selectedOrder) {
//         selectedOrder.css("background-color", "rgb(8,8,8)");
//         selectedOrder = null;
//     }
// });

    
}); 

function renderIngredient(ingredient) {
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
                buildItems += `<li>${i}</li>`; // for more complex builds a render special modifier function will be needed
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

function renderItem(item,station) {
    if (station === "expo") {
        return `
            <div class="border-b-2 p-2 text-xl font-bold">
                ${item.itemName}
            </div>
        `; //       ^ later will need to add quantity of items
    }

    let ingredientsHTML = "";


    item.ingredients.forEach(ingredient => {
        ingredientsHTML += renderIngredient(ingredient);
    });
    return `<div class="flex-1">
      <h2 class="text-3xl font-bold border-dashed border-b-2 p-1 mt-2">
        ${item.itemName}
      </h2>

      <ul class="inline-block text-2xl p-2">
        ${ingredientsHTML}
      </ul>
    </div>`;
}

function renderOrder(order,station) {

    
    const orderCard = document.createElement("div");
    const visibleItems = order.getVisibleItems(station);
    const headerClass = getHeaderClass(order.getAlertLevel());

    orderCard.classList.add(
        "order",
        "relative",
        "border-3",
        "rounded-2xl",
        "col-span-2",
        "h-full",
        "w-full"
    );

    if (order.selected) {
        orderCard.classList.add("bg-neutral-900");
    }

    if (order.getStationState(station) == "preview") {
        orderCard.classList.add("opacity-45");
    }
    orderCard.dataset.orderId = order.orderNumber;

    let itemsHTML = "";

    visibleItems.forEach(item => {
        itemsHTML += renderItem(item, station);
    });

    let bodyClass;
    if (station === "expo") {
        bodyClass = "grid grid-cols-1 gap-2 p-3";
    } else {
        bodyClass = "flex flex-row gap-4";
    }
    if (order.deliverTo.includes("DoorDash")) {
        orderCard.innerHTML = `
        <div class="grid grid-cols-3 gap-4 ${headerClass} rounded-xl items-center justify-center ">
            <h3 class="text-3xl font-bold">Order #${order.orderNumber}</h3>
            <h3 class="text-5xl font-bold text-center" data-role="timer">${order.timer}</h3>
            <div class="flex items-center justify-center gap-2 rounded-md bg-[#ff3008] px-3 py-2">
                <span class="text-xl font-bold">${order.deliverTo}</span>	
                <img class="h-16 w-auto" src="img/DD-LOGO.png" alt="DoorDash logo">
            </div>
        </div>

        <div class="${bodyClass}">
        ${itemsHTML}
        </div>
    `;
    } else if (order.deliverTo.includes("Online")) {
        orderCard.innerHTML = `
        <div class="grid grid-cols-3 gap-4 ${headerClass} rounded-xl items-center justify-center ">
            <h3 class="text-3xl font-bold">Order #${order.orderNumber}</h3>
            <h3 class="text-5xl font-bold text-center" data-role="timer">${order.timer}</h3>
            <div class="flex items-center bg-fuchsia-900 justify-center gap-2 rounded-md px-3 py-3">
	            <span class="text-xl font-bold text-center">${order.deliverTo}</span>
            </div>
        </div>

        <div class="${bodyClass}">
        ${itemsHTML}
        </div>
    `;
    } else
        orderCard.innerHTML = `
        <div class="grid grid-cols-3 gap-4 ${headerClass} rounded-xl items-center justify-center ">
            <h3 class="text-3xl font-bold">Order #${order.orderNumber}</h3>
            <h3 class="text-5xl font-bold text-center" data-role="timer">${order.timer}</h3>
            <div class="flex items-center bg-stone-500 justify-center gap-2 rounded-md px-3 py-3">
	            <span class="text-xl font-bold text-center">${order.deliverTo}</span>
            </div>
        </div>

        <div class="${bodyClass}">
        ${itemsHTML}
        </div>
    `;
    

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


function syncOrders() {

    
    const currentStation = getCurrentStation();
    const container = $("#orders-container");
    const visibleOrderIds = new Set();
    //const currentOrders = orderController.getActiveOrders();
    // const currentOrders = orderController.getActiveOrders().filter(order => {
    //     return STATIONS[order.stationIndex] === currentStation;
    // });
    const currentOrders = orderController.getActiveOrders().filter(order => {
        return order.getStationState(currentStation) !== "done";
    });


    updateAllOrderTimers(currentOrders);
    $("#orderTotal").html(`${orderController.getTotalOrders() } Orders`);
    $("#clockTime").html(` 4:40pm`);

    if (currentStation === "starter" ) {
        let orderNum = orderController.getTotalOrders();
        if (orderNum > 0 && isRinging) {
            $("#bellIcon").show();
            playOrderNotification();
        } 
    }

    currentOrders.forEach(order => {
        visibleOrderIds.add(String(order.orderNumber));

        const existingCard = document.querySelector(
            `[data-order-id="${order.orderNumber}"]`
        );

        if (existingCard == null) {
            const newCard = renderOrder(order, currentStation);
            container.append(newCard);
            order.saveRenderState(currentStation);
            return;
        }

        if (order.shouldRerender(currentStation)) {
            const newCard = renderOrder(order, currentStation);
            existingCard.replaceWith(newCard);
            order.saveRenderState(currentStation);
            return;
        }

        const timerElement = existingCard.querySelector(`[data-role="timer"]`);

        if (timerElement) {
            timerElement.textContent = order.timer;
        }
    });

    document.querySelectorAll("[data-order-id]").forEach(card => {
        const orderId = card.dataset.orderId;

        if (!visibleOrderIds.has(orderId)) {
            card.remove();
        }
    });
}


function getHeaderClass(alertLevel) {
    if (alertLevel === "danger") {
        return "bg-red-600";
    }

    if (alertLevel === "warning") {
        return "bg-yellow-700";
    }

    return "bg-green-700";
}

function getCurrentStation() {
    const pageName = window.location.pathname.split("/").pop();

    if (pageName === "finisher.html") {
        return "finisher";
    }

    if (pageName === "expo.html") {
        return "expo";
    }

    return "starter";
}

function playOrderNotification() {
    dingSound.play();
}

