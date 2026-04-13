class Order {
    constructor(orderNumber,items,deliverTo) {
        this.orderNumber = orderNumber;
        this.orderStartTime =  Date.now();
        this.deliverTo = deliverTo;
        this.items = items;
        this.stationIndex = 0;
        this.active = true;
        this.isRinging = false;
        this.selected = false;
        this.completed = false;
    } 

    bump() {
        // check in order container for if order is active && the station index, update while updating timers?
    }

    getElapsedTime() {
        // finds elapsed time doesn't actually run a timer, update/check elsewhere 
        return Date.now() - this.orderStartTime;
    }

    nextStation() {
        this.stationIndex++;

        if (this.stationIndex >= STATIONS.length) {
            this.completed = true;
            this.active = false;
            // Here is where orders should record if they were completed in time, add to a counter for time frame in another area
        }
    } 

}


// const activeOrders = [
//     {
//     "orderNumber": "850",
//     "timer":Date.now(),
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
// ]