class OrderController {
    constructor(orderList) {
        this.orders = orderList;
        this.inActiveOrders = [];
    } 

    getActiveOrders() {
        return this.orders.filter((order) => order.active);
    }

    add(orderData) {
        // create a new order and push to list
        let newOrder = new Order(orderData);
        this.orders.push(newOrder);
    }

    getOrderById(orderId) {
        return this.orders.find(order => String(order.orderNumber) === String(orderId));
    }

    getTotalOrders() {
        return this.orders.length;
    }

    hasActiveOrders() {
        if (this.orders.length !== 0) {
            return true;
        }
        return false;
    }

    hasRingingOrders() {
        if (this.orders.some(order => order.isRinging)) {
            return true;
        }
        return false;
    }
 
}