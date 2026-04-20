class OrderController {
    constructor(orderList) {
        this.orders = orderList;
        this.inActiveOrders = [];
    } 

    getActiveOrders() {
        return this.orders.filter((order) => order.active);
    }

    hasActiveOrders() {
        if (this.orders.length !== 0) {
            return true;
        }
        return false;
    }

    add(orderData) {
        // create a new order and push to list
        let newOrder = new Order(orderData);
        this.orders.push(newOrder);
        this.save();
    }

    getOrderById(orderId) {
        return this.orders.find(order => String(order.orderNumber) === String(orderId));
    }

    getTotalOrders() {
        return this.orders.length;
    }

    
    // order save or broadcast function

    // get random items from json
    async getRandomItems(count = 1) {
        // Load paths for items
        console.log("getting random items - line 38");
        const res = await fetch('orderItems/menu.json');
        const itemPaths = await res.json();

        const selectedPaths = [];
        // loop for random items based on count
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * itemPaths.length);
            selectedPaths.push(itemPaths[randomIndex]);
        }
        // fetch and format into order objects
        const items = await Promise.all(
            selectedPaths.map(path => fetch(path).then(r => r.json()))
        );

        return items;
    }
    
    createOrderFromItems(items) {
        return new Order({
            id: Date.now() % 1000, // parse down to last three for unique order num/id
            items: items
        });
    }

    async generateRandomOrder() {
        const itemCount = Math.floor(Math.random() * 2) + 1;
        const items = await this.getRandomItems(itemCount);
        return this.createOrderFromItems(items);
    }

    async injectRandomOrder() {
        const order = await this.generateRandomOrder();

        this.add(order);
        this.save();
    }

    save() {
        localStorage.setItem("kds_orders", JSON.stringify(this.orders));
    }

    load() {
        const data = JSON.parse(localStorage.getItem("kds_orders")) || [];
        this.orders = data.map(o => {
            const order = new Order(o);
            order.needsRender = true;
            return order;
        });
    }   
}