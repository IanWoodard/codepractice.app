$("#show-more").click(function () {
  $("#show-more").hide();
  $("#documentation").addClass("expanded");
  $("#show-less").show();
});
$("#show-less").click(function () {
  $("#show-less").hide();
  $("#documentation").removeClass("expanded");
  $("#show-more").show();
});
