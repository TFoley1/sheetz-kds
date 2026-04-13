
$(document).ready(function(){
    $("#switch-station-modal").hide();

    $("#switch-station-btn").click(function() {
       // Show options for stations to switch to
       $("#switch-station-modal").show();
       // Let user click links to stations
    });

    $("#switch-station-modal").click(function() {
       // Show options for stations to switch to
       $("#switch-station-modal").hide();
       // Let user click links to stations
    });

    
}); 