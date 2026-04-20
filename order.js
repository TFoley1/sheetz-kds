class Order {
    constructor(data) {
        // Order Header
        this.orderNumber = data.id ?? data.orderNumber;
        this.orderStartTime = data.orderStartTime ?? Date.now();
        this.timer = data.timer ?? "00:00";
        this.deliverTo = data.deliverTo ?? "Deliver To: Customer @ Expo";

        // Items and Rendering Info
        this.items = data.items ?? [];
        // this.station = "starter";

        this.stationIndex = data.stationIndex ?? 0;
        this.active = true;
        this.isRinging = true;
        this.selected = false;
        this.completed = false;
        this.needsRender = false;
        this.lastRenderState = null;
    }

    bump() {
        this.stationIndex++;

        if (this.stationIndex >= STATIONS.length) {
            this.completed = true;
            this.active = false;
        }

        this.selected = false;
        this.lastRenderState = null;
    }

    getElapsedTime() {
        // finds elapsed time doesn't actually run a timer, update/check elsewhere 
        return Math.floor((Date.now() - this.orderStartTime) / 1000);
    }

    getAlertLevel() {
        const elapsed = this.getElapsedTime();

        if (elapsed >= 300) return "danger";
        if (elapsed >= 180) return "warning";
        return "normal";
    }

    needsFinisher(item) {
        // Check ingredients to see if theres a send to finisher tag
        return item.ingredients.some(ingredient => ingredient.type === "tag" && ingredient.name === "Send To Finisher");
    }

    getVisibleItems(station) {
        if (station === "expo") {
            return this.items.map(item => ({
                itemName: item.itemName
            }));
        }

        if (station === "finisher") {
            return this.items.map(item => ({
                ...item,
                muted: !this.needsFinisher(item)
            }));
        }

        return this.items;
    }

    getStationState(station) {
        const pageIndex = STATIONS.indexOf(station);

        if (this.completed) return "completed";
        if (this.stationIndex === pageIndex) return "active";
        if (this.stationIndex < pageIndex) return "preview";
        return "done";
    }

    getRenderState(station) {
        return {
            station,
            alertLevel: this.getAlertLevel(),
            selected: this.selected,
            completed: this.completed,
            visibleItems: this.getVisibleItems(station)
        };
    }

    shouldRerender(station) {
        const nextState = this.getRenderState(station);
        if (this.needsRender) {
            return true;
        }

        if (!this.lastRenderState) return true;
        if (this.lastRenderState.alertLevel !== nextState.alertLevel) return true;
        if (this.lastRenderState.selected !== nextState.selected) return true;
        if (this.lastRenderState.station !== nextState.station) return true;
        if (this.lastRenderState.visibleItems.length !== nextState.visibleItems.length) {
            return true;
        }

        for (let i = 0; i < nextState.visibleItems.length; i++) {
            const oldItem = this.lastRenderState.visibleItems[i];
            const newItem = nextState.visibleItems[i];

            if (oldItem.itemName !== newItem.itemName) return true;
            if ((oldItem.ingredients?.length || 0) !== (newItem.ingredients?.length || 0)) {
                return true;
            }
        }

        return false;
    }

    saveRenderState(station) {
        this.lastRenderState = this.getRenderState(station);
        this.needsRender = false;
    }

}