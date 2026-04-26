let devBtnClicks = 0;
$(document).ready(function(){
    $("#switch-popup").hide();
    $("#dev-popup").hide();
    $("#volume-modal").hide();
    $("#mute-icon").hide();
    //$("#bell-icon").hide();

   // Modals

    $("#switch-station-btn").click(function() {
       // Show options for stations to switch to
       $("#switch-popup").show();
       // Let user click links to stations
    });

    $("#switch-popup").click(function() {
       // Show options for stations to switch to
       $("#switch-popup").hide();
       // Let user click links to stations
    });

    $("#dev-btn").click(function() {
       // Show options for stations to switch to
       devBtnClicks++;
       if (devBtnClicks % 2 == 1) {
         $("#dev-popup").show();
       } else {
         $("#dev-popup").hide();
         $("#switch-popup").hide();
       }
       
       // Let user click links to stations
    });

    $("#dev-popup").click(function() {
       // Show options for stations to switch to
       $("#dev-popup").hide();
       // Let user click links to stations
    });

    // btns

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

   $("#clear-storage-btn").click(function () {
        orderController.load()
        syncOrders();
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

   function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });
    $("#clock-time").html(time);
}

setInterval(updateClock, 1000);
updateClock();

