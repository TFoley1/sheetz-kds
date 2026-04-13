class OrderController {
    constructor(orderList) {
        this.orders = orderList;
    } 

    getActiveOrders() {
        return this.orders.filter((order) => order.active);
    }

    add(orderData) {
        // create a new order and push to list
        let newOrder = new Order(orderData);
        this.orders.push(newOrder);
    }

}