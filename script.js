$(document).ready(function(){
    $("#switch-station-modal").hide();
    $("#menu-modal").hide();
    $("#volume-modal").hide();
    $("#mute-icon").hide();
    //$("#bell-icon").hide();

   // Modals

    $("#switch-station-btn").click(function() {
       // Show options for stations to switch to
       $("#switch-station-modal").show();
       // Let user click links to stations
    });

    $("#menu-btn").click(function() {
       // Show options for stations to switch to
       $("#menu-modal").show();
       // Let user click links to stations
    });

    $("#menu-modal").click(function() {
       // Show options for stations to switch to
       $("#menu-modal").hide();
       // Let user click links to stations
    });

    $("#volume-btn").click(function() {
       // Show options for stations to switch to
       $("#volume-modal").show();
       // Let user click links to stations
    });

    $("#volume-modal").click(function() {
       // Show options for stations to switch to
       $("#volume-modal").hide();
       // Let user click links to stations
    });

    $("#add-order-btn").click(function() {
      orderController.injectRandomOrder();
    });

    

    $("#bell-icon").click(function () {
         hideBellOverlay();
    });


   orderController.load();
}); 


window.addEventListener("storage", (e) => {
   if (e.key === "kds_orders") {
      orderController.load();
      syncOrders();
   }
   });