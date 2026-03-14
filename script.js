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