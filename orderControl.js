let selectedOrder;
let isMuted = true;
let lastStarterOrderTime = 0;
let lastStarterOrderCount = 0;
let starterOrderCount = 0;
let starterOrdersLoaded = false;
let bellSoundInterval = null;
const STATIONS = ["starter", "finisher", "expo"];
const dingSound = new Audio("audio/ding.mp3");
const activeOrders = [
]

const inactiveOrders = [
    
];

setInterval(() => {
    let currentOrders = orderController.getActiveOrders();
    syncOrders();
}, 1000);

let orderController = new OrderController(activeOrders);
// orderController.injectRandomOrder();

function renderOrders() { 
    const container = $("#orders-container");
    container.empty();

    orderController.orders.forEach(order => {
        const orderCard = renderOrder(order);
        $("#orders-container").append(orderCard);
    }); 
}

$(document).ready(function(){

    $("#bump-btn").click(function () {
        const currentStation = getCurrentStation();
        const selected = orderController.orders.find(order => order.selected);

        if (!selected || selected.getStationState(currentStation) !== "active") {
            return;
        }

        selected.bump();
        orderController.save();
        syncOrders();
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

    $("#volume-slider").on("input", function () {
        dingSound.volume = Number(this.value);
    });

    // // On load
    // isMuted = localStorage.getItem("isMuted") === "true";
    // dingSound.muted = isMuted;
    // if (isMuted) {
    //     $("#muted-icon").show();
    //     $("#mute-icon").hide();
    // } else {
    //     $("#muted-icon").show();
    //     $("#mute-icon").hide();
    // }

    // Mute
    $("#muted-icon").click(function(){
        $("#mute-icon").show();
        $("#muted-icon").hide();
        isMuted = !isMuted;
        dingSound.muted = isMuted;
        localStorage.setItem("isMuted", isMuted);
    });

    $("#mute-icon").click(function(){
      $("#muted-icon").show();
      $("#mute-icon").hide();
      isMuted = !isMuted;
      dingSound.muted = isMuted;
      localStorage.setItem("isMuted", isMuted);
    });
    
}); 

function formatIngredientLabel(ingredient) {
    let label = ingredient.name;

    if (ingredient.qty) {
        label += ` - ${ingredient.qty}`;
    }

    if (ingredient.portion) {
        label += ` (${ingredient.portion})`;
    }

    return label;
}

function renderBasicIngredient(ingredient) {
    return `<li>${formatIngredientLabel(ingredient)}</li>`;
}

function renderModifier(ingredient) {
    return `
    <li class="bg-amber-800 font-bold text-center rounded-md">
        ${formatIngredientLabel(ingredient)}
    </li>`;
}

function renderTag(ingredient) {
    return `
    <li class="bg-lime-700 font-bold text-center rounded-md">
        ${ingredient.name}
    </li>`;
}

function renderBuild(ingredient) {
    let buildItems = "";

    ingredient.ingredients.forEach(i => {
        if (typeof i === "string") {
            buildItems += `<li>${i}</li>`;
        } else {
            buildItems += renderIngredient(i);
        }
    });

    return `
    <li>
        <ul class="bg-amber-800 rounded-md p-1">
            <li class="font-bold text-center">${ingredient.name}</li>
            ${buildItems}
        </ul>
    </li>`;
}

function renderIngredient(ingredient) {
    switch (ingredient.type) {
        case "modifier":
            return renderModifier(ingredient);

        case "tag":
            return renderTag(ingredient);

        case "build":
            return renderBuild(ingredient);

        default:
            return renderBasicIngredient(ingredient);
    }
}

// function renderIngredient(ingredient) {
//      if (ingredient.type === "modifier") {
//             return `<li class="bg-amber-800 font-bold text-center rounded-md">${ingredient.name}</li>`;
//         }
//         if (ingredient.type === "tag") {
//             return `<li class="bg-lime-700 font-bold text-center rounded-md">${ingredient.name}</li>`;
//         }
//         // if (ingredient.type === "build") {
//         //     buildItems += `<li>${ingredient.name}</li>`;
//         //     ingredient.ingredients.forEach(i => {
//         //         buildItems += `<li>${i}</li>`;
//         //     });
//         //     return buildItems;
//         // }
//         if (ingredient.type === "build") {
//             let buildItems = "";

//             ingredient.ingredients.forEach(i => {
//                 buildItems += `<li>${i}</li>`; // for more complex builds a render special modifier function will be needed
//             });
//             return `
//             <li>
//                 <ul class="bg-amber-800 rounded-md p-1">
//                 <li class="font-bold text-center">${ingredient.name}</li>
//                 ${buildItems}
//                 </ul>
//             </li>`;
//         }
//         else {
//             if (ingredient.qty != null) {
//                 return `<li>${ingredient.name} - ${ingredient.qty}</li>`;
//             } 
//             if (ingredient.portion != null) {
//                 return `<li>${ingredient.name} - ${ingredient.portion}</li>`;
//             } else {
//                 return `<li>${ingredient.name}</li>`;
//             }
//         }
// }

function renderItem(item,station) {
    if (station === "expo" && item.qty == null) {
        return `
            <div class="border-b-2 p-2 text-3xl font-bold">
                ${item.itemName}
            </div>
        `; //       ^  - ${item.qty}  later will need to add quantity of items      ^  - ${item.qty}  later will need to add quantity of items
    }
    

    let ingredientsHTML = "";


    item.ingredients.forEach(ingredient => {
        ingredientsHTML += renderIngredient(ingredient);
    });

    if (item.qty != null || item.qty > 1) {
        return `<div class="flex-1">
    <span class="block text-3xl font-bold border-dashed border-b-2 p-1 mt-2">
        ${item.itemName}
        <span class="rounded-sm bg-slate-600">Qty - ${item.qty}</span>
    </span>

      <ul class="inline-block text-2xl p-2">
        ${ingredientsHTML}
      </ul>
    </div>`;
    }
    return `<div class="flex-1">
    <span class="block text-3xl font-bold border-dashed border-b-2 p-1 mt-2">
        ${item.itemName}
    </span>

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
        bodyClass = "grid grid-cols-1 gap-2";
    } else {
        bodyClass = "flex flex-row gap-4 pb-10";
    }
    if (order.deliverTo.includes("DoorDash")) {
        orderCard.innerHTML = `
        <div class="grid grid-cols-3 gap-4 ${headerClass} rounded-xl items-center justify-center pb-8 ">
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

    checkForNewStarterOrders(currentOrders, currentStation);
    


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

  dingSound.currentTime = 0;

  const playPromise = dingSound.play();
  if (playPromise && typeof playPromise.catch === "function") {
    playPromise.catch(() => {
      // Browser may block autoplay until user interaction
    });
  }
}

function showBellOverlay() {
  $("#bell-icon").removeClass("hidden").addClass("grid");

  startBellSoundLoop();
}

function hideBellOverlay() {
  $("#bell-icon").removeClass("grid").addClass("hidden");

  stopBellSoundLoop();
}

function startBellSoundLoop() {
    if (isMuted) {return;}

    // Prevent stacking multiple intervals
    if (bellSoundInterval !== null) return;

    playOrderNotification(); // play immediately

    bellSoundInterval = setInterval(() => {
        playOrderNotification();
    }, 3000);
}

function stopBellSoundLoop() {
    if (bellSoundInterval !== null) {
        clearInterval(bellSoundInterval);
        bellSoundInterval = null;
    }
}


function checkForNewStarterOrders(currentOrders, currentStation) {
    if (currentStation !== "starter") {
        hideBellOverlay();
        return;
    }

    const starterOrders = currentOrders.filter(order => {
        return order.getStationState("starter") === "active";
    });

    if (starterOrders.length === 0) {
        lastStarterOrderTime = 0;
        lastStarterOrderCount = 0; // 👈 ADD THIS
        return;
    }

    const newestStarterOrderTime = Math.max(
        ...starterOrders.map(order => order.orderStartTime)
    );

    if (!starterOrdersLoaded) {
        lastStarterOrderTime = newestStarterOrderTime;
        starterOrdersLoaded = true;
        hideBellOverlay();
        return;
    }

    

    const currentStarterOrders = currentOrders.filter(order => {
        return order.getStationState("starter") === "active";
    });
    const currentCount = currentStarterOrders.length;

    const isFirstOrder = lastStarterOrderCount === 0 && currentCount > 0;

    if (isFirstOrder) {
        showBellOverlay();
    }

    lastStarterOrderCount = currentCount;
}



