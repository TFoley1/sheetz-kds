let selectedOrder;
const activeOrders = [
    {
    "itemName": "Burger",
    "ingredients": ["bun", "mayo", "burger", "american cheese"],
    "orderNumber": "849",
    "isSelected": false
    },
    {
    "itemName": "Street Tacos",
    "ingredients": ["Tortilla", "Taco Beef", "Shredded Cheddar", "Lettuce"],
    "orderNumber": "851",
    "isSelected": false
    }
]

$(document).ready(function(){

    $("#bump-btn").click(function() {
        // Selected Order gets saved to inactive order list at the beginning
        // Selected order gets removed from screen
        selectedOrder.remove();
    });

    $(".order").click(function() {
        $(".order").css("background-color","black")
        // Save order data into variable
        // Highlight background
        selectedOrder = $(this);
        selectedOrder.css("background-color","gray");
    });

}); 