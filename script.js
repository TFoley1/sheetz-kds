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
    $(".bump-btn ").hide();

    $(".bump-btn ").click(function() {
        // $(this) refers to the clicked button
        // .parent() gets the immediate parent
        // .remove() removes the parent element and everything inside it
        $(this).parent().remove();
    });

    $(".order").click(function() {
        $(".bump-btn").hide();
        $(this).find(".bump-btn").show();
    });

}); 