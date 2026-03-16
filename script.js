let selectedOrder;


$(document).ready(function(){

    $("#bump-btn").click(function() {
        // Selected Order gets saved to inactive order list at the beginning
        // Selected order gets removed from screen
        selectedOrder.remove();
    });

    $(".order").click(function() {
        $(".order").css("background-color","rgb(8,8,8)");
        // Save order data into variable
        // Highlight background
        selectedOrder = $(this);
        selectedOrder.css("background-color","rgb(30, 30, 30)");
    });
}); 