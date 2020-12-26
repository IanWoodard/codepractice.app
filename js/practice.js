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
$("#bookmark").click(function () {
  var user = firebase.auth().currentUser;
  if (user) {
    if ($("#bookmark").attr("src") == "svg/bookmark.svg") {
      $("#bookmark").attr("src", "svg/bookmarked.svg");
    } else {
      $("#bookmark").attr("src", "svg/bookmark.svg");
    }
  }
});
