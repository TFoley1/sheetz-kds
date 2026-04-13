
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

//   async function loadJSON() {
//     const response = await fetch('quesadilla.json');
//     const data = await response.json();
//     console.log(data); // Inspect this in browser console
//   }
//   loadJSON();

}); 